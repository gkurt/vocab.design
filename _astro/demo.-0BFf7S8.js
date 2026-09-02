import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`#241f4d`,n=[{key:`violet`,color:`#6d4bd6`,at:`16% 20%`},{key:`cyan`,color:`#1e9fd0`,at:`86% 16%`},{key:`amber`,color:`#e08a3c`,at:`82% 86%`}],r=`#e0518a`,i={corner:{at:`16% 82%`,x:`16%`,y:`82%`},centre:{at:`50% 50%`,x:`50%`,y:`50%`},top:{at:`48% 12%`,x:`48%`,y:`12%`}},a=`corner`,o=e=>`radial-gradient(58% 66% at ${e.at}, ${e.color} 0%, transparent 72%)`,s=e=>{let t=i[e]??i.corner;return t?[o({color:r,at:t.at}),...n.map(o)].join(`, `):``},c=(e,t,n,r,i=``)=>`
  <span data-part="${e}" style="position: absolute; left: ${n}; top: ${r}; width: 16px; height: 16px; margin: -8px 0 0 -8px;
        border-radius: 50%; background: ${t}; box-shadow: 0 0 0 2px rgb(255 255 255 / 0.92), 0 1px 3px rgb(0 0 0 / 0.4); ${i}"></span>`;function l(o){let l=i[a];if(!l)return;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 438px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${a}" data-axis="Rose point">
            <button class="sp-segment" data-part="seg-corner" value="corner">Corner</button>
            <button class="sp-segment" data-part="seg-centre" value="centre">Centre</button>
            <button class="sp-segment" data-part="seg-top" value="top">Top</button>
          </sp-segmented>
        </div>

        <div style="position: relative; height: 148px; margin-top: 12px">
          <div data-part="field" data-subject data-spot="${a}"
               style="position: absolute; inset: 0; border-radius: 10px; overflow: hidden;
                      background-color: ${t}; background-image: ${s(a)}"></div>
          <div class="sp-context" data-part="points" aria-hidden="true" style="position: absolute; inset: 0; pointer-events: none">
            ${c(`pt-rose`,r,l.x,l.y)}
            ${n.map(e=>{let[t,n]=e.at.split(` `);return c(`pt-${e.key}`,e.color,t??`50%`,n??`50%`)}).join(``)}
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px">
          <span class="sp-text" data-part="readout" style="font-size: 10.5px">rose at ${l.at}</span>
          <span class="sp-text" style="font-size: 10.5px">4 points</span>
        </div>
      </div>
    </div>
  `;let u=e(o,`field`),d=e(o,`pt-rose`),f=e(o,`readout`),p=e=>{let t=i[e];t&&(u.dataset.spot=e,u.style.backgroundImage=s(e),d.style.left=t.x,d.style.top=t.y,f.textContent=`rose at ${t.at}`)};p(a),e(o,`segmented`).addEventListener(`change`,e=>p(e.detail))}export{l as mount};