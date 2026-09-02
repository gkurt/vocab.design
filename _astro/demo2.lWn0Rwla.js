import{n as e}from"./parts.C-YLuC7Q.js";var t=1700,n=34,r=e=>`
  <span
    class="sp-pulse"
    style="width: 6px; height: 6px; border-radius: 50%; background: var(--sp-accent); animation-delay: -${(e*.6).toFixed(1)}s"
  ></span>`;function i(i,a){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 248px">
        <div class="sp-topbar sp-context">
          <span class="sp-avatar">AM</span>
          <span class="sp-heading sp-grow">Ada M.</span>
          <span class="sp-label">Harbour survey</span>
        </div>
        <div class="sp-body sp-stack" style="gap: 10px">
          <div class="sp-row sp-context" data-part="msg-ask" style="justify-content: flex-end">
            <span style="max-width: 74%; padding: 7px 11px; border-radius: 12px 12px 4px 12px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 13px">
              Can you take the survey tomorrow?
            </span>
          </div>
          <div class="sp-row sp-context" data-part="msg-seen" style="justify-content: flex-start">
            <span style="max-width: 74%; padding: 7px 11px; border-radius: 12px 12px 12px 4px; background: var(--sp-surface); border: 1px solid var(--sp-line); font-size: 13px">
              Checking the tide table.
            </span>
          </div>
          <div data-part="slot" style="position: relative; height: ${n}px">
            <span
              class="sp-row"
              data-part="indicator"
              data-subject
              role="status"
              aria-label="Ada is typing"
              hidden
              style="position: absolute; left: 0; top: 0; gap: 5px; padding: 11px 13px; border-radius: 12px 12px 12px 4px;
                     background: var(--sp-surface); border: 1px solid var(--sp-line)"
            >${r(0)}${r(1)}${r(2)}</span>
            <span
              class="sp-context"
              data-part="reply"
              hidden
              style="position: absolute; left: 0; top: 0; max-width: 74%; padding: 7px 11px; border-radius: 12px 12px 12px 4px;
                     background: var(--sp-surface); border: 1px solid var(--sp-line); font-size: 13px"
            >Tomorrow works. Low water at six.</span>
          </div>
        </div>
        <div class="sp-row sp-context" style="flex: 0 0 auto; justify-content: flex-end; padding: 8px 12px; border-top: 1px solid var(--sp-line)">
          <button class="sp-button sp-button--sm" type="button" data-part="ask">Ada replies</button>
        </div>
      </div>
    </div>
  `;let o=e(i,`indicator`),s=e(i,`reply`),c;e(i,`ask`).addEventListener(`click`,()=>{a.clearTimeout(c),s.hidden=!0,o.hidden=!1,c=a.setTimeout(()=>{o.hidden=!0,s.hidden=!1},t)})}export{i as mount};