import{n as e,t}from"./parts.C-YLuC7Q.js";var n=Array.from({length:13},(e,t)=>`oklch(0.65 0.16 ${t*30}) ${t*30}deg`).join(`, `),r=[{hue:265,label:`Indigo and amber`},{hue:25,label:`Red and cyan`},{hue:145,label:`Green and magenta`}],i=265,a=e=>`oklch(0.65 0.16 ${e})`,o=e=>(e+180)%360;function s(s){let c=r.map(({hue:e,label:t})=>`<button class="sp-chip" data-part="preset-${e}">${t}</button>`).join(``);s.innerHTML=`
    <div class="sp-app">
      <div class="sp-row" style="gap: 18px; align-items: center">
        <div data-part="wheel" data-subject data-pair="${i}"
             style="position: relative; width: 152px; height: 152px; border-radius: 50%; background: conic-gradient(${n})">
          <div data-part="pair" style="position: absolute; inset: 0; rotate: ${i}deg">
            <span style="position: absolute; left: 50%; top: 17px; bottom: 17px; width: 2px; translate: -50% 0; background: var(--sp-surface)"></span>
            <span data-part="dot-a" style="position: absolute; left: 50%; top: 6px; width: 22px; height: 22px; translate: -50% 0; border: 3px solid var(--sp-surface); border-radius: 50%; background: ${a(i)}"></span>
            <span data-part="dot-b" style="position: absolute; left: 50%; bottom: 6px; width: 22px; height: 22px; translate: -50% 0; border: 3px solid var(--sp-surface); border-radius: 50%; background: ${a(o(i))}"></span>
          </div>
        </div>

        <div class="sp-surface sp-context" style="width: 172px; padding: 14px">
          <div class="sp-row sp-row--between">
            <span class="sp-heading" style="font-size: 14px">Evening set</span>
            <span data-part="badge" style="padding: 2px 8px; border-radius: 999px; font-size: 11px; color: #14161a; background: ${a(o(i))}">2 left</span>
          </div>
          <p class="sp-text" style="margin: 6px 0 0">Doors at eight, one room, no support.</p>
          <button class="sp-button sp-button--sm" data-part="cta"
                  style="margin-top: 12px; width: 100%; color: #14161a; background: ${a(i)}">Buy a ticket</button>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="presets" style="margin-top: 4px">${c}</div>
    </div>
  `;let l=e(s,`wheel`),u=e(s,`pair`),d=e(s,`dot-a`),f=e(s,`dot-b`),p=e(s,`badge`),m=e(s,`cta`),h=r.map(t=>({preset:t,el:e(s,`preset-${t.hue}`)})),g=e=>{let n=o(e);l.dataset.pair=String(e),u.style.rotate=`${e}deg`,d.style.background=a(e),f.style.background=a(n),m.style.background=a(e),p.style.background=a(n);for(let n of h)t(n.el,`data-selected`,n.preset.hue===e)};g(i);for(let e of h)e.el.addEventListener(`click`,()=>g(e.preset.hue))}export{s as mount};