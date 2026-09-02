import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{i as n}from"./measure.DK7AY2_i.js";var r=`The harbour master kept his ledger in a hand that leaned backwards, and every entry was the same three columns: the name of the boat, the berth it took, and the hour it left again. Nobody had asked him to. `,i=`He simply believed a harbour should be able to `,a=`remember.`,o=`By the time the season turned he had filled four of them, and the fourth was the one the insurers asked for. He handed it over and started the fifth that evening.`,s=`Column two opens with one word, and the paragraph it finishes is on the other side of the break.`,c=`Column two opens with two lines, so the ending arrives with enough of its paragraph to read.`;function l(l){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 500px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Page 34</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Break" data-part="segmented" data-value="set">
            <button class="sp-segment" data-part="seg-set" value="set">As set</button>
            <button class="sp-segment" data-part="seg-carry" value="carry">Carry two lines</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 24px; align-items: flex-start; margin-top: 14px">
          <div class="sp-context" data-part="col-1" style="flex: 1 1 0; height: 150px">
            <p class="sp-prose" data-part="body" style="font-size: 12px; max-width: none; margin: 0">${r}<span
              data-part="pull">${i}</span></p>
          </div>
          <div data-part="col-2" style="flex: 1 1 0; height: 150px">
            <p class="sp-prose" data-part="carried" style="font-size: 12px; max-width: none; margin: 0"><span
              data-part="widow" data-subject>${a}</span></p>
            <p class="sp-prose sp-context" data-part="follow" style="font-size: 12px; max-width: none; margin: 12px 0 0">${o}</p>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="readout" style="margin-top: 12px; font-size: 12px"></p>
      </div>
    </div>
  `;let u=e(l,`body`),d=e(l,`carried`),f=e(l,`pull`),p=e(l,`widow`),m=e(l,`readout`),h=l.ownerDocument.defaultView??window,g=Number.parseFloat(h.getComputedStyle(d).lineHeight)||18,_=()=>{let e=Math.max(1,Math.round(n(d).height/g));d.dataset.lines=String(e),t(p,`data-stranded`,e===1),m.textContent=e===1?s:c};_(),e(l,`segmented`).addEventListener(`change`,e=>{e.detail===`carry`?d.prepend(f):u.append(f),_()})}export{l as mount};