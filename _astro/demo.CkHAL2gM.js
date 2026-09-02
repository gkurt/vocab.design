import{n as e,t}from"./parts.C-YLuC7Q.js";import{r as n}from"./measure.DK7AY2_i.js";import{t as r}from"./motion.B5_YXmsy.js";var i=404,a=388,o=22,s=40,c=6,l=112,u=8,d=60,f=1.5;function p(e){let t=e/100*u;return`00:0${Math.floor(t)}.${Math.floor(t%1*10)}`}function m(e){return e<8?`start`:e>92?`end`:`mid`}function h(u,h){let g=e=>{let t=e%2==0;return`<span style="position: absolute; left: ${e/8*100}%; top: 0; width: 2px; height: ${t?9:5}px;
                        background: var(--sp-line); translate: -1px 0"></span>`},_=(e,t,n,r)=>`
    <div
      style="position: absolute; left: ${t}%; width: ${n}%; top: 4px; bottom: 4px; padding: 4px 7px; border-radius: 5px;
             background: ${r}; border: 1px solid var(--sp-line); overflow: hidden"
    >
      <span class="sp-label" style="font-size: 10px; white-space: nowrap">${e}</span>
    </div>
  `;u.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 284px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Sequence 01</span>
          <span
            class="sp-label"
            data-part="timecode"
            style="flex: 0 0 116px; font-size: 12px; text-align: right; font-variant-numeric: tabular-nums"
          >00:00.0 / 00:08.0</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 440px; padding: 14px">
            <div data-part="tracks" style="position: relative; width: ${i}px; height: ${l}px">
              <div class="sp-context" style="position: absolute; left: 8px; width: ${a}px; top: 0; height: ${l}px">
                <div style="position: relative; height: ${o}px; border-bottom: 1px solid var(--sp-line)">
                  ${Array.from({length:9},(e,t)=>g(t)).join(``)}
                </div>
                <div style="position: relative; height: ${s}px; margin-top: ${c}px; border-radius: 6px; background: var(--sp-sunken)">
                  ${_(`Interview.mov`,2,54,`var(--sp-accent-soft)`)}
                  ${_(`B-roll.mov`,60,36,`var(--sp-accent-soft)`)}
                </div>
                <div style="position: relative; height: ${s}px; margin-top: 4px; border-radius: 6px; background: var(--sp-sunken)">
                  ${_(`Score.wav`,6,84,`var(--sp-surface)`)}
                </div>
              </div>

              <div
                data-part="playhead"
                data-subject
                data-at="start"
                style="position: absolute; left: 8px; top: 0; height: ${l}px; width: 14px; translate: -7px 0; z-index: 2;
                       cursor: ew-resize; touch-action: none"
              >
                <span style="position: absolute; left: 0; top: 0; width: 14px; height: 10px; border-radius: 3px; background: var(--sp-accent)"></span>
                <span style="position: absolute; left: 6px; top: 8px; bottom: 0; width: 2px; background: var(--sp-accent)"></span>
              </div>

              <span data-part="aim-late" aria-hidden="true" style="position: absolute; left: 287.36px; top: 0; width: 4px; height: ${o}px"></span>
              <span data-part="aim-early" aria-hidden="true" style="position: absolute; left: 116.64000000000001px; top: 0; width: 4px; height: ${o}px"></span>
            </div>

            <div class="sp-row sp-context" style="margin-top: 12px">
              <button
                class="sp-button sp-button--sm"
                type="button"
                data-part="play"
                style="min-width: 62px"
              >Play</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let v=e(u,`playhead`),y=e(u,`timecode`),b=e(u,`play`),x=0,S,C=()=>{v.style.left=`${8+x/100*a}px`,v.dataset.at=m(x),y.textContent=`${p(x)} / 00:08.0`},w=()=>{h.clearTimeout(S),S=void 0,t(b,`data-playing`,!1)},T=()=>{x=Math.min(100,x+f),C(),x<100?S=h.setTimeout(T,d):w()};b.addEventListener(`click`,()=>{if(S===void 0){if(x>=100&&(x=0),t(b,`data-playing`,!0),r(u)){x=100,C(),w();return}S=h.setTimeout(T,d)}});let E;v.addEventListener(`pointerdown`,t=>{t.isTrusted&&v.setPointerCapture(t.pointerId),E=e(u,`tracks`),w()}),v.addEventListener(`pointermove`,e=>{E&&(x=Math.min(100,Math.max(0,(n(e,E).x-8)/a*100)),C())});let D=()=>{E=void 0};v.addEventListener(`pointerup`,D),v.addEventListener(`pointercancel`,D)}export{h as mount};