import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r=20,i={shipped:0,tested:0,spaced:8},a=[{key:`edit`,name:`pencil`,label:`Edit`},{key:`copy`,name:`copy`,label:`Duplicate`},{key:`star`,name:`star`,label:`Star`},{key:`heart`,name:`heart`,label:`Favourite`},{key:`share`,name:`share`,label:`Share`},{key:`trash`,name:`trash`,label:`Delete`}],o={shipped:`Not measured yet`,tested:`Circles intersect: 2.5.8 fails`,spaced:`Circles clear: 2.5.8 passes on spacing`};function s(s){let c=a.map(({key:e,name:t,label:i},a)=>{let o=a===2;return`
      <button class="sp-icon-button${o?``:` sp-context`}" type="button" data-part="tool-${e}" aria-label="${i}"
              ${o?`data-subject data-pose="[data-pass]"`:``}
              style="position: relative; width: ${r}px; height: ${r}px; border-radius: 5px">
        ${n(t)}
        <span data-part="ring-${e}" hidden
              style="position: absolute; left: 50%; top: 50%; width: 24px; height: 24px; margin: -12px 0 0 -12px;
                     border: 2px dashed var(--sp-accent); border-radius: 50%; pointer-events: none"></span>
      </button>`}).join(``);s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Circle test</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="picker" data-value="spaced" data-axis="View" data-term="spaced">
            <button class="sp-segment" type="button" data-part="seg-shipped" value="shipped"
                    style="padding: 4px 8px; font-size: 11.5px; white-space: nowrap">As shipped</button>
            <button class="sp-segment" type="button" data-part="seg-tested" value="tested"
                    style="padding: 4px 8px; font-size: 11.5px; white-space: nowrap">Draw the circles</button>
            <button class="sp-segment" type="button" data-part="seg-spaced" value="spaced"
                    style="padding: 4px 8px; font-size: 11.5px; white-space: nowrap">Space them out</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="scene"
             style="margin-top: 8px; height: 100px; padding: 10px 12px; display: flex; flex-direction: column; gap: 12px">
          <div class="sp-row" data-part="bar" data-gap="8"
               style="height: 24px; gap: ${i.spaced}px; align-items: center">${c}</div>
          <div class="sp-stack sp-context" style="gap: 7px">
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 74%"></div>
            <div class="sp-line" style="width: 51%"></div>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 16px; gap: 10px">
          <span class="sp-label" data-part="offset" data-px="28" style="flex: 0 0 auto; font-size: 10.5px">Offset between centres: 28 px</span>
          <span class="sp-label" data-stage-verdict data-part="verdict" data-state="spaced" style="flex: 0 0 auto; font-size: 10.5px">${o.spaced}</span>
        </div>
      </div>
    </div>
  `;let l=e(s,`bar`),u=e(s,`tool-star`),d=a.map(({key:t})=>e(s,`ring-${t}`)),f=e(s,`offset`),p=e(s,`verdict`),m=e=>{let n=i[e],a=r+n;l.dataset.gap=String(n),l.style.gap=`${n}px`;for(let n of d)t(n,`hidden`,e===`shipped`);t(u,`data-pass`,e===`spaced`),f.dataset.px=String(a),f.textContent=`Offset between centres: ${a} px`,p.dataset.state=e,p.textContent=o[e]};m(`spaced`),e(s,`picker`).addEventListener(`change`,e=>{m(e.detail)})}export{s as mount};