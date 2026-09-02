import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n=170,r=18,i={control:`A stop the reader can reach in the first line of the page. Sound is drawn as a level here, never played: the specimen makes no noise.`,none:`Nothing stops it. The voice is still speaking, but it is speaking under the video, so the control that would help cannot be heard being announced.`};function a(a,o){let s=(e,t)=>`
    <span data-part="${e}" style="display: flex; align-items: flex-end; gap: 2px; height: 16px; ${t}">
      ${Array.from({length:r},()=>`<span style="width: 3px; height: 2px; border-radius: 1px; background: currentColor; transition: height 0.16s linear"></span>`).join(``)}
    </span>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="control" data-axis="Page" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-control" value="control"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Stop offered</button>
            <button class="sp-segment" type="button" data-part="seg-none" value="none"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">No control</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="media" data-playing="yes" style="margin-top: 10px; padding: 8px 10px">
          <div class="sp-row sp-row--between sp-context" style="gap: 10px; height: 14px">
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Autumn promo, playing since load</span>
            <span class="sp-label" data-part="meta" style="flex: 0 0 auto; font-size: 10px">1:20 clip, unmuted</span>
          </div>
          <div class="sp-row" style="margin-top: 6px; gap: 10px">
            <span class="sp-context" style="flex: 1 1 auto; min-width: 0; color: var(--sp-accent)">
              ${s(`level-page`,``)}
            </span>
            <span style="flex: 0 0 auto; width: 92px; display: flex; justify-content: flex-end">
              <button class="sp-button sp-button--sm" type="button" data-part="stop" data-subject
                      style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap; transition: opacity 0.18s ease">Stop sound</button>
            </span>
          </div>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 9px; padding: 8px 10px">
          <div class="sp-row sp-row--between" style="gap: 10px; height: 14px">
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Screen reader</span>
            <span class="sp-label" data-part="heard" data-state="masked"
                  style="flex: 0 0 auto; font-size: 10px">masked</span>
          </div>
          <div class="sp-row" style="margin-top: 6px; gap: 10px">
            <span style="flex: 0 0 auto; color: var(--sp-muted)">${s(`level-voice`,``)}</span>
            <span class="sp-text sp-text--ink" data-part="voice"
                  style="flex: 1 1 auto; min-width: 0; font-size: 11.5px; line-height: 16px; white-space: nowrap;
                         opacity: 0.32; transition: opacity 0.2s ease">“Stop sound, button. Skip to content, link.”</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="control"
           style="margin: 9px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${i.control}</p>
      </div>
    </div>
  `;let c=e(a,`media`),l=e(a,`stop`),u=e(a,`heard`),d=e(a,`voice`),f=e(a,`caption`),p=[...e(a,`level-page`).children],m=[...e(a,`level-voice`).children],h=t(a),g=`control`,_=!0,v=0,y=(e,t,n)=>{e.forEach((e,r)=>{let i=.5+.5*Math.sin(r*.9+v*.7+n);e.style.height=`${(2+t*i).toFixed(1)}px`})},b=()=>{y(p,_?13:0,0),y(m,6,1.8)},x=()=>{v+=1,b(),o.setTimeout(x,n)},S=()=>{c.dataset.playing=_?`yes`:`no`,l.style.opacity=g===`control`?`1`:`0`,l.style.visibility=g===`control`?`visible`:`hidden`,u.dataset.state=_?`masked`:`clear`,u.textContent=_?`masked`:`audible`,d.style.opacity=_?`0.32`:`1`,b()},C=e=>{g=e,_=!0,f.dataset.mode=e,f.textContent=i[e],S()};l.addEventListener(`click`,()=>{_=!1,S()}),e(a,`mode`).addEventListener(`change`,e=>{C(e.detail)}),C(`control`),h||x()}export{a as mount};