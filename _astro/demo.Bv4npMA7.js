import{n as e}from"./parts.C-YLuC7Q.js";var t={reader:{id:`london`,role:`Your time`,time:`3:30 PM`,place:`London`,zone:`UTC+00:00`},event:{id:`chicago`,role:`Event time`,time:`9:30 AM`,place:`Chicago`,zone:`UTC-06:00`}},n=[{id:`abbr`,text:`CST`,verdict:`three zones use it`,warn:!0},{id:`offset`,text:`UTC-06:00`,verdict:`no DST`,warn:!0},{id:`name`,text:`America/Chicago`,verdict:`exact`,warn:!1}].map(e=>`
    <span class="sp-chip" data-part="trap-${e.id}" style="flex: 0 0 auto; gap: 5px; font-size: 11px">
      <span style="font-variant-numeric: tabular-nums">${e.text}</span>
      <span style="font-size: 10px; color: ${e.warn?`var(--sp-warn)`:`var(--sp-muted)`}">${e.verdict}</span>
    </span>`).join(``);function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 306px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Invitation</span>
          <span class="sp-label" style="flex: 0 0 auto; white-space: nowrap">Tue 20 Jan</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center">
          <div class="sp-surface" data-part="times" data-primary="reader" style="flex: 0 0 auto; width: 442px; padding: 12px">
            <div class="sp-heading" style="font-size: 14px">Design review</div>
            <div class="sp-row" style="margin-top: 8px; gap: 10px; align-items: stretch">
              <div
                data-part="primary"
                data-subject
                data-zone="${t.reader.id}"
                style="flex: 1 1 0; min-width: 0; padding: 8px 10px; border-radius: 6px; background: var(--sp-accent-soft);
                       box-shadow: inset 0 0 0 1px var(--sp-accent)"
              >
                <span class="sp-label" data-part="primary-role" style="font-size: 10px">${t.reader.role}</span>
                <div data-part="primary-time" style="font-size: 22px; font-weight: 600; line-height: 1.15; white-space: nowrap">${t.reader.time}</div>
                <div data-part="primary-zone" style="font-size: 11px; color: var(--sp-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
                  ${t.reader.place}, ${t.reader.zone}
                </div>
              </div>
              <div
                data-part="secondary"
                data-zone="${t.event.id}"
                style="flex: 1 1 0; min-width: 0; padding: 8px 10px; border-radius: 6px; background: var(--sp-sunken)"
              >
                <span class="sp-label" data-part="secondary-role" style="font-size: 10px">${t.event.role}</span>
                <div data-part="secondary-time" style="font-size: 18px; font-weight: 600; line-height: 1.25; white-space: nowrap">${t.event.time}</div>
                <div data-part="secondary-zone" style="font-size: 11px; color: var(--sp-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
                  ${t.event.place}, ${t.event.zone}
                </div>
              </div>
            </div>
            <div class="sp-divider" style="margin: 10px 0"></div>
            <div class="sp-row" style="gap: 6px">
              <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Show first</span>
              <button type="button" class="sp-chip" data-part="pick-reader" data-selected style="flex: 0 0 auto; font-size: 11px">My time zone</button>
              <button type="button" class="sp-chip" data-part="pick-event" style="flex: 0 0 auto; font-size: 11px">The event's</button>
            </div>
            <div class="sp-divider" style="margin: 10px 0"></div>
            <span class="sp-label" style="font-size: 10px">The event's zone written three ways</span>
            <div class="sp-row" style="margin-top: 5px; gap: 6px">${n}</div>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`times`),a={primary:{role:e(r,`primary-role`),time:e(r,`primary-time`),zone:e(r,`primary-zone`),box:e(r,`primary`)},secondary:{role:e(r,`secondary-role`),time:e(r,`secondary-time`),zone:e(r,`secondary-zone`),box:e(r,`secondary`)}},o={reader:e(r,`pick-reader`),event:e(r,`pick-event`)},s=e=>{let n=t[e],r=t[e===`reader`?`event`:`reader`];i.dataset.primary=e,a.primary.box.dataset.zone=n.id,a.primary.role.textContent=n.role,a.primary.time.textContent=n.time,a.primary.zone.textContent=`${n.place}, ${n.zone}`,a.secondary.box.dataset.zone=r.id,a.secondary.role.textContent=r.role,a.secondary.time.textContent=r.time,a.secondary.zone.textContent=`${r.place}, ${r.zone}`;for(let t of[`reader`,`event`])t===e?o[t].setAttribute(`data-selected`,``):o[t].removeAttribute(`data-selected`)};o.reader.addEventListener(`click`,()=>s(`reader`)),o.event.addEventListener(`click`,()=>s(`event`)),s(`reader`)}export{r as mount};