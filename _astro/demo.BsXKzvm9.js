import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=[{id:1,title:`Invoice`},{id:2,title:`Contacts`},{id:3,title:`Settings`}],r={consistent:[{word:`Save`,glyph:`inbox`,spoken:`“Save, button”`,name:`save`},{word:`Save`,glyph:`inbox`,spoken:`“Save, button”`,name:`save`},{word:`Save`,glyph:`inbox`,spoken:`“Save, button”`,name:`save`}],vary:[{word:`Save`,glyph:`inbox`,spoken:`“Save, button”`,name:`save`},{word:`Store`,glyph:`copy`,spoken:`“Store, button”`,name:`store`},{word:``,glyph:`check`,spoken:`“button”, no name`,name:`none`}]},i={consistent:`One name, one glyph, three screens. A reader learns the control once and finds it everywhere.`,vary:`Same function, three identifications. The reader who learned Save has to work out that Store and the bare glyph are the same thing.`};function a(a){let o=(e,t)=>`
    <div class="sp-frame ${e===2?``:`sp-context`}" data-part="screen-${e}"
         style="flex: 1 1 0; min-width: 0; width: auto; height: 98px">
      <div class="sp-topbar" style="padding: 4px 8px">
        <span class="sp-label" style="font-size: 9.5px">${t}</span>
      </div>
      <div class="sp-body sp-stack" style="padding: 7px 8px; gap: 5px">
        <span class="sp-line" style="width: 82%"></span>
        <span class="sp-line" style="width: 58%"></span>
        <button class="sp-button sp-button--sm" type="button" data-part="btn-${e}"
                style="display: inline-flex; align-items: center; justify-content: center; gap: 5px; width: 100%;
                       height: 24px; font-size: 11px; white-space: nowrap">
          <span data-part="glyph-${e}" style="display: flex; width: 16px; height: 16px"></span>
          <span data-part="name-${e}" style="white-space: nowrap"></span>
        </button>
        <span class="sp-label" data-part="done-${e}" data-state="idle"
              style="height: 12px; font-size: 9.5px; white-space: nowrap; opacity: 0;
                     transition: opacity 0.18s ease">Saved to the record</span>
      </div>
    </div>`,s=(e,t)=>`
    <div class="sp-row" style="gap: 8px; height: 15px">
      <span class="sp-label" style="flex: 0 0 auto; width: 62px; font-size: 10px">${t}</span>
      <span class="sp-text sp-text--ink" data-part="say-${e}" data-name="save"
            style="flex: 1 1 auto; min-width: 0; font-size: 11px; line-height: 15px; white-space: nowrap">“Save, button”</span>
    </div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-axis="Naming" data-term="consistent" data-value="consistent" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-consistent" value="consistent"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">One name</button>
            <button class="sp-segment" type="button" data-part="seg-vary" value="vary"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Three names</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 10px; gap: 8px; align-items: stretch">
          ${n.map(e=>o(e.id,e.title)).join(``)}
        </div>

        <div class="sp-surface sp-context" style="margin-top: 9px; padding: 7px 10px">
          <div class="sp-stack" style="gap: 0">
            ${n.map(e=>s(e.id,e.title)).join(``)}
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="consistent"
           style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${i.consistent}</p>
      </div>
    </div>
  `;let c=e(a,`caption`),l=n.map(t=>e(a,`name-${t.id}`)),u=n.map(t=>e(a,`glyph-${t.id}`)),d=n.map(t=>e(a,`say-${t.id}`)),f=n.map(t=>e(a,`done-${t.id}`));l[1]?.setAttribute(`data-subject`,``),l[1]?.setAttribute(`data-pose`,`[data-mode=consistent]`);let p=e=>{c.dataset.mode=e,c.textContent=i[e],r[e].forEach((n,r)=>{let i=l[r],a=u[r],o=d[r],s=f[r];!i||!a||!o||!s||(i.textContent=n.word,i.dataset.mode=e,i.style.display=n.word?``:`none`,a.innerHTML=t(n.glyph),o.textContent=n.spoken,o.dataset.name=n.name,s.dataset.state=`idle`,s.style.opacity=`0`)})};for(let[t,r]of n.entries())e(a,`btn-${r.id}`).addEventListener(`click`,()=>{let e=f[t];e&&(e.dataset.state=`saved`,e.style.opacity=`1`)});e(a,`mode`).addEventListener(`change`,e=>{p(e.detail)}),p(`consistent`)}export{a as mount};