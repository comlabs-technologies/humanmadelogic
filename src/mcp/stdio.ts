import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import { mcpInstructions, mcpServerInfo, registerComlabsMcp } from '../lib/mcp/register';

serveStdio(() => {
  const server = new McpServer(mcpServerInfo, {
    instructions: mcpInstructions,
    capabilities: { tools: {}, resources: {} },
  });
  registerComlabsMcp(server);
  return server;
});
