import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";function n(e,t){let n=e.getAttribute(`aria-labelledby`),r=n?t.querySelector(`#${n}`)?.textContent?.trim():``;if(r)return{name:r,source:`labelledby`,note:`aria-labelledby, text borrowed from elsewhere`};let i=e.getAttribute(`aria-label`)?.trim();if(i)return{name:i,source:`aria-label`,note:`aria-label, written for this control alone`};let a=e.id?t.querySelector(`label[for="${e.id}"]`)?.textContent?.trim():``;if(a)return{name:a,source:`label`,note:`its <label for>, the same words the reader sees`};let o=e.textContent?.trim();return o?{name:o,source:`content`,note:`its own text content`}:{name:`(no name)`,source:`none`,note:`nothing named it, so it announces as “button”`}}var r=[`control-input`,`control-icon`,`control-text`];function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 400px">
        <div class="sp-row" style="gap: 12px; align-items: flex-end">
          <div class="sp-field sp-grow">
            <label class="sp-label" for="vd-an-project">Project name</label>
            <input class="sp-input" id="vd-an-project" data-part="control-input" value="Harbour" readonly />
          </div>
          <button class="sp-icon-button" type="button" aria-label="Delete draft" data-part="control-icon" data-subject>
            ${t(`trash`)}
          </button>
          <button class="sp-button" type="button" data-part="control-text">Publish</button>
        </div>
        <div class="sp-surface sp-context" style="margin-top: 16px; padding: 10px 12px">
          <span class="sp-label">Accessible name</span>
          <div data-part="readout" data-source="none">
            <p class="sp-text sp-text--ink" data-part="computed" style="margin: 4px 0 0; height: 20px">No control inspected</p>
            <p class="sp-text" data-part="from" style="margin: 2px 0 0; height: 20px; font-size: 12px"></p>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(i,`readout`),o=e(i,`computed`),s=e(i,`from`),c=e=>{let t=n(e,i);a.dataset.source=t.source,o.textContent=`“${t.name}”`,s.textContent=`from ${t.note}`};for(let t of r){let n=e(i,t);n.addEventListener(`pointerenter`,()=>c(n)),n.addEventListener(`click`,()=>c(n))}}export{i as mount};