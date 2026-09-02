import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=268,i=90,a=[{key:`lumen`,name:`Lumen 3`,desc:`Balanced. Everyday questions.`,hint:`Standard`},{key:`mini`,name:`Lumen 3 Mini`,desc:`Answers in about a second.`,hint:`Fastest`},{key:`atlas`,name:`Atlas Pro`,desc:`Slower, for hard problems.`,hint:`Deepest`}];function o(o){let s=e=>`
    <button
      class="sp-menu-item"
      type="button"
      role="menuitemradio"
      data-part="item-${e.key}"
      style="align-items: flex-start; gap: 6px; padding: 6px 8px"
    >
      <span data-part="tick-${e.key}" style="flex: 0 0 16px; height: 16px; opacity: 0">${n(`check`)}</span>
      <span style="flex: 1 1 auto; min-width: 0">
        <span class="sp-row sp-row--between" style="gap: 8px">
          <span style="font-size: 12.5px; font-weight: 500; white-space: nowrap">${e.name}</span>
          <span
            class="sp-label"
            style="flex: 0 0 auto; padding: 1px 5px; border: 1px solid var(--sp-line); border-radius: 999px; font-size: 10px; white-space: nowrap"
            >${e.hint}</span
          >
        </span>
        <span class="sp-text" style="display: block; margin-top: 2px; font-size: 11px; line-height: 1.3; white-space: nowrap">${e.desc}</span>
      </span>
    </button>`,c=(e,t)=>`
    <div class="sp-stack" style="align-items: ${t}; gap: 5px; width: 100%">
      <span class="sp-surface" style="width: ${e}; padding: 7px 9px; border-radius: 9px">
        <span class="sp-line" style="display: block; width: 100%"></span>
        <span class="sp-line" style="display: block; width: 64%; margin-top: 5px"></span>
      </span>
    </div>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Assistant</span>
          <span class="sp-label" style="font-size: 11px; white-space: nowrap">Applies to your next message</span>
        </div>

        <div class="sp-body" style="position: relative; display: flex; flex-direction: column; justify-content: flex-end; gap: 10px">
          <div class="sp-stack sp-context" data-part="thread" style="gap: 8px">
            ${c(`58%`,`flex-end`)}
            ${c(`72%`,`flex-start`)}
          </div>

          <div class="sp-surface" data-part="composer" style="padding: 8px">
            <span class="sp-text sp-context" style="display: block; height: 22px; padding: 3px 2px; font-size: 12px">Ask anything</span>
            <div class="sp-row" style="gap: 8px; margin-top: 6px">
              <button
                class="sp-button sp-button--quiet"
                type="button"
                data-part="trigger"
                data-subject
                data-model="lumen"
                aria-haspopup="menu"
                aria-expanded="false"
                style="display: inline-flex; align-items: center; gap: 5px; flex: 0 0 auto; height: 26px; padding: 0 8px; border-radius: 6px; font-size: 12px"
              >
                <span data-part="trigger-name" style="white-space: nowrap">${a[0]?.name}</span>
                ${n(`chevronDown`)}
              </button>
              <span class="sp-grow"></span>
              <button class="sp-icon-button sp-context" type="button" data-part="attach" aria-label="Attach" style="width: 26px; height: 26px">${n(`copy`)}</button>
              <button
                class="sp-button sp-context"
                type="button"
                data-part="send"
                style="display: inline-flex; align-items: center; gap: 5px; flex: 0 0 auto; height: 26px; padding: 0 10px; font-size: 12px"
              >Send</button>
            </div>
          </div>

          <div
            class="sp-menu"
            data-part="menu"
            role="menu"
            style="left: 12px; bottom: ${i}px; width: ${r}px; transform-origin: bottom left"
          >
            ${a.map(s).join(``)}
          </div>
        </div>
      </div>
    </div>
  `;let l=e(o,`trigger`),u=e(o,`trigger-name`),d=e(o,`menu`),f=()=>{t(d,`data-open`,!1),t(l,`data-open`,!1),l.setAttribute(`aria-expanded`,`false`)},p=n=>{l.dataset.model=n.key,u.textContent=n.name;for(let r of a){let i=e(o,`item-${r.key}`),a=e(o,`tick-${r.key}`),s=r.key===n.key;i.setAttribute(`aria-checked`,String(s)),t(i,`data-current`,s),a.style.opacity=s?`1`:`0`}};l.addEventListener(`click`,()=>{t(d,`data-open`,!0),t(l,`data-open`,!0),l.setAttribute(`aria-expanded`,`true`)});for(let t of a)e(o,`item-${t.key}`).addEventListener(`click`,()=>{p(t),f()});p(a[0]),f()}export{o as mount};