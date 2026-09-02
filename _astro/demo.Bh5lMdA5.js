import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=224,n=168,r=t/n,i={"16-9":16/9,"4-3":4/3,"9-16":9/16},a={"16-9":`16:9`,"4-3":`4:3`,"9-16":`9:16`},o=(e,t)=>`
  <button class="sp-segment" type="button" data-part="seg-${e}" value="${e}" style="padding: 4px 9px; font-size: 11px">
    ${t}
  </button>`,s=`
  <span style="position: absolute; left: 18%; top: 16%; width: 20%; aspect-ratio: 1; border-radius: 50%; background: #ffe08a"></span>
  <span style="position: absolute; left: 0; right: 0; bottom: 0; height: 34%; background: linear-gradient(#2f6b4a, #1d4632)"></span>
  <span style="position: absolute; left: 62%; bottom: 26%; width: 16%; height: 22%; border-radius: 3px; background: #f4f6fb"></span>`;function c(e,t){return t===`cover`?Math.abs(e-r)<.001?`none`:`crop`:Math.abs(e-r)<.001?`none`:e>r?`letterbox`:`pillarbox`}function l(l){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 268px; height: 228px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Preview</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 14px; padding: 10px 12px">
          <div
            data-part="box"
            data-subject
            data-pose="[data-bars=letterbox], [data-bars=pillarbox]"
            data-aspect="16-9"
            data-fit="contain"
            data-bars="letterbox"
            style="position: relative; flex: 0 0 auto; width: ${t}px; height: ${n}px; overflow: hidden;
                   background: #14161a; border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <span
              data-part="media"
              style="position: absolute; left: 50%; top: 50%; translate: -50% -50%; overflow: hidden;
                     background: linear-gradient(165deg, #3f6fd8, #8cc4f2 58%, #f0b269);
                     transition: width 0.24s var(--sp-ease), height 0.24s var(--sp-ease)"
            >${s}</span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 4px">
            <sp-segmented data-stage-mode class="sp-segmented" data-part="aspects" data-value="16-9" data-axis="Shape" data-term="16-9" style="align-self: flex-start">
              ${o(`16-9`,`16:9`)}${o(`4-3`,`4:3`)}${o(`9-16`,`9:16`)}
            </sp-segmented>
            <sp-segmented data-stage-mode class="sp-segmented" data-part="fits" data-value="contain" data-axis="Fit" data-term="contain" style="align-self: flex-start; margin-top: 8px">
              ${o(`contain`,`contain`)}${o(`cover`,`cover`)}
            </sp-segmented>
            <span class="sp-heading" data-stage-verdict data-part="verdict" style="height: 20px; margin-top: 12px; font-size: 13px"></span>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(l,`box`),d=e(l,`media`),f=e(l,`verdict`),p=(e,o)=>{let s=i[e],l=a[e];if(!s||!l)return;let p=o===`cover`?s<r:s>r,m=p?t:Math.round(n*s),h=p?Math.round(t/s):n;d.style.width=`${m}px`,d.style.height=`${h}px`;let g=c(s,o);u.dataset.aspect=e,u.dataset.fit=o,u.dataset.bars=g,f.textContent=`${l} source, ${o}`};e(l,`aspects`).addEventListener(`change`,e=>p(e.detail,u.dataset.fit??`contain`)),e(l,`fits`).addEventListener(`change`,e=>p(u.dataset.aspect??`16-9`,e.detail)),p(`16-9`,`contain`)}export{l as mount};