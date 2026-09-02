import{n as e,r as t,t as n}from"./parts.C-YLuC7Q.js";var r=198,i=176,a=84,o=[[`Marcy Vane`,[`92%`,`68%`]],[`Port office`,[`84%`,`74%`]],[`Tidal watch`,[`96%`,`62%`]],[`Ferry crew`,[`78%`,`86%`]],[`Ada Whitlow`,[`90%`,`70%`]],[`Harbour master`,[`86%`,`80%`]],[`Crane lift 4`,[`94%`,`64%`]],[`Night berth`,[`82%`,`76%`]],[`Gull watch`,[`88%`,`72%`]],[`Lock keeper`,[`90%`,`66%`]]];function s(s){let c=(e,t)=>`
    <div data-part="post" class="sp-row" style="align-items: flex-start; gap: 8px; padding: 10px 11px; border-bottom: 1px solid var(--sp-line)">
      <span class="sp-avatar" style="flex: 0 0 auto; width: 24px; height: 24px; font-size: 10px">${e.slice(0,1)}</span>
      <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 6px">
        <span data-part="name" style="font-size: 11px; font-weight: 600">${e}</span>
        ${t.map(e=>`<div class="sp-line" style="width: ${e}; height: 6px"></div>`).join(``)}
      </div>
    </div>`;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Gaze session</span>
          <span class="sp-label">gaze recorded</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div class="sp-row" style="gap: 14px; align-items: flex-start">
            <div style="position: relative; flex: 0 0 auto; width: ${r}px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 18px; overflow: hidden">
              <div class="sp-context sp-row sp-row--between" style="padding: 7px 12px; border-bottom: 1px solid var(--sp-line)">
                <span class="sp-label">Harbour feed</span>
                <span class="sp-label">9:41</span>
              </div>
              <div class="sp-scroll sp-context" data-part="feed" data-aim style="height: ${i}px">
                ${o.map(([e,t])=>c(e,t)).join(``)}
              </div>
              <div
                data-part="hold"
                data-subject
                style="position: absolute; left: 0; right: 0; top: 114px; height: 24px; pointer-events: none; display: flex; align-items: center"
              >
                <span style="flex: 1 1 auto; height: 2px; background: var(--sp-accent); opacity: 0.5"></span>
                <span style="position: absolute; left: 50%; margin-left: -11px; width: 22px; height: 22px; border-radius: 50%; border: 3px solid var(--sp-accent); background: var(--sp-accent); opacity: 0.34"></span>
              </div>
            </div>
            <div class="sp-surface sp-stack" style="flex: 1 1 auto; padding: 11px 12px; gap: 9px">
              <div class="sp-stack" style="gap: 2px">
                <span class="sp-label">Gaze</span>
                <span data-part="gaze" style="font-size: 12px; font-weight: 600">y = ${a} px</span>
              </div>
              <div class="sp-stack" style="gap: 2px">
                <span class="sp-label">Under gaze</span>
                <span data-part="under" style="font-size: 12px; font-weight: 600; white-space: nowrap">&nbsp;</span>
              </div>
              <div class="sp-stack" style="gap: 2px">
                <span class="sp-label">Posts passed</span>
                <span data-part="passed" style="font-size: 12px; font-weight: 600">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(s,`feed`),u=e(s,`hold`),d=e(s,`under`),f=e(s,`passed`),p,m=()=>{let r=u.getBoundingClientRect(),i=r.top+r.height/2,a=t(l,`post`),o=0;for(let t of a){let n=t.getBoundingClientRect();n.bottom<i&&(o+=1),n.top<=i&&n.bottom>=i&&(d.textContent=e(t,`name`).textContent??``)}p??=o;let s=o-p;f.textContent=String(s),n(f,`data-moved`,s>0),n(l,`data-scrolled`,l.scrollTop>20)};l.addEventListener(`scroll`,m),m()}export{s as mount};