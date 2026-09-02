import{n as e,t}from"./parts.C-YLuC7Q.js";var n=192,r=`background: var(--sp-line); border-radius: 2px`,i=`background: color-mix(in srgb, var(--sp-muted) 55%, transparent); border-radius: 2px`,a={"list-detail":`
    <span style="display: flex; gap: 3px; width: 100%; height: 100%">
      <span style="flex: 0 0 30px; ${r}"></span>
      <span style="flex: 1 1 auto; ${i}"></span>
    </span>`,"supporting-pane":`
    <span style="display: flex; gap: 3px; width: 100%; height: 100%">
      <span style="flex: 1 1 auto; ${i}"></span>
      <span style="flex: 0 0 26px; ${r}"></span>
    </span>`,feed:`
    <span style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px; width: 100%; height: 100%">
      <span style="${i}"></span><span style="${i}"></span>
      <span style="${i}"></span><span style="${i}"></span>
    </span>`},o=[[`list-detail`,`list detail`],[`supporting-pane`,`supporting pane`],[`feed`,`feed`]],s=[92,84,96,71,88],c=[95,88,74,92,66,81],l=e=>`
  <span style="flex: 0 0 auto; height: 18px; border-radius: 4px; border: 1px solid var(--sp-line);
               background: var(--sp-${e?`accent-soft`:`surface`})"></span>`,u=()=>`
  <span class="sp-surface" style="display: flex; flex-direction: column; justify-content: flex-end; gap: 5px; height: 48px; padding: 7px 8px">
    <span class="sp-line" style="width: 78%; height: 6px"></span>
    <span class="sp-line" style="width: 52%; height: 6px"></span>
  </span>`,d=e=>e.map(e=>`<span class="sp-line" style="flex: 0 0 auto; width: ${e}%; height: 7px"></span>`).join(``),f=([e,t])=>`
  <button
    class="sp-button sp-button--ghost"
    type="button"
    data-part="pick-${e}"
    data-key="${e}"
    style="display: flex; flex-direction: column; gap: 4px; width: 128px; padding: 5px; font-size: 11px"
  >
    <span style="width: 100%; height: 26px">${a[e]}</span>
    <span>${t}</span>
  </button>`;function p(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 258px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Canonical layouts</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div style="display: flex; gap: 14px; flex: 0 0 auto; width: 440px; height: ${n}px">
            <div class="sp-stack sp-context" style="flex: 0 0 auto; width: 128px; gap: 6px">
              ${o.map(f).join(``)}
            </div>
            <div
              data-part="pane"
              data-subject
              data-arrangement="list-detail"
              style="flex: 1 1 auto; min-width: 0; height: 100%; overflow: hidden; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              <div data-part="arr-list-detail" style="display: flex; height: 100%">
                <div
                  data-part="list-column"
                  style="display: flex; flex-direction: column; gap: 6px; flex: 0 0 100px; padding: 9px 8px;
                         border-right: 1px solid var(--sp-line); background: var(--sp-sunken)"
                >
                  ${[!1,!0,!1,!1,!1].map(l).join(``)}
                </div>
                <div data-part="detail-pane" style="display: flex; flex-direction: column; gap: 9px; flex: 1 1 auto; min-width: 0; padding: 12px">
                  <span class="sp-heading" style="flex: 0 0 auto; font-size: 12px">Berth 2</span>
                  ${d(s)}
                </div>
              </div>
              <div data-part="arr-supporting-pane" hidden style="display: flex; height: 100%">
                <div style="display: flex; flex-direction: column; gap: 9px; flex: 1 1 auto; min-width: 0; padding: 12px">
                  <span class="sp-heading" style="flex: 0 0 auto; font-size: 12px">Transfer notes</span>
                  ${d(c)}
                </div>
                <div
                  data-part="support-rail"
                  style="display: flex; flex-direction: column; gap: 8px; flex: 0 0 92px; padding: 9px 8px;
                         border-left: 1px solid var(--sp-line); background: var(--sp-sunken)"
                >
                  <span class="sp-label" style="font-size: 10px">tools</span>
                  ${[0,1,2].map(()=>`<span style="flex: 0 0 auto; height: 34px; border-radius: 5px; border: 1px solid var(--sp-line); background: var(--sp-surface)"></span>`).join(``)}
                </div>
              </div>
              <div data-part="arr-feed" hidden style="height: 100%; padding: 10px">
                <div data-part="feed-grid" class="sp-grid" style="grid-template-columns: 1fr 1fr">
                  ${[0,1,2,3,4,5].map(u).join(``)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`pane`),p=o.map(([t])=>[t,e(r,`arr-${t}`)]),m=o.map(([t])=>e(r,`pick-${t}`)),h=e=>{if(e in a){i.dataset.arrangement=e;for(let[n,r]of p)t(r,`hidden`,n!==e);for(let n of m)t(n,`data-selected`,n.dataset.key===e)}};for(let e of m)e.addEventListener(`click`,()=>h(e.dataset.key??`list-detail`));h(`list-detail`)}export{p as mount};