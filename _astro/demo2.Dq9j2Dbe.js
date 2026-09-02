import{n as e,t}from"./parts.C-YLuC7Q.js";var n=138,r=268,i=70,a=[`qwertyuiop`,`asdfghjkl`],o=`zxcvbnm`,s=[[`1`,`2`,`3`],[`4`,`5`,`6`],[`7`,`8`,`9`],[`.`,`0`,`back`]],c=`height: 22px; padding: 0; border-radius: 4px; background: var(--sp-surface); border: 1px solid var(--sp-line); font-size: 11px; font-weight: 500`,l=(e,t,n=1)=>`
  <button class="sp-button" type="button" data-part="key-${t}" style="flex: ${n} 1 0; color: var(--sp-ink); ${c}">${e}</button>`,u=e=>`<div class="sp-row" style="gap: 3px">${e}</div>`,d=[...a.map(e=>u([...e].map(e=>l(e,e)).join(``))),u(l(`⇧`,`shift`,1.5)+[...o].map(e=>l(e,e)).join(``)+l(`⌫`,`back`,1.5)),u(l(`123`,`digits-key`,1.6)+l(`space`,`space`,4)+l(`Pay`,`enter`,1.8))].join(``),f=e=>l(e===`back`?`⌫`:e,e),p=s.map(e=>u(e.map(f).join(``))).join(``),m=(e,t,n)=>`
  <div class="sp-field" data-part="field-${e}-wrap">
    <span class="sp-label">${t}</span>
    <div
      data-part="field-${e}"
      role="textbox"
      aria-label="${t}"
      style="display: flex; align-items: center; height: 28px; padding: 0 9px; background: var(--sp-surface);
             border: 1px solid var(--sp-line); border-radius: 6px; font-size: 13px; cursor: text"
    >
      <span data-part="value-${e}"></span><span class="sp-caret" data-part="caret-${e}" hidden></span>
    </div>
    <span class="sp-label" style="font-size: 10px">${n}</span>
  </div>`;function h(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-row" style="gap: 22px; align-items: center">
        <div
          data-part="phone"
          style="position: relative; width: 214px; height: 288px; flex: 0 0 auto; overflow: hidden;
                 background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 18px"
        >
          <div class="sp-row sp-row--between sp-context" style="height: 20px; padding: 0 12px">
            <span class="sp-label" style="font-size: 10px">9:41</span>
            <span class="sp-label" style="font-size: 10px">Checkout</span>
          </div>

          <div
            data-part="viewport"
            style="position: absolute; left: 0; right: 0; top: 20px; bottom: 0; overflow: hidden;
                   background: var(--sp-sunken); transition: bottom 0.26s var(--sp-ease)"
          >
            <div style="position: absolute; left: 0; right: 0; top: 0; bottom: 40px; overflow: hidden">
              <div
                class="sp-stack sp-context"
                data-part="form"
                style="gap: 10px; padding: 10px; transition: transform 0.26s var(--sp-ease)"
              >
                ${m(`card`,`Card number`,`inputmode="numeric"`)}
                ${m(`name`,`Name on card`,`inputmode="text"`)}
                <span class="sp-text" style="font-size: 10px">Billed once. Cancel any time.</span>
              </div>
            </div>
            <div
              class="sp-row sp-context"
              data-part="paybar"
              style="position: absolute; left: 0; right: 0; bottom: 0; height: 40px; padding: 6px 10px;
                     background: var(--sp-surface); border-top: 1px solid var(--sp-line)"
            >
              <button class="sp-button sp-button--sm sp-grow" type="button" data-part="pay">Pay 42.00</button>
            </div>
          </div>

          <div
            data-part="keyboard"
            data-subject
            data-layout="text"
            role="group"
            aria-label="On screen keyboard"
            style="position: absolute; left: 0; right: 0; bottom: 0; height: ${n}px; background: var(--sp-bg);
                   border-top: 1px solid var(--sp-line); transform: translateY(100%); visibility: hidden;
                   transition: transform 0.26s var(--sp-ease), visibility 0.26s"
          >
            <div class="sp-row" style="height: 26px; gap: 6px; padding: 0 8px; border-bottom: 1px solid var(--sp-line)">
              <span class="sp-label sp-grow" data-part="kb-name" style="font-size: 10px">Letters</span>
              <button class="sp-button sp-button--quiet" type="button" data-part="next" style="padding: 2px 8px; font-size: 11px">Next</button>
              <button class="sp-button sp-button--quiet" type="button" data-part="done" style="padding: 2px 8px; font-size: 11px">Done</button>
            </div>
            <div class="sp-stack" data-part="keys-text" style="gap: 4px; padding: 5px">${d}</div>
            <div class="sp-stack" data-part="keys-digits" hidden style="gap: 4px; padding: 5px">${p}</div>
          </div>
        </div>

        <div class="sp-stack sp-context" style="width: 218px; gap: 10px">
          <div class="sp-surface sp-stack" style="gap: 4px; padding: 8px 10px">
            <span class="sp-label" style="font-size: 10px">Visible area</span>
            <span class="sp-text sp-text--ink" data-part="readout" style="font-variant-numeric: tabular-nums">${r} px, keyboard down</span>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(a,`keyboard`),s=e(a,`viewport`),c=e(a,`form`),l=e(a,`readout`),u=e(a,`kb-name`),f=e(a,`keys-text`),h=e(a,`keys-digits`),g={card:``,name:``},_,v=n=>{e(a,`value-${n}`).textContent=g[n]??``,t(e(a,`field-${n}`),`data-filled`,(g[n]??``).length>0)},y=()=>{_&&(e(a,`field-${_}`).removeAttribute(`data-sim-focus`),e(a,`caret-${_}`).hidden=!0),_=void 0,o.style.transform=`translateY(100%)`,o.style.visibility=`hidden`,s.style.bottom=`0`,c.style.transform=`translateY(0)`,l.textContent=`${r} px, keyboard down`},b=t=>{_&&_!==t&&(e(a,`field-${_}`).removeAttribute(`data-sim-focus`),e(a,`caret-${_}`).hidden=!0),_=t,e(a,`field-${t}`).setAttribute(`data-sim-focus`,``),e(a,`caret-${t}`).hidden=!1;let r=t===`card`;o.dataset.layout=r?`digits`:`text`,f.hidden=r,h.hidden=!r,u.textContent=r?`Number pad`:`Letters`,o.style.transform=`translateY(0)`,o.style.visibility=`visible`,s.style.bottom=`${n}px`,c.style.transform=r?`translateY(0)`:`translateY(-${i}px)`,l.textContent=`130 px, keyboard up`};for(let t of[`card`,`name`])e(a,`field-${t}`).addEventListener(`click`,()=>b(t));let x=e=>{_&&(g[_]=`${g[_]??``}${e}`.slice(0,_===`card`?16:14),v(_))};for(let e of o.querySelectorAll(`[data-part^="key-"]`)){let t=e.dataset.part?.slice(4)??``;e.addEventListener(`click`,()=>{if(_){if(t===`back`){g[_]=(g[_]??``).slice(0,-1),v(_);return}if(t===`space`)return x(` `);t!==`shift`&&t!==`digits-key`&&t!==`enter`&&x(t)}})}e(a,`next`).addEventListener(`click`,()=>b(`name`)),e(a,`done`).addEventListener(`click`,y),v(`card`),v(`name`)}export{h as mount};