import type { Metadata } from 'next';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { McpView } from '@/components/hml/McpView';
import { agency, mcp } from '@/config/agency';

export const metadata: Metadata = {
  title: { absolute: `MCP — ${agency.name}` },
  description: mcp.body,
  alternates: { canonical: '/mcp' },
};

export default function McpPage() {
  return (
    <HmlPageShell>
      <McpView />
    </HmlPageShell>
  );
}
