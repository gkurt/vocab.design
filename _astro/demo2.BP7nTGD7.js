import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`en`,lang:`en`,body:`She said <q>after you</q> and held the door open.`},{key:`fr`,lang:`fr`,body:`Il a répondu <q>je vous en prie</q> et il a souri.`},{key:`de`,lang:`de`,body:`Die Geschwindigkeitsbeschränkung wurde gestern aufgehoben.`}],n={set:`Declared per passage: the voice, the quotation marks, and the hyphenation dictionary all follow the language.`,missing:`Undeclared, every passage inherits English: the French line is read as English and the German column loses its breaks.`};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 16px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Markup" data-term="set" data-value="set">
          <button class="sp-segment" data-part="seg-set" value="set" style="font-size: 12px; padding: 5px 10px">lang declared</button>
          <button class="sp-segment" data-part="seg-missing" value="missing" style="font-size: 12px; padding: 5px 10px">no lang</button>
        </sp-segmented>
        <div class="sp-stack" style="gap: 10px">
          ${t.map(e=>`
    <div class="sp-row" style="gap: 12px; align-items: flex-start">
      <p class="sp-text sp-text--ink" data-part="text-${e.key}" lang="${e.lang}"
         ${e.key===`fr`?`data-subject data-pose="[lang=fr]"`:``}
         style="margin: 0; width: 190px; height: 54px; font-size: 12px; line-height: 18px;
                -webkit-hyphens: auto; hyphens: auto">${e.body}</p>
      <div class="sp-stack sp-context" style="gap: 2px; width: 218px">
        <span class="sp-label" data-part="tag-${e.key}" style="font-size: 11px">lang="${e.lang}"</span>
      </div>
    </div>`).join(``)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="set"
           style="margin: 8px 0 0; height: 30px; font-size: 11px">${n.set}</p>
      </div>
    </div>
  `;let i=e(r,`caption`),a=a=>{for(let n of t){let t=e(r,`text-${n.key}`);a===`set`?t.setAttribute(`lang`,n.lang):t.removeAttribute(`lang`),e(r,`tag-${n.key}`).textContent=a===`set`?`lang="${n.lang}"`:`no lang, inherits en`}i.dataset.case=a,i.textContent=n[a]};a(`set`),e(r,`segmented`).addEventListener(`change`,e=>a(e.detail))}export{r as mount};