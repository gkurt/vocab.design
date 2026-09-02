var e=[{label:`Email`,value:`On`},{label:`Push`,value:`On`}],t=[{label:`Weekly summary`,value:`Monday`},{label:`Mentions only`,value:`Off`}],n=e=>e.map(({label:e,value:t})=>`<div class="sp-row sp-row--between"><span class="sp-label">${e}</span><span class="sp-text">${t}</span></div>`).join(``);function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 240px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Notifications</span></div>
        <div class="sp-body">
          <div class="sp-row" style="align-items: flex-start; gap: 12px">
            <div class="sp-surface" data-part="panel-ruled" style="flex: 1 1 0; min-width: 0; padding: 10px">
              <div class="sp-stack sp-context" style="gap: 8px">${n(e)}</div>
              <!-- The stage reads a box one pixel tall as absent (isSeen/isRevealed), and a
                   subject it cannot see is one identify can never summon. So the rule keeps a
                   measurable box and paints its single-pixel line inside it. -->
              <div
                class="sp-divider"
                data-part="divider"
                data-subject
                role="separator"
                style="margin: 9px -10px; height: 3px; background: linear-gradient(var(--sp-line), var(--sp-line)) 50% / 100% 1px no-repeat"
              ></div>
              <div class="sp-stack sp-context" style="gap: 8px">${n(t)}</div>
            </div>
            <div class="sp-surface sp-context" data-part="panel-plain" style="flex: 1 1 0; min-width: 0; padding: 10px">
              <div class="sp-stack" style="gap: 8px">${n(e)}</div>
              <div class="sp-stack" style="gap: 8px; margin-top: 21px">${n(t)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}export{r as mount};