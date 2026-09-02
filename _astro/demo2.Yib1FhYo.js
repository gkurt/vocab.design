import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[{key:`notes`,title:`Notes`,hint:`type a line`},{key:`terminal`,title:`Terminal`,hint:`type a command`}],r=(e,t,n,r)=>`
  <div
    class="sp-surface"
    data-part="pane-${e}"
    data-hover-driven
    ${r?`data-subject data-pose="[data-sim-focus]"`:``}
    ${e===`notes`?`data-sim-focus`:``}
    style="display: flex; flex-direction: column; gap: 8px; width: 204px; height: 138px; padding: 10px 12px"
  >
    <span class="sp-heading" style="font-size: 13px">${t}</span>
    <div class="sp-stack" style="gap: 6px">
      <span class="sp-line" style="width: 84%"></span>
      <span class="sp-line" style="width: 62%"></span>
    </div>
    <span class="sp-grow"></span>
    <input class="sp-input" data-part="field-${e}" type="text" placeholder="${n}" />
  </div>`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 290px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Desktop</span>
          <span class="sp-text" data-stage-verdict data-part="readout" style="width: 350px; text-align: right; white-space: nowrap">A click is what claims the keyboard</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div class="sp-row sp-context" style="gap: 10px">
            <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-axis="Focus model" data-term="follow" data-value="click">
              <button class="sp-segment" type="button" data-part="mode-click" value="click" style="padding: 5px 12px">Click to focus</button>
              <button class="sp-segment" type="button" data-part="mode-follow" value="follow" style="padding: 5px 12px">Focus follows mouse</button>
            </sp-segmented>
          </div>

          <div class="sp-row" data-part="desk" data-mode="click" data-last="none" style="gap: 12px; align-items: flex-start">
            ${n.map(({key:e,title:t,hint:n})=>r(e,t,n,e===`notes`)).join(``)}
          </div>

        </div>
      </div>
    </div>
  `;let a=e(i,`desk`),o=e(i,`readout`),s=e(i,`mode`),c=`notes`,l=(r,a)=>{c=r;for(let a of n)t(e(i,`pane-${a.key}`),`data-sim-focus`,a.key===r);let s=n.find(e=>e.key===r)?.title??``;o.textContent=`${s} has the keyboard, ${a}`};for(let{key:t,title:r}of n){let n=e(i,`pane-${t}`);n.addEventListener(`pointerover`,()=>{a.dataset.mode===`follow`&&c!==t&&l(t,`claimed by arriving`)}),n.addEventListener(`click`,()=>{a.dataset.mode===`click`&&c!==t&&l(t,`claimed by a click`)}),e(i,`field-${t}`).addEventListener(`input`,()=>{a.dataset.last=t,o.textContent=`Typed into ${r}, the window the pointer was over`})}s.addEventListener(`change`,()=>{let e=s.value===`follow`;a.dataset.mode=e?`follow`:`click`,o.textContent=e?`Pointing at a window is enough to claim it`:`A click is what claims the keyboard`})}export{i as mount};