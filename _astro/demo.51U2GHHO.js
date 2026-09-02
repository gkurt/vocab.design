import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={w:424,h:160},n={w:56,h:72},r=26,i=209,a={captions:{left:t.w-n.w-8,top:t.h-n.h-r-8,w:n.w,h:n.h,video:t.w,shown:!1},inset:{left:t.w-n.w-8,top:t.h-n.h-r-8,w:n.w,h:n.h,video:t.w,shown:!0},companion:{left:t.w-i,top:0,w:i,h:t.h,video:i,shown:!0}},o={captions:`Captions carry the spoken words in written English. For a reader whose first language is BSL that is a second language, read at speed, while watching.`,inset:`A signed track exists, at a size where the hands and the face cannot be read. Expression is grammar in a signed language, so a thumbnail loses the grammar.`,companion:`The signed track at the size of the picture. Fingerspelling and expression survive, and the reader decides which of the two to watch.`};function s(i){let s=e=>`
    <svg viewBox="0 0 60 76" width="${Math.round(38*e)}" height="${Math.round(48*e)}" aria-hidden="true"
         style="display: block; overflow: visible">
      <circle cx="30" cy="17" r="11" fill="currentColor" opacity="0.9"/>
      <path d="M9 76c0-16 9.4-26 21-26s21 10 21 26z" fill="currentColor" opacity="0.55"/>
      <circle cx="17" cy="45" r="6" fill="currentColor"/>
      <circle cx="41" cy="33" r="6" fill="currentColor"/>
    </svg>`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 11px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Lecture video</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Access" data-part="mode" data-value="captions" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-captions" value="captions"
                    style="padding: 3px 7px; font-size: 10px; white-space: nowrap">Captions only</button>
            <button class="sp-segment" type="button" data-part="seg-inset" value="inset"
                    style="padding: 3px 7px; font-size: 10px; white-space: nowrap">Inset signer</button>
            <button class="sp-segment" type="button" data-part="seg-companion" value="companion"
                    style="padding: 3px 7px; font-size: 10px; white-space: nowrap">Companion stream</button>
          </sp-segmented>
        </div>

        <div data-part="stage" style="position: relative; height: ${t.h}px; margin-top: 9px">
          <div class="sp-context" data-part="video"
               style="position: absolute; left: 0; top: 0; width: ${t.w}px; height: ${t.h}px;
                      overflow: hidden; border-radius: var(--sp-radius); background: var(--sp-sunken);
                      border: 1px solid var(--sp-line); transition: width 0.3s var(--sp-ease)">
            <div style="display: flex; align-items: center; gap: 14px; height: 100%; padding: 0 18px 26px">
              <span style="flex: 0 0 auto; color: var(--sp-muted)">${s(1)}</span>
              <span class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 7px">
                <span class="sp-line" style="width: 78%"></span>
                <span class="sp-line" style="width: 58%"></span>
                <span class="sp-line" style="width: 66%"></span>
              </span>
            </div>
            <div data-part="captions"
                 style="position: absolute; left: 0; right: 0; bottom: 0; height: ${r}px; padding: 4px 8px;
                        background: rgb(16 24 40 / 0.78); color: #ffffff; font-size: 9.5px; line-height: 1.35;
                        text-align: center">…and that is the second reason the harbour silted up.</div>
          </div>

          <div data-part="track" data-mode="captions" data-subject
               style="position: absolute; left: ${a.captions.left}px; top: ${a.captions.top}px;
                      width: ${n.w}px; height: ${n.h}px; display: flex; align-items: center;
                      justify-content: center; overflow: hidden; border-radius: 6px;
                      background: var(--sp-accent-soft); border: 1px solid var(--sp-accent);
                      color: var(--sp-accent); opacity: 0; visibility: hidden;
                      transition: left 0.3s var(--sp-ease), top 0.3s var(--sp-ease), width 0.3s var(--sp-ease),
                                  height 0.3s var(--sp-ease), opacity 0.24s, visibility 0.24s">
            <span data-part="figure" style="display: flex">${s(1)}</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" data-mode="captions"
           style="margin: 9px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${o.captions}</p>
      </div>
    </div>
  `;let c=e(i,`video`),l=e(i,`track`),u=e(i,`figure`),d=e(i,`note`);e(i,`mode`).addEventListener(`change`,e=>{let t=e.detail,n=a[t];l.dataset.mode=t,l.style.left=`${n.left}px`,l.style.top=`${n.top}px`,l.style.width=`${n.w}px`,l.style.height=`${n.h}px`,l.style.opacity=n.shown?`1`:`0`,l.style.visibility=n.shown?`visible`:`hidden`,u.innerHTML=s(t===`companion`?2:1),c.style.width=`${n.video}px`,d.dataset.mode=t,d.textContent=o[t]})}export{s as mount};