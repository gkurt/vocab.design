import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[`n-heading`,`n-to`,`n-body`,`n-send`,`n-status`,`n-note`],r=[`n-to`,`n-body`,`n-send`],i=n.indexOf(`n-send`),a=r.indexOf(`n-to`),o={"n-heading":`“New message, heading level 2”`,"n-to":`“To, edit, design team”`,"n-body":`“Message, edit, multiline”`,"n-send":`“Send, button”`,"n-status":`“Draft saved 2 minutes ago”`,"n-note":`“Attachments over 25 MB are stripped”`},s={"n-to":`To field`,"n-body":`Message field`,"n-send":`Send button`},c={review:`The review cursor walks the whole screen, including the two lines no tab stop ever visits. Focus has not moved, so the caret stays in the field and the app is never told anything happened.`,focus:`Focus moves and the review cursor stays where it was put. Two cursors on one screen, and only one of them is the one the application knows about.`};function l(l){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Step drives" data-part="drives" data-value="review">
            <button class="sp-segment" type="button" data-part="seg-focus" value="focus"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">System focus</button>
            <button class="sp-segment" type="button" data-part="seg-review" value="review"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Review cursor</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 8px; gap: 12px; align-items: stretch">
          <div class="sp-surface" data-part="scene"
               style="position: relative; flex: 0 0 268px; height: 172px; padding: 8px 10px;
                      display: flex; flex-direction: column; gap: 5px">
            <span class="sp-heading" data-part="n-heading" style="font-size: 12.5px">New message</span>
            <div class="sp-input" data-part="n-to" style="height: 22px; padding: 3px 8px; font-size: 11px;
                 display: flex; align-items: center; color: var(--sp-muted)">design team</div>
            <div class="sp-input" data-part="n-body" style="height: 36px; padding: 4px 8px; font-size: 11px;
                 display: flex; align-items: flex-start">Sending the revised deck</div>
            <button class="sp-button sp-button--sm" type="button" data-part="n-send"
                    style="align-self: flex-start; font-size: 11px; padding: 4px 12px; cursor: default">Send</button>
            <span class="sp-label" data-part="n-status" style="font-size: 10px">Draft saved 2 minutes ago</span>
            <span class="sp-label" data-part="n-note" style="font-size: 10px">Attachments over 25 MB are stripped</span>

            <span data-part="marker" data-subject data-at="n-send" aria-hidden="true"
                  style="position: absolute; left: 0; top: 0; width: 0; height: 0; border: 2px dashed var(--sp-ink);
                         border-radius: 5px; pointer-events: none;
                         transition: left 0.22s var(--sp-ease), top 0.22s var(--sp-ease),
                                     width 0.22s var(--sp-ease), height 0.22s var(--sp-ease)"></span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 8px">
            <div class="sp-stack" style="gap: 1px">
              <span class="sp-label" style="font-size: 9.5px">System focus</span>
              <span class="sp-text sp-text--ink" data-part="focus-at" data-node="n-to"
                    style="height: 17px; font-size: 11.5px">${s[`n-to`]}</span>
            </div>
            <div class="sp-stack" style="gap: 1px">
              <span class="sp-label" style="font-size: 9.5px">Review cursor</span>
              <span class="sp-text sp-text--ink" data-part="reads" data-node="n-send"
                    style="height: 46px; font-size: 11.5px; line-height: 1.35">${o[`n-send`]}</span>
            </div>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="step"
                    style="align-self: flex-start; font-size: 11.5px">Step</button>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-drives="review"
           style="margin: 8px 0 0; height: 44px; font-size: 11px; line-height: 1.35">${c.review}</p>
      </div>
    </div>
  `;let u=e(l,`marker`),d=e(l,`focus-at`),f=e(l,`reads`),p=e(l,`caption`),m=`review`,h=i,g=a,_=()=>{let c=n[h]??n[i],p=r[g]??r[a];if(!c||!p)return;let m=e(l,c);u.style.left=`${m.offsetLeft-3}px`,u.style.top=`${m.offsetTop-3}px`,u.style.width=`${m.offsetWidth+6}px`,u.style.height=`${m.offsetHeight+6}px`,u.dataset.at=c;for(let n of r)t(e(l,n),`data-sim-focus`,n===p);d.dataset.node=p,d.textContent=s[p]??``,f.dataset.node=c,f.textContent=o[c]??``},v=e=>{m=e,h=i,g=a,p.dataset.drives=e,p.textContent=c[e],_()};_(),e(l,`step`).addEventListener(`click`,()=>{m===`review`?h=Math.min(h+1,n.length-1):g=Math.min(g+1,r.length-1),_()}),e(l,`drives`).addEventListener(`change`,e=>{v(e.detail)})}export{l as mount};