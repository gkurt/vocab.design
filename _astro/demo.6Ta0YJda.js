import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[`touch`,`voice`,`gaze`],r={touch:`Set by tap`,voice:`Set by voice`,gaze:`Set by gaze plus pinch`},i={touch:`A tap on the preset sets the timer. The screen is the channel, and the state it writes is the only state there is.`,voice:`Speech reaches the same setter. The timer does not restart, does not fork, and does not disagree with what the screen already said.`,gaze:`The eyes aim and the pinch commits. Third channel, third source stamp, same ten minutes running.`},a=600;function o(o,s){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 226px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Kitchen hub</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="channel-pick" data-value="touch" data-axis="Channel">
            <button class="sp-segment" type="button" data-part="pick-touch" value="touch" style="padding: 5px 10px; font-size: 12px">Touch</button>
            <button class="sp-segment" type="button" data-part="pick-voice" value="voice" style="padding: 5px 10px; font-size: 12px">Voice</button>
            <button class="sp-segment" type="button" data-part="pick-gaze" value="gaze" style="padding: 5px 10px; font-size: 12px">Look, pinch</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">

          <div
            class="sp-surface"
            data-part="task"
            data-subject
            data-timer="unset"
            style="flex: 0 0 auto; display: flex; align-items: center; gap: 14px; height: 66px; padding: 0 14px"
          >
            <span
              data-part="face"
              style="font-size: 30px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: 0.5px; width: 104px"
            >00:00</span>
            <span class="sp-stack" style="gap: 3px; flex: 1 1 auto">
              <span data-part="status" style="font-size: 13px; font-weight: 500">Not set</span>
              <span class="sp-label" data-part="source" data-by="none" style="font-size: 11px">No channel has set it yet</span>
            </span>
          </div>

          <div class="sp-surface" data-part="strip" style="flex: 0 0 auto; height: 80px; padding: 10px 12px">
            <div style="position: relative; height: 56px">

              <div data-part="panel-touch" class="sp-row" style="position: absolute; inset: 0; gap: 12px">
                <button class="sp-button" type="button" data-part="tap-preset">Start 10 min</button>
                <span class="sp-text" style="font-size: 11px">Preset tapped on the panel</span>
              </div>

              <div data-part="panel-voice" class="sp-row" style="position: absolute; inset: 0; gap: 12px" hidden>
                <button class="sp-button sp-button--ghost" type="button" data-part="speak">Speak</button>
                <span class="sp-stack" style="gap: 3px; flex: 1 1 auto">
                  <span class="sp-text" data-part="transcript" style="font-size: 11px; opacity: 0; transition: opacity 0.2s">&ldquo;Set a ten minute timer&rdquo;</span>
                  <span class="sp-text" style="font-size: 11px">Wake word, then the command</span>
                </span>
              </div>

              <div data-part="panel-gaze" class="sp-row" style="position: absolute; inset: 0; gap: 12px" hidden>
                <span
                  data-part="gaze-target"
                  class="sp-row"
                  style="position: relative; gap: 6px; padding: 6px 10px; border: 2px solid var(--sp-accent); border-radius: 999px; font-size: 12px"
                >
                  10 min
                  <span class="sp-pulse" style="width: 8px; height: 8px; border-radius: 50%; background: var(--sp-accent)"></span>
                </span>
                <button class="sp-button sp-button--ghost" type="button" data-part="pinch">Pinch</button>
                <span class="sp-text" style="font-size: 11px">Gaze rests, fingers commit</span>
              </div>

            </div>
          </div>

        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px">${i.touch}</span>
    </div>
  `;let c=e(o,`task`),l=e(o,`face`),u=e(o,`status`),d=e(o,`source`),f=e(o,`transcript`),p=e(o,`note`),m=`touch`,h,g=e=>{c.dataset.timer=`10-running`,l.textContent=`10:00`,u.textContent=`Running`,d.dataset.by=e,d.textContent=r[e]},_=r=>{m=r,s.clearTimeout(h),f.style.opacity=`0`,p.textContent=i[r];for(let i of n)t(e(o,`panel-${i}`),`hidden`,i!==r)};e(o,`channel-pick`).addEventListener(`change`,e=>{_(e.detail)}),e(o,`tap-preset`).addEventListener(`click`,()=>g(`touch`)),e(o,`pinch`).addEventListener(`click`,()=>g(`gaze`)),e(o,`speak`).addEventListener(`click`,()=>{f.style.opacity=`1`,s.clearTimeout(h),h=s.setTimeout(()=>{m===`voice`&&g(`voice`)},a)})}export{o as mount};