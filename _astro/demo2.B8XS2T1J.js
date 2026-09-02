import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n={indigo:262,teal:190,clay:42},r=[{key:`bg`,label:`bg`,l:.97,c:.018},{key:`surface`,label:`surface`,l:.995,c:.006},{key:`sunken`,label:`sunken`,l:.93,c:.032},{key:`line`,label:`line`,l:.86,c:.05},{key:`muted`,label:`muted`,l:.58,c:.07},{key:`accent`,label:`accent`,l:.52,c:.16},{key:`ink`,label:`ink`,l:.27,c:.08}],i=`indigo`,a=(e,t,n)=>`oklch(${t} ${n} ${e})`;function o(o){let s=n[i]??262,c=r.map(e=>`
      <span class="sp-stack" data-part="ramp-${e.key}" style="flex: 1 1 0; gap: 4px; align-items: center">
        <span class="sp-swatch" style="width: 100%; height: 26px; box-shadow: inset 0 0 0 1px rgb(16 24 40 / 0.12);
                                       --sp-swatch: ${a(s,e.l,e.c)}"></span>
        <span class="sp-label" style="font-size: 10px">${e.label}</span>
      </span>`).join(``);o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${i}" data-axis="Hue">
            <button class="sp-segment" data-part="seg-indigo" value="indigo">262</button>
            <button class="sp-segment" data-part="seg-teal" value="teal">190</button>
            <button class="sp-segment" data-part="seg-clay" value="clay">42</button>
          </sp-segmented>
        </div>

        <div data-part="panel" data-subject data-hue="${i}"
             style="margin-top: 14px; padding: 12px; border-radius: var(--sp-radius);
                    border: 1px solid var(--mo-line); background: var(--mo-bg); color: var(--mo-ink)">
          <div style="display: flex; align-items: center; justify-content: space-between">
            <span style="font-size: 13px; font-weight: 600">Storage</span>
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px;
                         border-radius: 50%; background: var(--mo-sunken); color: var(--mo-muted)">${t(`inbox`)}</span>
          </div>

          <div style="margin-top: 10px; padding: 10px; border-radius: 6px;
                      border: 1px solid var(--mo-line); background: var(--mo-surface)">
            <div style="display: flex; align-items: baseline; justify-content: space-between">
              <span style="font-size: 12px">Project archive</span>
              <span style="font-size: 11px; color: var(--mo-muted)">61 of 80 GB</span>
            </div>
            <span style="display: block; height: 6px; margin-top: 8px; border-radius: 999px; background: var(--mo-sunken)">
              <span style="display: block; width: 76%; height: 100%; border-radius: inherit; background: var(--mo-accent)"></span>
            </span>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; margin-top: 10px">
            <span style="padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;
                         background: var(--mo-accent); color: var(--mo-surface)">Upgrade</span>
            <span style="padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;
                         border: 1px solid var(--mo-line); color: var(--mo-muted)">Manage</span>
          </div>
        </div>

        <div class="sp-row sp-context" data-part="ramp" style="gap: 4px; margin-top: 12px; align-items: flex-start">${c}</div>
      </div>
    </div>
  `;let l=e(o,`panel`),u=t=>{let i=n[t];if(i!==void 0){l.dataset.hue=t;for(let t of r){let n=a(i,t.l,t.c);l.style.setProperty(`--mo-${t.key}`,n),e(o,`ramp-${t.key}`).querySelector(`.sp-swatch`)?.style.setProperty(`--sp-swatch`,n)}}};u(i),e(o,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{o as mount};