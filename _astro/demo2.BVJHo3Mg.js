import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=320,r=12,i=12,a=1,o=440,s=292,c=176,l=e=>e-24-2,u=[{key:`narrower`,label:`narrower`,page:s,stretch:!0,sidebar:!1},{key:`stretched`,label:`stretched`,page:o,stretch:!0,sidebar:!1},{key:`designed`,label:`designed`,page:o,stretch:!1,sidebar:!0}],d=[100,96,92,100,88,97,94,100,72],f=[`Overview`,`Tides`,`Berths`,`Fuel`];function p(s){s.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 242px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Wide screen</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="screens" data-value="designed" data-axis="Treatment" data-term="designed">
            ${u.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 10px; font-size: 11px">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div style="display: flex; justify-content: center; width: ${o}px; height: ${c}px">
            <div
              data-part="page"
              data-screen="wide"
              style="display: flex; align-items: stretch; justify-content: center; gap: ${r}px; width: ${o}px; height: ${c}px;
                     padding: ${i}px; background: var(--sp-surface); border: ${a}px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              <div
                data-part="column"
                data-subject
                data-cap="held"
                data-pose="[data-cap=held]"
                style="display: flex; flex-direction: column; gap: 6px; flex: 0 0 auto; width: ${n}px"
              >
                <div style="width: 54%; height: 11px; border-radius: 5px; background: color-mix(in oklab, var(--sp-ink) 58%, transparent)"></div>
                ${d.map(e=>`<div class="sp-line" style="width: ${e}%; height: 6px"></div>`).join(``)}
              </div>

              <div
                data-part="sidebar"
                class="sp-context"
                style="display: flex; flex-direction: column; gap: 6px; flex: 0 0 auto; width: 82px; padding: 8px;
                       background: var(--sp-sunken); border-radius: 6px"
              >
                <span class="sp-label" style="font-size: 10px">On this page</span>
                ${f.map(e=>`<span class="sp-nav-item" style="padding: 3px 5px; font-size: 10px">${e}</span>`).join(``)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;let p=e(s,`page`),m=e(s,`column`),h=e(s,`sidebar`),g=e(s,`note`),_=e=>{let r=u.find(t=>t.key===e);if(!r)return;let i=l(r.page);t(h,`hidden`,!r.sidebar),p.style.width=`${r.page}px`,p.dataset.screen=r.page>=o?`wide`:`narrow`,m.style.width=`${r.stretch?i:n}px`;let a=m.offsetWidth;m.dataset.cap=a>322?`over`:a<318?`under`:`held`,g.textContent=m.dataset.cap===`under`?`A ${r.page}px page: the column has not reached its ${n}px cap.`:m.dataset.cap===`over`?`A ${r.page}px page, and the column has taken all ${a}px of it.`:`The column holds at ${n}px, and the surplus becomes a sidebar.`};e(s,`screens`).addEventListener(`change`,e=>_(e.detail)),_(`designed`)}export{p as mount};