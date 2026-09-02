import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=440,n=176,r=280,i=130,a=14,o=20,s=[{key:`wide`,label:`wide`,width:424,columns:`${r}px ${i}px`,margin:!0,note:`The margin is a permanent band beside the text, and each note is dropped to the line it annotates. No jump, no return.`},{key:`narrow`,label:`narrow`,width:258,columns:`258px`,margin:!1,note:`No margin left to sit in. The notes fall back into the flow behind their numeral, which keeps them near the sentence at least.`}],c={1:{top:o,text:`Spring tides drop it further, and the channel closes altogether.`},2:{top:0,text:`Predicted, not measured. A hard easterly holds the water back.`}},l=e=>`
  <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 12px; font-size: 11px">
    ${e.label}
  </button>`,u=e=>`<button type="button" data-part="ref-${e}" style="appearance: none; border: 0; padding: 0 2px; background: transparent; color: var(--sp-accent); font: inherit; font-size: 10px; font-weight: 600; vertical-align: super; line-height: 1; cursor: pointer">${e}</button>`,d=e=>`
  <div data-part="cell-${e}" style="min-width: 0">
    <aside
      data-part="note-${e}"
      ${e===`1`?`data-subject data-pose="[data-place=margin]"`:``}
      data-place="margin"
      style="margin-top: ${c[e]?.top??0}px; padding-left: 8px; border-left: 2px solid var(--sp-accent);
             color: var(--sp-muted); font-size: 11px; line-height: 1.5"
    ><span style="color: var(--sp-accent); font-weight: 600">${e}. </span>${c[e]?.text??``}</aside>
  </div>`;function f(r){let i=s[0];r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour notes</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="layouts" data-axis="Layout" data-term="wide" data-value="${i.key}">
            ${s.map(l).join(``)}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div style="display: flex; align-items: flex-start; justify-content: flex-start; flex: 0 0 auto; width: ${t}px; height: ${n}px">
            <div
              class="sp-grid"
              data-part="article"
              data-layout="${i.key}"
              style="flex: 0 0 auto; width: ${i.width}px; height: 100%; align-content: start; gap: 8px ${a}px;
                     grid-template-columns: ${i.columns}; overflow: hidden;
                     transition: width 0.4s var(--sp-ease)"
            >
              <p class="sp-text sp-text--ink sp-context" data-part="para-1" style="margin: 0; font-size: 13px; line-height: ${o}px">
                The harbour dries out twice a day, and the boats sit on mud.${u(`1`)}
              </p>
              ${d(`1`)}
              <p class="sp-text sp-text--ink sp-context" data-part="para-2" style="margin: 0; font-size: 13px; line-height: ${o}px">
                The tide table is printed a year ahead and is rarely a minute out.${u(`2`)}
              </p>
              ${d(`2`)}
              <p class="sp-text sp-context" data-part="para-3" style="margin: 0; font-size: 13px; line-height: ${o}px">
                Wind and pressure do the rest, and the harbour master keeps his own book.
              </p>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="flex: 0 0 auto; height: 40px; width: 442px"></span>
        </div>
      </div>
    </div>
  `;let f=e(r,`article`),p=e(r,`readout`),m=[`1`,`2`].map(t=>({id:t,cell:e(r,`cell-${t}`),note:e(r,`note-${t}`)})),h=e=>{let t=s.find(t=>t.key===e);if(t){f.dataset.layout=t.key,f.style.width=`${t.width}px`,f.style.gridTemplateColumns=t.columns;for(let{id:e,cell:n,note:r}of m)n.hidden=!t.margin,r.dataset.place=t.margin?`margin`:`inline`,r.style.marginTop=t.margin?`${c[e]?.top??0}px`:`0`;p.textContent=t.note}};e(r,`layouts`).addEventListener(`change`,e=>h(e.detail));for(let{id:t,cell:n}of m)e(r,`ref-${t}`).addEventListener(`click`,()=>{f.dataset.layout===`narrow`&&(n.hidden=!1)});h(i.key)}export{f as mount};