import { part } from '#src/kit/parts.ts';

/**
 * Glassmorphism specimen: a translucent panel that blurs and tints whatever it
 * is over, held apart from the backdrop by a hairline edge and a soft shadow.
 * The panel can be dragged, because the effect only proves itself in motion.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="padding: 0">
      <div class="sp-context" data-part="backdrop" aria-hidden="true"
           style="position: absolute; inset: 0; background: linear-gradient(125deg, #4b6ef5, #b154c8 52%, #f2913d)">
        <span style="position: absolute; left: 8%; top: 14%; width: 150px; height: 150px; border-radius: 50%; background: #ffd166; filter: blur(6px); opacity: 0.75"></span>
        <span style="position: absolute; right: 12%; bottom: 10%; width: 120px; height: 120px; border-radius: 50%; background: #22d3ee; filter: blur(4px); opacity: 0.7"></span>
        <span data-part="caption" style="position: absolute; left: 7%; bottom: 22%; color: #fff; font-size: 22px; font-weight: 600; letter-spacing: -0.01em">
          drag the panel over me
        </span>
      </div>
      <div class="sp-glass" data-part="panel" data-subject
           style="position: absolute; left: 58%; top: 22%; width: 190px; padding: 14px; cursor: grab; touch-action: none">
        <div style="font-weight: 600">Now playing</div>
        <div style="font-size: 12px; opacity: 0.85; margin-top: 2px">Blur, tint, hairline edge</div>
        <div style="height: 4px; border-radius: 2px; background: rgb(255 255 255 / 0.35); margin-top: 12px">
          <div style="width: 42%; height: 100%; border-radius: 2px; background: #fff"></div>
        </div>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const scene = root.firstElementChild as HTMLElement;
  let origin: { x: number; y: number; left: number; top: number } | undefined;

  panel.addEventListener('pointerdown', (event) => {
    // Captured, or a reader dragging past the edge loses the stroke; a synthetic pointer has none to capture.
    if (event.isTrusted) panel.setPointerCapture(event.pointerId);
    const rect = panel.getBoundingClientRect();
    const bounds = scene.getBoundingClientRect();
    origin = { x: event.clientX, y: event.clientY, left: rect.left - bounds.left, top: rect.top - bounds.top };
    panel.style.cursor = 'grabbing';
  });

  root.addEventListener('pointermove', (event) => {
    if (!origin) return;
    const bounds = scene.getBoundingClientRect();
    const left = Math.min(Math.max(origin.left + event.clientX - origin.x, 0), bounds.width - panel.offsetWidth);
    const top = Math.min(Math.max(origin.top + event.clientY - origin.y, 0), bounds.height - panel.offsetHeight);
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
  });

  const release = () => {
    origin = undefined;
    panel.style.cursor = 'grab';
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);
}
