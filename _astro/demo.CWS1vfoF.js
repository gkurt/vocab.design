import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n={indigo:{name:`Indigo`,hex:`#4A55D6`},coral:{name:`Coral`,hex:`#E3563F`},moss:{name:`Moss`,hex:`#2F7D4F`}},r=`indigo`,i=[10,30,40,50,70,90,95],a=(e,t)=>t===50?e:t<50?`color-mix(in oklab, ${e} ${t*2}%, #000000)`:`color-mix(in oklab, ${e} ${(100-t)*2}%, #FFFFFF)`,o=()=>`<span style="display: flex; flex: 0 0 auto; color: var(--sp-muted)">${t(`chevronRight`)}</span>`;function s(t){let s=n[r]??n.indigo;if(!s)return;let c=i.map(e=>`<span class="sp-swatch" data-part="tone-${e}"
                  style="flex: 0 0 18px; height: 52px; border-radius: 0; --sp-swatch: ${a(s.hex,e)}"></span>`).join(``),l=(e,t)=>`
    <div class="sp-stack" style="flex: 0 0 auto; gap: 5px; align-items: flex-start">
      ${t}
      <span class="sp-label" style="font-size: 10px">${e}</span>
    </div>`;t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 436px; padding: 14px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Seed" data-value="${r}">
            ${Object.entries(n).map(([e,t])=>`<button class="sp-segment" data-part="seg-${e}" value="${e}">${t.name}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-row" data-part="chain" data-subject data-seed="${r}" style="gap: 9px; margin-top: 14px; align-items: flex-start">
          ${l(`Seed`,`<span class="sp-swatch" data-part="seed-chip" style="width: 52px; height: 52px; border-radius: 7px;
                   box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35); --sp-swatch: ${s.hex}"></span>`)}
          ${o()}
          ${l(`Tonal ramp 10 to 95`,`<span class="sp-row" data-part="ramp" style="gap: 0; overflow: hidden; border-radius: 5px;
                   box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)">${c}</span>`)}
          ${o()}
          ${l(`Roles`,`<span class="sp-stack" style="gap: 4px; width: 124px">
               <span data-part="role-primary" style="height: 24px; display: flex; align-items: center; padding: 0 9px;
                     border-radius: 6px; font-size: 11px; font-weight: 500; background: ${a(s.hex,40)}; color: #FFFFFF">Primary</span>
               <span data-part="role-container" style="height: 24px; display: flex; align-items: center; padding: 0 9px;
                     border-radius: 6px; font-size: 11px; background: ${a(s.hex,90)}; color: ${a(s.hex,10)}">Container</span>
             </span>`)}
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px">
          <span class="sp-text" data-part="seed-hex" style="font-size: 11px">seed ${s.hex}</span>
          <span class="sp-text" style="font-size: 11px">primary = tone 40, container = tone 90</span>
        </div>

      </div>
    </div>
  `;let u=e(t,`chain`),d=e(t,`role-primary`),f=e(t,`role-container`),p=r=>{let o=n[r];if(o){u.dataset.seed=r,e(t,`seed-chip`).style.setProperty(`--sp-swatch`,o.hex);for(let n of i)e(t,`tone-${n}`).style.setProperty(`--sp-swatch`,a(o.hex,n));d.style.background=a(o.hex,40),f.style.background=a(o.hex,90),f.style.color=a(o.hex,10),e(t,`seed-hex`).textContent=`seed ${o.hex}`}};p(r),e(t,`segmented`).addEventListener(`change`,e=>p(e.detail))}export{s as mount};