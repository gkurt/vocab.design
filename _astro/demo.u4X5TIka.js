import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{t as r}from"./motion.B5_YXmsy.js";var i=96,a=[`Harbour works`,`Tide tables`,`Ferry times`,`Moorings`,`Slipway repairs`,`Notices`];function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Harbour notices</span></div>
        <div class="sp-body sp-context" style="padding: 0">
          <div class="sp-scroll" data-part="doc" data-at="top" style="height: 100%; padding: 12px 14px">${a.map(e=>`
      <section style="padding-bottom: 16px">
        <div class="sp-heading">${e}</div>
        <div class="sp-stack" style="margin-top: 8px">
          <div class="sp-line" style="width: 94%"></div>
          <div class="sp-line" style="width: 81%"></div>
          <div class="sp-line" style="width: 88%"></div>
          <div class="sp-line" style="width: 63%"></div>
        </div>
      </section>`).join(``)}</div>
        </div>
        <button
          class="sp-button sp-button--sm"
          data-part="totop"
          data-subject
          type="button"
          style="position: absolute; right: 14px; bottom: 14px; display: inline-flex; align-items: center; gap: 6px;
                 opacity: 0; visibility: hidden; translate: 0 6px;
                 transition: opacity 0.2s, visibility 0.2s, translate 0.2s var(--sp-ease)"
        >
          <span style="display: inline-flex; rotate: 180deg">${n(`chevronDown`)}</span>
          Back to top
        </button>
      </div>
    </div>
  `;let s=e(o,`doc`),c=e(o,`totop`),l=()=>{let e=s.scrollTop>i;s.dataset.at=s.scrollTop>2?`away`:`top`,c.style.opacity=e?`1`:`0`,c.style.visibility=e?`visible`:`hidden`,c.style.translate=e?`0 0`:`0 6px`,t(c,`data-shown`,e)};s.addEventListener(`scroll`,l),c.addEventListener(`click`,()=>{s.scrollTo({top:0,behavior:r(o)?`auto`:`smooth`}),l()})}export{o as mount};