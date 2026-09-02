import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={page:`#121417`,card:`#1E2126`,dialog:`#2A2E35`,line:`rgb(255 255 255 / 0.10)`,ink:`#E8EAEF`,muted:`#9AA3B2`},n={page:`#000000`,card:`#0D0D0D`,dialog:`#1A1A1A`,line:`rgb(255 255 255 / 0.14)`,ink:`#FFFFFF`,muted:`#8A8A8A`},r=`0 6px 14px rgb(0 0 0 / 0.55)`,i=[{key:`surfaces`,label:`Surfaces`},{key:`text`,label:`Text`}],a=`surfaces`,o={surfaces:`Both stacks raise a card the same way. On pure black the shadow has nothing to darken, so only the white film separates them.`,text:`Pure white on pure black is the most contrast a screen can make, and the likeliest to bloom. Near black keeps text off white.`};function s(s){let c=(e,t,n,i)=>`
    <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 5px">
      <div data-part="${e}" ${i?`data-subject data-view="${a}"`:`data-view="${a}"`}
           style="position: relative; height: 136px; border-radius: var(--sp-radius);
                  border: 1px solid ${t.line}; background: ${t.page}; overflow: hidden">

        <div data-part="${e}-surfaces" style="position: absolute; inset: 0; padding: 9px">
          <span style="font-size: 10px; color: ${t.muted}">Page</span>
          <div style="margin-top: 7px; padding: 8px; border-radius: 6px; background: ${t.card};
                      border: 1px solid ${t.line}; box-shadow: ${r}">
            <span style="font-size: 10px; color: ${t.muted}">Card</span>
            <div style="margin-top: 7px; padding: 8px 9px; border-radius: 6px; background: ${t.dialog};
                        border: 1px solid ${t.line}; box-shadow: ${r}">
              <span style="font-size: 11px; font-weight: 500; color: ${t.ink}">Dialog</span>
            </div>
          </div>
        </div>

        <div data-part="${e}-text" hidden style="position: absolute; inset: 0; padding: 11px 12px">
          <span style="display: block; font-size: 13px; font-weight: 600; color: ${t.ink}">Overnight sync</span>
          <p style="margin: 7px 0 0; font-size: 11.5px; line-height: 1.5; color: ${t.ink}">Nine files were
            copied and one was skipped because it changed while the transfer was running.</p>
          <p style="margin: 6px 0 0; font-size: 11px; color: ${t.muted}">Finished 04:12</p>
        </div>
      </div>
      <span class="sp-label" style="font-size: 10px">${n}</span>
    </div>`;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 448px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="View" data-value="${a}">
            ${i.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <div class="sp-context" style="display: flex; flex: 1 1 0; min-width: 0">
            ${c(`near`,t,`Dark, #121417`,!1)}
          </div>
          ${c(`black`,n,`True black, #000000`,!0)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note"
           style="margin: 10px 0 0; height: 32px; font-size: 11px; line-height: 1.4">${o[a]}</p>
      </div>
    </div>
  `;let l=e(s,`near`),u=e(s,`black`),d=e(s,`note`),f=t=>{if(i.some(e=>e.key===t)){l.dataset.view=t,u.dataset.view=t;for(let n of[`near`,`black`])for(let r of i)e(s,`${n}-${r.key}`).hidden=r.key!==t;d.textContent=o[t]??``}};f(a),e(s,`segmented`).addEventListener(`change`,e=>f(e.detail))}export{s as mount};