import{n as e}from"./parts.C-YLuC7Q.js";var t=25,n=65,r=45,i=5,a=e=>e.map(e=>`<div class="sp-line" style="width: ${e}%"></div>`).join(``);function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 420px; height: 276px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">index.html</span><span class="sp-label">Saved</span></div>
        <div class="sp-row" data-part="split" style="flex: 1 1 auto; gap: 0; min-height: 0; align-items: stretch">
          <div
            class="sp-stack sp-context"
            data-part="pane-editor"
            id="vd-sp-editor"
            style="width: ${r}%; flex: 0 0 auto; gap: 7px; padding: 12px; overflow: hidden"
          >
            <span class="sp-label" data-part="editor-label">Editor</span>
            ${a([88,64,78,52,70,44])}
          </div>
          <div
            data-part="splitter"
            data-subject
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize the editor"
            aria-controls="vd-sp-editor"
            aria-valuemin="${t}"
            aria-valuemax="${n}"
            aria-valuenow="${r}"
            tabindex="0"
            style="display: flex; align-items: center; justify-content: center; width: 9px; flex: 0 0 auto; background: var(--sp-sunken); border-left: 1px solid var(--sp-line); border-right: 1px solid var(--sp-line); cursor: col-resize; touch-action: none"
          ><span aria-hidden="true" style="width: 3px; height: 22px; border-radius: 999px; background: var(--sp-line)"></span></div>
          <div class="sp-stack sp-context sp-grow" data-part="pane-preview" style="gap: 8px; padding: 12px; background: var(--sp-sunken); overflow: hidden">
            <span class="sp-label">Preview</span>
            <div class="sp-surface sp-stack" style="gap: 6px; padding: 10px">
              <span class="sp-heading" style="font-size: 13px">Harbour survey</span>
              ${a([92,74])}
            </div>
            <div class="sp-surface sp-stack" style="gap: 6px; padding: 10px">${a([80,60])}</div>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="flex: 0 0 auto; padding: 7px 12px; border-top: 1px solid var(--sp-line)">
          <span class="sp-label">UTF-8</span>
          <span class="sp-label" data-part="readout" style="width: 96px; text-align: right; font-variant-numeric: tabular-nums">Editor ${r}%</span>
        </div>
      </div>
    </div>
  `;let s=e(o,`split`),c=e(o,`splitter`),l=e(o,`pane-editor`),u=e(o,`readout`),d=r,f,p=e=>{d=Math.round(Math.min(n,Math.max(t,e))),l.style.width=`${d}%`,c.setAttribute(`aria-valuenow`,String(d)),c.setAttribute(`aria-valuetext`,`Editor ${d} percent`),u.textContent=`Editor ${d}%`};c.addEventListener(`pointerdown`,e=>{e.isTrusted&&c.setPointerCapture(e.pointerId);let t=c.getBoundingClientRect();f=e.clientX-(t.left+t.width/2)}),o.addEventListener(`pointermove`,e=>{if(f===void 0)return;let t=s.getBoundingClientRect();t.width!==0&&p((e.clientX-f-t.left)/t.width*100)});let m=()=>{f=void 0};o.addEventListener(`pointerup`,m),o.addEventListener(`pointercancel`,m),c.addEventListener(`dblclick`,()=>p(r)),c.addEventListener(`keydown`,e=>{if(e.key===`ArrowRight`||e.key===`ArrowDown`)p(d+i);else if(e.key===`ArrowLeft`||e.key===`ArrowUp`)p(d-i);else if(e.key===`Home`)p(t);else if(e.key===`End`)p(n);else return;e.preventDefault()}),p(r)}export{o as mount};