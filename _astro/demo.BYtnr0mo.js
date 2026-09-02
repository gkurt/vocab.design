import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=480,r={default:{token:`leed`,verdict:`reads as the verb`},hint:{token:`led`,verdict:`reads as the metal`}};function i(i,a){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-grow"></span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-axis="Authored hint" data-value="default">
            <button class="sp-segment" type="button" data-part="seg-default" value="default"
                    style="padding: 4px 12px; font-size: 11.5px">None</button>
            <button class="sp-segment" type="button" data-part="seg-hint" value="hint"
                    style="padding: 4px 12px; font-size: 11.5px">Respelling</button>
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 10px 12px">
          <p data-part="sentence" style="margin: 0; font-size: 14px; line-height: 1.5">
            The old service pipes are lined with <span data-part="word">lead</span>
            <span class="sp-visually-hidden" data-part="respelling">led</span>
          </p>
        </div>

        <span class="sp-label" data-stage-verdict data-part="verdict"
              style="flex: 0 0 auto; width: 120px; text-align: right; font-size: 10px">${r.default.verdict}</span>

        <p class="sp-text sp-text--ink" data-stage-announce data-part="utterance" data-state="spoken"
           style="margin: 4px 0 0; height: 22px; line-height: 22px; font-size: 12px;
                  white-space: nowrap">“The old service pipes are lined with <span
            data-part="token" data-subject data-mode="default"
            style="font-weight: 600">${r.default.token}</span>”</p>
      </div>
    </div>
  `;let o=e(i,`word`),s=e(i,`respelling`),c=e(i,`utterance`),l=e(i,`token`),u=e(i,`verdict`),d,f=e=>{let i=r[e],f=e===`hint`;t(o,`aria-hidden`,f),t(s,`data-revealed`,f),a.clearTimeout(d),c.dataset.state=`queued`,d=a.setTimeout(()=>{c.dataset.state=`spoken`,l.dataset.mode=e,l.textContent=i.token,u.textContent=i.verdict},n)};e(i,`mode`).addEventListener(`change`,e=>{f(e.detail)})}export{i as mount};