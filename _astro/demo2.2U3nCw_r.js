import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`The ferry contract nobody was allowed to read`,n=`Three bidders, one signature, and a clause letting the winner set its own fares for a decade.`;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Article header" data-value="with">
            <button class="sp-segment" data-part="seg-with" value="with">with deck</button>
            <button class="sp-segment" data-part="seg-without" value="without">without</button>
          </sp-segmented>
        </div>
        <div data-part="article" data-mode="with" style="margin-top: 10px">
          <span class="sp-context" data-part="eyebrow"
                style="display: block; font-size: 11px; font-weight: 600; letter-spacing: 0.09em;
                       text-transform: uppercase; color: var(--sp-accent)">Investigation</span>
          <h3 class="sp-context" data-part="headline"
              style="margin: 4px 0 0; font-size: 24px; line-height: 1.2; font-weight: 650">${t}</h3>
          <p data-part="deck" data-subject
             style="margin: 8px 0 0; font-size: 15px; line-height: 1.4; font-weight: 400; color: var(--sp-ink)">${n}</p>
          <div class="sp-row sp-context" data-part="byline" style="gap: 8px; margin-top: 10px">
            <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">AM</span>
            <span class="sp-label">By A. Moreno</span>
            <span class="sp-label">12 min read</span>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">
          An eyebrow categorises above the headline; a deck expands below it, carrying facts the
          headline had no room for. Taking it away leaves its space, so nothing under it moves.
        </p>
      </div>
    </div>
  `;let i=e(r,`article`),a=e(r,`deck`),o=e=>{(e===`with`||e===`without`)&&(i.dataset.mode=e,a.style.visibility=e===`with`?`visible`:`hidden`)};o(`with`),e(r,`segmented`).addEventListener(`change`,e=>o(e.detail))}export{r as mount};