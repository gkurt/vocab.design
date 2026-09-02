import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=1150,n={light:{surface:`#FFFFFF`,ink:`#14171C`,muted:`#6B7280`,line:`#E5E7EB`,accent:`#3557E8`,accentInk:`#FFFFFF`},dark:{surface:`#151821`,ink:`#E9EBEF`,muted:`#8E95A2`,line:`#2A2F3A`,accent:`#7290FF`,accentInk:`#10131C`}},r={flash:`First paint uses the default light theme. The stored preference has not been read yet.`,settled:`The script ran after paint and applied dark. The reader already saw the light frame.`,fixed:`A blocking inline script in the head set the theme before the first paint. No frame was wrong.`};function i(i,a){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Stored preference: Dark</span>
          <div class="sp-row" style="gap: 8px">
            <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="flash" data-axis="First paint" data-term="flash">
              <button class="sp-segment" data-part="seg-flash" value="flash">Flash</button>
              <button class="sp-segment" data-part="seg-fixed" value="fixed">Fixed</button>
            </sp-segmented>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="replay" type="button">Replay load</button>
          </div>
        </div>

        <div class="sp-context" data-part="browser"
             style="margin-top: 10px; height: 152px; border-radius: 10px; overflow: hidden; border: 1px solid var(--sp-line);
                    background: var(--sp-sunken)">
          <div class="sp-row" style="height: 26px; gap: 6px; padding: 0 10px; border-bottom: 1px solid var(--sp-line)">
            <span style="flex: 0 0 8px; height: 8px; border-radius: 50%; background: var(--sp-line)"></span>
            <span style="flex: 0 0 8px; height: 8px; border-radius: 50%; background: var(--sp-line)"></span>
            <span style="flex: 0 0 8px; height: 8px; border-radius: 50%; background: var(--sp-line)"></span>
            <span class="sp-grow" style="height: 12px; margin-left: 6px; border-radius: 6px; background: var(--sp-line)"></span>
          </div>

          <div data-part="page" data-subject data-mode="flash" data-phase="flash" data-pose="[data-phase=flash]"
               style="height: 125px; padding: 13px 15px; background: #FFFFFF">
            <div data-part="page-title" style="font-size: 15px; font-weight: 600; color: #14171C">Reading list</div>
            <div data-part="page-line-a" style="height: 8px; margin-top: 11px; width: 84%; border-radius: 4px; background: #E5E7EB"></div>
            <div data-part="page-line-b" style="height: 8px; margin-top: 7px; width: 68%; border-radius: 4px; background: #E5E7EB"></div>
            <div class="sp-row" style="gap: 8px; margin-top: 13px">
              <span data-part="page-cta" style="font-size: 11.5px; font-weight: 600; padding: 6px 12px; border-radius: 6px;
                    background: #3557E8; color: #FFFFFF">Continue</span>
              <span data-part="page-meta" style="font-size: 11.5px; color: #6B7280">Saved 4 minutes ago</span>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="status"
           style="margin: 8px 0 0; height: 30px; font-size: 10.5px; line-height: 1.4">${r.flash}</p>
      </div>
    </div>
  `;let o=e(i,`page`),s=e(i,`page-title`),c=e(i,`page-line-a`),l=e(i,`page-line-b`),u=e(i,`page-cta`),d=e(i,`page-meta`),f=e(i,`status`),p=`flash`,m,h=e=>{let t=e===`flash`?n.light:n.dark;o.dataset.phase=e,o.style.background=t.surface,s.style.color=t.ink,c.style.background=t.line,l.style.background=t.line,u.style.background=t.accent,u.style.color=t.accentInk,d.style.color=t.muted,f.textContent=p===`fixed`?r.fixed:r[e]},g=()=>{if(a.clearTimeout(m),o.dataset.mode=p,p===`fixed`){h(`settled`);return}h(`flash`),m=a.setTimeout(()=>h(`settled`),t)};g(),e(i,`segmented`).addEventListener(`change`,e=>{p=e.detail===`fixed`?`fixed`:`flash`,g()}),e(i,`replay`).addEventListener(`click`,g)}export{i as mount};