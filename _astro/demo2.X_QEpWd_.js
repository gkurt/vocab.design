import{n as e}from"./parts.C-YLuC7Q.js";var t={w:434,h:168},n=150,r=12,i=12,a=20,o=8,s=120,c=[{title:`Sunrise`,lines:[88,66,92]},{title:`Harbour`,lines:[74,90,62]},{title:`Ferries`,lines:[92,70,84]},{title:`Timetable`,lines:[80,94,68]}],l=e=>i+e*162,u=e=>o+e*a,d=(e,t)=>{let i=c[e];return i?`
    <section
      ${t?`data-subject data-state="loose" `:`class="sp-context" `}data-part="card-${e+1}"
      style="position: sticky; top: ${u(e)}px; z-index: ${e+1}; height: ${n}px;
             margin-bottom: ${r}px; border: 1px solid var(--sp-line); border-radius: 10px;
             background: var(--sp-surface); box-shadow: 0 -4px 14px rgb(16 24 40 / 0.13); overflow: hidden"
    >
      <div
        style="display: flex; align-items: center; gap: 8px; height: 24px; padding: 0 12px;
               background: var(--sp-surface)"
      >
        <span class="sp-label sp-text--ink" style="font-size: 12px">${i.title}</span>
        <span class="sp-label" style="margin-left: auto; font-size: 11px">${e+1} of ${c.length}</span>
      </div>
      <div style="padding: 10px 12px">
        ${i.lines.map(e=>`<span class="sp-line" style="display: block; width: ${e}%; margin-bottom: 9px"></span>`).join(``)}
      </div>
    </section>`:``};function f(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-stacked="0" style="height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Deck</span>
          <span class="sp-label sp-text--ink" data-part="count" style="font-size: 12px">0 of 4 stacked</span>
          <span class="sp-row" style="gap: 4px">
            ${c.map((e,t)=>`
              <span
                data-part="pip-${t+1}" data-down="no"
                style="width: 10px; height: 10px; border-radius: 3px; background: var(--sp-line)"
              ></span>`).join(``)}
          </span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 12px">
          <div
            class="sp-scroll" data-part="port"
            style="position: relative; flex: 0 0 auto; width: ${t.w}px; height: ${t.h}px;
                   border: 1px solid var(--sp-line); border-radius: 8px; background: var(--sp-sunken)"
          >
            <div style="padding: ${i}px ${i}px 0">
              ${c.map((e,t)=>d(t,t===0)).join(``)}
              <div style="height: ${s}px"></div>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="note" style="flex: 0 0 auto; height: 34px; font-size: 12px; line-height: 1.3">
            Each card stops at its own offset and the next one rides over it, leaving a strip behind.
          </span>
        </div>
      </div>
    </div>
  `;let r=e(n,`scene`),a=e(n,`port`),o=e(n,`card-1`),f=e(n,`count`),p=c.map((t,r)=>e(n,`pip-${r+1}`)),m=()=>{let e=a.scrollTop,t=0;for(let n=0;n<c.length;n++)l(n)-e<=u(n)+.5&&(t+=1);r.dataset.stacked=String(t),f.textContent=`${t} of ${c.length} stacked`;for(let[e,n]of p.entries())n.dataset.down=e<t?`yes`:`no`,n.style.background=e<t?`var(--sp-accent)`:`var(--sp-line)`;o.dataset.state=t===0?`loose`:t===1?`stuck`:`covered`};a.addEventListener(`scroll`,m),m()}export{f as mount};