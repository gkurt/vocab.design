import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`This cannot be undone.`,n=`Delete project`,r=`(none)`,i={describedby:{caption:`The sentence on screen is the description, joined to the button by id. The sturdiest of the three.`},title:{caption:`A title attribute is the last fallback. It describes the button, and shows nothing to touch or keyboard.`},none:{caption:`The sentence is on screen and joined to nothing, so only sighted readers get it. The mistake.`}},a=`vd-ad-hint`;function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 448px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Description from" data-value="describedby" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-describedby" value="describedby">describedby</button>
            <button class="sp-segment" data-part="seg-title" value="title">title</button>
            <button class="sp-segment" data-part="seg-none" value="none">nothing</button>
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 12px; padding: 10px 12px">
          <div class="sp-row sp-row--between" style="gap: 12px">
            <div style="min-width: 0">
              <span class="sp-text sp-text--ink">Atlas rebrand</span>
              <p class="sp-text" data-part="hint" id="${a}" style="margin: 2px 0 0; font-size: 11px">${t}</p>
            </div>
            <button class="sp-button sp-button--sm" type="button" data-part="control"
                    aria-describedby="${a}">${n}</button>
          </div>
        </div>

        <div class="sp-surface" style="margin-top: 12px; padding: 10px 12px">
          <span class="sp-label">Computed properties</span>
          <div class="sp-row sp-row--between" style="height: 20px; margin-top: 6px">
            <span class="sp-label">Name</span>
            <span class="sp-text sp-text--ink" data-part="name" data-state="named"
                  style="font-size: 12px; white-space: nowrap">“${n}”</span>
          </div>
          <div class="sp-row sp-row--between" data-part="desc-row" data-subject data-pose="[data-state=present]"
               data-state="present" style="height: 20px">
            <span class="sp-label">Description</span>
            <span class="sp-text sp-text--ink" data-part="desc" data-state="present" data-from="describedby"
                  style="font-size: 12px; white-space: nowrap">“${t}”</span>
          </div>
        </div>

                  <span class="sp-text sp-text--ink" data-stage-announce data-part="announced" style="font-size: 12px; white-space: nowrap"></span>
        
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="describedby"
           style="margin: 6px 0 0; height: 30px; font-size: 11px">${i.describedby.caption}</p>
      </div>
    </div>
  `;let s=e(o,`control`),c=e(o,`hint`),l=e(o,`desc-row`),u=e(o,`desc`),d=e(o,`announced`),f=e(o,`caption`),p=()=>{let e=s.getAttribute(`aria-describedby`),t=e?o.querySelector(`#${e}`)?.textContent?.trim()??``:``,i=s.getAttribute(`title`)??``,a=t||i;u.dataset.state=a?`present`:`missing`,l.dataset.state=u.dataset.state,u.dataset.from=t?`describedby`:i?`title`:`nothing`,u.textContent=a?`“${a}”`:r,d.textContent=a?`“${n}, button. ${a}”`:`“${n}, button.”`},m=e=>{e===`describedby`?s.setAttribute(`aria-describedby`,a):s.removeAttribute(`aria-describedby`),e===`title`?s.setAttribute(`title`,t):s.removeAttribute(`title`),c.style.visibility=e===`title`?`hidden`:`visible`,f.dataset.case=e,f.textContent=i[e].caption,p()};p(),e(o,`segmented`).addEventListener(`change`,e=>{m(e.detail)})}export{o as mount};