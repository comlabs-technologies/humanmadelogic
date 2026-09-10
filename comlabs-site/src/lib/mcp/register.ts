import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/server';
import { agency, capabilities, contact, work } from '@/config/agency';
import { validateContact } from '@/lib/contact';
import { listInquiries, saveInquiry } from '@/lib/inquiries';
import { sendInquiryEmail } from '@/lib/mailer';
import { mcpAdminAuthorized } from '@/lib/admin-auth';
import { askModel, isModelProvider, providerStatus } from '@/lib/models';
import { connectGuide, studioSnapshot } from '@/lib/studio';

const MCP_VERSION = '1.0.0';

function text(value: unknown) {
  return {
    content: [{ type: 'text' as const, text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }],
  };
}

function errorText(message: string) {
  return { ...text(message), isError: true as const };
}

export const mcpServerInfo = {
  name: 'comlabs',
  version: MCP_VERSION,
};

export const mcpInstructions = [
  'ComLabs MCP for Human Made Logic.',
  'Use studio_profile, list_capabilities and list_work for agency context.',
  'Use list_providers then ask to send a prompt to Claude, GPT or Gemini when those keys are configured.',
  'Use submit_inquiry to send a project enquiry to the studio inbox.',
].join(' ');

export function registerComlabsMcp(server: McpServer) {
  server.registerTool(
    'studio_profile',
    {
      title: 'Studio profile',
      description: 'Return Human Made Logic studio identity, contact details and how to connect this MCP server.',
    },
    async () => text(studioSnapshot()),
  );

  server.registerTool(
    'list_capabilities',
    {
      title: 'List capabilities',
      description: 'List the studio disciplines offered by Human Made Logic.',
    },
    async () =>
      text(
        capabilities.items.map((item) => ({
          index: item.index,
          title: item.title,
          body: item.body,
        })),
      ),
  );

  server.registerTool(
    'list_work',
    {
      title: 'List selected work',
      description: 'List selected Human Made Logic projects, services and results.',
    },
    async () =>
      text(
        work.items.map((item) => ({
          client: item.client,
          summary: item.summary,
          services: item.services,
          result: item.result,
          year: item.year,
        })),
      ),
  );

  server.registerTool(
    'list_providers',
    {
      title: 'List model providers',
      description: 'Show which of Claude, GPT and Gemini are configured for the ask tool. Never returns API keys.',
    },
    async () => text(providerStatus()),
  );

  server.registerTool(
    'ask',
    {
      title: 'Ask a model',
      description:
        'Send a prompt to Claude, GPT or Gemini through this server. Only providers with an API key configured will succeed.',
      inputSchema: z.object({
        provider: z
          .enum(['claude', 'gpt', 'gemini'])
          .describe('Which model backend to call.'),
        prompt: z.string().min(1).describe('The user prompt.'),
        system: z.string().optional().describe('Optional system instruction.'),
      }),
    },
    async ({ provider, prompt, system }) => {
      if (!isModelProvider(provider)) {
        return errorText('Provider must be claude, gpt or gemini.');
      }
      try {
        const result = await askModel(provider, prompt, system);
        return text(result);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Model request failed.';
        return errorText(message);
      }
    },
  );

  server.registerTool(
    'submit_inquiry',
    {
      title: 'Submit an enquiry',
      description: `Send a project enquiry to ${agency.email}. Same intake as the public contact form.`,
      inputSchema: z.object({
        name: z.string().min(1),
        email: z.string().min(1),
        company: z.string().optional(),
        topic: z.string().optional(),
        message: z.string().min(1),
      }),
    },
    async ({ name, email, company, topic, message }) => {
      const fields = {
        name,
        email,
        company: company || '',
        topic: topic || contact.topics[0],
        message,
      };
      const errors = validateContact(fields);
      if (Object.keys(errors).length > 0) {
        return errorText(`Invalid enquiry: ${JSON.stringify(errors)}`);
      }

      let emailed = false;
      try {
        emailed = await sendInquiryEmail({ ...fields, source: 'mcp' });
      } catch {
        emailed = false;
      }

      const inquiry = await saveInquiry(fields, { emailed, source: 'mcp' });
      return text({
        ok: true,
        id: inquiry.id,
        emailed,
        to: agency.email,
      });
    },
  );

  server.registerTool(
    'list_inquiries',
    {
      title: 'List enquiries',
      description: 'List stored studio enquiries. Requires MCP_ADMIN_TOKEN or ADMIN_PASSWORD.',
      inputSchema: z.object({
        token: z.string().describe('Admin token.'),
      }),
    },
    async ({ token }) => {
      if (!mcpAdminAuthorized(token)) {
        return errorText('Unauthorised.');
      }
      const inquiries = await listInquiries();
      return text(
        inquiries.map((item) => ({
          id: item.id,
          createdAt: item.createdAt,
          name: item.name,
          email: item.email,
          company: item.company,
          topic: item.topic,
          message: item.message,
          emailed: item.emailed,
          read: item.read,
          source: item.source,
        })),
      );
    },
  );

  server.registerResource(
    'studio',
    'comlabs://studio',
    { title: 'Studio profile', mimeType: 'application/json' },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify(studioSnapshot(), null, 2) }],
    }),
  );

  server.registerResource(
    'capabilities',
    'comlabs://capabilities',
    { title: 'Capabilities', mimeType: 'application/json' },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify(capabilities.items, null, 2),
        },
      ],
    }),
  );

  server.registerResource(
    'work',
    'comlabs://work',
    { title: 'Selected work', mimeType: 'application/json' },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify(work.items, null, 2) }],
    }),
  );

  server.registerResource(
    'connect',
    'comlabs://connect',
    { title: 'Client connection guide', mimeType: 'application/json' },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify(connectGuide(), null, 2),
        },
      ],
    }),
  );
}
