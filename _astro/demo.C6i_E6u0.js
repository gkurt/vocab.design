import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[`appearance: none`,`border: 0`,`background: transparent`,`padding: 6px 4px`,`font: inherit`,`font-size: 13px`,`color: var(--sp-ink)`,`cursor: default`].join(`; `),r=`
  <span aria-hidden="true" style="display: flex; align-items: center; color: var(--sp-muted)">
    <span style="display: flex">${t(`kebab`,`sp-icon--dots`)}</span>
    <span style="display: flex; margin-left: -9px">${t(`kebab`,`sp-icon--dots`)}</span>
  </span>`,i=[{part:`sig-button`,reads:`pressable`,says:`Edge, fill, and a verb: reads as pressable`},{part:`sig-link`,reads:`link`,says:`Underline and colour: reads as somewhere to go`},{part:`sig-grip`,reads:`grip`,says:`Grip dots and a grab cursor: reads as liftable`}],a=[`bare-button`,`bare-link`,`bare-grip`];function o(t){t.innerHTML=`
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame sp-frame--wide" style="height: 238px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Release 4.2</span>
          <span class="sp-text" data-part="readout" data-reads="away" style="width: 320px; text-align: right; white-space: nowrap">Pointer away</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-context" style="padding: 10px 12px">
            <div class="sp-label" style="margin-bottom: 8px">No cues</div>
            <div class="sp-row" style="gap: 10px">
              <button type="button" data-part="bare-button" style="${n}; width: 96px; text-align: left">Publish</button>
              <button type="button" data-part="bare-link" style="${n}; width: 112px; text-align: left">Release notes</button>
              <span class="sp-row" data-part="bare-grip" style="width: 124px; gap: 8px; padding: 6px 4px; font-size: 13px; cursor: default">Reorder</span>
            </div>
          </div>
          <div class="sp-surface" style="padding: 10px 12px">
            <div class="sp-label sp-context" style="margin-bottom: 8px">With cues</div>
            <div class="sp-row" data-part="signified" data-subject style="gap: 10px">
              <button class="sp-button sp-button--sm" type="button" data-part="sig-button" style="width: 96px">Publish</button>
              <button
                type="button"
                data-part="sig-link"
                style="appearance: none; border: 0; background: transparent; font: inherit; font-size: 13px; width: 112px; text-align: left; color: var(--sp-accent); text-decoration: underline; text-underline-offset: 2px; padding: 6px 4px; cursor: pointer"
              >Release notes</button>
              <span
                class="sp-row"
                data-part="sig-grip"
                style="width: 124px; gap: 6px; padding: 5px 8px; border: 1px solid var(--sp-line); border-radius: 6px; background: var(--sp-surface); font-size: 13px; cursor: grab"
              >${r}Reorder</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(t,`readout`),s=(e,t)=>{o.dataset.reads=e,o.textContent=t},c=()=>s(`away`,`Pointer away`);for(let n of i){let r=e(t,n.part);r.addEventListener(`pointerenter`,()=>s(n.reads,n.says)),r.addEventListener(`pointerleave`,c)}for(let n of a){let r=e(t,n);r.addEventListener(`pointerenter`,()=>s(`none`,`The action is here. Nothing says so.`)),r.addEventListener(`pointerleave`,c)}}export{o as mount};