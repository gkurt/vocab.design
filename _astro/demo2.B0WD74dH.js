import{n as e,t}from"./parts.C-YLuC7Q.js";var n={top:`26px`,fontSize:`13px`},r={top:`14px`,fontSize:`11px`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-heading sp-context">Book a table</div>
        <div data-part="box" style="position: relative; margin-top: 14px">
          <label
            class="sp-label"
            for="vd-name"
            data-part="label"
            data-subject
            style="
              position: absolute;
              left: 11px;
              top: ${n.top};
              transform: translateY(-50%);
              font-size: ${n.fontSize};
              color: var(--sp-muted);
              pointer-events: none;
              transition: top 0.18s var(--sp-ease), font-size 0.18s var(--sp-ease);
            "
          >Full name</label>
          <input
            class="sp-input sp-context"
            id="vd-name"
            data-part="input"
            type="text"
            autocomplete="off"
            spellcheck="false"
            style="height: 52px; padding: 22px 11px 6px"
          />
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 14px">
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="clear" type="button">Clear</button>
          <span class="sp-text">Party of two, 7pm</span>
        </div>
      </div>
    </div>
  `;let a=e(i,`input`),o=e(i,`label`),s=!1,c=()=>{let e=s||a.value!==``;o.style.top=e?r.top:n.top,o.style.fontSize=e?r.fontSize:n.fontSize,t(o,`data-floated`,e)};a.addEventListener(`input`,c),a.addEventListener(`focus`,()=>{s=!0,c()}),a.addEventListener(`blur`,()=>{s=!1,c()}),e(i,`clear`).addEventListener(`click`,()=>{a.value=``,c()})}export{i as mount};