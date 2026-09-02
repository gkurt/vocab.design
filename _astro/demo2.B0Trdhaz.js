import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=`font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px`,r=20,i={key:`color: #a06ee0`,str:`color: #2f9560`,num:`color: #b8762f`,fn:`color: var(--sp-accent)`,com:`color: var(--sp-muted)`,txt:`color: var(--sp-ink)`},a=[{n:1,tokens:[[`// tally the day's rows`,`com`]]},{n:2,tokens:[[`const`,`key`],[` rows = `,`txt`],[`load`,`fn`],[`(`,`txt`],[`'day.csv'`,`str`],[`)`,`txt`]]},{n:3,tokens:[[`function`,`key`],[` `,`txt`],[`summarise`,`fn`],[`(rows) {`,`txt`]]},{n:4,inBlock:!0,tokens:[[`  let`,`key`],[` total = `,`txt`],[`0`,`num`]]},{n:5,inBlock:!0,tokens:[[`  for`,`key`],[` (`,`txt`],[`const`,`key`],[` r `,`txt`],[`of`,`key`],[` rows) total += r.n`,`txt`]]},{n:6,inBlock:!0,tokens:[[`  return`,`key`],[` total`,`txt`]]},{n:7,tokens:[[`}`,`txt`]]},{n:8,tokens:[[`summarise`,`fn`],[`(rows)`,`txt`]]}];function o(o){let s=e=>e.map(([e,t])=>`<span style="${i[t]}">${e}</span>`).join(``),c=e=>`<span
        data-part="gut-${e}"
        style="position: relative; flex: 0 0 auto; width: 36px; padding-right: 8px; text-align: right;
               ${n}; font-size: 11px; color: var(--sp-muted)"
      >${e===3?`<button
             type="button"
             data-part="fold"
             data-aim
             aria-label="Fold function body"
             style="position: absolute; left: 3px; top: 2px; display: flex; align-items: center; justify-content: center;
                    width: 16px; height: 16px; padding: 0; border: 0; border-radius: 3px; background: transparent;
                    color: var(--sp-muted); cursor: pointer"
           >${t(`chevronDown`)}</button>`:``}${e}</span>`,l=e=>`
    <div
      data-part="row-${e.n}"
      style="display: flex; align-items: center; height: ${r}px; border-radius: 3px; cursor: text"
    >
      ${c(e.n)}
      <span
        data-part="code-${e.n}"
        style="flex: 1 1 auto; min-width: 0; padding-left: 10px; ${n}; white-space: pre; overflow: hidden"
      >${s(e.tokens)}${e.n===3?`<button
               type="button"
               data-part="unfold"
               aria-label="Expand function body"
               hidden
               style="margin-left: 8px; padding: 0 6px; height: 14px; border: 1px solid var(--sp-line); border-radius: 4px;
                      background: var(--sp-sunken); color: var(--sp-muted); font: inherit; font-size: 10px; line-height: 12px;
                      vertical-align: middle; cursor: pointer">···</button>`:``}</span>
    </div>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">summarise.ts</span>
          <span class="sp-label">TypeScript</span>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div
            class="sp-surface"
            data-part="pane"
            data-subject
            data-folded="false"
            role="group"
            aria-label="Editor"
            style="position: relative; height: 174px; overflow: hidden"
          >
            <span
              aria-hidden="true"
              style="position: absolute; left: 0; top: 0; bottom: 0; width: 36px;
                     background: var(--sp-sunken); border-right: 1px solid var(--sp-line)"
            ></span>
            <div style="position: relative; padding: 4px 0">
              ${a.filter(e=>!e.inBlock&&e.n<4).map(l).join(``)}
              <div data-part="block">${a.filter(e=>e.inBlock).map(l).join(``)}</div>
              ${a.filter(e=>!e.inBlock&&e.n>3).map(l).join(``)}
            </div>
          </div>
        </div>
        <div
          class="sp-row sp-context"
          style="flex: 0 0 auto; gap: 12px; padding: 4px 12px; border-top: 1px solid var(--sp-line); background: var(--sp-surface)"
        >
          <span class="sp-label sp-grow" data-part="pos" data-line="1">Ln 1, Col 24</span>
          <span class="sp-label">Spaces: 2</span>
        </div>
      </div>
    </div>
  `;let u=e(o,`pane`),d=e(o,`block`),f=e(o,`fold`),p=e(o,`unfold`),m=e(o,`pos`),h=o.ownerDocument.createElement(`span`);h.className=`sp-caret`,h.dataset.part=`caret`,h.setAttribute(`aria-hidden`,`true`),h.style.marginLeft=`1px`;let g=1,_=t=>{g=t;let n=a.find(e=>e.n===t),r=n?n.tokens.map(([e])=>e).join(``).length+1:1;for(let n of a){let r=e(o,`row-${n.n}`),i=n.n===t;r.style.background=i?`var(--sp-accent-soft)`:`transparent`,e(o,`gut-${n.n}`).style.color=i?`var(--sp-ink)`:`var(--sp-muted)`}t===3?p.before(h):e(o,`code-${t}`).append(h),m.dataset.line=String(t),m.textContent=`Ln ${t}, Col ${r}`},v=e=>{d.hidden=e,f.hidden=e,p.hidden=!e,u.dataset.folded=String(e),e&&a.some(e=>e.inBlock&&e.n===g)&&_(3)};for(let t of a)e(o,`row-${t.n}`).addEventListener(`click`,()=>_(t.n));f.addEventListener(`click`,e=>{e.stopPropagation(),v(!0)}),p.addEventListener(`click`,e=>{e.stopPropagation(),v(!1)}),v(!1),_(1)}export{o as mount};