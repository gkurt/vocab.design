import{n as e}from"./parts.C-YLuC7Q.js";var t=[`The crane on the quay`,`Who ordered it`,`The folder`,`What the tide did`,`Tuesday, again`];function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-context" style="flex: 0 0 auto">
          <div class="sp-topbar" style="border-bottom: 0"><span class="sp-heading sp-grow">The Harbour Review</span></div>
        </div>
        <div
          class="sp-progress"
          data-part="bar"
          data-subject
          data-zone="start"
          aria-hidden="true"
          style="flex: 0 0 auto; height: 3px; border-radius: 0; background: var(--sp-line)"
        >
          <div data-part="fill" style="width: 0%; height: 100%; background: var(--sp-accent)"></div>
        </div>
        <div class="sp-body sp-context" style="padding: 0">
          <div class="sp-scroll" data-part="doc" style="height: 100%; padding: 12px 14px">
            <article data-part="article">${t.map(e=>`
      <section style="padding-bottom: 18px">
        <div class="sp-heading">${e}</div>
        <div class="sp-stack" style="margin-top: 8px">
          <div class="sp-line" style="width: 96%"></div>
          <div class="sp-line" style="width: 88%"></div>
          <div class="sp-line" style="width: 92%"></div>
          <div class="sp-line" style="width: 71%"></div>
        </div>
      </section>`).join(``)}</article>
            <div class="sp-surface" data-part="after" style="padding: 10px 12px; margin-bottom: 4px">
              <span class="sp-label">Comments, newsletter, related stories</span>
              <div class="sp-stack" style="margin-top: 8px">
                <div class="sp-line" style="width: 84%"></div>
                <div class="sp-line" style="width: 66%"></div>
                <div class="sp-line" style="width: 78%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let r=e(n,`doc`),i=e(n,`article`),a=e(n,`bar`),o=e(n,`fill`);r.addEventListener(`scroll`,()=>{let e=Math.max(1,i.offsetTop+i.offsetHeight-r.clientHeight),t=Math.min(Math.max(r.scrollTop/e,0),1);o.style.width=`${t*100}%`,a.dataset.zone=t<=.02?`start`:t>=.995?`end`:`middle`})}export{n as mount};