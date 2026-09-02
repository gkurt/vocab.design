import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[`library`,`albums`,`search`];function r(r){r.innerHTML=`
    <div class="sp-app" style="padding: 0">
      <div class="sp-aurora sp-context" data-part="backdrop" aria-hidden="true"
           style="--sp-aurora-wash: linear-gradient(140deg, #2f4fd8, #a13fd0 48%, #f0733b)">
        <span class="sp-aurora-blob sp-drift" style="--sp-blob: #ffd166; --sp-i: 0; left: 4%; top: 8%"></span>
        <span class="sp-aurora-blob sp-drift" style="--sp-blob: #23d3ee; --sp-i: 1; --sp-blob-size: 140px; right: 6%; top: 34%"></span>
      </div>
      <div data-part="content" aria-hidden="true"
           style="position: absolute; left: 8%; top: 20%; right: 8%; color: #fff; text-shadow: 0 1px 6px rgb(0 0 0 / 0.25)">
        <div style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em">Coast Roads</div>
        <div style="font-size: 14px; opacity: 0.85; margin-top: 2px">48 photos, taken last August</div>
      </div>

      <div class="sp-glass" data-part="bar" data-subject
           style="position: absolute; left: 50%; bottom: 22px; translate: -50% 0; display: flex; width: 268px; padding: 4px; border-radius: 999px; --tab: 0; backdrop-filter: blur(18px) saturate(1.9) brightness(1.05); box-shadow: 0 10px 28px rgb(16 24 40 / 0.34), inset 0 1px 1px rgb(255 255 255 / 0.7), inset 0 -2px 3px rgb(255 255 255 / 0.28)">
        <span data-part="capsule" aria-hidden="true"
              style="position: absolute; top: 4px; bottom: 4px; left: calc(4px + var(--tab) * (100% - 8px) / 3); width: calc((100% - 8px) / 3); border-radius: 999px; background: rgb(255 255 255 / 0.3); box-shadow: inset 0 1px 1px rgb(255 255 255 / 0.75), 0 2px 8px rgb(16 24 40 / 0.22); transition: left 0.45s var(--sp-ease)"></span>
        <span data-part="specular" aria-hidden="true"
              style="position: absolute; inset: 0; border-radius: inherit; pointer-events: none; background: linear-gradient(104deg, transparent 34%, rgb(255 255 255 / 0.42) 47%, transparent 58%)"></span>
        ${n.map((e,t)=>`
      <button data-part="tab-${e}" type="button" ${t===0?`data-current`:``}
              style="position: relative; z-index: 1; flex: 1; padding: 8px 0; border: 0; background: transparent; color: inherit; font: inherit; font-size: 13px; font-weight: 600; text-transform: capitalize; cursor: pointer; opacity: ${t===0?`1`:`0.72`}">
        ${e}
      </button>`).join(``)}
      </div>
    </div>
  `;let i=e(r,`bar`);for(let[a,o]of n.entries())e(r,`tab-${o}`).addEventListener(`click`,()=>{i.style.setProperty(`--tab`,String(a));for(let i of n){let n=e(r,`tab-${i}`);t(n,`data-current`,i===o),n.style.opacity=i===o?`1`:`0.72`}})}export{r as mount};