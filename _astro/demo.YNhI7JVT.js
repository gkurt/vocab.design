import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n={w:440,h:208},r=32,i=[{key:`mail`,name:`Mail`,glyph:`inbox`,wash:`linear-gradient(160deg, #5b8def, #2f5bd0)`,pinned:!0},{key:`calendar`,name:`Calendar`,glyph:`calendar`,wash:`linear-gradient(160deg, #ef7c5c, #d1492f)`,pinned:!0},{key:`notes`,name:`Notes`,glyph:`pencil`,wash:`linear-gradient(160deg, #f2b134, #d18e12)`,pinned:!0},{key:`settings`,name:`Settings`,glyph:`sliders`,wash:`linear-gradient(160deg, #8c95a6, #626b7c)`,pinned:!0},{key:`preview`,name:`Preview`,glyph:`eye`,wash:`linear-gradient(160deg, #4fc3a1, #1f8f74)`,pinned:!1}],a=i.filter(e=>e.pinned);function o(o){let s=e=>`
    <button
      type="button"
      data-part="tile-${e.key}"
      aria-label="${e.name}"
      style="display: flex; flex-direction: column; align-items: center; gap: 3px; flex: 0 0 auto; padding: 0; border: 0;
             background: transparent; cursor: pointer"
    >
      <span
        style="display: flex; align-items: center; justify-content: center; width: ${r}px; height: ${r}px; border-radius: 9px;
               background: ${e.wash}; color: #ffffff; box-shadow: 0 2px 6px rgb(16 24 40 / 0.3)"
      >${t(e.glyph)}</span>
      <span
        data-part="dot-${e.key}"
        style="width: 5px; height: 5px; border-radius: 50%; background: #ffffff; box-shadow: 0 0 3px rgb(16 24 40 / 0.4);
               opacity: 0; transition: opacity 0.2s"
      ></span>
    </button>`,c=e=>`
    <span
      data-part="divider-${e}"
      aria-hidden="true"
      style="flex: 0 0 auto; width: 2px; height: 28px; border-radius: 1px; background: rgb(255 255 255 / 0.45)"
    ></span>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 296px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Desktop</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 10px 12px">
          <div
            style="position: relative; width: ${n.w}px; height: ${n.h}px; border-radius: 8px; overflow: hidden;
                   background: linear-gradient(165deg, #2f3b63 0%, #4a5a92 54%, #7d6ba8 100%)"
          >
            <div
              class="sp-context"
              data-part="window"
              data-front="preview"
              style="position: absolute; left: 36px; top: 16px; width: 250px; height: 96px; border-radius: 8px; padding: 8px 10px;
                     background: rgb(255 255 255 / 0.9); border: 1px solid rgb(255 255 255 / 0.5); box-shadow: 0 6px 18px rgb(16 24 40 / 0.28)"
            >
              <span class="sp-heading" data-part="window-title" style="font-size: 12px; color: #23262b">Preview</span>
              <div class="sp-stack" style="gap: 6px; margin-top: 9px">
                <span class="sp-line" style="width: 88%; background: rgb(35 38 43 / 0.18)"></span>
                <span class="sp-line" style="width: 62%; background: rgb(35 38 43 / 0.18)"></span>
                <span class="sp-line" style="width: 74%; background: rgb(35 38 43 / 0.18)"></span>
              </div>
            </div>

            <div
              class="sp-row"
              data-part="dock"
              data-subject
              data-front="preview"
              data-running="1"
              style="position: absolute; left: 50%; bottom: 10px; translate: -50% 0; align-items: flex-end; gap: 8px;
                     padding: 6px 8px; border-radius: 14px; background: rgb(255 255 255 / 0.22);
                     border: 1px solid rgb(255 255 255 / 0.32); backdrop-filter: blur(8px)"
            >
              ${a.map(s).join(``)}
              ${c(1)}
              ${i.filter(e=>!e.pinned).map(s).join(``)}
              ${c(2)}
              <button
                type="button"
                data-part="tile-trash"
                aria-label="Trash"
                style="display: flex; flex-direction: column; align-items: center; gap: 3px; flex: 0 0 auto; padding: 0; border: 0;
                       background: transparent; cursor: pointer"
              >
                <span
                  style="display: flex; align-items: center; justify-content: center; width: ${r}px; height: ${r}px;
                         border-radius: 9px; background: rgb(255 255 255 / 0.26); color: #ffffff"
                >${t(`trash`)}</span>
                <span style="width: 5px; height: 5px"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(o,`dock`),u=e(o,`window`),d=e(o,`window-title`),f=new Set([`preview`]),p=()=>{for(let t of i){let n=e(o,`dot-${t.key}`);n.style.opacity=f.has(t.key)?`1`:`0`}l.dataset.running=String(f.size)},m=e=>{let t=i.find(t=>t.key===e);t&&(f.add(t.key),l.dataset.front=t.key,u.dataset.front=t.key,d.textContent=t.name,p())};for(let t of i)e(o,`tile-${t.key}`).addEventListener(`click`,()=>m(t.key));p()}export{o as mount};