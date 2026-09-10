export const MODEL_PROVIDERS = ['claude', 'gpt', 'gemini'] as const;

export type ModelProvider = (typeof MODEL_PROVIDERS)[number];

type ProviderConfig = {
  id: ModelProvider;
  label: string;
  env: string;
  modelEnv: string;
  defaultModel: string;
};

export const providerCatalog: Record<ModelProvider, ProviderConfig> = {
  claude: {
    id: 'claude',
    label: 'Claude',
    env: 'ANTHROPIC_API_KEY',
    modelEnv: 'ANTHROPIC_MODEL',
    defaultModel: 'claude-sonnet-4-20250514',
  },
  gpt: {
    id: 'gpt',
    label: 'GPT',
    env: 'OPENAI_API_KEY',
    modelEnv: 'OPENAI_MODEL',
    defaultModel: 'gpt-4o',
  },
  gemini: {
    id: 'gemini',
    label: 'Gemini',
    env: 'GOOGLE_API_KEY',
    modelEnv: 'GEMINI_MODEL',
    defaultModel: 'gemini-2.0-flash',
  },
};

export function isModelProvider(value: string): value is ModelProvider {
  return MODEL_PROVIDERS.includes(value as ModelProvider);
}

export function providerConfigured(id: ModelProvider) {
  return Boolean(process.env[providerCatalog[id].env]);
}

export function providerStatus() {
  return MODEL_PROVIDERS.map((id) => {
    const config = providerCatalog[id];
    return {
      id,
      label: config.label,
      configured: providerConfigured(id),
      model: process.env[config.modelEnv] || config.defaultModel,
      env: config.env,
    };
  });
}

class ModelError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ModelError';
  }
}

async function readJson(response: Response) {
  const text = await response.text();
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { raw: text };
  }
}

async function askClaude(prompt: string, system?: string) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new ModelError('ANTHROPIC_API_KEY is not set.');

  const model = process.env.ANTHROPIC_MODEL || providerCatalog.claude.defaultModel;
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      system: system || undefined,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const body = await readJson(response);
  if (!response.ok) {
    throw new ModelError(`Claude request failed (${response.status}).`);
  }

  const content = body.content as { type: string; text?: string }[] | undefined;
  const text = content?.find((block) => block.type === 'text')?.text;
  if (!text) throw new ModelError('Claude returned an empty response.');
  return { provider: 'claude' as const, model, text };
}

async function askGpt(prompt: string, system?: string) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new ModelError('OPENAI_API_KEY is not set.');

  const model = process.env.OPENAI_MODEL || providerCatalog.gpt.defaultModel;
  const messages = [
    ...(system ? [{ role: 'system', content: system }] : []),
    { role: 'user', content: prompt },
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ model, messages }),
  });

  const body = await readJson(response);
  if (!response.ok) {
    throw new ModelError(`GPT request failed (${response.status}).`);
  }

  const choices = body.choices as { message?: { content?: string } }[] | undefined;
  const text = choices?.[0]?.message?.content;
  if (!text) throw new ModelError('GPT returned an empty response.');
  return { provider: 'gpt' as const, model, text };
}

async function askGemini(prompt: string, system?: string) {
  const key = process.env.GOOGLE_API_KEY;
  if (!key) throw new ModelError('GOOGLE_API_KEY is not set.');

  const model = process.env.GEMINI_MODEL || providerCatalog.gemini.defaultModel;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: system ? { parts: [{ text: system }] } : undefined,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    }),
  });

  const body = await readJson(response);
  if (!response.ok) {
    throw new ModelError(`Gemini request failed (${response.status}).`);
  }

  const candidates = body.candidates as
    | { content?: { parts?: { text?: string }[] } }[]
    | undefined;
  const text = candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('');
  if (!text) throw new ModelError('Gemini returned an empty response.');
  return { provider: 'gemini' as const, model, text };
}

export async function askModel(provider: ModelProvider, prompt: string, system?: string) {
  if (provider === 'claude') return askClaude(prompt, system);
  if (provider === 'gpt') return askGpt(prompt, system);
  return askGemini(prompt, system);
}
