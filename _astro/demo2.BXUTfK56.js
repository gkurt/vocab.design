import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=`#FFFFFF`,i=[{key:`pale`,hex:`#A2A9B4`},{key:`mid`,hex:`#828A94`},{key:`grey`,hex:`#767676`},{key:`ink`,hex:`#4B5563`}],a=`grey`,o=[{key:`aa`,label:`AA 4.5:1`,min:4.5},{key:`large`,label:`AA large 3:1`,min:3},{key:`aaa`,label:`AAA 7:1`,min:7}],s=(e,t)=>Number.parseInt(e.slice(t,t+2),16)/255,c=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,l=e=>.2126*c(s(e,1))+.7152*c(s(e,3))+.0722*c(s(e,5)),u=(e,t)=>{let[n,r]=[l(e),l(t)].sort((e,t)=>t-e);return((n??0)+.05)/((r??0)+.05)},d=e=>e>=7?`aaa`:e>=4.5?`aa`:e>=3?`large`:`none`;function f(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Foreground</span>
          <div class="sp-row" data-part="swatches" style="gap: 6px">${i.map(({key:e,hex:t})=>`
      <button data-part="fg-${e}" aria-label="${t}"
              style="width: 28px; height: 28px; padding: 0; border: 0; border-radius: 6px; cursor: pointer; background: ${t}"></button>`).join(``)}</div>
        </div>

        <div class="sp-context" data-part="sample"
             style="margin-top: 14px; padding: 12px 14px; border-radius: var(--sp-radius); border: 1px solid #E3E7EE; background: ${r}">
          <span data-part="sample-large" style="display: block; font-size: 19px; font-weight: 700; line-height: 1.3">Large text, 19px bold</span>
          <span data-part="sample-body" style="display: block; margin-top: 5px; font-size: 14px; line-height: 1.5">Body text at fourteen pixels.</span>
        </div>

        <div data-part="readout" data-subject data-level="none"
             style="margin-top: 12px; padding: 11px 12px; border-radius: var(--sp-radius); border: 1px solid var(--sp-line); background: var(--sp-surface)">
          <div class="sp-row" style="gap: 10px; align-items: baseline">
            <span data-part="ratio" style="width: 96px; font-size: 26px; font-weight: 600; line-height: 1.1">&nbsp;</span>
            <span class="sp-label" data-part="pair">&nbsp;</span>
          </div>
          <div class="sp-row sp-row--wrap" style="margin-top: 10px; gap: 6px">${o.map(({key:e,label:t})=>`
      <span data-part="badge-${e}" data-pass="false"
            style="display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 999px;
                   border: 1px solid var(--sp-line); font-size: 11px; font-weight: 500; white-space: nowrap">
        <span data-part="mark-${e}" style="display: flex"></span>${t}
      </span>`).join(``)}</div>
        </div>
      </div>
    </div>
  `;let c=e(s,`readout`),l=e(s,`ratio`),f=e(s,`pair`),p=e(s,`sample-large`),m=e(s,`sample-body`),h=i.map(t=>({fg:t,el:e(s,`fg-${t.key}`)})),g=i=>{let a=u(r,i);c.dataset.level=d(a),l.textContent=`${a.toFixed(2)}:1`,f.textContent=`${i} on ${r}`,p.style.color=i,m.style.color=i;for(let t of o){let r=a>=t.min,i=e(s,`badge-${t.key}`);i.dataset.pass=String(r),i.style.background=r?`var(--sp-accent-soft)`:`var(--sp-sunken)`,i.style.borderColor=r?`var(--sp-accent)`:`var(--sp-line)`,e(s,`mark-${t.key}`).innerHTML=n(r?`check`:`close`)}for(let e of h){let n=e.fg.hex===i;t(e.el,`data-selected`,n),e.el.style.boxShadow=n?`0 0 0 2px var(--sp-surface), 0 0 0 4px var(--sp-ink)`:``}};g(i.find(e=>e.key===a)?.hex??`#767676`);for(let e of h)e.el.addEventListener(`click`,()=>g(e.fg.hex))}export{f as mount};