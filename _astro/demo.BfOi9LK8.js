import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={far:{collected:2,remaining:8,tone:`quiet`,fillHeight:10,fillOpacity:`0.5`,gapEdge:`transparent`,goalEdge:`var(--sp-line)`,goalFill:`var(--sp-surface)`,readout:`font-size: 12px; font-weight: 400; color: var(--sp-muted)`},mid:{collected:7,remaining:3,tone:`close`,fillHeight:13,fillOpacity:`0.8`,gapEdge:`var(--sp-line)`,goalEdge:`var(--sp-muted)`,goalFill:`var(--sp-surface)`,readout:`font-size: 13px; font-weight: 500; color: var(--sp-ink)`},near:{collected:9,remaining:1,tone:`final`,fillHeight:17,fillOpacity:`1`,gapEdge:`var(--sp-accent)`,goalEdge:`var(--sp-accent)`,goalFill:`var(--sp-accent-soft)`,readout:`font-size: 15px; font-weight: 600; color: var(--sp-accent)`}},n={far:`Two cups in. The track is quiet here, the remainder is a plain number, and nothing is asking for a push.`,mid:`Past halfway. The stretch left is shorter than the run behind it, and the label has taken the ink.`,near:`One to go. The gap is small enough to name, the fill is at its heaviest, and the goal itself is ringed.`};function r(r){let i=`position: absolute; top: 50%; translate: 0 -50%; border-radius: 999px`;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 176px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Kestrel Coffee</span>
          <span class="sp-label" style="font-size: 11px">Rewards</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">

          <div class="sp-surface" style="flex: 0 0 auto; display: flex; flex-direction: column; gap: 9px; padding: 12px 14px 11px">
            <div class="sp-row sp-row--between" style="height: 22px">
              <span class="sp-label sp-context" style="font-size: 11px">Ten cups, the eleventh is on us</span>
              <span data-part="readout" data-tone="quiet" style="${t.far.readout}">8 to go</span>
            </div>

            <div data-part="track" data-subject data-stage="far" style="position: relative; height: 24px">
              <span style="${i}; left: 0; right: 0; height: 12px; background: var(--sp-sunken)"></span>
              <span
                data-part="fill"
                style="${i}; left: 0; width: 20%; height: 10px; background: var(--sp-accent); opacity: 0.5;
                       transition: width 0.34s var(--sp-ease), height 0.34s var(--sp-ease), opacity 0.34s"
              ></span>
              <span
                data-part="gap"
                style="${i}; left: 20%; right: 0; height: 12px; border: 2px dashed transparent;
                       transition: left 0.34s var(--sp-ease), border-color 0.34s"
              ></span>
              <span
                data-part="goal"
                style="${i}; right: 0; width: 16px; height: 16px; border-radius: 50%; background: var(--sp-surface);
                       border: 2px solid var(--sp-line); transition: border-color 0.34s, background-color 0.34s"
              ></span>
            </div>

            <div class="sp-row sp-row--between sp-context" style="height: 12px">
              <span class="sp-label" style="font-size: 10px">Card opened</span>
              <span class="sp-label" data-part="collected" style="font-size: 10px">2 collected</span>
              <span class="sp-label" style="font-size: 10px">Free cup</span>
            </div>
          </div>

        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="note" style="width: 268px; height: 34px; font-size: 11px">${n.far}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Progress" data-part="pick" data-value="far">
          <button class="sp-segment" data-part="pick-far" value="far" style="padding: 5px 9px; font-size: 12px">2 of 10</button>
          <button class="sp-segment" data-part="pick-mid" value="mid" style="padding: 5px 9px; font-size: 12px">7 of 10</button>
          <button class="sp-segment" data-part="pick-near" value="near" style="padding: 5px 9px; font-size: 12px">9 of 10</button>
        </sp-segmented>
      
    </div>
  `;let a=e(r,`track`),o=e(r,`fill`),s=e(r,`gap`),c=e(r,`goal`),l=e(r,`readout`),u=e(r,`collected`),d=e(r,`note`),f=e=>{let r=t[e],i=`${r.collected*10}%`;a.dataset.stage=e,o.style.width=i,o.style.height=`${r.fillHeight}px`,o.style.opacity=r.fillOpacity,s.style.left=i,s.style.borderColor=r.gapEdge,c.style.borderColor=r.goalEdge,c.style.background=r.goalFill,l.dataset.tone=r.tone,l.setAttribute(`style`,r.readout),l.textContent=r.remaining===1?`1 to go`:`${r.remaining} to go`,u.textContent=`${r.collected} collected`,d.textContent=n[e]};e(r,`pick`).addEventListener(`change`,e=>{f(e.detail)}),f(`far`)}export{r as mount};