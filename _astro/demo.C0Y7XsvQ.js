import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=404,n=190,r=`linear-gradient(180deg, #8ed7d2 0%, #7cccc8 34%, #f4e3bf 34%, #ebd4a5 100%)`,i=`radial-gradient(110% 94% at 50% 46%, transparent 36%, rgb(10 14 26 / 0.2) 62%, rgb(10 14 26 / 0.62) 100%)`,a=`linear-gradient(to top, rgb(10 14 26 / 0.86), rgb(10 14 26 / 0.44) 30%, rgb(10 14 26 / 0) 64%)`,o={none:{vignette:`0`,scrim:`0`,note:`No layer: the corners hold as much light as the middle, and the white title has pale sand to sit on.`},vignette:{vignette:`1`,scrim:`0`,note:`Every edge is dimmed by the same amount, so nothing in particular is protected and the eye falls inward.`},scrim:{vignette:`0`,scrim:`1`,note:`The same ink spent from the bottom edge up: the title clears its contrast, the corners keep their light.`}},s=`vignette`,c=`
  <svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" role="presentation" style="display: block">
    <rect x="0" y="20" width="128" height="3" fill="rgb(255 255 255 / 0.6)"/>
    <rect x="236" y="42" width="152" height="3" fill="rgb(255 255 255 / 0.52)"/>
    <rect x="0" y="61" width="${t}" height="4" fill="#dcf3f0"/>
    <circle cx="72" cy="38" r="4" fill="#2c6f74"/>
    <circle cx="330" cy="26" r="4" fill="#2c6f74"/>
    <rect x="22" y="80" width="58" height="16" rx="4" fill="#f9f6ee" transform="rotate(-7 51 88)"/>
    <rect x="312" y="74" width="62" height="16" rx="4" fill="#ffe0b0" transform="rotate(6 343 82)"/>
    <rect x="44" y="148" width="50" height="15" rx="4" fill="#ffdcd3" transform="rotate(4 69 155)"/>
    <rect x="306" y="156" width="56" height="15" rx="4" fill="#f9f6ee" transform="rotate(-5 334 163)"/>
    
  <ellipse cx="204" cy="121" rx="34" ry="8" fill="rgb(96 74 40 / 0.16)"/>
  <rect x="201" y="100" width="3" height="21" fill="#b98a5a"/>
  <circle cx="202" cy="100" r="28" fill="#f7f4ec"/>
  <path d="M202 100 L230 100 A28 28 0 0 1 221.8 119.8 Z" fill="#e2604f"/>
  <path d="M202 100 L202 128 A28 28 0 0 1 182.2 119.8 Z" fill="#e2604f"/>
  <path d="M202 100 L174 100 A28 28 0 0 1 182.2 80.2 Z" fill="#e2604f"/>
  <path d="M202 100 L202 72 A28 28 0 0 1 221.8 80.2 Z" fill="#e2604f"/>
  </svg>`;function l(l){let u=o[s];l.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="hero" data-mode="${s}"
           style="position: relative; width: ${t}px; height: ${n}px; border-radius: var(--sp-radius); overflow: hidden; background-image: ${r}">
        ${c}

        <span data-part="vignette" data-subject data-mode="${s}" data-pose="[data-mode=vignette]" aria-hidden="true"
              style="position: absolute; inset: 0; pointer-events: none; background-image: ${i};
                     opacity: ${u?.vignette}; transition: opacity 0.22s linear"></span>
        <span data-part="scrim" aria-hidden="true"
              style="position: absolute; inset: 0; pointer-events: none; background-image: ${a};
                     opacity: ${u?.scrim}; transition: opacity 0.22s linear"></span>

        <div data-part="title" style="position: absolute; left: 16px; right: 16px; bottom: 12px; color: #ffffff">
          <span style="display: block; font-size: 18px; font-weight: 600; line-height: 1.25">Cala Rossa, six o'clock</span>
          <span style="display: block; margin-top: 2px; font-size: 12px; line-height: 1.4; opacity: 0.94">
            Twelve umbrellas, one still up.
          </span>
        </div>
      </div>

      <div class="sp-row sp-context" style="gap: 10px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${s}" data-axis="Layer" data-term="vignette">
          <button class="sp-segment" type="button" data-part="seg-none" value="none">None</button>
          <button class="sp-segment" type="button" data-part="seg-vignette" value="vignette">Vignette</button>
          <button class="sp-segment" type="button" data-part="seg-scrim" value="scrim">Scrim</button>
        </sp-segmented>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="note"
         style="width: ${t}px; margin: 0; min-height: 40px; text-align: center">${u?.note}</p>
    </div>
  `;let d=e(l,`hero`),f=e(l,`vignette`),p=e(l,`scrim`),m=e(l,`note`),h=e=>{let t=o[e];t&&(d.dataset.mode=e,f.dataset.mode=e,f.style.opacity=t.vignette,p.style.opacity=t.scrim,m.textContent=t.note)};e(l,`segmented`).addEventListener(`change`,e=>h(e.detail))}export{l as mount};