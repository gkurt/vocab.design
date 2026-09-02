import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=104,r=44,i=60,a=[[`Tide tables`,`Chart 4`],[`Harbour approach`,`Chart 5`],[`Buoyage`,`Chart 6`],[`Night passage`,`Chart 7`],[`Anchorages`,`Chart 8`],[`Ferry lanes`,`Chart 9`],[`Shoals`,`Chart 10`],[`Lighthouses`,`Chart 11`],[`Wind roses`,`Chart 12`]],o=(e,t,n)=>e+(t-e)*n;function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 372px; height: 262px; position: relative">
        <div class="sp-scroll" data-part="page" style="height: 100%; padding-top: ${n}px">
          <ul class="sp-list sp-context" data-part="rows" style="padding: 0 8px 12px">${a.map(([e,t])=>`
      <li class="sp-list-item">
        <span class="sp-grow">${e}</span>
        <span class="sp-text">${t}</span>
      </li>`).join(``)}</ul>
        </div>
        <header
          data-part="bar"
          data-subject
          data-state="expanded"
          style="position: absolute; top: 0; left: 0; right: 0; height: ${n}px; overflow: hidden;
                 background: var(--sp-surface); border-bottom: 1px solid var(--sp-line)"
        >
          <span
            data-part="wash"
            aria-hidden="true"
            style="position: absolute; inset: 0; background: linear-gradient(160deg, var(--sp-accent-soft), var(--sp-sunken))"
          ></span>
          <button class="sp-icon-button" type="button" data-part="back" style="position: absolute; top: 8px; left: 6px">
            ${t(`chevronLeft`)}
          </button>
          <span class="sp-label" style="position: absolute; top: 14px; right: 12px">9 charts</span>
          <span
            data-part="title"
            style="position: absolute; left: 14px; bottom: 12px; font-size: 20px; font-weight: 600; white-space: nowrap;
                   transform-origin: left bottom"
          >Coastal charts</span>
        </header>
      </div>
    </div>
  `;let c=e(s,`page`),l=e(s,`bar`),u=e(s,`wash`),d=e(s,`title`),f=()=>{let e=Math.min(Math.max(c.scrollTop/i,0),1);l.style.height=`${o(n,r,e)}px`,u.style.opacity=String(1-e),d.style.left=`${o(14,40,e)}px`,d.style.transform=`scale(${o(1,.66,e)})`,l.dataset.state=e<.02?`expanded`:e>.98?`collapsed`:`collapsing`};c.addEventListener(`scroll`,f),f()}export{s as mount};