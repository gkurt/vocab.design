import{r as e}from"./touch.Bg97t8LB.js";import{n as t,t as n}from"./parts.C-YLuC7Q.js";var r=[{part:`ctl-1`,said:`“Pay someone, button”`},{part:`ctl-2`,said:`“Freeze card, switch, off”`},{part:`ctl-3`,said:`“Statements, button”`}],i={off:`The display is on, so the walk can be watched as well as heard. Triple tap the screen with three fingers to switch it off.`,on:`The display is off, not dimmed. The same three presses reach the same three controls and say the same three things. Tap again to bring it back.`};function a(a,o){let s=(e,t)=>`
    <p class="sp-text sp-text--ink" data-part="line-${e+1}"
       style="margin: 0; height: 16px; line-height: 16px; font-size: 11.5px; white-space: nowrap;
              opacity: 0; transition: opacity 0.16s ease">${t}</p>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row" style="align-items: stretch; gap: 12px">
          <div class="sp-frame" data-part="screen" data-curtain="off" data-touch tabindex="0"
               style="position: relative; flex: 0 0 auto; width: 202px; height: 158px; overflow: hidden;
                      touch-action: none; user-select: none">
            <div class="sp-topbar sp-context" style="padding: 6px 10px">
              <span class="sp-heading sp-grow" style="font-size: 12px">Wallet</span>
              <span class="sp-label" style="font-size: 10px">&#163;412.90</span>
            </div>
            <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 7px; padding: 10px">
              <button class="sp-button sp-button--sm" type="button" data-part="ctl-1"
                      style="height: 28px; font-size: 11.5px">Pay someone</button>
              <div class="sp-row sp-row--between" style="gap: 8px">
                <span class="sp-label" style="flex: 1 1 auto; font-size: 11px">Freeze card</span>
                <button class="sp-switch" type="button" data-part="ctl-2" role="switch"
                        aria-checked="false" aria-label="Freeze card" style="flex: 0 0 auto"></button>
              </div>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="ctl-3"
                      style="height: 28px; font-size: 11.5px">Statements</button>
            </div>
            <div data-part="curtain" data-subject aria-hidden="true"
                 style="position: absolute; inset: 0; background: #000; opacity: 0; visibility: hidden;
                        transition: opacity 0.22s ease, visibility 0.22s"></div>
          </div>

          <div class="sp-surface" style="flex: 1 1 auto; min-width: 0; padding: 8px 10px">
            <div class="sp-row sp-row--between sp-context" style="gap: 8px; height: 16px">
              <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Speech</span>
              <span class="sp-row" style="flex: 0 0 auto; gap: 5px">
                <kbd class="sp-kbd" style="font-size: 10px">&#8594;</kbd>
                <span class="sp-label" style="font-size: 9.5px">next control</span>
              </span>
            </div>
            <div class="sp-stack" style="gap: 4px; margin-top: 6px">
              ${r.map((e,t)=>s(t,e.said)).join(``)}
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="off"
           style="margin: 10px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${i.off}</p>
      </div>
    </div>
  `;let c=t(a,`screen`),l=t(a,`curtain`),u=t(a,`caption`),d=r.map(e=>t(a,e.part)),f=r.map((e,n)=>t(a,`line-${n+1}`)),p=-1,m=()=>{if(p>=r.length-1)return;p+=1;for(let[e,t]of d.entries())n(t,`data-sim-focus`,e===p);let e=f[p];e&&(e.style.opacity=`1`)},h=()=>{p=-1;for(let e of d)n(e,`data-sim-focus`,!1);for(let e of f)e.style.opacity=`0`},g=e=>{let t=e===`on`;c.dataset.curtain=e,l.style.opacity=t?`1`:`0`,l.style.visibility=t?`visible`:`hidden`,u.dataset.mode=e,u.textContent=i[e],h()};a.addEventListener(`keydown`,e=>{e.key===`ArrowRight`&&(e.preventDefault(),m())}),e(c,o,{fingers:3,reader:!1,onTap:e=>{e===3&&g(c.dataset.curtain===`on`?`off`:`on`)}})}export{a as mount};