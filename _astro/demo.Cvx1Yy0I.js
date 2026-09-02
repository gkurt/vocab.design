import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t as n}from"./motion.B5_YXmsy.js";var r={full:{transition:`opacity 0.26s var(--sp-ease), transform 0.26s var(--sp-ease), visibility 0.26s`,closed:`translateY(18px)`,readout:`Entrance: slides up 18px and fades, 260ms.`},reduce:{transition:`opacity 0.16s linear, visibility 0.16s`,closed:`none`,readout:`Entrance: a cross fade in place, 160ms.`}},i=`Your system asks for reduced motion, so the stage already stopped playing this by itself.`,a=`The switch simulates the setting; the real one is read by the stage, not by this demo.`;function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 430px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-grow"></span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Simulated setting" data-value="full">
            <button class="sp-segment" data-part="seg-full" value="full">No preference</button>
            <button class="sp-segment" data-part="seg-reduce" value="reduce">Reduce motion</button>
          </sp-segmented>
        </div>
        <div class="sp-surface" data-part="scene" data-motion="full"
             style="position: relative; height: 118px; margin-top: 10px; padding: 4px 8px; background: var(--sp-sunken); overflow: hidden">
          <ul class="sp-list sp-context" style="margin: 0; padding: 0; list-style: none">${[`Unread`,`Flagged`,`Sent`].map(e=>`<li class="sp-list-item" style="padding: 6px 10px"><span class="sp-grow">${e}</span><span class="sp-label">24</span></li>`).join(``)}</ul>
          <div class="sp-surface" data-part="panel" data-subject
               style="position: absolute; left: 12px; right: 12px; bottom: 12px; padding: 10px 12px; box-shadow: var(--sp-shadow);
                      opacity: 0; visibility: hidden; transform: translateY(18px); transition: ${r.full.transition}">
            <span class="sp-heading" style="font-size: 13px">Filters</span>
            <p class="sp-text" style="margin: 4px 0 0">Unread first, flagged pinned, everything else by date.</p>
          </div>
        </div>
        <div class="sp-row sp-context" style="margin-top: 10px">
          <button class="sp-button sp-button--sm" type="button" data-part="show">Show panel</button>
          <button class="sp-button sp-button--sm sp-button--ghost" type="button" data-part="hide">Hide panel</button>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="readout" style="margin-top: 8px; font-size: 12px"></p>
      </div>
    </div>
  `;let s=e(o,`scene`),c=e(o,`panel`),l=e(o,`readout`),u=n(o)?i:a,d=`full`,f=!1,p=()=>{let e=r[d];s.dataset.motion=d,c.style.transition=e.transition,c.style.transform=f?`none`:e.closed,c.style.opacity=f?`1`:`0`,c.style.visibility=f?`visible`:`hidden`,t(c,`data-open`,f),l.textContent=`${e.readout} ${u}`};p(),e(o,`show`).addEventListener(`click`,()=>{f=!0,p()}),e(o,`hide`).addEventListener(`click`,()=>{f=!1,p()}),e(o,`segmented`).addEventListener(`change`,e=>{d=e.detail===`reduce`?`reduce`:`full`,p()})}export{o as mount};