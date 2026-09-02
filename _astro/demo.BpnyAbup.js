import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=20,n={a:`1`,b:`12`,c:`14`,d:`145`,e:`15`,f:`124`,g:`1245`,h:`125`,i:`24`,j:`245`,k:`13`,l:`123`,m:`134`,n:`1345`,o:`135`,p:`1234`,q:`12345`,r:`1235`,s:`234`,t:`2345`,u:`136`,v:`1236`,w:`2456`,x:`1346`,y:`13456`,z:`1356`},r={0:`356`,1:`2`,2:`23`,3:`25`,4:`256`,5:`26`,6:`235`,7:`2356`,8:`236`,9:`35`,"(":`12356`,")":`23456`," ":``},i=[1,4,2,5,3,6,7,8];function a(e){let t=e.toLowerCase();return n[t]?e===t?n[t]:`${n[t]}7`:r[e]??``}var o={heading:{screen:`heading`,speech:`“Weekly report, heading level 1”`,line:`Weekly report h1`},button:{screen:`button`,speech:`“Save changes, button”`,line:`Save changes btn`},checkbox:{screen:`checkbox`,speech:`“Auto save, checkbox, checked”`,line:`Auto save chk (x)`},label:{screen:`long`,speech:`“Add to shopping cart, button”`,line:`cart btn`}},s={heading:`The same accessibility tree speech reads from, rendered as pins. Role and level are abbreviated, because the line is only twenty cells wide.`,button:`Nothing here was authored for braille. Get the role and the name right for speech and this line is right too.`,checkbox:`State comes across in brackets. Braille is persistent, so the reader can go back over the line rather than ask for it again.`,label:`aria-braillelabel shortens a name that is fine to hear and fills the whole strip to feel. A narrow exception, not a second place to write copy.`};function c(e){let t=a(e);return`<span style="display: grid; grid-template-columns: repeat(2, 4px); gap: 2px">${i.map(e=>`<span style="width: 4px; height: 4px; border-radius: 50%;
             background: ${t.includes(String(e))?`var(--sp-ink)`:`var(--sp-line)`}"></span>`).join(``)}</span>`}function l(n){let r=e=>Array.from({length:t},(t,n)=>c(e[n]??` `)).join(``);n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="heading" data-axis="Element" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-heading" value="heading"
                    style="padding: 5px 10px; font-size: 12px">Heading</button>
            <button class="sp-segment" data-part="seg-button" value="button"
                    style="padding: 5px 10px; font-size: 12px">Button</button>
            <button class="sp-segment" data-part="seg-checkbox" value="checkbox"
                    style="padding: 5px 10px; font-size: 12px">Checkbox</button>
            <button class="sp-segment" data-part="seg-label" value="label"
                    style="padding: 5px 10px; font-size: 12px">Braille label</button>
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" data-part="screen" data-el="heading"
             style="margin-top: 9px; padding: 0 10px; height: 42px; display: flex; align-items: center">
          <span class="sp-heading" data-part="el-heading" style="font-size: 13px">Weekly report</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="el-button" hidden
                  style="font-size: 12px; cursor: default">Save changes</button>
          <span class="sp-row" data-part="el-checkbox" hidden style="gap: 7px">
            <span class="sp-checkbox" data-checked></span>
            <span class="sp-text sp-text--ink" style="font-size: 12px">Auto save</span>
          </span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="el-long" hidden
                  style="font-size: 12px; cursor: default">Add to shopping cart</button>
        </div>

                  <span class="sp-text sp-text--ink" data-stage-announce data-part="speech" data-el="heading"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${o.heading.speech}</span>
        

        <div class="sp-surface" data-part="strip" data-subject data-el="heading" data-cells="16"
             style="width: fit-content; margin: 10px auto 0; padding: 8px 10px; display: flex; gap: 4px;
                    background: var(--sp-sunken)">${r(o.heading.line)}</div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 16px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Transcription</span>
          <span class="sp-text sp-text--ink" data-part="line" data-el="heading"
                style="flex: 0 0 auto; font-size: 11.5px; letter-spacing: 0.04em; white-space: nowrap">${o.heading.line}</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-el="heading"
           style="margin: 7px 0 0; height: 32px; font-size: 11px">${s.heading}</p>
      </div>
    </div>
  `;let i=e(n,`screen`),a=e(n,`strip`),l=e(n,`speech`),u=e(n,`line`),d=e(n,`caption`),f=[`el-heading`,`el-button`,`el-checkbox`,`el-long`],p=t=>{let c=o[t];i.dataset.el=t;for(let t of f)e(n,t).toggleAttribute(`hidden`,t!==`el-${c.screen}`);l.dataset.el=t,l.textContent=c.speech,a.dataset.el=t,a.dataset.cells=String(c.line.length),a.innerHTML=r(c.line),u.dataset.el=t,u.textContent=c.line,d.dataset.el=t,d.textContent=s[t]};p(`heading`),e(n,`segmented`).addEventListener(`change`,e=>{p(e.detail)})}export{l as mount};