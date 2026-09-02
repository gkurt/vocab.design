import{n as e}from"./parts.C-YLuC7Q.js";var t=300,n=`Kestrels hunt by hovering: the bird holds one patch of ground still in its eye while the wind moves everything else.`.split(` `),r=e=>e.replace(/[^\p{L}\p{N}'-]/gu,``),i={idle:`Silent. The article says nothing until a reader asks for it.`,done:`Finished. ${n.length} words read in order, highlight cleared.`};function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Reader view, one article</span>
          <div class="sp-row" style="gap: 8px; flex: 0 0 auto">
            <span class="sp-label" style="font-size: 10px; white-space: nowrap">Voice Serena, 1.0&#215;</span>
            <button class="sp-button sp-button--sm" type="button" data-part="play"
                    style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">Read aloud</button>
          </div>
        </div>

        <div data-part="prose" style="position: relative; margin-top: 10px">
          <span data-part="highlight" data-subject aria-hidden="true"
                style="position: absolute; left: 0; top: 0; width: 0; height: 0; border-radius: 3px;
                       background: var(--sp-accent-soft); opacity: 0; visibility: hidden;
                       transition: opacity 0.14s ease, visibility 0.14s"></span>
          <p class="sp-text sp-text--ink" style="position: relative; margin: 0; font-size: 15px; line-height: 26px">
            ${n.map((e,t)=>`<span data-part="word-${t+1}" style="display: inline-block">${e}</span>`).join(` `)}
          </p>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 8px; padding: 8px 10px">
          <span class="sp-label" style="font-size: 10px">Read aloud, word by word</span>
          <p class="sp-text sp-text--ink" data-part="readout" data-state="idle"
             style="margin: 3px 0 0; height: 18px; line-height: 18px; font-size: 11.5px; white-space: nowrap">${i.idle}</p>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption"
           style="margin: 10px 0 0; height: 32px; font-size: 11px; line-height: 1.35">The voice carries the prose in
          reading order and the highlight keeps the reader's place. No heading level, no role and no state is spoken:
          this is a reading aid.</p>
      </div>
    </div>
  `;let s=e(a,`highlight`),c=e(a,`readout`),l=n.map((t,n)=>e(a,`word-${n+1}`)),u,d=e=>{s.style.opacity=e?`1`:`0`,s.style.visibility=e?`visible`:`hidden`},f=e=>{s.style.left=`${e.offsetLeft-3}px`,s.style.top=`${e.offsetTop-2}px`,s.style.width=`${e.offsetWidth+6}px`,s.style.height=`${e.offsetHeight+4}px`},p=e=>{let a=l[e];if(!a){d(!1),c.dataset.state=`done`,c.textContent=i.done;return}a.setAttribute(`data-read`,``),f(a),d(!0),c.dataset.state=`speaking`,c.textContent=`Speaking “${r(n[e]??``)}”, word ${e+1} of ${n.length}`,u=o.setTimeout(()=>p(e+1),t)};e(a,`play`).addEventListener(`click`,()=>{o.clearTimeout(u);for(let e of l)e.removeAttribute(`data-read`);p(0)})}export{a as mount};