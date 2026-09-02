import{n as e}from"./parts.C-YLuC7Q.js";import{n as t}from"./measure.DK7AY2_i.js";var n=128,r=238,i=[[`Lay the gravel bed`,`Step 1 of 3`],[`Set the stone course`,`Step 2 of 3`],[`Cap and point it`,`Step 3 of 3`]],a=(e,t)=>Array.from({length:e},(e,n)=>`<span class="sp-line" style="width: ${t[n%t.length]}"></span>`).join(``),o=(e,t)=>`
  <div class="sp-stack sp-context" style="gap: 8px; padding: 14px">
    <span class="sp-heading" style="font-size: 13px">${e}</span>
    ${a(t,[`96%`,`88%`,`92%`,`74%`])}
  </div>`,s=(e,t)=>`
  <div class="sp-stack" style="gap: 7px">
    <span class="sp-label">${e}</span>
    ${a(t,[`92%`,`80%`,`86%`])}
  </div>`,c=[3,2,1].map(e=>`
      <span
        class="sp-swatch"
        data-part="course-${e}"
        style="--sp-swatch: var(--sp-line); height: 22px; width: ${e===1?`100%`:e===2?`88%`:`76%`}"
      ></span>`).join(``);function l(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 436px; height: 248px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Building a dry stone wall</span>
          <span class="sp-text" data-part="readout" style="width: 86px; text-align: right; white-space: nowrap">Not pinned</span>
        </div>
        <div class="sp-scroll" data-part="page" style="flex: 1 1 auto; min-height: 0">
          ${o(`Choosing your stone`,4)}
          <div data-part="section">
            <figure
              data-part="figure"
              data-subject
              data-pin="before"
              data-step="1"
              data-pose="[data-pin=pinned]"
              style="position: sticky; top: 0; z-index: 1; display: flex; align-items: center; gap: 16px; height: ${n}px;
                     margin: 0; padding: 0 16px; background: var(--sp-surface); border-top: 1px solid var(--sp-line);
                     border-bottom: 1px solid var(--sp-line)"
            >
              <span style="display: flex; flex-direction: column; gap: 4px; width: 132px; height: 74px">${c}</span>
              <figcaption class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 6px">
                <span class="sp-label" data-part="counter">Step 1 of 3</span>
                <span
                  class="sp-heading"
                  data-stage-verdict data-part="caption"
                  style="font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
                >Lay the gravel bed</span>
                <div class="sp-progress" data-part="spent" style="margin-top: 2px; --sp-value: 0%">
                  <!-- No transition: an eased fill is a fill lagging the scrollbar that drives it. -->
                  <div class="sp-progress-fill" style="transition: none"></div>
                </div>
              </figcaption>
            </figure>
            <!-- The notes are what moves while the figure does not, and the height the pin
                 is spent on: sticky holds the figure for exactly this much scrolling. -->
            <div class="sp-stack sp-context" data-part="notes" style="gap: 10px; height: ${r}px; padding: 14px; overflow: hidden">
              ${s(`Bed`,3)} ${s(`Course`,3)} ${s(`Cap`,3)}
            </div>
          </div>
          ${o(`Finishing the cap`,6)}
        </div>
      </div>
    </div>
  `;let l=e(a,`page`),u=e(a,`section`),d=e(a,`figure`),f=e(a,`caption`),p=e(a,`counter`),m=e(a,`spent`),h=e(a,`readout`),g=[1,2,3].map(t=>e(a,`course-${t}`)),_=()=>{let e=-t(u,l).top,n=u.offsetHeight-d.offsetHeight,r=e>.5&&e<n-.5,a=Math.min(Math.max(e/n,0),1),o=a<1/3?1:a<2/3?2:3;d.dataset.pin=r?`pinned`:e<=.5?`before`:`after`,d.dataset.step=String(o);let[s,c]=i[o-1]??i[0];f.textContent=s,p.textContent=c,m.style.setProperty(`--sp-value`,`${Math.round(a*100)}%`);for(let[e,t]of g.entries())t.style.setProperty(`--sp-swatch`,e<o?`var(--sp-accent)`:`var(--sp-line)`);h.textContent=r?`Pinned`:e<=.5?`Not pinned`:`Released`};l.addEventListener(`scroll`,_),_()}export{l as mount};