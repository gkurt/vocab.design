import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";import{i as r}from"./measure.DK7AY2_i.js";var i=`'Hiragino Mincho ProN', 'Hiragino Sans', 'Yu Mincho', 'Noto Serif JP', serif`,a=26,o={width:384,height:118},s=[{text:`この見本は`,part:`run-open`},{text:`CSS`,part:`run-latin`},{text:`で`,part:`run-mid`},{text:`2024`,part:`run-digits`},{text:`年に組まれた縦組みです`,part:`run-close`}],c={horizontal:{css:`writing-mode: horizontal-tb`,vertical:!1,orientation:`mixed`},vertical:{css:`writing-mode: vertical-rl`,vertical:!0,orientation:`mixed`},upright:{css:`text-orientation: upright`,vertical:!0,orientation:`upright`}},l=e=>e in c;function u(u){let d=s.map(({text:e,part:t})=>`<span data-part="${t}">${e}</span>`).join(``);u.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 484px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label" data-part="css" style="white-space: nowrap">${c.vertical.css}</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Mode" data-part="segmented" data-value="vertical" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="seg-horizontal" value="horizontal" style="white-space: nowrap">horizontal</button>
            <button class="sp-segment" data-part="seg-vertical" value="vertical" style="white-space: nowrap">vertical</button>
            <button class="sp-segment" data-part="seg-upright" value="upright" style="white-space: nowrap">upright</button>
          </sp-segmented>
        </div>
        <div class="sp-row sp-context" data-part="strip" style="height: 22px; margin-top: 6px; justify-content: flex-end; width: ${o.width+28}px">
          <span class="sp-row" data-part="arrow-columns" style="gap: 2px; color: var(--sp-muted)">
            ${n(`chevronLeft`)}
            <span style="width: 68px; height: 2px; background: currentcolor"></span>
          </span>
        </div>
        <div class="sp-row" style="align-items: flex-start; gap: 0">
          <div class="sp-context" data-part="gutter" style="width: 28px; height: ${o.height}px;
               display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 2px; color: var(--sp-muted)">
            <span class="sp-stack" data-part="arrow-lines" style="align-items: center; gap: 2px">
              <span style="width: 2px; height: 44px; background: currentcolor"></span>
              ${n(`chevronDown`)}
            </span>
          </div>
          <div data-part="passage" data-subject data-vertical="yes" data-mode="vertical" data-pose="[data-vertical=yes]"
               style="width: ${o.width}px; height: ${o.height}px; writing-mode: vertical-rl; text-orientation: mixed;
                      font-family: ${i}; font-size: ${a}px; line-height: 1.7">${d}</div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 2px">
          Set vertically, the first column is the one at the right edge, and the arrow says which way the
          lines advance.
        </p>
      </div>
    </div>
  `;let f=e(u,`passage`),p=e(u,`run-latin`),m=e(u,`css`),h=e(u,`arrow-columns`),g=e(u,`arrow-lines`),_=e=>{if(!l(e))return;let n=c[e];f.style.writingMode=n.vertical?`vertical-rl`:`horizontal-tb`,f.style.textOrientation=n.orientation,f.dataset.mode=e,f.dataset.vertical=n.vertical?`yes`:`no`,m.textContent=n.css,t(h,`hidden`,!n.vertical),t(g,`hidden`,n.vertical);let i=r(p);p.dataset.lay=i.height<=i.width?`across`:i.height>a*2.4?`upright`:`sideways`};_(`vertical`),e(u,`segmented`).addEventListener(`change`,e=>_(e.detail))}export{u as mount};