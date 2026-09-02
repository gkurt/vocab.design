import{n as e}from"./parts.C-YLuC7Q.js";var t=[{key:`priya`,name:`Priya Raman`,meta:`2 new`,spoken:`Priya Raman. 2 new messages. Double tap to open.`},{key:`marcus`,name:`Marcus Bell`,meta:`Yesterday`,spoken:`Marcus Bell. Yesterday. Double tap to open.`},{key:`standup`,name:`Team standup`,meta:`Mon`,spoken:`Team standup. Monday. Double tap to open.`},{key:`compose`,name:`Compose`,meta:``,spoken:`Compose. Button. Double tap to activate.`}],n=`Nothing announced yet`;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-context" style="gap: 10px; height: 20px; justify-content: flex-end">
          <span class="sp-chip" data-part="mode" style="cursor: default; font-size: 10px; padding: 2px 8px">Explore by touch on</span>
        </div>

        <div class="sp-row" style="margin-top: 10px; gap: 14px; align-items: flex-start">
          <!-- The shell stays outside the context register, because the screen inside it is
               the subject and a subject is styled normally (SPEC §5). -->
          <div style="flex: 0 0 176px; padding: 7px; border: 2px solid var(--sp-line);
               border-radius: 18px; background: var(--sp-surface)">
            <div data-part="screen" data-subject data-hover-driven data-reading="none"
                 style="height: 194px; border-radius: 12px; background: var(--sp-sunken); overflow: hidden; touch-action: none">
              <div class="sp-row" style="height: 26px; padding: 0 8px; background: var(--sp-surface);
                   border-bottom: 1px solid var(--sp-line)">
                <span class="sp-heading" style="font-size: 12px">Messages</span>
              </div>
              ${t.slice(0,3).map(e=>`
    <div class="sp-row sp-row--between" data-part="row-${e.key}" style="gap: 8px; height: 34px; padding: 0 8px;
         border-bottom: 1px solid var(--sp-line)">
      <span class="sp-text sp-text--ink" style="flex: 1 1 auto; min-width: 0; font-size: 11.5px">${e.name}</span>
      <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">${e.meta}</span>
    </div>`).join(``)}
              <div class="sp-row" style="height: 30px; padding: 0 8px; justify-content: flex-end">
                <span class="sp-chip" data-part="row-compose" style="cursor: default; font-size: 10px; padding: 3px 10px;
                      background: var(--sp-accent); border-color: var(--sp-accent); color: var(--sp-accent-ink)">Compose</span>
              </div>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 8px">
            <p class="sp-text sp-text--ink" data-stage-announce data-part="speech" data-said="none" data-state="idle"
               style="margin: 0">${n}</p>

            <div class="sp-surface" style="padding: 7px 9px">
              <p class="sp-text sp-text--ink" data-part="result" data-state="none" data-opened="none"
                 style="margin: 0; height: 36px; font-size: 11.5px; color: var(--sp-muted)">
                Nothing yet. Dragging only reads.
              </p>
            </div>

            <p class="sp-text" data-stage-verdict data-part="caption" style="margin: 0; height: 68px; font-size: 11px">
              With this mode on, a single tap only reads what it lands on. Every control shifts by one gesture, which is why
              a target too small to sweep over is a target nobody finds.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`screen`),a=e(r,`speech`),o=e(r,`result`),s,c=(n,i)=>t.find(t=>{let a=e(r,`row-${t.key}`).getBoundingClientRect();return n>=a.left&&n<=a.right&&i>=a.top&&i<=a.bottom}),l=n=>{for(let i of t){let t=e(r,`row-${i.key}`),a=i.key===n?.key;t.style.outline=a?`2px solid var(--sp-accent)`:``,t.style.outlineOffset=a?`-2px`:``}i.dataset.reading=n?.key??`none`},u=e=>{!e||e.key===s?.key||(s=e,l(e),a.dataset.said=e.key,a.dataset.state=`spoken`,a.style.color=`var(--sp-ink)`,a.textContent=e.spoken)},d=e=>{e&&(u(e),o.dataset.state=`read`,o.dataset.opened=`none`,o.style.color=`var(--sp-ink)`,o.textContent=`Read “${e.name}”. A single tap does not open it.`)};i.addEventListener(`pointermove`,e=>{let t=e;u(c(t.clientX,t.clientY))}),i.addEventListener(`click`,e=>{let t=e;d(c(t.clientX,t.clientY)??s)}),i.addEventListener(`dblclick`,()=>{s&&(o.dataset.state=`opened`,o.dataset.opened=s.key,o.style.color=`var(--sp-ink)`,o.textContent=`Opened “${s.name}” with the second tap.`)})}export{r as mount};