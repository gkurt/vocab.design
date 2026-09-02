import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=1500,r=[`max-width: 80%`,`padding: 7px 10px`,`font-size: 12px`,`line-height: 1.45`].join(`; `),i=(e,t=``)=>`
  <div
    style="${r}; align-self: flex-start; border-radius: 12px 12px 12px 4px; background: var(--sp-surface);
           border: 1px solid var(--sp-line)"
    ${t}
  >${e}</div>`,a=(e,t=``)=>`
  <div
    style="${r}; align-self: flex-end; border-radius: 12px 12px 4px 12px; background: var(--sp-accent);
           color: var(--sp-accent-ink)"
    ${t}
  >${e}</div>`,o=(e,t)=>`
  <div class="sp-row sp-row--wrap" data-part="${e}" style="gap: 6px">
    ${t.map(([e,t])=>`<button class="sp-chip" type="button" data-part="${e}">${t}</button>`).join(``)}
  </div>`,s=e=>`
  <span
    class="sp-pulse"
    style="width: 5px; height: 5px; border-radius: 50%; background: var(--sp-muted); animation-delay: -${(e*.6).toFixed(1)}s"
  ></span>`;function c(r,c){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 236px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Assistant</span>
          <span class="sp-label">Thursday</span>
        </div>

        <div class="sp-body" style="padding: 12px">
          <div
            class="sp-scroll"
            data-part="transcript"
            data-subject
            role="log"
            style="display: flex; flex-direction: column; gap: 8px; height: 100%"
          >
            ${i(`I can look at your calendar, draft a reply, or find a file.`)}
            ${o(`chips`,[[`chip-free`,`Free time Friday`],[`chip-draft`,`Draft a reply`]])}
          </div>
        </div>

        <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 8px; padding: 10px 12px; border-top: 1px solid var(--sp-line)">
          <div class="sp-grow">
            <input class="sp-input" data-part="composer" type="text" placeholder="Ask anything" aria-label="Message" />
          </div>
          <button class="sp-icon-button" type="button" data-part="send" aria-label="Send">${t(`chevronRight`)}</button>
        </div>
      </div>
    </div>
  `;let l=e(r,`transcript`),u=()=>{l.scrollTop=l.scrollHeight},d=(t,d)=>{e(r,`chips`).remove(),l.insertAdjacentHTML(`beforeend`,a(t,`data-part="user-turn"`)),l.insertAdjacentHTML(`beforeend`,`<div
         class="sp-row"
         data-part="typing"
         aria-label="Composing a reply"
         style="align-self: flex-start; gap: 4px; padding: 9px 11px; border-radius: 12px 12px 12px 4px;
                background: var(--sp-surface); border: 1px solid var(--sp-line)"
       >${s(0)}${s(1)}${s(2)}</div>`),u(),c.setTimeout(()=>{e(r,`typing`).remove(),l.insertAdjacentHTML(`beforeend`,i(d,`data-part="reply"`)),l.insertAdjacentHTML(`beforeend`,o(`chips-2`,[[`chip-hold`,`Hold 10 to 11`],[`chip-later`,`Not today`]])),u()},n)};e(r,`chip-free`).addEventListener(`click`,()=>d(`Free time Friday`,`You are free 10 to 11, and after 3.`)),e(r,`chip-draft`).addEventListener(`click`,()=>d(`Draft a reply`,`Here is a short reply to the Thursday thread.`))}export{c as mount};