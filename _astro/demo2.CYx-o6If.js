import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=460,n=500,r=245,i=6,a={omitted:`No attributes, so the reader counts the rows it can see: the total it announces is the size of the render window, not of the list.`,declared:`Each row declares aria-posinset and aria-setsize, so the count comes from the data: six rows in the tree, five hundred in the announcement.`};function o(o,s){let c=e=>String(e).padStart(4,`0`),l=e=>{let t=r+e;return`
      <li class="sp-list-item" role="option" data-part="row-${e}" data-record="${t}"
          aria-posinset="${t}" aria-setsize="${n}" aria-selected="${e===2}"
          style="padding: 3px 8px; font-size: 11.5px; gap: 8px; border-radius: 5px">
        <span class="sp-grow">Invoice ${c(t)}</span>
        <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Kellerman & Co</span>
      </li>`};o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 476px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Rows ${r} to 250 of ${n}</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Markup" data-part="mode" data-value="declared">
            <button class="sp-segment" type="button" data-part="seg-omitted" value="omitted"
                    style="padding: 4px 11px; font-size: 11.5px; white-space: nowrap">Omitted</button>
            <button class="sp-segment" type="button" data-part="seg-declared" value="declared"
                    style="padding: 4px 11px; font-size: 11.5px; white-space: nowrap">Declared</button>
          </sp-segmented>
        </div>

        <ul class="sp-listbox sp-listbox--static" data-part="list" role="listbox" aria-label="Invoices"
            tabindex="0" style="margin-top: 9px; max-height: none; padding: 4px">
          ${Array.from({length:i},(e,t)=>l(t)).join(``)}
        </ul>

                              <span class="sp-text sp-text--ink sp-grow" data-stage-announce data-part="utterance" data-state="spoken"
                  style="font-size: 11.5px; white-space: nowrap">“Invoice <span
                data-part="record">0247</span>, item <span data-part="count" data-subject data-mode="declared"
                style="font-weight: 600">247 of ${n}</span>”</span>
          
        

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="declared"
           style="margin: 8px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${a.declared}</p>
      </div>
    </div>
  `;let u=Array.from({length:i},(t,n)=>e(o,`row-${n}`)),d=e(o,`utterance`),f=e(o,`record`),p=e(o,`count`),m=e(o,`caption`),h=`declared`,g=2,_,v=()=>{if(!u[g])return;let e=r+g;s.clearTimeout(_),d.dataset.state=`queued`,_=s.setTimeout(()=>{d.dataset.state=`spoken`,f.textContent=c(e),p.dataset.mode=h,p.textContent=h===`declared`?`${e} of ${n}`:`${g+1} of ${i}`},t)},y=e=>{let t=Math.min(Math.max(e,0),5);for(let[e,n]of u.entries())n.setAttribute(`aria-selected`,String(e===t)),e===t?n.setAttribute(`data-sim-focus`,``):n.removeAttribute(`data-sim-focus`);g=t,v()},b=e=>{h=e;for(let[t,i]of u.entries())e===`declared`?(i.setAttribute(`aria-posinset`,String(r+t)),i.setAttribute(`aria-setsize`,String(n))):(i.removeAttribute(`aria-posinset`),i.removeAttribute(`aria-setsize`));m.dataset.mode=e,m.textContent=a[e],v()};o.addEventListener(`keydown`,e=>{if(e.key===`ArrowDown`)y(g+1);else if(e.key===`ArrowUp`)y(g-1);else return;e.preventDefault()}),e(o,`mode`).addEventListener(`change`,e=>{b(e.detail)}),y(2)}export{o as mount};