import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=[{key:`bg`,label:`bg`,l:.965,c:1},{key:`surface`,label:`surface`,l:.995,c:.4},{key:`sunken`,label:`sunken`,l:.925,c:1.3},{key:`line`,label:`line`,l:.86,c:1.5},{key:`muted`,label:`muted`,l:.575,c:1.7},{key:`ink`,label:`ink`,l:.27,c:1.6}],r={cool:{hue:262,unit:.009},warm:{hue:68,unit:.009},pure:{hue:0,unit:0}},i={cool:`A trace of blue in every grey, under 0.02 chroma.`,warm:`The same ladder tilted warm: paper rather than screen.`,pure:`Chroma at zero. The greys go inert beside the accent.`},a=`#3557E8`,o=`cool`,s=(e,t,n)=>`oklch(${t} ${(n*e.unit).toFixed(4)} ${e.hue})`;function c(c){let l=n.map(e=>`
      <span class="sp-stack" data-part="ramp-${e.key}" style="flex: 1 1 0; gap: 4px; align-items: center">
        <span class="sp-swatch" style="width: 100%; height: 14px; box-shadow: inset 0 0 0 1px rgb(16 24 40 / 0.12)"></span>
        <span class="sp-label" style="font-size: 9px">${e.label}</span>
      </span>`).join(``);c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${o}" data-axis="Neutrals">
            <button class="sp-segment" data-part="seg-cool" value="cool">Cool</button>
            <button class="sp-segment" data-part="seg-warm" value="warm">Warm</button>
            <button class="sp-segment" data-part="seg-pure" value="pure">Pure</button>
          </sp-segmented>
        </div>

        <div data-part="panel" data-subject data-tint="${o}"
             style="margin-top: 10px; padding: 10px; border-radius: var(--sp-radius);
                    border: 1px solid var(--n-line); background: var(--n-bg); color: var(--n-ink)">
          <div style="display: flex; align-items: center; justify-content: space-between">
            <span style="font-size: 13px; font-weight: 600">Members</span>
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px;
                         border-radius: 6px; background: var(--n-sunken); color: var(--n-muted)">${t(`filter`)}</span>
          </div>

          <div style="margin-top: 8px; border-radius: 6px; border: 1px solid var(--n-line); background: var(--n-surface); overflow: hidden">
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 6px 10px">
              <span style="font-size: 12px">Ada Okonjo</span>
              <span style="font-size: 11px; color: var(--n-muted)">Owner</span>
            </div>
            <div style="height: 1px; background: var(--n-line)"></div>
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 6px 10px">
              <span style="font-size: 12px">Ren Takahashi</span>
              <span style="font-size: 11px; color: var(--n-muted)">Can edit</span>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px">
            <span style="padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;
                         background: ${a}; color: #ffffff">Invite</span>
            <span style="padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;
                         border: 1px solid var(--n-line); color: var(--n-muted)">Manage</span>
          </div>
        </div>

        <div class="sp-row sp-context" data-part="ramp" style="gap: 4px; margin-top: 10px; align-items: flex-start">${l}</div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 8px 0 0; min-height: 17px; font-size: 11px">${i[o]}</p>
      </div>
    </div>
  `;let u=e(c,`panel`),d=e(c,`note`),f=t=>{let a=r[t];if(a){u.dataset.tint=t;for(let t of n){let n=s(a,t.l,t.c);u.style.setProperty(`--n-${t.key}`,n),e(c,`ramp-${t.key}`).querySelector(`.sp-swatch`)?.style.setProperty(`--sp-swatch`,n)}d.textContent=i[t]??``}};f(o),e(c,`segmented`).addEventListener(`change`,e=>f(e.detail))}export{c as mount};