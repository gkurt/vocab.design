import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[600,1400,2200],r=300,i=[{initial:`K`,name:`Kellerman & Co`,amount:`£12,400`},{initial:`N`,name:`Northbank Ltd`,amount:`£8,150`},{initial:`O`,name:`Orrell Trading`,amount:`£3,900`}],a={declared:`Busy is set before the first write and cleared after the last, so the whole load is one edit and the reader speaks once.`,omitted:`No flag, so every insertion is announced. The reader is still on the first row when the second lands, and a listener gets fragments.`};function o(o,s){let c=(e,t,n,r)=>`
    <div class="sp-row" data-part="row-${e}" style="height: 22px; gap: 8px; opacity: 0;
                                                        transition: opacity 0.2s ease">
      <span class="sp-avatar" style="width: 18px; height: 18px; font-size: 9px">${t}</span>
      <span class="sp-text sp-text--ink sp-grow" style="font-size: 11.5px">${n}</span>
      <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">${r}</span>
    </div>`,l=e=>`
    <p class="sp-text sp-text--ink" data-part="log-${e}"
       style="margin: 0; height: 15px; font-size: 11px; line-height: 15px; opacity: 0;
              transition: opacity 0.18s ease"></p>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="aria-busy" data-term="declared" data-part="mode" data-value="declared" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-declared" value="declared"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Declared</button>
            <button class="sp-segment" type="button" data-part="seg-omitted" value="omitted"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Omitted</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="region" data-subject data-mode="declared" data-pose="[data-mode=declared]"
             role="status" aria-live="polite" aria-busy="true" style="margin-top: 10px; padding: 8px 10px">
          <div class="sp-row sp-row--between sp-context" style="gap: 10px; height: 16px">
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Payers matching “kellerman”</span>
            <span class="sp-label" data-part="count"
                  style="flex: 0 0 auto; width: 92px; text-align: right; font-size: 10px">loading</span>
          </div>
          <div class="sp-stack" style="gap: 0; margin-top: 5px; height: 66px">
            ${i.map((e,t)=>c(t+1,e.initial,e.name,e.amount)).join(``)}
          </div>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 8px 10px">
          <div class="sp-stack" style="gap: 0; height: 45px">
            ${l(1)}${l(2)}${l(3)}
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="declared"
           style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${a.declared}</p>
      </div>
    </div>
  `;let u=e(o,`region`),d=e(o,`count`),f=e(o,`caption`),p=i.map((t,n)=>e(o,`row-${n+1}`)),m=[1,2,3].map(t=>e(o,`log-${t}`)),h=[],g=(e,t)=>{e.textContent=t,e.style.opacity=`1`,e.removeAttribute(`data-cut`)},_=e=>{for(let e of h)s.clearTimeout(e);h=[],u.dataset.mode=e,t(u,`data-loading`,!0),e===`declared`?u.setAttribute(`aria-busy`,`true`):u.removeAttribute(`aria-busy`),d.textContent=`loading`;for(let e of p)e.style.opacity=`0`;for(let e of m)e.textContent=``,e.style.opacity=`0`,e.removeAttribute(`data-cut`),e.style.textDecoration=`none`;f.dataset.mode=e,f.textContent=a[e],i.forEach((t,r)=>{let i=n[r]??0;h.push(s.setTimeout(()=>{let n=p[r];if(n&&(n.style.opacity=`1`),d.textContent=`${r+1} of 3`,e===`declared`)return;let i=m[r-1];i&&(i.setAttribute(`data-cut`,``),i.style.textDecoration=`line-through`);let a=m[r];a&&g(a,`“${t.name}”`)},i))}),h.push(s.setTimeout(()=>{if(t(u,`data-loading`,!1),d.textContent=`3 payers`,e===`declared`){u.setAttribute(`aria-busy`,`false`);let e=m[0];e&&g(e,`“3 payers matching kellerman, list”`)}},(n[n.length-1]??0)+r))};e(o,`mode`).addEventListener(`change`,e=>{_(e.detail)}),_(`declared`)}export{o as mount};