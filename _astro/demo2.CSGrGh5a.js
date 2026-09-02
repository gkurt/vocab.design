import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n={person:{name:`Ana Ruiz`,initials:`AR`,verdict:`Reads as correspondence and invites a reply. A reader who does not know Ana has nothing to recognise.`},brand:{name:`Quay Books`,initials:`QB`,verdict:`Recognised at a glance, which is also the risk: it files cleanly as marketing before it is read.`},both:{name:`Ana at Quay Books`,initials:`A`,verdict:`Recognition from the brand and a person to answer, and the longest of the three in the tightest field.`}};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 190px">
        <div class="sp-topbar sp-context">
          ${t(`inbox`)}<span class="sp-heading sp-grow">Inbox</span><span class="sp-label">Thursday</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-row" data-part="row" style="flex: 0 0 auto; gap: 11px; padding: 11px 12px; align-items: flex-start">
            <span class="sp-avatar" data-part="avatar" data-initials="${n.person.initials}" style="width: 34px; height: 34px; font-size: 13px">${n.person.initials}</span>
            <span class="sp-grow" style="min-width: 0">
              <span class="sp-row" style="gap: 8px">
                <span
                  class="sp-text sp-text--ink sp-grow"
                  data-part="from"
                  data-kind="person"
                  data-subject
                  style="min-width: 0; font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
                >${n.person.name}</span>
                <span class="sp-text sp-context" style="flex: 0 0 auto; font-size: 11px">07:41</span>
              </span>
              <span class="sp-text sp-text--ink sp-context" style="display: block; margin-top: 2px; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">Your September picks are ready</span>
              <span class="sp-text sp-context" style="display: block; margin-top: 1px; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">Three titles chosen for you, and the shop closes early on the 14th.</span>
            </span>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="verdict" style="flex: 0 0 auto; height: 32px; font-size: 11px; line-height: 1.35">${n.person.verdict}</span>
        </div>
      </div>
      <sp-segmented data-stage-mode class="sp-segmented" data-axis="Sender" data-part="kind" data-value="person">
        <button class="sp-segment" data-part="kind-person" value="person">Person</button>
        <button class="sp-segment" data-part="kind-brand" value="brand">Brand</button>
        <button class="sp-segment" data-part="kind-both" value="both">Person at brand</button>
      </sp-segmented>
    </div>
  `;let i=e(r,`from`),a=e(r,`avatar`),o=e(r,`verdict`);e(r,`kind`).addEventListener(`change`,e=>{let t=e.detail,r=t===`brand`?`brand`:t===`both`?`both`:`person`,s=n[r];i.dataset.kind=r,i.textContent=s.name,a.dataset.initials=s.initials,a.textContent=s.initials,o.textContent=s.verdict})}export{r as mount};