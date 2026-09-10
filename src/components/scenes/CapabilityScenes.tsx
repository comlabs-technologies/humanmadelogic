import React from 'react';
import {
  ArrowRight,
  Check,
  CornerDownLeft,
  FileText,
  MessageSquare,
  Scale,
  Search,
} from 'lucide-react';
import { Avatar, FieldLabel, Panel, PanelFootnote, PanelHead, StatusPill } from '@/components/ui/Panel';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { images } from '@/config/images';
import type { CapabilityScene } from '@/config/content';

/* ------------------------------------------------------------------ frame */

type Field = 'paper' | 'sand' | 'moss' | 'rails';

function SceneFrame({ field, children }: { field: Field; children: React.ReactNode }) {
  const backgrounds: Record<Field, string> = {
    paper: 'bg-[#efece4]',
    sand: 'bg-[#ece5d8]',
    moss: 'bg-[#e6ebe7]',
    rails: 'bg-[#eeece5]',
  };

  const artwork =
    field === 'sand' ? images.intelligenceScene : field === 'rails' ? images.useCases : null;

  return (
    <div
      className={`relative editorial-grain overflow-hidden rounded-scene border border-line ${backgrounds[field]} min-h-[380px] sm:min-h-[420px] flex items-center justify-center p-5 sm:p-8`}
    >
      {artwork && (
        <EditorialImage
          asset={artwork}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
      )}
      {field === 'paper' && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to right, rgba(20,20,18,0.05) 0 1px, transparent 1px 88px)',
          }}
        />
      )}
      <div className="relative w-full max-w-[430px]">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------- workspace */

const workspaceRows: {
  item: string;
  owner: string;
  status: string;
  tone: 'neutral' | 'active' | 'review' | 'done';
}[] = [
  { item: 'Pricing model sign-off', owner: 'Amina Cole', status: 'In review', tone: 'review' },
  { item: 'Regional rollout order', owner: 'Priya Shah', status: 'In progress', tone: 'active' },
  { item: 'Data retention note', owner: 'Joel Park', status: 'Decided', tone: 'done' },
  { item: 'Support handover doc', owner: 'Mara Ellis', status: 'Not started', tone: 'neutral' },
];

function WorkspaceScene() {
  return (
    <SceneFrame field="paper">
      <Panel elevated>
        <PanelHead
          title="Northline migration"
          meta="11 regions · sprint 14"
          accessory={<StatusPill label="4 open" tone="neutral" />}
        />
        <ul className="divide-y divide-hairline">
          {workspaceRows.map((row) => (
            <li key={row.item} className="px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] tracking-tight text-ink truncate">{row.item}</p>
                <StatusPill label={row.status} tone={row.tone} />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Avatar name={row.owner} size={20} />
                <span className="text-[11px] tracking-tight text-subtle">{row.owner}</span>
              </div>
            </li>
          ))}
        </ul>
        <PanelFootnote>Three decisions recorded on this project this week.</PanelFootnote>
      </Panel>
    </SceneFrame>
  );
}

/* ---------------------------------------------------------------- context */

const contextResults = [
  {
    kind: 'Decision',
    Icon: Scale,
    title: 'Bill per workspace, not per seat',
    meta: 'Recorded 12 March · Amina Cole',
  },
  {
    kind: 'Thread',
    Icon: MessageSquare,
    title: 'Seat pricing punished the teams we want',
    meta: '18 replies · closed 9 March',
  },
  {
    kind: 'Document',
    Icon: FileText,
    title: 'Pricing model v3 — constraints',
    meta: 'Last edited 14 March',
  },
];

