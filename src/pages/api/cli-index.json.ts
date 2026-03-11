import fs from 'node:fs';
import path from 'node:path';
import { getCollection } from 'astro:content';

export async function GET() {
  const tools = await getCollection('cli');
  const cliDir = path.join(process.cwd(), 'src', 'content', 'cli');

  const entries = tools.map(tool => {
    const cliJsonPath = path.join(cliDir, tool.data.slug, 'cli.json');
    const cliData = JSON.parse(fs.readFileSync(cliJsonPath, 'utf-8'));
    return {
      name: cliData.name,
      description: cliData.description,
      category: cliData.category,
      slug: tool.data.slug,
      url: `/cli/${tool.data.slug}`,
      github: cliData.github,
      install: cliData.install,
      agent_metadata: cliData.agent_metadata,
    };
  });

  return new Response(JSON.stringify(entries, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
}
