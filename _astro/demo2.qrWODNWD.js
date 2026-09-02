import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{n as t}from"./measure.DK7AY2_i.js";var n=12,r=[0,4,22,10];function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 246px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Spacing</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Approach" data-part="segmented" data-value="stack">
            <button class="sp-segment" data-part="seg-soup" value="soup">Per item</button>
            <button class="sp-segment" data-part="seg-stack" value="stack">One rule</button>
          </sp-segmented>
        </div>
        <div class="sp-body">
          <div data-part="column" data-subject data-mode="stack" data-rhythm="even" style="padding: 0 10px">
            <div class="sp-surface" data-part="item-1" style="padding: 6px 10px; margin-top: 0px">
              <span class="sp-heading" style="font-size: 13px">Tide tables</span>
            </div>
            <div class="sp-surface" data-part="item-2" style="padding: 8px 10px; margin-top: 0px">
              <div class="sp-stack" style="gap: 6px">
                <div class="sp-line" style="width: 88%"></div>
                <div class="sp-line" style="width: 72%"></div>
              </div>
            </div>
            <div class="sp-surface" data-part="item-3" style="padding: 8px 10px; margin-top: 0px">
              <div class="sp-line" style="width: 54%"></div>
            </div>
            <div class="sp-surface" data-part="item-4" style="padding: 6px 10px; margin-top: 0px">
              <span class="sp-label">Revised in March</span>
            </div>
          </div>
          <p class="sp-text sp-context" data-stage-verdict data-part="readout" style="margin: 8px 0 0; text-align: center"></p>
        </div>
      </div>
    </div>
  `;let a=e(i,`column`),o=e(i,`readout`),s=[1,2,3,4].map(t=>e(i,`item-${t}`)),c=()=>{let e=new Set;for(let n=1;n<s.length;n++){let r=s[n-1],i=s[n];if(!r||!i)continue;let o=t(r,a),c=t(i,a);e.add(Math.round(c.top-(o.top+o.height)))}a.dataset.rhythm=e.size===1?`even`:`ragged`},l=e=>{let t=e===`stack`;a.dataset.mode=t?`stack`:`soup`,a.style.display=t?`flex`:`block`,a.style.flexDirection=t?`column`:``,a.style.gap=t?`${n}px`:``,s.forEach((e,n)=>{e.style.marginTop=t?`0px`:`${r[n]??0}px`}),o.textContent=t?`one rule on the parent: gap ${n}px`:`four margins, three different gaps`,c()};e(i,`segmented`).addEventListener(`change`,e=>l(e.detail)),l(`stack`)}export{i as mount};