import{n as e}from"./parts.C-YLuC7Q.js";var t=`font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px`,n=15,r=`rgb(53 120 226 / 0.16)`,i=`rgb(170 96 214 / 0.16)`,a=`function price(n) {`,o=`  return n * rate`,s=`}`,c=`  rate = 0.2`,l=`  rate = RATE.std`,u=`  rate = 0.22`,d={unresolved:{lines:[`<<<<<<< Mine`,l,`=======`,u,`>>>>>>> Theirs`],state:`1 conflict unresolved`,warn:!1},mine:{lines:[a,l,o,s],state:`Mine kept`,warn:!1},theirs:{lines:[a,u,o,s],state:`Theirs kept`,warn:!1},both:{lines:[a,l,u,o,s],state:`Both kept: rate set twice`,warn:!0}};function f(e,r=`transparent`){return`<div style="height: ${n}px; padding: 0 5px; background: ${r}; ${t}; line-height: ${n}px; white-space: pre; overflow: hidden">${e}</div>`}function p(e,t,n,r,i){return`
    <div class="sp-surface" data-part="pane-${e}" style="flex: 1 1 0; min-width: 0; overflow: hidden">
      <div class="sp-row" style="gap: 5px; height: 18px; padding: 0 5px; border-bottom: 1px solid var(--sp-line)">
        <span class="sp-label sp-grow" style="font-size: 10px; color: var(--sp-ink); white-space: nowrap; overflow: hidden">${t}</span>
        <span class="sp-label" style="flex: 0 0 auto; font-size: 9px">${n}</span>
      </div>
      ${f(a)}
      ${f(r,i)}
      ${f(o)}
    </div>`}function m(e,t){return`<button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="accept-${e}" style="flex: 0 0 auto; padding: 3px 8px; font-size: 11px; white-space: nowrap">${t}</button>`}function h(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 292px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">price.ts</span>
          <span class="sp-label" style="font-size: 11px">merge feature into main</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 10px">
          <div data-part="merge" data-subject style="display: flex; flex-direction: column; gap: 7px; width: 452px">
            <div style="display: flex; align-items: stretch; gap: 6px">
              ${p(`mine`,`Mine`,`feature`,l,r)}
              ${p(`base`,`Base`,`ancestor`,c,`transparent`)}
              ${p(`theirs`,`Theirs`,`main`,u,i)}
            </div>

            <div class="sp-row" style="gap: 6px">
              <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Accept</span>
              ${m(`mine`,`Mine`)}
              ${m(`theirs`,`Theirs`)}
              ${m(`both`,`Both`)}
            </div>

            <div class="sp-surface" data-part="result" data-choice="unresolved" style="overflow: hidden">
              <div class="sp-row" style="gap: 6px; height: 18px; padding: 0 5px; border-bottom: 1px solid var(--sp-line)">
                <span class="sp-label sp-grow" style="font-size: 10px; color: var(--sp-ink)">Result</span>
                <span class="sp-label" data-part="result-state" style="flex: 0 0 auto; width: 190px; font-size: 10px; text-align: right; white-space: nowrap; overflow: hidden">1 conflict unresolved</span>
              </div>
              <div data-part="result-body" style="height: 75px"></div>
            </div>
          </div>

          <p class="sp-label" style="margin: 0; width: 452px; font-size: 11px">
            The ancestor is the only pane that says which side changed the line.
          </p>
        </div>
      </div>
    </div>
  `;let o=e(a,`result`),s=e(a,`result-body`),f=e(a,`result-state`),h=e=>{let a=d[e];o.dataset.choice=e,f.textContent=a.state,f.style.color=a.warn?`var(--sp-warn)`:`var(--sp-muted)`,a.warn?f.setAttribute(`data-warn`,``):f.removeAttribute(`data-warn`),s.innerHTML=a.lines.map(e=>`<div style="height: ${n}px; padding: 0 5px; background: ${e===l?r:e===u?i:`transparent`}; color: ${e.startsWith(`<`)||e.startsWith(`=`)||e.startsWith(`>`)?`var(--sp-muted)`:`var(--sp-ink)`}; ${t}; line-height: ${n}px; white-space: pre; overflow: hidden">${e}</div>`).join(``)};for(let t of[`mine`,`theirs`,`both`])e(a,`accept-${t}`).addEventListener(`click`,()=>h(t));h(`unresolved`)}export{h as mount};