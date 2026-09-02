import{n as e}from"./parts.C-YLuC7Q.js";var t=`cubic-bezier(0.2, 0.8, 0.2, 1)`;function n(n,r){let i=(e,t,n)=>`
    <div class="sp-stack" style="gap: 5px">
      <span class="sp-label" style="font-size: 11px">${t}</span>
      <div class="sp-row">
        <span class="sp-track" data-part="track-${e}" style="--sp-timing: ${n}">
          <span class="sp-dot" data-part="dot-${e}"></span>
        </span>
      </div>
    </div>`;n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 404px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Timing function</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-row" style="align-items: center; gap: 18px; margin-top: 12px">
          <svg
            data-part="diagram"
            data-subject
            viewBox="-20 -22 140 144"
            style="display: block; width: 156px; height: 160px; flex: 0 0 auto; overflow: visible"
            role="img"
            aria-label="${t} plotted with its two control handles"
          >
            <rect x="0" y="0" width="100" height="100" fill="none" stroke="var(--sp-line)" stroke-width="1" />
            <path d="M0 100 L100 0" fill="none" stroke="var(--sp-line)" stroke-width="1" stroke-dasharray="3 3" />
            <path d="M0 100 L20 20" fill="none" stroke="var(--sp-accent)" stroke-width="1" stroke-dasharray="3 2" opacity="0.7" />
            <path d="M100 0 L20 0" fill="none" stroke="var(--sp-accent)" stroke-width="1" stroke-dasharray="3 2" opacity="0.7" />
            <path d="M0 100 C20 20 20 0 100 0" fill="none" stroke="var(--sp-accent)" stroke-width="2.6" stroke-linecap="round" />
            <circle cx="0" cy="100" r="2.4" fill="var(--sp-muted)" />
            <circle cx="100" cy="0" r="2.4" fill="var(--sp-muted)" />
            <circle cx="20" cy="20" r="3.6" fill="var(--sp-accent)" />
            <circle cx="20" cy="0" r="3.6" fill="var(--sp-accent)" />
            <text x="27" y="23" font-size="8.5" fill="var(--sp-ink)">0.2, 0.8</text>
            <text x="27" y="-4" font-size="8.5" fill="var(--sp-ink)">0.2, 1</text>
            <text x="50" y="115" font-size="8.5" fill="var(--sp-muted)" text-anchor="middle">time</text>
            <text transform="translate(-8 50) rotate(-90)" font-size="8.5" fill="var(--sp-muted)" text-anchor="middle">progress</text>
          </svg>
          <div class="sp-stack sp-context" data-part="race" style="flex: 1 1 auto; gap: 16px">
            ${i(`curve`,t,t)}
            ${i(`linear`,`linear`,`linear`)}
          </div>
        </div>
      </div>
    </div>
  `;let a=e(n,`race`),o,s=()=>{a.removeAttribute(`data-running`),a.setAttribute(`data-settled`,``)},c=()=>{r.clearTimeout(o),a.removeAttribute(`data-settled`),a.removeAttribute(`data-running`),a.offsetWidth,a.setAttribute(`data-running`,``),o=r.setTimeout(s,1180)};e(n,`replay`).addEventListener(`click`,c),c()}export{n as mount};