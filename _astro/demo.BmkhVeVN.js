import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{part:`abbr-dr`,short:`Dr.`,title:`Doctor`},{part:`abbr-svg`,short:`SVG`,title:`Scalable Vector Graphics`},{part:`abbr-fri`,short:`Fri.`,title:`Friday`}],r=68;function i(i){let a=({part:e,short:t,title:n},r)=>`<abbr data-part="${e}"${r?` data-subject`:``} title="${n}"
           style="text-decoration: underline dotted; text-underline-offset: 3px; text-decoration-thickness: 2px">${t}</abbr>`,[o,s,c]=n;if(!o||!s||!c)return;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Shortened forms</span>
          <span class="sp-row" style="gap: 6px">
            <button class="sp-button sp-button--sm" data-part="show" type="button">Show expansions</button>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="hide" type="button">Hide</button>
          </span>
        </div>
        <p data-part="sentence" style="margin: 10px 0 0; font-size: 15px; line-height: 1.55">
          ${a(o,!1)} Vance wants the chart as an ${a(s,!0)} by ${a(c,!1)},
          so the print file can be checked over the weekend.
        </p>
        <div class="sp-stack sp-context" data-part="expansions"
             style="gap: 4px; height: ${r}px; margin-top: 10px; opacity: 0; visibility: hidden;
                    transition: opacity 0.2s, visibility 0.2s">
          ${n.map(e=>`
              <span class="sp-row" style="gap: 8px">
                <span class="sp-label" style="width: 34px; color: var(--sp-ink)">${e.short}</span>
                <span class="sp-text" style="font-size: 12px">${e.title}</span>
              </span>`).join(``)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 8px">
          The expansion is written on the page, not left to a tooltip: a title attribute is unreachable
          by keyboard, unreachable by touch, and read out inconsistently.
        </p>
      </div>
    </div>
  `;let l=e(i,`expansions`),u=e=>{t(l,`data-open`,e),l.style.opacity=e?`1`:`0`,l.style.visibility=e?`visible`:`hidden`};e(i,`show`).addEventListener(`click`,()=>u(!0)),e(i,`hide`).addEventListener(`click`,()=>u(!1))}export{i as mount};