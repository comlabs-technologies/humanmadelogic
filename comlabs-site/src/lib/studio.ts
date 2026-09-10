import { agency, capabilities, contact, process, work } from '@/config/agency';
import { providerStatus } from './models';

export function studioSnapshot() {
  return {
    name: agency.name,
    principle: agency.principle,
    email: agency.email,
    location: agency.location,
    availability: agency.availability,
    contactPath: '/contact',
    mcpPath: '/api/mcp',
    capabilities: capabilities.items.map((item) => ({
      index: item.index,
      title: item.title,
      body: item.body,
    })),
    process: process.steps,
    work: work.items.map((item) => ({
      client: item.client,
      summary: item.summary,
      services: item.services,
      result: item.result,
      year: item.year,
    })),
    inquiryTopics: contact.topics,
    providers: providerStatus(),
  };
}

export function connectGuide(origin = 'http://localhost:3000') {
  const url = `${origin.replace(/\/$/, '')}/api/mcp`;
  return {
    http: {
      cursor: {
        mcpServers: {
          comlabs: { url },
        },
      },
      claudeDesktop: {
        mcpServers: {
          comlabs: {
            command: 'npx',
            args: ['-y', 'mcp-remote', url],
          },
        },
      },
      chatgpt: url,
    },
    stdio: {
      command: 'npx',
      args: ['tsx', 'src/mcp/stdio.ts'],
    },
  };
}
