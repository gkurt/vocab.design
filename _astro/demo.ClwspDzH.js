import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={width:168,height:42},n=8,r=[`The winter crossing runs all year, weather permitting, and leaves the pontoon on the hour from first light.`,`Foot passengers board from the inner steps, and bicycles are carried free of charge whenever the deck is clear.`,`Tickets are sold at the kiosk on the quay and stay valid for the return leg on any sailing the same day.`];function i(i){let a=e=>`<p class="sp-text sp-context" data-part="para-${e+1}" style="margin: 0; font-size: 12px; line-height: 1.5">${r[e]}</p>`;i.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 272px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Winter crossing</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-value="imposter" data-axis="Placement" data-term="imposter">
            <button class="sp-segment" type="button" data-part="seg-flow" value="flow" style="padding: 4px 11px; font-size: 11px">in the flow</button>
            <button class="sp-segment" type="button" data-part="seg-imposter" value="imposter" style="padding: 4px 11px; font-size: 11px">an imposter</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="padding: 12px">
          <div
            data-part="panel"
            style="height: 100%; padding: 12px 14px; overflow: hidden; background: var(--sp-surface);
                   border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div data-part="column" data-text="untouched" style="position: relative; display: flex; flex-direction: column; gap: ${n}px">
              ${a(0)}
              <div
                class="sp-surface"
                data-part="badge"
                data-subject
                data-mode="imposter"
                data-pose="[data-mode=imposter]"
                style="position: absolute; top: 50%; left: 50%; translate: -50% -50%; z-index: 1;
                       display: flex; align-items: center; justify-content: center; align-self: center;
                       width: ${t.width}px; height: ${t.height}px; box-shadow: var(--sp-shadow)"
              >
                <span class="sp-label" style="color: var(--sp-ink); font-weight: 600; font-size: 13px">Closed for winter</span>
              </div>
              ${a(1)}
              ${a(2)}
            </div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;let o=e(i,`column`),s=e(i,`badge`),c=e(i,`note`),l=e(i,`para-3`),u=l.offsetTop,d=e=>{let t=e!==`flow`;s.dataset.mode=t?`imposter`:`flow`,s.style.position=t?`absolute`:`static`,s.style.top=t?`50%`:``,s.style.left=t?`50%`:``,s.style.translate=t?`-50% -50%`:``,o.dataset.text=l.offsetTop>u+1?`pushed`:`untouched`,c.textContent=t?`Out of the flow: the badge is over the text, which has not moved.`:`In the flow: the badge takes a place, so the text below it moves down.`};e(i,`modes`).addEventListener(`change`,e=>d(e.detail)),d(`imposter`)}export{i as mount};