function ContextScene() {
  return (
    <SceneFrame field="moss">
      <Panel elevated>
        <div className="flex items-center gap-2.5 px-4 h-12 border-b border-hairline">
          <Search size={15} className="text-subtle shrink-0" aria-hidden="true" />
          <p className="text-[13px] tracking-tight text-ink truncate">
            why did we move off seat pricing?
          </p>
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-subtle">
            <CornerDownLeft size={11} aria-hidden="true" />
            enter
          </span>
        </div>
        <ul className="divide-y divide-hairline">
          {contextResults.map(({ kind, Icon, title, meta }) => (
            <li key={title} className="px-4 py-3 flex gap-3">
              <span className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-[7px] bg-canvas border border-line shrink-0">
                <Icon size={13} className="text-muted" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <FieldLabel>{kind}</FieldLabel>
                <p className="text-[13px] tracking-tight text-ink mt-1">{title}</p>
                <p className="text-[11px] tracking-tight text-subtle mt-0.5">{meta}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="px-4 py-3 border-t border-hairline flex items-center justify-between gap-3">
          <span className="text-[11px] tracking-tight text-subtle">3 results, oldest first</span>
          <span className="inline-flex items-center gap-1.5 h-8 px-3 rounded-control border border-line bg-canvas text-[12px] font-medium tracking-tight text-ink">
            Bring into brief
            <ArrowRight size={12} aria-hidden="true" />
          </span>
        </div>
      </Panel>
    </SceneFrame>
  );
}

/* ------------------------------------------------------------ automations */

const runSteps = [
  { name: 'Collect regional updates', state: 'done' as const, meta: 'Completed 08:02' },
  { name: 'Draft weekly rollup', state: 'done' as const, meta: 'Completed 08:04' },
  { name: 'Operations review', state: 'review' as const, meta: 'Waiting on Amina Cole' },
  { name: 'Publish to workspace', state: 'queued' as const, meta: 'Queued' },
];

function AutomationsScene() {
  return (
    <SceneFrame field="rails">
      <Panel elevated>
        <PanelHead
          title="Weekly rollup"
          meta="Run 418 · triggered Monday 08:00"
          accessory={<StatusPill label="Paused" tone="review" />}
        />
        <ol className="px-4 py-4">
          {runSteps.map((step, index) => (
            <li key={step.name} className="relative flex gap-3 pb-5 last:pb-0">
              {index < runSteps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[10px] top-6 bottom-0 w-px bg-line"
                />
              )}
              <span
                aria-hidden="true"
                className={`relative z-10 mt-0.5 flex items-center justify-center w-5 h-5 rounded-full border shrink-0 ${
                  step.state === 'done'
                    ? 'bg-signal border-signal text-white'
                    : step.state === 'review'
                      ? 'bg-white border-amber'
                      : 'bg-white border-line'
                }`}
              >
                {step.state === 'done' && <Check size={11} strokeWidth={3} />}
                {step.state === 'review' && <span className="w-1.5 h-1.5 rounded-full bg-amber" />}
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-[13px] tracking-tight ${
                    step.state === 'queued' ? 'text-subtle' : 'text-ink'
                  }`}
                >
                  {step.name}
                </p>
                <p className="text-[11px] tracking-tight text-subtle mt-0.5">{step.meta}</p>
                {step.state === 'review' && (
                  <div className="flex items-center gap-2 mt-2.5">
                    <span className="inline-flex items-center h-8 px-3 rounded-control bg-ink text-white text-[12px] font-medium tracking-tight">
                      Approve
                    </span>
                    <span className="inline-flex items-center h-8 px-3 rounded-control border border-line bg-white text-[12px] font-medium tracking-tight text-ink">
                      Request change
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
        <PanelFootnote>Every run records who approved each review point.</PanelFootnote>
      </Panel>
    </SceneFrame>
  );
}

/* ----------------------------------------------------------- intelligence */

function IntelligenceScene() {
  return (
    <SceneFrame field="sand">
      <Panel elevated>
        <PanelHead title="Pricing review — recap" meta="Thursday · 41 minutes · 6 attendees" />
        <div className="px-4 py-4">
          <FieldLabel>What was settled</FieldLabel>
          <ul className="mt-2.5 space-y-2">
            {[
              'Workspace pricing replaces per-seat from the March release.',
              'Studio keeps custom retention; Team moves to two years.',
              'Migration messaging goes to existing customers first.',
            ].map((line) => (
              <li key={line} className="flex gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-[7px] w-1 h-1 rounded-full bg-subtle shrink-0"
                />
                <span className="text-[13px] tracking-tight text-ink">{line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-panel border border-line bg-raised p-3.5">
            <FieldLabel>Proposed next step</FieldLabel>
            <p className="text-[13px] tracking-tight text-ink mt-1.5">
              Draft the rollout brief for existing customers
            </p>
            <div className="flex items-center gap-2 mt-2.5">
              <Avatar name="Priya Shah" size={20} />
              <span className="text-[11px] tracking-tight text-subtle">Priya Shah · due 20 March</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="inline-flex items-center h-8 px-3 rounded-control bg-ink text-white text-[12px] font-medium tracking-tight">
                Save to workspace
              </span>
              <span className="inline-flex items-center h-8 px-3 rounded-control border border-line bg-white text-[12px] font-medium tracking-tight text-ink">
                Dismiss
              </span>
            </div>
          </div>
        </div>
        <PanelFootnote>Drawn from the recording, two threads and the pricing doc.</PanelFootnote>
      </Panel>
    </SceneFrame>
  );
}

/* ---------------------------------------------------------------- export */

const sceneMap: Record<CapabilityScene, () => JSX.Element> = {
  workspace: WorkspaceScene,
  context: ContextScene,
  automations: AutomationsScene,
  intelligence: IntelligenceScene,
};

export function CapabilitySceneView({ scene }: { scene: CapabilityScene }) {
  const Scene = sceneMap[scene];
  return <Scene />;
}
