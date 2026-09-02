import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`body`,label:`Body`,size:`13px`,weight:`400`,italic:!1,quiet:!1},{key:`heading`,label:`Heading`,size:`16px`,weight:`600`,italic:!1,quiet:!1},{key:`quote`,label:`Quote`,size:`13px`,weight:`400`,italic:!0,quiet:!0}],i=[`tool-body`,`tool-heading`,`tool-quote`,`tool-copy`];function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide">
        <div
          class="sp-row"
          role="toolbar"
          aria-label="Formatting"
          data-part="toolbar"
          data-subject
          style="flex: 0 0 auto; gap: 4px; padding: 6px 8px; border-bottom: 1px solid var(--sp-line); background: var(--sp-surface)"
        >
          <div class="sp-row" role="radiogroup" aria-label="Paragraph style" style="gap: 4px">${r.map((e,t)=>`
      <button
        class="sp-button sp-button--ghost sp-button--sm"
        type="button"
        role="radio"
        data-part="tool-${e.key}"
        aria-checked="${t===0}"
        ${t===0?`data-selected`:``}
        tabindex="-1"
      >${e.label}</button>`).join(``)}</div>
          <div class="sp-divider" style="width: 1px; height: 20px; margin: 0 4px"></div>
          <button class="sp-icon-button" type="button" data-part="tool-copy" aria-label="Copy paragraph" tabindex="-1">${n(`copy`)}</button>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <div class="sp-prose sp-grow" data-part="prose" data-style="body" style="max-width: none; overflow: hidden">
            <p data-part="prose-text" style="margin: 0">
              The gulls came in ahead of the weather, which is how the harbour always hears
              about it first. By four the boats were tied short and the light had gone the
              colour of wet slate.
            </p>
          </div>
          <span class="sp-text" data-part="status" data-value="none" role="status" style="white-space: nowrap">Draft saved</span>
        </div>
      </div>
    </div>
  `;let o=i.map(t=>e(a,t)),s=e(a,`prose`),c=e(a,`prose-text`),l=e(a,`status`),u=0,d=(e,n)=>{u=e;for(let[r,i]of o.entries())i.tabIndex=r===e?0:-1,t(i,`data-sim-focus`,n&&r===e)};d(0,!1);let f=n=>{s.dataset.style=n.key,c.style.fontSize=n.size,c.style.fontWeight=n.weight,c.style.fontStyle=n.italic?`italic`:`normal`,c.style.color=n.quiet?`var(--sp-muted)`:`var(--sp-ink)`;for(let i of r){let r=e(a,`tool-${i.key}`),o=i.key===n.key;r.setAttribute(`aria-checked`,String(o)),t(r,`data-selected`,o)}},p=()=>{l.dataset.value=`copied`,l.textContent=`Paragraph copied`},m=e=>{let t=r[e];t?f(t):p()};for(let[e,t]of o.entries())t.addEventListener(`click`,()=>{d(e,!1),m(e)});let h=new Set([`ArrowRight`,`ArrowLeft`,`Home`,`End`]);a.addEventListener(`keydown`,e=>{let t=o.length-1;if(h.has(e.key)&&e.preventDefault(),e.key===`ArrowRight`)return d(Math.min(u+1,t),!0);if(e.key===`ArrowLeft`)return d(Math.max(u-1,0),!0);if(e.key===`Home`)return d(0,!0);if(e.key===`End`)return d(t,!0);(e.key===`Enter`||e.key===` `)&&m(u)})}export{a as mount};