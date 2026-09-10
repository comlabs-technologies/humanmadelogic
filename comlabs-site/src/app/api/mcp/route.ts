import { createMcpHandler } from 'mcp-handler';
import { mcpInstructions, mcpServerInfo, registerComlabsMcp } from '@/lib/mcp/register';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const handler = createMcpHandler(
  (server) => {
    registerComlabsMcp(server);
  },
  {
    serverInfo: mcpServerInfo,
    instructions: mcpInstructions,
  },
);

export { handler as GET, handler as POST };
