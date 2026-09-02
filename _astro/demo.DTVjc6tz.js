import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";import{t as n}from"./motion.B5_YXmsy.js";var r={w:124,h:156},i=100,a={still:{rise:0,leg:0,note:`Still: nothing moves`},subtle:{rise:6,leg:1900,note:`Subtle: 6px over 3.8s`},lively:{rise:14,leg:1250,note:`Lively: 14px over 2.5s`}},o=[{part:`card-1`,top:16,phase:0,glyph:`heart`,title:`Saved`,value:`128`},{part:`card-2`,top:36,phase:640,glyph:`star`,title:`Rating`,value:`4.9`},{part:`card-3`,top:26,phase:1280,glyph:`bell`,title:`Alerts`,value:`3`}];function s(s){let c=(e,n)=>`
    <div style="position: relative; width: ${r.w}px; height: ${r.h}px">
      <div
        class="sp-surface${n?``:` sp-context`}"
        data-part="${e.part}"
        ${n?`data-subject data-pose="[data-float=on]"`:``}
        data-float="on"
        data-amp="subtle"
        style="position: absolute; left: 0; right: 0; top: ${e.top}px; height: ${i}px; padding: 12px;
               display: flex; flex-direction: column; gap: 8px; box-shadow: var(--sp-shadow); will-change: transform"
      >
        <span
          style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px;
                 border-radius: 50%; background: var(--sp-accent-soft); color: var(--sp-accent)"
        >${t(e.glyph)}</span>
        <span class="sp-label" style="font-size: 11px">${e.title}</span>
        <span class="sp-heading" style="font-variant-numeric: tabular-nums">${e.value}</span>
      </div>
    </div>`;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 258px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Hero</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="amp" data-axis="Amplitude" data-value="subtle">
            <button class="sp-segment" type="button" data-part="seg-still" value="still">Still</button>
            <button class="sp-segment" type="button" data-part="seg-subtle" value="subtle">Subtle</button>
            <button class="sp-segment" type="button" data-part="seg-lively" value="lively">Lively</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px">
          <div class="sp-row" data-part="row" style="gap: 16px; align-items: flex-start">
            ${c(o[0],!1)}
            ${c(o[1],!0)}
            ${c(o[2],!1)}
          </div>
          <span class="sp-label sp-context" data-stage-verdict data-part="note" style="font-size: 11px">Subtle: 6px over 3.8s</span>
        </div>
      </div>
    </div>
  `;let l=e(s,`note`),u=n(s),d=new Map,f=t=>{let n=a[t];if(n){l.textContent=n.note;for(let r of o){let i=e(s,r.part);if(i.dataset.amp=t,i.dataset.float=n.rise>0?`on`:`off`,d.get(i)?.cancel(),d.delete(i),i.style.transform=`translateY(0px)`,n.rise===0||u)continue;let a=i.animate([{transform:`translateY(0px)`},{transform:`translateY(-${n.rise}px)`}],{duration:n.leg,iterations:1/0,direction:`alternate`,easing:`ease-in-out`});a.currentTime=r.phase%(n.leg*2),d.set(i,a)}}};e(s,`amp`).addEventListener(`change`,e=>f(e.detail)),f(`subtle`)}export{s as mount};