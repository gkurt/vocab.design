import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./motion.B5_YXmsy.js";var r=950,i=[{key:`email`,label:`Email field`,done:`Text entry opened`},{key:`remember`,label:`Remember me`,done:`Remember me switched on`},{key:`forgot`,label:`Forgot password`,done:`Forgot password followed`},{key:`signin`,label:`Sign in`,done:`Signed in`}];function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-context" style="gap: 10px; justify-content: flex-end">
          <div class="sp-row" style="flex: 0 0 auto; gap: 6px">
            <button class="sp-button sp-button--sm" type="button" data-part="switch">Press switch</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="resume">Resume scan</button>
          </div>
        </div>

        <div class="sp-surface" data-part="group" data-subject data-state="scanning"
             style="margin-top: 10px; padding: 6px 8px; display: flex; flex-direction: column; gap: 2px">
          ${i.map((e,t)=>`
    <div class="sp-row sp-row--between" data-part="row-${e.key}" style="gap: 10px; height: 30px; padding: 0 8px; border-radius: 6px">
      <span class="sp-text sp-text--ink" style="flex: 1 1 auto; min-width: 0; font-size: 12px">${e.label}</span>
      <span class="sp-label" data-part="num-${e.key}" style="flex: 0 0 auto; font-size: 10px">step ${t+1}</span>
    </div>`).join(``)}
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Current target</span>
          <span class="sp-text sp-text--ink" data-part="offer" style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">Email field</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 3px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Result</span>
          <span class="sp-text" data-part="result" data-state="none"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">Nothing selected yet</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 7px 0 0; height: 32px; font-size: 11px">
          The highlight is the whole interface. Anything four steps down the list costs four waits every single time.
        </p>
      </div>
    </div>
  `;let s=e(a,`group`),c=e(a,`offer`),l=e(a,`result`),u=0,d,f=()=>{i.forEach((n,r)=>{let i=e(a,`row-${n.key}`),o=r===u;t(i,`data-sim-focus`,o),i.style.background=o?`var(--sp-accent-soft)`:`transparent`}),c.textContent=i[u]?.label??``},p=()=>{u=(u+1)%i.length,f(),d=o.setTimeout(p,r)},m=()=>{o.clearTimeout(d),s.dataset.state=`scanning`,n(a)||(d=o.setTimeout(p,r))};f(),m(),e(a,`switch`).addEventListener(`click`,()=>{o.clearTimeout(d),d=void 0,s.dataset.state=`stopped`;let e=i[u];l.dataset.state=`chosen`,l.className=`sp-text sp-text--ink`,l.textContent=`${e?.done} after ${u+1} ${u===0?`step`:`steps`}`}),e(a,`resume`).addEventListener(`click`,m)}export{a as mount};