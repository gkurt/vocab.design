import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=264,r=164,i=214,a=108,o=148,s=62,c={page:{box:`page`,position:`absolute`,verdict:`the page`},card:{box:`card`,position:`absolute`,verdict:`the card`},cell:{box:`cell`,position:`absolute`,verdict:`the cell`},transform:{box:`card`,position:`fixed`,verdict:`the card, by transform`}},l=(e,t)=>`
  <button class="sp-segment" type="button" data-part="seg-${e}" value="${e}" style="padding: 4px 8px; font-size: 11px">
    ${t}
  </button>`,u=e=>`<span class="sp-label" style="flex: 0 0 auto; height: 16px; padding: 2px 0 0 8px; font-size: 10px">${e}</span>`;function d(d){d.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 258px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Nested boxes</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="anchors" data-axis="Anchor" data-value="page">
            ${l(`page`,`none`)}${l(`card`,`card`)}${l(`cell`,`cell`)}${l(`transform`,`transform`)}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div
            data-part="page"
            style="position: relative; display: flex; flex-direction: column; flex: 0 0 auto; width: ${n}px;
                   height: ${r}px; background: var(--sp-surface); border: 1px solid var(--sp-line);
                   border-radius: var(--sp-radius)"
          >
            ${u(`page`)}
            <div
              data-part="card"
              style="position: static; display: flex; flex-direction: column; flex: 0 0 auto; width: ${i}px;
                     height: ${a}px; margin: 6px 0 0 18px; background: var(--sp-sunken);
                     border: 1px solid var(--sp-line); border-radius: 6px"
            >
              ${u(`card`)}
              <div
                data-part="cell"
                style="position: static; display: flex; flex-direction: column; flex: 0 0 auto; width: ${o}px;
                       height: ${s}px; margin: 6px 0 0 16px; background: var(--sp-surface);
                       border: 1px solid var(--sp-line); border-radius: 6px"
              >
                ${u(`cell`)}
                <span
                  class="sp-chip"
                  data-part="badge"
                  data-anchor="page"
                  data-position="absolute"
                  style="position: absolute; right: 8px; bottom: 8px; cursor: default; font-size: 11px;
                         background: var(--sp-accent); border-color: var(--sp-accent); color: var(--sp-accent-ink)"
                >absolute</span>
              </div>
            </div>
          </div>
          <div
            class="sp-context"
            style="display: flex; flex-direction: column; align-items: center; gap: 2px; flex: 0 0 auto; width: 100%; height: 20px"
          >
            <span style="display: flex; align-items: baseline; gap: 8px; flex: 0 0 auto; height: 20px">
              <span class="sp-label">Containing block</span>
              <span class="sp-heading" data-part="verdict" style="font-size: 13px"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;let f=e(d,`badge`),p=e(d,`verdict`),m={page:e(d,`page`),card:e(d,`card`),cell:e(d,`cell`)},h=e=>{let n=c[e];if(n){m.card.style.position=e===`card`||e===`cell`?`relative`:`static`,m.cell.style.position=e===`cell`?`relative`:`static`,m.card.style.transform=e===`transform`?`translateY(-4px)`:`none`,f.style.position=n.position,f.dataset.anchor=e,f.dataset.position=n.position,f.textContent=n.position;for(let[e,r]of Object.entries(m)){let i=e===n.box;t(r,`data-subject`,i),r.style.outline=i?`2px dashed var(--sp-accent)`:``,r.style.outlineOffset=i?`-1px`:``}p.textContent=n.verdict}};e(d,`anchors`).addEventListener(`change`,e=>h(e.detail)),h(`page`)}export{d as mount};