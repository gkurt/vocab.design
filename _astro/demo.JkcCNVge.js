import{n as e,t}from"./parts.C-YLuC7Q.js";var n=50,r=300,i=400,a=20,o=26,s=4,c=30,l=6,u=24,d=49,f=[{key:`delete`,label:`Delete account`,subject:!0},{key:`dismiss`,label:`Dismiss`,subject:!1},{key:`solve`,label:`Mark as solved`,subject:!1}],p=42+f.length*o+(f.length-1)*s+2+4,m=p+128,h=({key:e,label:t,subject:n})=>`
  <button
    type="button"
    data-part="row-${e}"
    data-row="${e}"
    ${n?`data-subject`:``}
    style="display: flex; align-items: center; gap: 10px; flex: 0 0 auto; height: ${o}px; padding: 0 12px 0 44px; border: 0; border-radius: 6px; background: var(--sp-sunken); color: var(--sp-ink); font: inherit; font-size: 13px; text-align: left; cursor: pointer"
  >
    <span class="sp-grow" style="min-width: 0">${t}</span>
    <span class="sp-label" data-part="mark-${e}" style="width: 112px; text-align: right"></span>
  </button>`;function g(o,g){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: ${m}px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Support</span>
          <span class="sp-text" data-part="readout" style="width: 300px; text-align: right; white-space: nowrap">No touch replayed yet</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div
            class="sp-surface"
            data-part="panel"
            data-phase="idle"
            style="position: relative; height: ${p}px; overflow: hidden"
          >
            <div
              data-part="rows"
              style="position: absolute; left: 0; right: 0; top: 0; display: flex; flex-direction: column; gap: ${s}px; padding: ${l}px; transform: translateY(0); transition: transform 0.18s var(--sp-ease)"
            >${f.map(h).join(``)}</div>
            <div
              class="sp-context"
              data-part="banner"
              style="position: absolute; left: 0; right: 0; top: 0; display: flex; align-items: center; height: ${c}px; padding: 0 12px; background: var(--sp-accent-soft); color: var(--sp-ink); font-size: 12px; transform: translateY(-100%); transition: transform 0.18s var(--sp-ease)"
            >Your session expires in 2 minutes</div>
            <span
              data-part="point"
              style="position: absolute; left: ${u}px; top: ${d}px; width: 26px; height: 26px; margin: -13px 0 0 -13px; border: 2px dashed var(--sp-accent); border-radius: 50%; pointer-events: none"
            ></span>
          </div>
          <div class="sp-context" data-part="ruler" style="position: relative; height: 46px">
            <span class="sp-label" style="position: absolute; left: 0; top: 0; font-size: 10px; white-space: nowrap">touchend, handled here</span>
            <span
              class="sp-label"
              style="position: absolute; left: 75%; top: 0; font-size: 10px; white-space: nowrap; transform: translateX(-50%)"
            >click, ${r} ms later</span>
            <span style="position: absolute; left: 0; top: 15px; width: 2px; height: 8px; background: var(--sp-muted)"></span>
            <span style="position: absolute; left: 12.5%; top: 15px; width: 2px; height: 8px; background: var(--sp-muted)"></span>
            <span style="position: absolute; left: 75%; top: 15px; width: 2px; height: 8px; background: var(--sp-muted)"></span>
            <span style="position: absolute; left: 0; right: 0; top: 23px; height: 5px; border-radius: 3px; background: var(--sp-sunken)"></span>
            <span
              data-part="fill"
              style="position: absolute; left: 0; top: 23px; width: 0; height: 5px; border-radius: 3px; background: var(--sp-accent)"
            ></span>
            <span
              data-part="pip"
              style="position: absolute; left: 75%; top: 21px; width: 9px; height: 9px; margin-left: -4px; border-radius: 50%; background: var(--sp-accent); opacity: 0; transition: opacity 0.12s"
            ></span>
            <span class="sp-label" style="position: absolute; left: 0; top: 31px; font-size: 10px">0</span>
            <span class="sp-label" style="position: absolute; left: 12.5%; top: 31px; font-size: 10px; transform: translateX(-50%)">banner</span>
            <span class="sp-label" style="position: absolute; right: 0; top: 31px; font-size: 10px">${i} ms</span>
          </div>
        </div>
      </div>
      <div class="sp-row sp-context">
        <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay the touch</button>
      </div>
    </div>
  `;let _=e(o,`panel`),v=e(o,`rows`),y=e(o,`banner`),b=e(o,`point`),x=e(o,`fill`),S=e(o,`pip`),C=e(o,`readout`),w,T=0,E=!1,D=!1,O=e=>{C.textContent=e},k=(t,n)=>{e(o,`mark-${t}`).textContent=n},A=()=>{g.clearTimeout(w),w=void 0,T=0,E=!1,_.dataset.phase=`idle`,v.style.transform=`translateY(0)`,y.style.transform=`translateY(-100%)`,x.style.width=`0`,S.style.opacity=`0`;for(let{key:t}of f)e(o,`row-${t}`).removeAttribute(`data-ghosted`),e(o,`row-${t}`).removeAttribute(`data-tapped`),k(t,``)},j=()=>{let e=b.getBoundingClientRect(),t=(o.getRootNode().elementFromPoint?.(e.left+e.width/2,e.top+e.height/2)??null)?.closest(`[data-row]`)??null;if(S.style.opacity=`1`,_.dataset.phase=`ghosted`,!t)return O(`Click ${r} ms later, same point: nothing there`);D=!0,t.click(),D=!1},M=()=>{if(T+=a,x.style.width=`${Math.min(T,r)/i*100}%`,!E&&T>=n&&(E=!0,_.dataset.phase=`shifted`,y.style.transform=`translateY(0)`,v.style.transform=`translateY(${c}px)`,O(`A banner arrives: every row moves down one`)),T>=r)return w=void 0,j();w=g.setTimeout(M,a)};for(let{key:n,label:i}of f)e(o,`row-${n}`).addEventListener(`click`,e=>{let a=e.currentTarget;if(!D)return t(a,`data-tapped`,!0),k(n,`you pressed this`),O(`Pressed: ${i}`);t(a,`data-ghosted`,!0),k(n,`ghost click`),O(`Click ${r} ms later, same point: ${i}`)});e(o,`replay`).addEventListener(`click`,()=>{A(),_.dataset.phase=`touched`,t(e(o,`row-dismiss`),`data-tapped`,!0),k(`dismiss`,`touchend handled`),O(`touchend handled by Dismiss, under the finger`),w=g.setTimeout(M,a)})}export{g as mount};