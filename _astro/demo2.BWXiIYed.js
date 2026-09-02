import{n as e,t}from"./parts.C-YLuC7Q.js";var n=20,r=12,i=19.4,a=1500,o=4,s=.35,c=e=>e/n*100,l=[[1.2,`scroll`],[3.4,`click`],[9.6,`click`]],u=[6,6.32,6.64,6.96,7.28,7.6],d=Math.min(...u),f=Math.max(...u),p=(e,t)=>`
  <span style="position: absolute; left: ${c(e)}%; top: 3px; width: 3px; height: 14px; margin-left: -1.5px; border-radius: 2px; background: var(${t===`scroll`?`--sp-muted`:`--sp-ink`})"></span>`,m=`position: absolute; top: 4px; height: 36px; border: 2px solid var(--sp-accent); border-radius: 6px; background: var(--sp-accent-soft)`;function h(n,h){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Reports</span>
          <span class="sp-text" data-part="readout" style="width: 250px; font-size: 12px; text-align: right; white-space: nowrap">Session 4-812 · 1 rage click logged</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-context" style="display: flex; align-items: center; gap: 12px; padding: 12px">
            <div class="sp-stack sp-grow" style="gap: 2px; min-width: 0">
              <span class="sp-heading" style="font-size: 14px">Quarterly export</span>
              <span class="sp-text">Every report in this workspace, as one .csv file.</span>
            </div>
            <button
              type="button"
              data-part="export"
              style="flex: 0 0 auto; padding: 7px 14px; border: 0; border-radius: var(--sp-radius); background: var(--sp-accent); color: var(--sp-accent-ink); font: inherit; font-weight: 500; white-space: nowrap; cursor: pointer"
            >Export CSV</button>
          </div>

          <div class="sp-surface" style="display: flex; flex-direction: column; gap: 6px; padding: 10px 12px">
            <div class="sp-row sp-row--between sp-context">
              <span class="sp-label">Session recording</span>
              <span class="sp-label">Rule: ${o} presses in ${(a/1e3).toFixed(1)} s</span>
            </div>

            <div data-part="timeline" data-detect="idle" style="position: relative; height: 56px">
              <span class="sp-context" style="position: absolute; left: 0; right: 0; top: 12px; height: 20px; border-radius: 6px; background: var(--sp-sunken)"></span>

              <span
                data-part="burst-past"
                data-subject
                style="${m}; left: ${c(d-s)}%; width: ${c(f-d+s*2)}%"
              ></span>
              <span data-part="burst-live" hidden style="${m}"></span>

              <div class="sp-context" style="position: absolute; left: 0; right: 0; top: 12px; height: 20px">
                ${l.map(([e,t])=>p(e,t)).join(``)}
                ${u.map(e=>p(e,`click`)).join(``)}
              </div>
              <div class="sp-context" data-part="live-events" style="position: absolute; left: 0; right: 0; top: 12px; height: 20px"></div>

              <span class="sp-context sp-label" style="position: absolute; left: 0; top: 42px; font-size: 10px">0:00</span>
              <span class="sp-context sp-label" style="position: absolute; left: 50%; top: 42px; font-size: 10px; transform: translateX(-50%)">0:10</span>
              <span class="sp-context sp-label" style="position: absolute; right: 0; top: 42px; font-size: 10px">0:20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let g=e(n,`timeline`),_=e(n,`burst-live`),v=e(n,`live-events`),y=e(n,`readout`),b=[],x=0,S=!1,C=1,w,T=e=>{y.textContent=e},E=()=>T(`Session 4-812 · ${C} rage click${C===1?``:`s`} logged`),D=e=>Math.min(i,r+(e-x)/1e3);e(n,`export`).addEventListener(`click`,()=>{let e=performance.now(),n=b.at(-1);n!==void 0&&e-n>a&&(b=[],S=!1,v.textContent=``,t(_,`hidden`,!0)),b.length===0&&(x=e),b.push(e);let r=D(e);v.insertAdjacentHTML(`beforeend`,p(r,`click`));let i=b.filter(t=>e-t<=a),l=i[0]??e,u=((e-l)/1e3).toFixed(1);if(i.length>=o){let e=D(l);_.style.left=`${c(e-s)}%`,_.style.width=`${c(r-e+s*2)}%`,t(_,`hidden`,!1),g.dataset.detect=`burst`,S||(S=!0,C+=1),T(`Rage click: ${i.length} presses in ${u} s`)}else g.dataset.detect=`counting`,T(`${i.length} press${i.length===1?``:`es`} on Export CSV in ${u} s`);h.clearTimeout(w),w=h.setTimeout(()=>{g.dataset.detect=`idle`,E()},a)})}export{h as mount};