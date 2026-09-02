import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=116,r={ms:340,ease:`cubic-bezier(0, 0, 0.2, 1)`,name:`ease-out`,curve:`M2 32 C 8 8, 18 2, 32 2`},i={ms:180,ease:`cubic-bezier(0.4, 0, 1, 1)`,name:`ease-in`,curve:`M2 32 C 16 32, 26 26, 32 2`},a=132;function o(o,s){let c=(e,t,n)=>`
    <div class="sp-row" style="gap: 10px">
      <svg class="sp-curve" viewBox="0 0 34 34" aria-hidden="true" style="width: 26px; height: 26px; flex: 0 0 auto">
        <path d="${n.curve}" />
      </svg>
      <span class="sp-stack" style="width: 128px; gap: 1px">
        <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">${t}</span>
        <span class="sp-label" style="font-size: 11px">${n.ms} ms, ${n.name}</span>
      </span>
      <span style="position: relative; width: ${a}px; height: 8px; border-radius: 999px; background: var(--sp-sunken)">
        <span
          data-part="bar-${e}"
          style="position: absolute; left: 0; top: 0; bottom: 0; width: ${(n.ms/r.ms*a).toFixed(1)}px;
                 border-radius: 999px; background: var(--sp-accent)"
        ></span>
      </span>
    </div>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-panel="in" data-state="settled" style="width: 424px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <span class="sp-row" style="gap: 6px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="btn-enter">Enter</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="btn-exit">Exit</button>
          </span>
        </div>
        <div
          style="position: relative; height: ${n}px; margin-top: 10px; border-radius: 6px;
                 background: var(--sp-sunken); overflow: hidden"
        >
          <div class="sp-stack sp-context" style="gap: 8px; padding: 14px 16px">
            <span class="sp-line" style="width: 128px"></span>
            <span class="sp-line" style="width: 168px"></span>
            <span class="sp-line" style="width: 96px"></span>
          </div>
          <div
            class="sp-surface sp-stack"
            data-part="panel"
            data-subject
            style="position: absolute; right: 8px; top: 8px; bottom: 8px; width: 196px; gap: 8px; padding: 12px;
                   box-shadow: var(--sp-shadow); transform: translateX(0); opacity: 1;
                   transition: transform ${r.ms}ms ${r.ease}, opacity ${r.ms}ms ${r.ease}"
          >
            <span class="sp-text sp-text--ink" style="font-size: 13px; font-weight: 600">Tide details</span>
            <span class="sp-label">High water 04:12, falling</span>
            <span class="sp-line" style="width: 72%"></span>
          </div>
        </div>
        <div class="sp-stack sp-context" style="gap: 8px; margin-top: 12px">
          ${c(`enter`,`Entrance`,r)}
          ${c(`exit`,`Exit`,i)}
        </div>
      </div>
    </div>
  `;let l=e(o,`scene`),u=e(o,`panel`),d,f=e=>{s.clearTimeout(d);let n=e===`in`?r:i;if(u.style.transition=`transform ${n.ms}ms ${n.ease}, opacity ${n.ms}ms ${n.ease}`,u.style.transform=e===`in`?`translateX(0)`:`translateX(112%)`,u.style.opacity=e===`in`?`1`:`0`,l.dataset.panel=e,t(o)){l.dataset.state=`settled`;return}l.dataset.state=`moving`,d=s.setTimeout(()=>{l.dataset.state=`settled`},n.ms+60)};e(o,`btn-enter`).addEventListener(`click`,()=>f(`in`)),e(o,`btn-exit`).addEventListener(`click`,()=>f(`out`))}export{o as mount};