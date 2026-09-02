import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`position: absolute; top: 26px; left: 50%; translate: -50% 0; width: 214px; padding: 11px 13px;
               display: flex; flex-direction: column; gap: 7px; border-radius: 14px`,n=`background: var(--sp-surface); border: 1px solid var(--sp-line); color: var(--sp-ink);
               backdrop-filter: none; box-shadow: var(--sp-shadow)`,r={ignored:`Vibrancy is the effect: the panel samples whatever is behind it, so the contrast of its own label changes as the backdrop does.`,honoured:`The request is answered by replacing the finish, not by deleting the layer. Same panel, same place, same job, a colour you can count on.`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="setting" data-value="honoured" data-axis="Reduce Transparency" data-term="honoured">
            <button class="sp-segment" type="button" data-part="seg-ignored" value="ignored"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Not honoured</button>
            <button class="sp-segment" type="button" data-part="seg-honoured" value="honoured"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Honoured</button>
          </sp-segmented>
        </div>

        <!-- The scene stays out of the context register: it would reach through the wash and
             neutralize the panel inside it, and the panel is the subject (SPEC §5). The wash
             brings its own colours in any case. -->
        <div data-part="scene"
             style="position: relative; margin-top: 8px; height: 152px; border-radius: var(--sp-radius); overflow: hidden">
          <div class="sp-aurora" data-part="wash">
            <span class="sp-aurora-blob" style="top: -50px; left: 18px; --sp-blob-size: 150px; --sp-blob: #ffd166"></span>
            <span class="sp-aurora-blob" style="bottom: -62px; right: 26px; --sp-blob-size: 168px; --sp-blob: #34d399"></span>
            <span class="sp-aurora-blob" style="top: 34px; left: 232px; --sp-blob-size: 120px; --sp-blob: #f472b6"></span>
          </div>

          <div data-part="panel" data-subject data-setting="honoured" data-pose="[data-setting=honoured]"
               style="${t}; ${n}">
            <span style="font-size: 12.5px; font-weight: 600">Now playing</span>
            <span data-part="panel-text" style="font-size: 11px; line-height: 1.4">
              Three tracks left in this queue. Shuffle is off.
            </span>
            <span style="display: block; height: 4px; border-radius: 999px; background: currentcolor; opacity: 0.35"></span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-setting="honoured"
           style="margin: 7px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${r.honoured}</p>
      </div>
    </div>
  `;let a=e(i,`panel`),o=e(i,`caption`),s=e=>{let i=e===`honoured`;a.dataset.setting=e,a.className=i?``:`sp-glass`,a.setAttribute(`style`,i?`${t}; ${n}`:t),o.dataset.setting=e,o.textContent=r[e]};s(`honoured`),e(i,`setting`).addEventListener(`change`,e=>{s(e.detail)})}export{i as mount};