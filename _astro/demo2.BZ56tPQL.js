import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=116,i=98,a=4,o=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,`-`),s=[{name:`United States`,states:[{name:`California`,cities:[`Oakland`,`Fresno`,`San Jose`]},{name:`Texas`,cities:[`Austin`,`Dallas`,`El Paso`]}]},{name:`Canada`,states:[{name:`Ontario`,cities:[`Ottawa`,`Kingston`]},{name:`Quebec`,cities:[`Laval`,`Gatineau`]}]},{name:`Mexico`,states:[{name:`Jalisco`,cities:[`Zapopan`,`Tonala`]},{name:`Sonora`,cities:[`Hermosillo`,`Guaymas`]}]}],c=e=>8+r*e+(e-1);function l(l){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 286px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Shipping address</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 14px 16px">
          <span class="sp-label sp-context" id="vd-cascader-label" style="font-size: 11px">Region</span>

          <div style="position: relative; flex: 0 0 auto; width: 306px">
            <button
              class="sp-button sp-button--ghost sp-row sp-row--between"
              type="button"
              data-part="field"
              role="combobox"
              aria-haspopup="tree"
              aria-expanded="false"
              aria-labelledby="vd-cascader-label"
              style="width: 100%; gap: 8px; font-size: 12.5px"
            >
              <span
                class="sp-grow"
                data-part="path"
                data-depth="0"
                data-value="none"
                style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left; color: var(--sp-muted)"
                >Choose a region</span
              >
              ${n(`chevronDown`)}
            </button>

            <div
              class="sp-popover"
              data-part="panel"
              data-subject
              data-pose="[data-levels='2'], [data-levels='3']"
              data-levels="1"
              role="tree"
              aria-label="Region"
              style="min-width: 0; width: ${c(1)}px; left: 0; top: calc(100% + 8px); padding: ${a}px;
                     --sp-arrow-x: 18px; transition: width 0.2s var(--sp-ease), opacity 0.18s, visibility 0.18s, transform 0.18s var(--sp-ease)"
            >
              <div class="sp-row" style="gap: 0; align-items: stretch">
                <ul
                  class="sp-list sp-scroll"
                  data-part="col-1"
                  role="group"
                  style="flex: 0 0 auto; width: ${r}px; height: ${i}px; margin: 0; padding: 0; list-style: none"
                ></ul>
                <ul
                  class="sp-list sp-scroll"
                  data-part="col-2"
                  role="group"
                  hidden
                  style="flex: 0 0 auto; width: ${r}px; height: ${i}px; margin: 0; padding: 0 0 0 1px; list-style: none;
                         border-left: 1px solid var(--sp-line)"
                ></ul>
                <ul
                  class="sp-list sp-scroll"
                  data-part="col-3"
                  role="group"
                  hidden
                  style="flex: 0 0 auto; width: ${r}px; height: ${i}px; margin: 0; padding: 0 0 0 1px; list-style: none;
                         border-left: 1px solid var(--sp-line)"
                ></ul>
              </div>
            </div>
          </div>

          <span class="sp-grow"></span>

          <div class="sp-row sp-context" style="gap: 8px; flex: 0 0 auto">
            <span class="sp-label" style="font-size: 11px; white-space: nowrap">Delivers to</span>
            <span
              class="sp-text sp-text--ink"
              data-part="delivers"
              data-city="none"
              style="flex: 1 1 auto; min-width: 0; height: 18px; font-size: 12px; line-height: 18px; white-space: nowrap; overflow: hidden"
              >Nowhere yet</span
            >
          </div>
        </div>
      </div>
    </div>
  `;let u=e(l,`field`),d=e(l,`panel`),f=e(l,`path`),p=e(l,`delivers`),m=[1,2,3].map(t=>e(l,`col-${t}`)),h=[``,``,``],g=(e,t,r,i)=>`
    <li
      class="sp-option"
      data-part="opt-${o(t)}"
      data-level="${e}"
      data-name="${t}"
      role="treeitem"
      aria-selected="${r}"
      style="display: flex; align-items: center; gap: 6px; padding: 5px 7px; font-size: 12px; cursor: pointer"
    >
      <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${t}</span>
      ${i?`<span style="display: flex; flex: 0 0 auto; color: var(--sp-muted)">${n(`chevronRight`)}</span>`:``}
    </li>`,_=()=>{let e=s.find(e=>e.name===h[0]),t=e?.states.find(e=>e.name===h[1]),n=t?3:e?2:1,r=[s.map(e=>g(1,e.name,e.name===h[0],!0)).join(``),(e?.states??[]).map(e=>g(2,e.name,e.name===h[1],!0)).join(``),(t?.cities??[]).map(e=>g(3,e,e===h[2],!1)).join(``)];for(let[e,t]of m.entries())t.innerHTML=r[e]??``,t.toggleAttribute(`hidden`,e+1>n);d.dataset.levels=String(n),d.style.width=`${c(n)}px`},v=e=>{t(d,`data-open`,e),u.setAttribute(`aria-expanded`,String(e))},y=()=>{let e=h.filter(Boolean).join(` / `);f.dataset.depth=String(h.filter(Boolean).length),f.dataset.value=o(h[2]??``)||`none`,f.textContent=e,f.style.color=`var(--sp-ink)`,p.dataset.city=o(h[2]??``)||`none`,p.textContent=e,v(!1)};d.addEventListener(`click`,e=>{let t=e.target?.closest(`[data-level]`);if(!t)return;let n=Number(t.dataset.level);h[n-1]=t.dataset.name??``;for(let e=n;e<h.length;e+=1)h[e]=``;_(),n===3&&y()}),u.addEventListener(`click`,()=>v(!0)),l.addEventListener(`pointerdown`,e=>{let t=e.target;!d.contains(t)&&!u.contains(t)&&v(!1)}),l.addEventListener(`keydown`,e=>{e.key===`Escape`&&v(!1)}),_()}export{l as mount};