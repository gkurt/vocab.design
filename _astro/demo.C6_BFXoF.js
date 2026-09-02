import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r={plain:{headline:`Page not found`,body:`If you typed the web address, check it is correct. If you pasted it, check you copied the whole address.`,home:`Go to the home page`,search:`Search this site`,note:`No informal copy, no red text, no "404".`,align:`flex-start`,text:`left`,mark:!1},playful:{headline:`We looked everywhere`,body:`That page is not here, and nothing is broken at your end. The address just does not lead anywhere any more.`,home:`Take me home`,search:`Search the site`,note:`Novelty softens a dead end. Same ways back.`,align:`center`,text:`center`,mark:!0}};function i(i){i.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 250px">

        <div class="sp-topbar sp-context" style="padding: 7px 10px; gap: 8px">
          <span style="display: flex; color: var(--sp-muted)">${n(`chevronLeft`)}</span>
          <span
            class="sp-text"
            style="flex: 1 1 auto; min-width: 0; padding: 3px 10px; border: 1px solid var(--sp-line); border-radius: 999px; background: var(--sp-sunken); font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
          >example.test/guides/setting-up-a-workspace</span>
        </div>

        <div class="sp-body" style="padding: 0">
          <div
            data-part="page"
            data-subject
            data-register="plain"
            style="height: 100%; display: flex; flex-direction: column; justify-content: center; gap: 8px; padding: 14px 24px; background: var(--sp-surface)"
          >
            <span
              class="sp-empty-mark"
              data-part="mark"
              style="align-self: center; background: var(--sp-accent-soft); border-color: var(--sp-accent-soft); color: var(--sp-accent)"
            >${n(`search`)}</span>
            <span class="sp-heading" data-part="headline" style="font-size: 17px">${r.plain.headline}</span>
            <p class="sp-text" data-part="copy" style="margin: 0; width: 100%; max-width: 46ch; height: 58px">${r.plain.body}</p>
            <div class="sp-row" data-part="ways" style="gap: 8px">
              <button class="sp-button sp-button--sm" data-part="home" type="button">${r.plain.home}</button>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="find" type="button">${r.plain.search}</button>
            </div>
          </div>
        </div>

      </div>

              <sp-segmented data-stage-mode class="sp-segmented" data-axis="Tone" data-part="picker" data-value="plain">
          <button class="sp-segment" type="button" data-part="seg-plain" value="plain" style="padding: 4px 12px; font-size: 12px">Plain</button>
          <button class="sp-segment" type="button" data-part="seg-playful" value="playful" style="padding: 4px 12px; font-size: 12px">Playful</button>
        </sp-segmented>
        <span class="sp-text sp-grow" data-stage-verdict data-part="note" style="font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${r.plain.note}</span>
      
    </div>
  `;let a=e(i,`page`),o=e(i,`mark`),s=e(i,`headline`),c=e(i,`copy`),l=e(i,`home`),u=e(i,`find`),d=e(i,`note`),f=e(i,`picker`),p=e=>{let n=r[e];a.dataset.register=e,a.style.alignItems=n.align,a.style.textAlign=n.text,s.textContent=n.headline,c.textContent=n.body,l.textContent=n.home,u.textContent=n.search,d.textContent=n.note,t(o,`hidden`,!n.mark)};f.addEventListener(`change`,e=>{let t=e.detail;(t===`plain`||t===`playful`)&&p(t)}),p(`plain`)}export{i as mount};