import{n as e}from"./parts.C-YLuC7Q.js";var t=[`To do`,`Doing`,`Done`],n=[2,1,1],r=e=>`
  <div style="border: 1px dashed var(--sp-line); border-radius: 6px; padding: 7px 8px; background: var(--sp-surface)">
    <div class="sp-line" style="width: ${e?62:88}%"></div>
    <div class="sp-line" style="width: 46%; margin-top: 6px"></div>
  </div>`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 452px; height: 292px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Boards</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="new">New</button>
        </div>
        <div class="sp-body" style="position: relative; padding: 14px">
          <div data-part="zero" data-subject class="sp-stack" style="gap: 14px; height: 100%">
            <div class="sp-row" style="gap: 10px; align-items: flex-start; opacity: 0.5">${t.map((e,t)=>`
      <div style="flex: 1 1 0; min-width: 0">
        <div class="sp-label" style="margin-bottom: 6px">${e}</div>
        <div class="sp-stack" style="gap: 6px">${Array.from({length:n[t]??1},(e,t)=>r(t>0)).join(``)}</div>
      </div>`).join(``)}</div>
            <p class="sp-text sp-text--ink" style="margin: 0; max-width: 40ch">
              A board looks like this: three columns, and a card for each piece of work moving across them.
            </p>
            <button class="sp-button sp-button--sm" data-part="start" style="align-self: flex-start">Start your first board</button>
          </div>
          <div data-part="board" class="sp-row" style="gap: 10px; align-items: flex-start" hidden>${t.map((e,t)=>`
      <div style="flex: 1 1 0; min-width: 0">
        <div class="sp-label" style="margin-bottom: 6px">${e}</div>
        <div class="sp-stack" style="gap: 6px">
          ${t===0?`<div class="sp-surface" data-part="card" style="padding: 7px 8px; font-size: 12px">Draft the brief</div>`:``}
        </div>
      </div>`).join(``)}</div>
        </div>
      </div>
    </div>
  `;let a=e(i,`zero`),o=e(i,`board`),s=()=>{a.hidden=!0,o.hidden=!1};e(i,`start`).addEventListener(`click`,s),e(i,`new`).addEventListener(`click`,s)}export{i as mount};