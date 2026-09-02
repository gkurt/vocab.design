import{n as e}from"./parts.C-YLuC7Q.js";var t=[{key:`pdf`,label:`PDF document`},{key:`png`,label:`PNG image`},{key:`svg`,label:`SVG vector`},{key:`csv`,label:`CSV table`},{key:`json`,label:`JSON data`}];function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 272px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Export</span></div>
        <div class="sp-body">
          <div class="sp-label sp-context" id="fmt-label" style="margin-bottom: 6px">Format</div>
          <ul
            class="sp-listbox sp-listbox--static"
            data-part="listbox"
            data-subject
            role="listbox"
            tabindex="0"
            aria-labelledby="fmt-label"
            style="height: 172px; max-height: none; overflow: hidden"
          >${t.map(({key:e,label:t})=>`
      <li class="sp-option" role="option" id="fmt-${e}" data-part="opt-${e}" aria-selected="false">${t}</li>`).join(``)}</ul>
        </div>
      </div>
    </div>
  `;let r=e(n,`listbox`),i=t.map(({key:t})=>e(n,`opt-${t}`)),a=e=>{for(let t of i)t.setAttribute(`aria-selected`,String(t===e));r.setAttribute(`aria-activedescendant`,e.id)};for(let e of i)e.addEventListener(`click`,()=>a(e));r.addEventListener(`keydown`,e=>{let t=i.findIndex(e=>e.getAttribute(`aria-selected`)===`true`),n=i.length-1,r=t;if(e.key===`ArrowDown`)r=Math.min(n,t+1);else if(e.key===`ArrowUp`)r=Math.max(0,t-1);else if(e.key===`Home`)r=0;else if(e.key===`End`)r=n;else return;e.preventDefault();let o=i[r];o&&a(o)});let o=i[0];o&&a(o)}export{n as mount};