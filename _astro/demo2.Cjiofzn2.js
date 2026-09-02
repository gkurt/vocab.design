import{n as e}from"./parts.C-YLuC7Q.js";var t={coast:{label:`Coast`,seed:`#2A5EA7`,primary:`#2a5ea7`,onPrimary:`#ffffff`,container:`#d5e3ff`,onContainer:`#001c39`,surface:`#f7f9ff`,onSurface:`#191c20`,outline:`#747a86`,wallpaper:`linear-gradient(150deg, #0b2f61, #2a5ea7 48%, #86b6f0)`},dune:{label:`Dune`,seed:`#8A5215`,primary:`#8a5215`,onPrimary:`#ffffff`,container:`#ffdcbe`,onContainer:`#2e1500`,surface:`#fff8f3`,onSurface:`#211a14`,outline:`#8a7668`,wallpaper:`linear-gradient(150deg, #4a2a06, #8a5215 46%, #f0b478)`},fern:{label:`Fern`,seed:`#3D6A3A`,primary:`#3d6a3a`,onPrimary:`#ffffff`,container:`#c3efb8`,onContainer:`#002204`,surface:`#f6fbf2`,onSurface:`#191d17`,outline:`#71796d`,wallpaper:`linear-gradient(150deg, #10310f, #3d6a3a 46%, #a8dc9c)`}},n=`transition: background-color 0.3s var(--sp-ease), color 0.3s var(--sp-ease), border-color 0.3s var(--sp-ease)`;function r(r){r.innerHTML=`
    <div class="sp-app" style="gap: 14px">
      <div data-part="panel" data-subject
           style="width: 290px; padding: 14px; border-radius: 18px; border: 1px solid var(--tone-outline); background: var(--tone-surface); color: var(--tone-on-surface); ${n}">
        <div class="sp-row sp-row--between">
          <div>
            <div style="font-size: 15px; font-weight: 600">Today</div>
            <div data-part="seed" style="font-size: 12px; color: var(--tone-outline); ${n}">Seed #2A5EA7</div>
          </div>
          <span style="display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 50%; background: var(--tone-container); color: var(--tone-on-container); font-size: 12px; font-weight: 600; ${n}">AK</span>
        </div>

        <div style="margin-top: 12px; padding: 10px 12px; border-radius: 14px; background: var(--tone-container); color: var(--tone-on-container); ${n}">
          <div style="font-size: 13px; font-weight: 600">Rain until 4pm</div>
          <div style="font-size: 12px; margin-top: 2px">Heaviest around 2pm</div>
        </div>

        <div class="sp-row" style="margin-top: 12px; gap: 8px">
          <button type="button" data-part="cta"
                  style="padding: 8px 16px; border: 0; border-radius: 999px; background: var(--tone-primary); color: var(--tone-on-primary); font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; ${n}">
            Set a reminder
          </button>
          <span style="padding: 6px 12px; border: 1px solid var(--tone-outline); border-radius: 999px; font-size: 12px; ${n}">Later</span>
        </div>
      </div>

      <div class="sp-context sp-row" style="gap: 10px">
        <span class="sp-label">Wallpaper</span>
        ${Object.entries(t).map(([e,t])=>`
        <button type="button" class="sp-button--quiet" data-part="wall-${e}" aria-label="${t.label} wallpaper"
                style="width: 52px; height: 40px; padding: 0; border: 0; border-radius: 7px; background-image: ${t.wallpaper}; cursor: pointer"></button>`).join(``)}
      </div>
    </div>
  `;let i=e(r,`panel`),a=e(r,`seed`),o=Object.keys(t).map(t=>[t,e(r,`wall-${t}`)]),s=e=>{let n=t[e];if(n){i.style.setProperty(`--tone-primary`,n.primary),i.style.setProperty(`--tone-on-primary`,n.onPrimary),i.style.setProperty(`--tone-container`,n.container),i.style.setProperty(`--tone-on-container`,n.onContainer),i.style.setProperty(`--tone-surface`,n.surface),i.style.setProperty(`--tone-on-surface`,n.onSurface),i.style.setProperty(`--tone-outline`,n.outline),a.textContent=`Seed ${n.seed}`;for(let[t,n]of o){let r=t===e;n.setAttribute(`aria-selected`,String(r)),n.style.outline=r?`2px solid var(--sp-ink)`:`none`,n.style.outlineOffset=`2px`}}};for(let[e,t]of o)t.addEventListener(`click`,()=>s(e));s(`coast`)}export{r as mount};