import{n as e}from"./parts.C-YLuC7Q.js";import"./combobox.9HjM0ItI.js";var t=[`Belgium`,`Denmark`,`Estonia`,`Namibia`,`Netherlands`,`New Zealand`,`Nigeria`,`Norway`,`Portugal`,`Senegal`];function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 280px">
        <div class="sp-field">
          <label class="sp-label sp-context" for="country">Ship to</label>
          <sp-combobox data-part="combobox" data-subject>
            <input class="sp-input" id="country" data-part="input" placeholder="Start typing a country" />
            <ul class="sp-listbox" data-part="listbox">${t.map(e=>`<li class="sp-option">${e}</li>`).join(``)}</ul>
          </sp-combobox>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="hint" style="margin-top: 10px">Free text in, one value out.</p>
      </div>
    </div>
  `;let r=e(n,`hint`);e(n,`combobox`).addEventListener(`select`,e=>{r.textContent=`Shipping to ${e.detail}.`})}export{n as mount};