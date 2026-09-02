import{n as e}from"./parts.C-YLuC7Q.js";var t=`Empty`,n=34,r=62,i=30,a={polite:`Draft saved`,assertive:`Session expiring in 2 minutes`},o={polite:`Draft saved`,assertive:`Session expiring`},s={idle:`Nothing has fired yet`,polite:`Queued behind the sentence in progress`,assertive:`Cut in. The sentence is abandoned mid-word`},c={idle:`A screen reader is part way through a sentence. Fire an update into either region and watch where it lands in the speech.`,polite:`Polite waits. The sentence finishes, then the region is read, so the reader loses nothing but a second or two.`,assertive:`Assertive interrupts. Speech stops mid-word and the rest of that sentence is gone, with no way to ask for it back.`};function l(l){let u=e=>`
    <div class="sp-surface" data-part="region-${e}" data-state="empty" style="flex: 1 1 0; min-width: 0; padding: 7px 9px 8px">
      <span class="sp-label" style="display: inline-block; font-size: 10px; padding: 1px 5px; border: 1px solid var(--sp-line); border-radius: 5px">
        aria-live="${e}"
      </span>
      <p class="sp-text sp-text--ink" data-part="msg-${e}" data-state="empty"
         style="margin: 6px 0 0; height: 30px; font-size: 11.5px; color: var(--sp-muted)">${t}</p>
    </div>`;l.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label">Fire an update</span>
          <div class="sp-row" style="gap: 6px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="fire-polite"
                    style="font-size: 11.5px">Autosave</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="fire-assertive"
                    style="font-size: 11.5px">Session warning</button>
          </div>
        </div>

        <div class="sp-row" data-part="regions" data-subject data-level="idle"
             style="margin-top: 10px; gap: 10px; align-items: stretch">
          ${u(`polite`)}
          ${u(`assertive`)}
        </div>

        <div class="sp-surface sp-context" data-part="timeline" style="margin-top: 10px; padding: 8px 10px 6px">
          <div style="position: relative; height: 44px">
            <span style="position: absolute; left: 0; right: 0; top: 0; height: 20px; background: var(--sp-sunken); border-radius: 5px"></span>
            <span style="position: absolute; left: 0; right: 0; top: 24px; height: 20px; background: var(--sp-sunken); border-radius: 5px"></span>
            <span class="sp-label" style="position: absolute; left: 7px; top: 24px; height: 20px; display: flex; align-items: center; font-size: 9.5px">live region</span>
            <div data-part="speech"
                 style="position: absolute; left: 0; top: 0; height: 20px; width: ${r}%; display: flex; align-items: center;
                        padding: 0 7px; border-radius: 5px; background: var(--sp-context-accent-soft); color: var(--sp-ink);
                        font-size: 10px; white-space: nowrap; overflow: hidden; transition: width 0.24s var(--sp-ease)"
                 >Reading: “Quarterly report”</div>
            <div data-part="lost"
                 style="position: absolute; top: 0; height: 20px; left: ${n}%; width: 28%; display: flex;
                        align-items: center; justify-content: center; border-radius: 5px; border: 1px dashed var(--sp-muted);
                        color: var(--sp-muted); font-size: 9.5px; white-space: nowrap; overflow: hidden; visibility: hidden">never spoken</div>
            <div data-part="spoken"
                 style="position: absolute; top: 24px; height: 20px; left: ${r}%; width: ${i}%; display: flex;
                        align-items: center; padding: 0 7px; border-radius: 5px; background: var(--sp-accent);
                        color: var(--sp-accent-ink); font-size: 10px; white-space: nowrap; overflow: hidden;
                        visibility: hidden; transition: left 0.24s var(--sp-ease)">Draft saved</div>
            <span data-part="now" style="position: absolute; top: 0; bottom: 0; left: ${n}%; width: 2px; background: var(--sp-ink)"></span>
          </div>
          <div style="position: relative; height: 14px; margin-top: 2px">
            <span class="sp-label" style="position: absolute; left: ${n}%; font-size: 9.5px; white-space: nowrap; translate: -50% 0">update fires</span>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Speech</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-level="idle"
                style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">${s.idle}</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-level="idle"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${c.idle}</p>
      </div>
    </div>
  `;let d=e(l,`regions`),f=e(l,`speech`),p=e(l,`lost`),m=e(l,`spoken`),h=e(l,`readout`),g=e(l,`caption`),_=(n,r)=>{let i=e(l,`region-${n}`),o=e(l,`msg-${n}`);i.dataset.state=r?`spoken`:`empty`,o.dataset.state=r?`spoken`:`empty`,o.textContent=r?a[n]:t,o.style.color=r?`var(--sp-ink)`:`var(--sp-muted)`},v=e=>{d.dataset.level=e,_(`polite`,e===`polite`),_(`assertive`,e===`assertive`);let t=e===`assertive`;f.style.width=`${t?n:r}%`,p.style.visibility=t?`visible`:`hidden`,m.style.visibility=e===`idle`?`hidden`:`visible`,m.style.left=`${t?n:r}%`,m.textContent=e===`assertive`?o.assertive:o.polite,h.dataset.level=e,h.textContent=s[e],g.dataset.level=e,g.textContent=c[e]};v(`idle`),e(l,`fire-polite`).addEventListener(`click`,()=>v(`polite`)),e(l,`fire-assertive`).addEventListener(`click`,()=>v(`assertive`))}export{l as mount};