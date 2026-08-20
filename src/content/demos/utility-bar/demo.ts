import type { IconName } from '#src/kit/icons.ts';
import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const VIEW = { w: 476, h: 288 };
const BAR_H = 32;
const TOOL_W = 104;
const PANEL_W = 208;
const PANEL_H = 152;

interface Tool {
  key: string;
  name: string;
  glyph: IconName;
  body: string;
}

const TOOLS: Tool[] = [
  { key: 'notes', name: 'Notes', glyph: 'pencil', body: 'Called back about the renewal. Wants the EU region before signing.' },
  { key: 'history', name: 'History', glyph: 'inbox', body: 'Opened Acme Ltd, then the renewal quote, then this contact.' },
  { key: 'reminders', name: 'Reminders', glyph: 'bell', body: 'Send the revised quote on Thursday, before the pricing review.' },
];

/**
 * Utility bar specimen: a CRM record with three tools docked along the bottom edge. Pressing one
 * opens its panel upward over the page, pressing another switches to that panel, and the close
 * control puts the bar back on its own. The record behind never moves, which is the reason the
 * component exists rather than sending someone to another screen.
 *
 * The subject is the bar, not the panel it opens: the term names the persistent strip, and the
 * panels are what the strip's tools produce. The record, its header and the panels themselves are
 * scenery in the context register. The bar is honestly a utility bar with every tool shut and with
 * any one open, so no `data-pose` condition is needed.
 *
 * A tool button names an absolute state (open this tool) rather than flipping one, so a pass
 * resumed anywhere lands the same way, and dismissal is the panel's own close control (SPEC §8).
 * The panels are out of flow and their left edges are stated rather than measured, so opening one
 * moves nothing behind it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const button = (tool: Tool) => `
    <button
      class="sp-button sp-button--quiet sp-button--sm"
      type="button"
      data-part="tool-${tool.key}"
      style="display: inline-flex; align-items: center; gap: 7px; flex: 0 0 auto; width: ${TOOL_W}px; height: ${BAR_H - 8}px;
             padding: 0 10px; border-radius: 6px; font-size: 12px; white-space: nowrap; text-align: left"
    >${icon(tool.glyph)}<span>${tool.name}</span></button>
  `;

  const panel = (tool: Tool, index: number) => `
    <div
      class="sp-surface sp-context"
      data-part="panel-${tool.key}"
      role="dialog"
      aria-label="${tool.name}"
      style="position: absolute; left: ${8 + index * (TOOL_W + 4)}px; bottom: ${BAR_H}px; width: ${PANEL_W}px; height: ${PANEL_H}px;
             display: flex; flex-direction: column; border-radius: 8px 8px 0 0; border-bottom: 0; box-shadow: var(--sp-shadow);
             transform: translateY(8px); opacity: 0; visibility: hidden;
             transition: transform 0.22s var(--sp-ease), opacity 0.22s, visibility 0.22s"
    >
      <div class="sp-row" style="flex: 0 0 auto; padding: 5px 6px 5px 10px; border-bottom: 1px solid var(--sp-line)">
        <span class="sp-heading sp-grow" style="font-size: 12px">${tool.name}</span>
        <button class="sp-icon-button" type="button" data-part="close-${tool.key}" aria-label="Close ${tool.name}" style="width: 22px; height: 22px">${icon('close')}</button>
      </div>
      <div class="sp-stack sp-grow" style="gap: 8px; padding: 10px">
        <span class="sp-text" style="font-size: 12px">${tool.body}</span>
        <div class="sp-line" style="width: 76%"></div>
        <div class="sp-line" style="width: 58%"></div>
      </div>
    </div>
  `;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: ${VIEW.w}px; height: ${VIEW.h}px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Acme Ltd</span>
          <span class="sp-label" style="font-size: 11px">Renewal quote</span>
        </div>

        <div class="sp-body sp-context" data-part="page" style="padding: 12px; padding-bottom: ${BAR_H + 12}px">
          <div class="sp-surface" style="padding: 10px 12px">
            <div class="sp-row sp-row--between" style="margin-bottom: 8px">
              <span class="sp-heading" style="font-size: 12px">Quote 4471</span>
              <span class="sp-label" style="font-size: 11px">Draft</span>
            </div>
            <div class="sp-stack" style="gap: 8px">
              <div class="sp-line" style="width: 100%"></div>
              <div class="sp-line" style="width: 88%"></div>
              <div class="sp-line" style="width: 94%"></div>
              <div class="sp-line" style="width: 62%"></div>
            </div>
          </div>
        </div>

        ${TOOLS.map(panel).join('')}

        <div
          data-part="bar"
          data-subject
          style="position: absolute; left: 0; right: 0; bottom: 0; display: flex; align-items: center; gap: 4px; height: ${BAR_H}px;
                 padding: 0 8px; background: var(--sp-surface); border-top: 1px solid var(--sp-line); z-index: 2"
        >
          ${TOOLS.map(button).join('')}
        </div>
      </div>
    </div>
  `;

  let open: string | undefined;

  const show = (next: string | undefined) => {
    open = next;
    for (const tool of TOOLS) {
      const on = tool.key === open;
      const surface = part(root, `panel-${tool.key}`);
      flag(surface, 'data-open', on);
      surface.style.transform = on ? 'translateY(0)' : 'translateY(8px)';
      surface.style.opacity = on ? '1' : '0';
      surface.style.visibility = on ? 'visible' : 'hidden';
      flag(part(root, `tool-${tool.key}`), 'data-open', on);
    }
  };

  for (const tool of TOOLS) {
    // Naming the tool, not flipping it: pressing an open tool leaves it open.
    part(root, `tool-${tool.key}`).addEventListener('click', () => show(tool.key));
    part(root, `close-${tool.key}`).addEventListener('click', () => show(undefined));
  }
}
