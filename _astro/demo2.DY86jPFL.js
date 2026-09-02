import{n as e}from"./parts.C-YLuC7Q.js";var t=[{key:`spaces`,text:`07700 900123`},{key:`plus`,text:`+44 7700 900 123`},{key:`dashes`,text:`0770-090-0123`}];function n(e){let t=e.replace(/\D/g,``);return t.startsWith(`44`)?t=t.slice(2):t.startsWith(`0`)&&(t=t.slice(1)),t.length===10?`+44 ${t.slice(0,4)} ${t.slice(4)}`:null}var r=e=>/^0\d{10}$/.test(e);function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 274px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Delivery details</span><span class="sp-label">1 of 2</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">

          <div class="sp-row sp-context" style="flex: 0 0 auto; height: 28px; gap: 6px">
            <span class="sp-label" style="font-size: 11px">Or fill it:</span>
            ${t.map(e=>`<button class="sp-chip" data-part="chip-${e.key}" type="button" style="font-size: 11px">${e.text}</button>`).join(``)}
          </div>

          <div class="sp-field" style="flex: 0 0 auto; gap: 4px">
            <label class="sp-label sp-context" for="vd-forgiving">Mobile number, typed any way</label>
            <div data-part="forgiving" data-subject data-state="empty">
              <input class="sp-input" id="vd-forgiving" data-part="forgiving-input" type="text" inputmode="tel" autocomplete="off" spellcheck="false" placeholder="Spaces, dashes and +44 all welcome" />
              <span class="sp-text" data-part="forgiving-readout" style="display: block; height: 16px; margin-top: 4px; font-size: 11px">Nothing typed yet.</span>
            </div>
          </div>

          <div class="sp-field sp-context" style="flex: 0 0 auto; gap: 4px">
            <label class="sp-label" for="vd-strict">Mobile number, strict</label>
            <div data-part="strict" data-state="empty">
              <input class="sp-input" id="vd-strict" data-part="strict-input" type="text" inputmode="tel" autocomplete="off" spellcheck="false" placeholder="11 digits, no spaces" />
              <span class="sp-text" data-part="strict-readout" style="display: block; height: 16px; margin-top: 4px; font-size: 11px">Waiting.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;let a=e(i,`forgiving`),o=e(i,`forgiving-input`),s=e(i,`forgiving-readout`),c=e(i,`strict`),l=e(i,`strict-input`),u=e(i,`strict-readout`),d=e=>{o.value=e,l.value=e;let t=n(e);e.length===0?(a.dataset.state=`empty`,s.textContent=`Nothing typed yet.`):t?(a.dataset.state=`accepted`,s.textContent=`Accepted. Stored as ${t}`):(a.dataset.state=`reading`,s.textContent=`Reading. Ten national digits are needed.`),e.length===0?(c.dataset.state=`empty`,u.textContent=`Waiting.`):r(e)?(c.dataset.state=`accepted`,u.textContent=`Accepted.`):(c.dataset.state=`rejected`,u.textContent=`Rejected. Enter a valid phone number.`)};o.addEventListener(`input`,()=>d(o.value)),l.addEventListener(`input`,()=>d(l.value));for(let n of t)e(i,`chip-${n.key}`).addEventListener(`click`,()=>d(n.text))}export{i as mount};