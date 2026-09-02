import{n as e}from"./parts.C-YLuC7Q.js";var t={plain:`doc > paragraph, paragraph`,strong:`doc > paragraph[strong], paragraph`,list:`doc > paragraph[strong], bullet_list[2]`,empty:`doc > paragraph(empty)`},n=`font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px`;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 256px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field notes</span>
          <span class="sp-label">Draft</span>
        </div>
        <div
          class="sp-row sp-context"
          style="flex: 0 0 auto; gap: 6px; padding: 7px 10px; border-bottom: 1px solid var(--sp-line); background: var(--sp-surface)"
        >
          <button
            class="sp-button sp-button--ghost sp-button--sm"
            type="button"
            data-part="fmt-bold"
            data-aim
            aria-label="Bold"
            style="width: 32px; padding: 5px 0; text-align: center; font-weight: 700"
          >B</button>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="fmt-list">List</button>
          <span class="sp-label sp-grow" style="text-align: right; font-size: 11px">Toolbar</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 12px">
          <div
            class="sp-surface"
            data-part="pane"
            data-subject
            data-doc="plain"
            role="textbox"
            aria-multiline="true"
            aria-label="Field notes"
            style="height: 118px; padding: 10px 12px; overflow: hidden; cursor: text"
          >
            <p data-part="para-1" class="sp-text sp-text--ink" style="margin: 0">
              The gulls came in <span data-part="sel" style="border-radius: 3px; background: var(--sp-accent-soft)">ahead of the weather</span>.
            </p>
            <p data-part="para-2" class="sp-text sp-text--ink" style="margin: 8px 0 0">Boats tied short by four. Tide at 6:12.</p>
            <ul data-part="list" class="sp-text sp-text--ink" hidden style="margin: 8px 0 0; padding-left: 18px">
              <li>Boats tied short by four</li>
              <li>Tide at 6:12</li>
            </ul>
            <span data-part="placeholder" class="sp-text" hidden style="display: inline-block">Write a note</span>
          </div>
          <span class="sp-label sp-context" data-part="model" data-doc="plain" style="${n}">${t.plain}</span>
        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 8px">
        <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="draft">New draft</button>
      </div>
    </div>
  `;let i=e(r,`pane`),a=e(r,`para-1`),o=e(r,`para-2`),s=e(r,`sel`),c=e(r,`list`),l=e(r,`placeholder`),u=e(r,`model`),d=r.ownerDocument.createElement(`span`);d.className=`sp-caret`,d.dataset.part=`caret`,d.setAttribute(`aria-hidden`,`true`),d.style.marginLeft=`1px`;let f={strong:!1,list:!1,empty:!1},p=()=>{a.hidden=f.empty,o.hidden=f.empty||f.list,c.hidden=f.empty||!f.list,l.hidden=!f.empty,s.style.fontWeight=f.strong?`700`:`400`,f.strong?s.dataset.strong=``:delete s.dataset.strong;let e=f.empty?`empty`:f.list?`list`:f.strong?`strong`:`plain`;i.dataset.doc=e,u.dataset.doc=e,u.textContent=t[e]??``,(f.empty?l:f.list?c.lastElementChild??c:o).append(d)};e(r,`fmt-bold`).addEventListener(`click`,()=>{f.empty||(f.strong=!0,p())}),e(r,`fmt-list`).addEventListener(`click`,()=>{f.empty||(f.list=!0,p())}),e(r,`draft`).addEventListener(`click`,()=>{f.strong=!1,f.list=!1,f.empty=!0,p()}),p()}export{r as mount};