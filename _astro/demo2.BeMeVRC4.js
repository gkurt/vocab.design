import{n as e}from"./parts.C-YLuC7Q.js";var t=1600,n={online:{fill:`#2f9560`,mark:`none`,said:`online`},idle:{fill:`#d99a2b`,mark:`moon`,said:`away`},busy:{fill:`#d0473a`,mark:`bar`,said:`busy`},offline:{fill:`transparent`,mark:`none`,said:`offline`}},r={id:`rae`,initials:`RO`,name:`Rae O.`,state:`offline`,note:`Last seen 09:14`},i=[{id:`ada`,initials:`AM`,name:`Ada M.`,state:`online`,note:`Online`},{id:`bo`,initials:`BT`,name:`Bo T.`,state:`idle`,note:`Away 12 min`},{id:`cy`,initials:`CL`,name:`Cy L.`,state:`busy`,note:`In a meeting`},r];function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Harbour survey</span>
          <span class="sp-label">4 members</span>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div class="sp-surface" style="overflow: hidden">
            <ul class="sp-list">${i.map(e=>`
      <li class="sp-list-item" style="gap: 12px; padding: 5px 10px">
        <span style="position: relative; flex: 0 0 auto; display: inline-flex">
          <span class="sp-avatar sp-context">${e.initials}</span>
          <span
            data-part="dot-${e.id}"
            ${e.id===r.id?`data-subject`:``}
            data-state="${e.state}"
            role="img"
            aria-label="${e.name} is ${n[e.state].said}"
            style="position: absolute; right: -3px; bottom: -3px; width: 13px; height: 13px; overflow: hidden;
                   border-radius: 50%; box-shadow: 0 0 0 2px var(--sp-surface)"
          ><span data-part="mark-${e.id}" style="position: absolute"></span></span>
        </span>
        <span class="sp-context sp-grow" style="font-size: 13px; font-weight: 500">${e.name}</span>
        <span class="sp-context sp-label" data-part="note-${e.id}" style="flex: 0 0 auto; width: 116px; text-align: right">${e.note}</span>
      </li>`).join(``)}</ul>
            <div
              data-part="slot"
              style="display: flex; align-items: center; height: 24px; padding: 0 10px; border-top: 1px solid var(--sp-line)"
            >
              <span class="sp-context sp-label" data-part="readout" hidden>${r.name} came online just now</span>
            </div>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="flex: 0 0 auto; padding: 8px 12px; border-top: 1px solid var(--sp-line)">
          <span class="sp-grow"></span>
          <button class="sp-button sp-button--sm" type="button" data-part="join">${r.name} joins</button>
        </div>
      </div>
    </div>
  `;let s=(t,r)=>{let i=e(a,`dot-${t.id}`),o=e(a,`mark-${t.id}`),s=n[r];i.dataset.state=r,i.setAttribute(`aria-label`,`${t.name} is ${s.said}`),i.style.background=s.fill,i.style.border=r===`offline`?`2.5px solid var(--sp-muted)`:`0`,o.style.cssText=`position: absolute`,s.mark===`moon`?o.style.cssText+=`; top: -3px; right: -3px; width: 9px; height: 9px; border-radius: 50%; background: var(--sp-surface)`:s.mark===`bar`?o.style.cssText+=`; top: 50%; left: 50%; width: 7px; height: 2.5px; border-radius: 2px; background: #ffffff; translate: -50% -50%`:o.style.cssText+=`; display: none`},c=t=>{s(r,t?`online`:`offline`),e(a,`note-${r.id}`).textContent=t?`Online`:r.note,e(a,`readout`).hidden=!t};for(let e of i)s(e,e.state);let l;e(a,`join`).addEventListener(`click`,()=>{o.clearTimeout(l),c(!1),l=o.setTimeout(()=>c(!0),t)})}export{a as mount};