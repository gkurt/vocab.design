import type { Step } from '#src/stage/choreography.ts';
import type { DemoModule } from '#src/stage/demo.ts';

const demos = import.meta.glob<DemoModule>('../content/demos/*/demo.ts');
const choreographies = import.meta.glob<{ default: Step[] }>('../content/demos/*/choreography.ts');

export function loadDemo(slug: string): Promise<DemoModule> | undefined {
  return demos[`../content/demos/${slug}/demo.ts`]?.();
}

export function loadChoreography(slug: string): Promise<{ default: Step[] }> | undefined {
  return choreographies[`../content/demos/${slug}/choreography.ts`]?.();
}
