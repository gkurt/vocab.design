import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[{key:`node-h1`,say:`Heading, Release notes`,heading:!0},{key:`node-p1`,say:`Paragraph, Shipped this week`,heading:!1},{key:`node-link`,say:`Link, Full changelog`,heading:!1},{key:`field`,say:`Edit, Search notes`,heading:!1},{key:`node-h2`,say:`Heading, Known issues`,heading:!0}],r={browse:`In browse mode the reader eats the key before the page sees it. Down walks its own copy of the document, and H is a jump to the next heading.`,focus:`In focus mode the same keys pass through to the control. H is the letter H now, which is why the mode switches itself when focus lands in a field.`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Screen reader" data-term="browse" data-part="segmented" data-value="browse">
            <button class="sp-segment" data-part="seg-browse" value="browse">Browse mode</button>
            <button class="sp-segment" data-part="seg-focus" value="focus">Focus mode</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="page" data-subject data-pose="[data-mode=browse]" data-mode="browse"
             style="margin-top: 9px; padding: 9px 11px; display: flex; flex-direction: column; gap: 5px">
          <span class="sp-heading" data-part="node-h1" style="font-size: 12.5px">Release notes</span>
          <span class="sp-text" data-part="node-p1" style="font-size: 11px">Shipped this week: two new export formats.</span>
          <span class="sp-text" data-part="node-link" style="font-size: 11px; color: var(--sp-accent); text-decoration: underline">Full changelog</span>
          <input class="sp-input" data-part="field" data-typed="none" type="text" value="" readonly
                 aria-label="Search notes" placeholder="Search notes" style="font-size: 11.5px; padding: 4px 8px" />
          <span class="sp-heading" data-part="node-h2" style="font-size: 12.5px">Known issues</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Screen reader</span>
          <span class="sp-text sp-text--ink" data-part="did" data-did="rest"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">Virtual cursor on: Heading, Release notes</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="browse"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${r.browse}</p>
      </div>
    </div>
  `;let a=e(i,`page`),o=e(i,`field`),s=e(i,`did`),c=e(i,`caption`),l=`browse`,u=0,d=``,f=()=>{let r=l===`focus`?`field`:n[u]?.key??`node-h1`;for(let a of n)t(e(i,a.key),`data-sim-focus`,a.key===r)},p=(e,t)=>{s.dataset.did=e,s.textContent=t},m=e=>{l=e,u=0,d=``,o.value=``,o.dataset.typed=`none`,a.dataset.mode=e,c.dataset.mode=e,c.textContent=r[e],f(),p(`rest`,e===`browse`?`Virtual cursor on: ${n[0]?.say}`:`Keys are passed straight to the field`)};m(`browse`),a.addEventListener(`keydown`,e=>{let t=e.key;if(t!==`ArrowDown`&&t!==`h`)return;if(e.preventDefault(),l===`focus`){if(t===`h`){d=`${d}h`,o.value=d,o.dataset.typed=d,p(`typed`,`Typed “${d}” into the field`);return}p(`passed`,`Handed to the page. The cursor holds.`);return}if(t===`ArrowDown`){u=Math.min(u+1,n.length-1),f(),p(`moved`,`Virtual cursor moved to: ${n[u]?.say}`);return}let r=n.findIndex((e,t)=>t>u&&e.heading);if(r<0){p(`end`,`No heading below. The cursor holds.`);return}u=r,f(),p(`jumped`,`Jumped to: ${n[u]?.say}`)}),e(i,`segmented`).addEventListener(`change`,e=>{m(e.detail)})}export{i as mount};