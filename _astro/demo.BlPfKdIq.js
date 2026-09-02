import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r={w:476,h:288},i=32,a=104,o=208,s=152,c=[{key:`notes`,name:`Notes`,glyph:`pencil`,body:`Called back about the renewal. Wants the EU region before signing.`},{key:`history`,name:`History`,glyph:`inbox`,body:`Opened Acme Ltd, then the renewal quote, then this contact.`},{key:`reminders`,name:`Reminders`,glyph:`bell`,body:`Send the revised quote on Thursday, before the pricing review.`}];function l(l){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: ${r.w}px; height: ${r.h}px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Acme Ltd</span>
          <span class="sp-label" style="font-size: 11px">Renewal quote</span>
        </div>

        <div class="sp-body sp-context" data-part="page" style="padding: 12px; padding-bottom: 44px">
          <div class="sp-surface" style="padding: 10px 12px">
            <div class="sp-row sp-row--between" style="margin-bottom: 8px">
              <span class="sp-heading" style="font-size: 12px">Quote 4471</span>
              <span class="sp-label" style="font-size: 11px">Draft</span>
            </div>
            <div class="sp-stack" style="gap: 8px">
              <div class="sp-line" style="width: 100%"></div>
              <div class="sp-line" style="width: 88%"></div>
              <div class="sp-line" style="width: 94%"></div>
              <div class="sp-line" style="width: 62%"></div>
            </div>
          </div>
        </div>

        ${c.map((e,t)=>`
    <div
      class="sp-surface sp-context"
      data-part="panel-${e.key}"
      role="dialog"
      aria-label="${e.name}"
      style="position: absolute; left: ${8+t*108}px; bottom: ${i}px; width: ${o}px; height: ${s}px;
             display: flex; flex-direction: column; border-radius: 8px 8px 0 0; border-bottom: 0; box-shadow: var(--sp-shadow);
             transform: translateY(8px); opacity: 0; visibility: hidden;
             transition: transform 0.22s var(--sp-ease), opacity 0.22s, visibility 0.22s"
    >
      <div class="sp-row" style="flex: 0 0 auto; padding: 5px 6px 5px 10px; border-bottom: 1px solid var(--sp-line)">
        <span class="sp-heading sp-grow" style="font-size: 12px">${e.name}</span>
        <button class="sp-icon-button" type="button" data-part="close-${e.key}" aria-label="Close ${e.name}" style="width: 22px; height: 22px">${n(`close`)}</button>
      </div>
      <div class="sp-stack sp-grow" style="gap: 8px; padding: 10px">
        <span class="sp-text" style="font-size: 12px">${e.body}</span>
        <div class="sp-line" style="width: 76%"></div>
        <div class="sp-line" style="width: 58%"></div>
      </div>
    </div>
  `).join(``)}

        <div
          data-part="bar"
          data-subject
          style="position: absolute; left: 0; right: 0; bottom: 0; display: flex; align-items: center; gap: 4px; height: ${i}px;
                 padding: 0 8px; background: var(--sp-surface); border-top: 1px solid var(--sp-line); z-index: 2"
        >
          ${c.map(e=>`
    <button
      class="sp-button sp-button--quiet sp-button--sm"
      type="button"
      data-part="tool-${e.key}"
      style="display: inline-flex; align-items: center; gap: 7px; flex: 0 0 auto; width: ${a}px; height: 24px;
             padding: 0 10px; border-radius: 6px; font-size: 12px; white-space: nowrap; text-align: left"
    >${n(e.glyph)}<span>${e.name}</span></button>
  `).join(``)}
        </div>
      </div>
    </div>
  `;let u,d=n=>{u=n;for(let n of c){let r=n.key===u,i=e(l,`panel-${n.key}`);t(i,`data-open`,r),i.style.transform=r?`translateY(0)`:`translateY(8px)`,i.style.opacity=r?`1`:`0`,i.style.visibility=r?`visible`:`hidden`,t(e(l,`tool-${n.key}`),`data-open`,r)}};for(let t of c)e(l,`tool-${t.key}`).addEventListener(`click`,()=>d(t.key)),e(l,`close-${t.key}`).addEventListener(`click`,()=>d(void 0))}export{l as mount};