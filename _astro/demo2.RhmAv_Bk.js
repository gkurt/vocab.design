import{n as e}from"./parts.C-YLuC7Q.js";import{n as t}from"./measure.DK7AY2_i.js";var n=`01000004400040011002300000002222044012430004400003201300024402015540000325510330614002002200306200003653033514030718782316176442470020072904000000000000000320001010121401301040511120300010045820403201050097023418976300240600043901000000000104320000031000515500162232040130201100001206520056461314485842376933088832013710003254723254313244922521454213010568001861700376`,r=Date.UTC(2025,2,9),i=53,a=7,o=8,s=2,c=24,l=120,u=[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],d=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],f=[`Sunday`,`Monday`,`Tuesday`,`Wednesday`,`Thursday`,`Friday`,`Saturday`],p=[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`],m=[1,3,5],h=`0 0 0 1.5px var(--sp-ink)`,g=e=>new Date(r+e*864e5),_=e=>e<368?Number(n[e]):null,v=e=>e===0?0:e<=2?1:e<=4?2:e<=6?3:4,y=[...n].reduce((e,t)=>e+Number(t),0);function b(e){let t=g(e),n=`${t.getUTCDate()} ${u[t.getUTCMonth()]} ${t.getUTCFullYear()}`,r=_(e);return r===null?`No data for ${n}`:r===0?`No sessions on ${n}`:`${r} session${r===1?``:`s`} on ${n}`}function x(e){let t=g(e),n=`${p[t.getUTCDay()]} ${t.getUTCDate()} ${d[t.getUTCMonth()]}`,r=_(e);return r===null?`No data for ${n}`:r===0?`No sessions on ${n}`:`${r} session${r===1?``:`s`} on ${n}`}function S(){let e=[];for(let t=0;t<i;t+=1){let n=g(t*a),r=e.at(-1);r&&r.month===n.getUTCMonth()?r.span+=1:e.push({month:n.getUTCMonth(),year:n.getUTCFullYear(),span:1})}return e.map(({month:e,year:t,span:n})=>`<th scope="col" colspan="${n}" style="padding: 0; text-align: left; font-weight: 500; color: var(--sp-muted); overflow: hidden; white-space: nowrap">
        ${n>=3?`<span aria-hidden="true">${d[e]}</span>`:``}<span class="sp-visually-hidden">${u[e]} ${t}</span>
      </th>`).join(``)}function C(e){return`<th scope="row" style="position: relative; padding: 0; font-weight: 400">
    ${m.includes(e)?`<span aria-hidden="true" style="position: absolute; left: 0; top: 50%; transform: translateY(-50%);
         width: ${c}px; overflow: hidden; white-space: nowrap; line-height: 1; color: var(--sp-muted)">${p[e]}</span>`:``}<span class="sp-visually-hidden">${f[e]}</span>
  </th>`}function w(e){let t=_(e),n=`<span class="sp-visually-hidden">${b(e)}</span>`;if(t===null)return`<td data-part="cell-${e}" data-empty style="padding: 0">${n}</td>`;let r=v(t);return`<td class="sp-swatch" data-part="cell-${e}" data-level="${r}"
    style="padding: 0; border-radius: 2px; --sp-swatch: var(--l${r})">${n}</td>`}var T=e=>`<span class="sp-swatch" aria-hidden="true" style="width: ${o}px; height: ${o}px; border-radius: 2px; --sp-swatch: var(--l${e})"></span>`;function E(n){let r=Array.from({length:a},(e,t)=>{let n=Array.from({length:i},(e,n)=>w(n*a+t)).join(``);return`<tr style="height: ${o}px">${C(t)}${n}</tr>`}).join(``);n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 606px; height: 232px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Practice log</span>
          <span class="sp-label" style="font-variant-numeric: tabular-nums">${y} sessions in the last year</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px 12px">
          <div
            class="sp-surface"
            style="flex: 0 0 auto; padding: 10px;
                   --l0: color-mix(in oklab, var(--sp-ink) 10%, var(--sp-surface));
                   --l1: color-mix(in oklab, var(--sp-accent) 26%, var(--sp-surface));
                   --l2: color-mix(in oklab, var(--sp-accent) 48%, var(--sp-surface));
                   --l3: color-mix(in oklab, var(--sp-accent) 72%, var(--sp-surface));
                   --l4: var(--sp-accent)"
          >
            <div data-part="field" style="position: relative; height: ${l}px">
              <table
                data-part="grid"
                data-subject
                data-hover-driven
                style="border-collapse: separate; border-spacing: ${s}px; table-layout: fixed; font-size: 9px; line-height: 1"
              >
                <caption class="sp-visually-hidden">
                  Practice sessions from 9 March 2025 to 11 March 2026, as ${i} week columns by ${a} weekday rows.
                  Every cell is one day and gives that day's session count.
                </caption>
                <colgroup><col style="width: ${c}px" /><col span="${i}" style="width: ${o}px" /></colgroup>
                <thead>
                  <tr style="height: 11px">
                    <td style="padding: 0"><span class="sp-visually-hidden">Weekday</span></td>
                    ${S()}
                  </tr>
                </thead>
                <tbody data-part="weeks">${r}</tbody>
              </table>
              <span class="sp-tooltip" data-part="tip" data-count="none" style="bottom: 0"></span>
            </div>
            <div class="sp-row" style="justify-content: flex-end; gap: 4px; margin-top: 6px; height: 14px">
              <span class="sp-label" data-part="legend" style="font-size: 10px">Less</span>
              ${[0,1,2,3,4].map(T).join(``)}
              <span class="sp-label" style="font-size: 10px">More</span>
            </div>
          </div>
        </div>
      </div>
      <span data-part="away" aria-hidden="true" style="width: 560px; height: 30px"></span>
    </div>
  `;let u=e(n,`field`),d=e(n,`weeks`),f=e(n,`tip`),p=null,m=367,g=e=>Number(e.dataset.part?.slice(5)),v=e=>n.querySelector(`[data-part="cell-${e}"]`),b=e=>{let n=g(e),r=_(n);f.textContent=x(n),f.dataset.count=r===null?`none`:String(r);let i=t(e,u),a=u.offsetWidth,o=f.offsetWidth,s=i.left+i.width/2,c=Math.max(0,Math.min(a-o,s-o/2));f.style.left=`${c}px`,f.style.setProperty(`--sp-arrow-x`,`${s-c}px`),f.setAttribute(`data-open`,``)},E=e=>{if(p!==e){if(p&&(p.removeAttribute(`data-active`),p.style.boxShadow=``),p=e,!e){f.removeAttribute(`data-open`);return}e.setAttribute(`data-active`,``),e.style.boxShadow=h,b(e)}},D=e=>{let t=v(e);t&&(v(m)?.removeAttribute(`tabindex`),m=e,t.tabIndex=0,E(t))};v(m)?.setAttribute(`tabindex`,`0`),d.addEventListener(`pointerover`,e=>{let t=e.target.closest(`[data-part^="cell-"]`);t&&E(t)}),d.addEventListener(`pointerout`,e=>{let t=e.relatedTarget;t instanceof HTMLElement&&t.closest(`[data-part^="cell-"]`)||E(null)}),d.addEventListener(`focusin`,e=>{let t=e.target.closest(`[data-part^="cell-"]`);t&&E(t)}),d.addEventListener(`keydown`,e=>{let t=p??v(m);if(!t)return;let n=g(t),r=Math.floor(n/a),o=n%a,s={ArrowRight:[r+1,o],ArrowLeft:[r-1,o],ArrowDown:[r,o+1],ArrowUp:[r,o-1],Home:[0,o],End:[52,o]}[e.key];if(!s)return;e.preventDefault();let[c,l]=s;c<0||c>=i||l<0||l>=a||(D(c*a+l),e.isTrusted&&v(m)?.focus())})}export{E as mount};