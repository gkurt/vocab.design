import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=1300,n=[`[rain against the window]`,`MARA: The kettle has been on since six.`,`JUN: Then it is tea, not coffee.`,`[kettle clicks off]`];function r(r,i){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 404px">
        <div style="position: relative; height: 152px; border-radius: 6px; overflow: hidden;
                    background: linear-gradient(160deg, #2b3550 0%, #465a7d 58%, #6d7f9c 100%)">
          <div style="position: absolute; left: 34px; top: 30px; width: 58px; height: 58px; border-radius: 50%; background: #dfe6f2; opacity: 0.55"></div>
          <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 46px; background: #1d2436; opacity: 0.7"></div>
          <div data-part="bar" data-subject data-cue="0" data-captions="on"
               style="position: absolute; left: 14px; right: 14px; bottom: 12px; min-height: 26px; padding: 4px 10px;
                      border-radius: 6px; background: rgb(10 12 18 / 0.78); color: #ffffff; font-size: 12px;
                      line-height: 1.5; text-align: center">
            <span data-part="cue">${n[0]}</span>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px">
          <button class="sp-button sp-button--sm" type="button" data-part="play">Play from start</button>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="on" data-axis="Captions">
            <button class="sp-segment" data-part="seg-on" value="on">CC on</button>
            <button class="sp-segment" data-part="seg-off" value="off">CC off</button>
          </sp-segmented>
        </div>
        <div class="sp-progress sp-context" data-part="timeline" style="margin-top: 10px; --sp-value: 25%">
          <div class="sp-progress-fill"></div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 8px 0 0; height: 18px; font-size: 12px; white-space: nowrap">
          Speaker changes and sound are both cues.
        </p>
      </div>
    </div>
  `;let a=e(r,`bar`),o=e(r,`cue`),s=e(r,`timeline`),c=e(r,`note`),l=0,u,d=()=>{a.dataset.cue=String(l),o.textContent=a.dataset.captions===`off`?``:n[l]??``,s.style.setProperty(`--sp-value`,`${(l+1)/n.length*100}%`)},f=()=>{if(l>=n.length-1){delete a.dataset.playing,a.dataset.ended=``;return}l+=1,d(),u=i.setTimeout(f,t)};e(r,`play`).addEventListener(`click`,()=>{i.clearTimeout(u),l=0,delete a.dataset.ended,a.dataset.playing=``,d(),u=i.setTimeout(f,t)}),e(r,`segmented`).addEventListener(`change`,e=>{let t=e.detail!==`off`;a.dataset.captions=t?`on`:`off`,c.textContent=t?`Speaker changes and sound are both cues.`:`Track off: the audio is not available as text.`,d()})}export{r as mount};