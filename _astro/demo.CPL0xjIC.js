import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{n as t}from"./measure.DK7AY2_i.js";import{t as n}from"./motion.B5_YXmsy.js";var r={w:410,h:54},i={w:46,h:38},a=90,o=420,s=(e,t)=>`
  <span style="position: absolute; left: ${e}px; top: 0; width: 2px; height: ${r.h}px; background: var(--sp-line)"></span>
  <span class="sp-label" style="position: absolute; left: ${e}px; top: ${r.h+2}px; font-size: 11px">${t}</span>`;function c(c,l){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-state="rested" data-stacked="0" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Composite</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Operation" data-term="add" data-part="mode" data-value="add">
            <button class="sp-segment" type="button" data-part="seg-add" value="add">Add</button>
            <button class="sp-segment" type="button" data-part="seg-replace" value="replace">Replace</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px">
          <div data-part="lane" style="position: relative; width: ${r.w}px; height: ${r.h+18}px">
            <div class="sp-context">${s(0,`0`)}${s(a,`${a}`)}${s(180,`180`)}</div>
            <div
              data-part="puck" data-subject data-pose="[data-mode=add]" data-mode="add"
              style="position: absolute; left: 0; top: ${(r.h-i.h)/2}px; width: ${i.w}px; height: ${i.h}px;
                     border-radius: 7px; background: var(--sp-accent)"
            ></div>
          </div>

          <div class="sp-row sp-context" style="gap: 10px">
            <button class="sp-button sp-button--sm" type="button" data-part="nudge">Nudge</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reset">Reset</button>
          </div>

          <div class="sp-stack sp-context" data-part="readout" style="gap: 2px; width: ${r.w}px; height: 38px">
            <span class="sp-label" data-part="recipe" style="font-size: 11px">composite: add</span>
            <span class="sp-text sp-text--ink" data-part="claim" style="font-size: 12px; line-height: 1.35">
              Press Nudge twice: the second move is added to the first.
            </span>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(c,`scene`),d=e(c,`lane`),f=e(c,`puck`),p=e(c,`recipe`),m=e(c,`claim`),h=n(c),g=`add`,_=0,v=[],y,b=e=>{let t=Math.max(0,Math.round(e/a));u.dataset.stacked=`${t}`,u.dataset.state=`rested`,m.textContent=t===0?`The puck sits at 0px.`:g===`add`?`${t} nudge${t===1?``:`s`} composed: the puck sits at ${e}px.`:`The last nudge replaced the ones before it: the puck sits at ${e}px.`},x=()=>b(Math.round(t(f,d).left)),S=()=>{if(l.clearTimeout(y),u.dataset.state=`moving`,h)return _=g===`add`?_+a:a,f.style.transform=`translateX(${_}px)`,b(_);if(g===`replace`)for(let e of v)e.cancel();let e=f.animate([{transform:`translateX(0px)`},{transform:`translateX(${a}px)`}],{duration:o,easing:`cubic-bezier(0.3, 0.9, 0.3, 1)`,fill:`forwards`,composite:g===`add`?`add`:`replace`});g===`add`&&e.persist(),v=g===`add`?[...v,e]:[e],y=l.setTimeout(x,510)},C=()=>{l.clearTimeout(y);for(let e of v)e.cancel();v=[],_=0,f.style.transform=`translateX(0px)`,b(0)};e(c,`nudge`).addEventListener(`click`,S),e(c,`reset`).addEventListener(`click`,C),e(c,`mode`).addEventListener(`change`,e=>{g=e.detail,f.dataset.mode=g,p.textContent=`composite: ${g}`,C()}),C()}export{c as mount};