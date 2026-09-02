import{n as e,r as t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=20,r=13,i=`repeating-linear-gradient(to bottom, var(--sp-accent-soft) 0 1px, transparent 1px ${n}px)`,a=`Rehearsal notes`,o=`The room is booked from ten until noon.`,s=`Bring the printed parts and a spare pen.`;function c(c){let l=(e,t)=>`
    <div data-part="column-${e}"${e===`on`?` data-subject`:``}
         style="width: 190px; height: 140px; overflow: hidden; font-size: 13px">
      <p style="margin: 0; font-weight: 600; line-height: ${n}px">${a}</p>
      <p class="sp-text" style="margin: ${n}px 0 0; line-height: ${n}px">${o}</p>
      <p class="sp-text" data-part="last-${e}" style="margin: ${t}px 0 0; line-height: ${n}px">${s}</p>
    </div>`;c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 448px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">${n}px grid</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Rules" data-part="segmented" data-value="on">
            <button class="sp-segment" data-part="seg-on" value="on">ruled</button>
            <button class="sp-segment" data-part="seg-off" value="off">unruled</button>
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="grid" data-rules="on" style="gap: 24px; margin-top: 16px; align-items: flex-start">
          ${l(`on`,n)}
          <div class="sp-context">${l(`off`,r)}</div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 6px">
          The right-hand column loses the beat at one gap: ${r}px instead of a whole line, and every
          line after it lands between the rules.
        </p>
      </div>
    </div>
  `;let u=e(c,`grid`),d=t(c,`column-on`).concat(t(c,`column-off`)),f=e=>{u.dataset.rules=e;for(let t of d)t.style.backgroundImage=e===`on`?i:`none`};f(`on`),e(c,`segmented`).addEventListener(`change`,e=>f(e.detail))}export{c as mount};