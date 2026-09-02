import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={symmetric:{blocks:{"block-big":{left:170,top:22,width:100,height:92},"block-one":{left:56,top:45,width:64,height:46},"block-two":{left:320,top:45,width:64,height:46}},tilt:0,balanced:!0,note:`Mirrored across the axis. The easy case: equal weight in equal places.`},asymmetric:{blocks:{"block-big":{left:34,top:22,width:140,height:92},"block-one":{left:248,top:26,width:86,height:44},"block-two":{left:248,top:80,width:124,height:34}},tilt:0,balanced:!0,note:`One large block answered by two small ones, further out. Still level.`},lopsided:{blocks:{"block-big":{left:24,top:22,width:140,height:92},"block-one":{left:174,top:22,width:74,height:44},"block-two":{left:174,top:70,width:74,height:44}},tilt:-7,balanced:!1,note:`Everything crowds one side. Nothing answers it, so the beam tips.`}},n=`position: absolute; background: var(--sp-accent-soft); border: 1px solid var(--sp-accent); border-radius: 6px; transition: left 0.32s var(--sp-ease), top 0.32s var(--sp-ease), width 0.32s var(--sp-ease), height 0.32s var(--sp-ease)`,r=e=>`left: ${e.left}px; top: ${e.top}px; width: ${e.width}px; height: ${e.height}px`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Arrangement" data-part="switcher" data-value="asymmetric">
            <button class="sp-segment" type="button" data-part="seg-symmetric" value="symmetric">symmetric</button>
            <button class="sp-segment" type="button" data-part="seg-asymmetric" value="asymmetric">asymmetric</button>
            <button class="sp-segment" type="button" data-part="seg-lopsided" value="lopsided">lopsided</button>
          </sp-segmented>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px">
          <div
            data-part="composition"
            data-subject
            data-pose="[data-balanced]"
            data-balanced
            data-mode="asymmetric"
            style="position: relative; flex: 0 0 auto; width: 440px; height: 136px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <div
              data-part="axis"
              style="position: absolute; left: 219px; top: 0; width: 2px; height: 100%; background: repeating-linear-gradient(to bottom, var(--sp-line) 0 6px, transparent 6px 12px)"
            ></div>
            ${Object.entries(t.asymmetric?.blocks??{}).map(([e,t])=>`<div data-part="${e}" style="${n}; ${r(t)}"></div>`).join(``)}
          </div>
          <div class="sp-context" data-part="scale" style="position: relative; flex: 0 0 auto; width: 240px; height: 38px">
            <div
              data-part="beam"
              style="position: absolute; left: 0; top: 16px; width: 240px; height: 6px; border-radius: 999px; background: var(--sp-context-accent); transform-origin: 50% 50%; transition: rotate 0.32s var(--sp-ease)"
            ></div>
            <div
              style="position: absolute; left: 50%; top: 22px; width: 0; height: 0; margin-left: -10px; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 14px solid var(--sp-muted)"
            ></div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 22px; max-width: 448px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let a=e(i,`composition`),o=e(i,`beam`),s=e(i,`readout`),c=n=>{let r=t[n];if(r){a.dataset.mode=n;for(let[t,n]of Object.entries(r.blocks)){let r=e(i,t);r.style.left=`${n.left}px`,r.style.top=`${n.top}px`,r.style.width=`${n.width}px`,r.style.height=`${n.height}px`}o.style.rotate=`${r.tilt}deg`,r.balanced?a.setAttribute(`data-balanced`,``):a.removeAttribute(`data-balanced`),s.textContent=r.note}};e(i,`switcher`).addEventListener(`change`,e=>c(e.detail)),c(`asymmetric`)}export{i as mount};