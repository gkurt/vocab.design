import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`ui-monospace, 'SF Mono', Menlo, Consolas, monospace`,n=`Copied to clipboard`,r={notify:`One call, no element. The message is handed to the platform, so pressing again speaks again: there is no text to be unchanged.`,region:`The node has to exist before the message does, and the message is text written into it. Press twice and the second write changes nothing, so nothing is spoken.`};function i(i){let a=(e,n=``)=>`<span style="display: block; font-family: ${t}; font-size: 10.5px; line-height: 15px; white-space: nowrap; ${n}">${e}</span>`,o=e=>`
    <p class="sp-text sp-text--ink" data-part="line-${e}" data-kind="none"
       style="margin: 0; height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap;
              opacity: 0; transition: opacity 0.18s ease"></p>`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="notify" data-axis="Method" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-notify" value="notify"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">ariaNotify</button>
            <button class="sp-segment" type="button" data-part="seg-region" value="region"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Live region</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="dom" data-mode="notify" style="margin-top: 9px; padding: 8px 10px">
          <span class="sp-label sp-context" style="font-size: 10px">Page markup</span>
          <div style="position: relative; height: 45px; margin-top: 3px">
            <div data-part="view-notify" style="position: absolute; inset: 0; transition: opacity 0.18s ease">
              <span data-part="call" data-fired="no"
                    style="display: block; padding-left: 7px; border-left: 2px solid var(--sp-line);
                           transition: border-color 0.18s ease">
                ${a(`document.body.ariaNotify({`,`color: var(--sp-muted)`)}
                ${a(`&nbsp;&nbsp;message: "${n}"`,`color: var(--sp-ink)`)}
                ${a(`})`,`color: var(--sp-muted)`)}
              </span>
            </div>
            <div data-part="view-region" class="sp-context"
                 style="position: absolute; inset: 0; opacity: 0; transition: opacity 0.18s ease">
              <span data-part="node" data-text="no" style="display: block; padding-left: 7px; border-left: 2px solid var(--sp-line)">
                ${a(`&lt;div role="status" aria-live="polite"&gt;`,`color: var(--sp-muted)`)}
                ${a(`<span data-part="node-text" style="opacity: 0; transition: opacity 0.18s ease">&nbsp;&nbsp;${n}</span>`,`color: var(--sp-ink); min-height: 15px`)}
                ${a(`&lt;/div&gt;`,`color: var(--sp-muted)`)}
              </span>
            </div>
          </div>
        </div>

        <div class="sp-row" style="margin-top: 9px; gap: 10px">
          <button class="sp-button sp-button--sm" type="button" data-part="copy"
                  style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">Copy link</button>
          <span class="sp-label sp-context" data-part="calls"
                style="flex: 1 1 auto; min-width: 0; font-size: 10px; white-space: nowrap">Pressed 0 times</span>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 9px; padding: 8px 10px">
          <span class="sp-label" style="font-size: 10px">Screen reader</span>
          <div class="sp-stack" style="gap: 0; margin-top: 3px; height: 30px">
            ${o(1)}${o(2)}
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="notify"
           style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${r.notify}</p>
      </div>
    </div>
  `;let s=e(i,`dom`),c={notify:e(i,`view-notify`),region:e(i,`view-region`)},l=e(i,`call`),u=e(i,`node`),d=e(i,`node-text`),f=e(i,`calls`),p=e(i,`caption`),m=[e(i,`line-1`),e(i,`line-2`)];m[0]?.setAttribute(`data-subject`,``),m[0]?.setAttribute(`data-pose`,`[data-mode=notify]`);let h=`notify`,g=0,_=(e,t,n)=>{let r=m[e];r&&(r.dataset.kind=t,r.dataset.mode=h,r.textContent=n,r.style.opacity=`1`,r.style.color=t===`silent`?`var(--sp-muted)`:``)},v=e=>{h=e,g=0,s.dataset.mode=e,c.notify.style.opacity=e===`notify`?`1`:`0`,c.region.style.opacity=e===`region`?`1`:`0`,l.dataset.fired=`no`,l.style.borderColor=`var(--sp-line)`,u.dataset.text=`no`,d.style.opacity=`0`,f.textContent=`Pressed 0 times`;for(let t of m)t.dataset.kind=`none`,t.dataset.mode=e,t.textContent=``,t.style.opacity=`0`;p.dataset.mode=e,p.textContent=r[e]};e(i,`copy`).addEventListener(`click`,()=>{if(g+=1,f.textContent=`Pressed ${g} time${g===1?``:`s`}`,h===`notify`){l.dataset.fired=`yes`,l.style.borderColor=`var(--sp-accent)`,_(g-1,`spoken`,`“${n}”`);return}u.dataset.text=`yes`,d.style.opacity=`1`,g===1?_(0,`spoken`,`“${n}”`):g===2&&_(1,`silent`,`Silence. The text was already this, so nothing changed.`)}),e(i,`mode`).addEventListener(`change`,e=>{v(e.detail)}),v(`notify`)}export{i as mount};