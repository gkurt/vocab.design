import{n as e}from"./parts.C-YLuC7Q.js";var t=`Bar chart: revenue up in every quarter, 12 percent in Q3`,n=(e,t,n)=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${n}" viewBox="0 0 ${t} ${n}">${e}</svg>`)}`,r=n(`<rect width="340" height="96" fill="#eef1f7"/>
   <rect x="24" y="52" width="34" height="34" fill="#8794b4"/>
   <rect x="86" y="40" width="34" height="46" fill="#7684a8"/>
   <rect x="148" y="24" width="34" height="62" fill="#4f6bd0"/>
   <rect x="210" y="34" width="34" height="52" fill="#7684a8"/>
   <rect x="16" y="86" width="308" height="2" fill="#c3cadb"/>`,340,96),i=n(`<path d="M4 12c24-14 48 14 72 0s48-14 72 0 48 14 72 0 48-14 72 0" fill="none" stroke="#9aa4bd" stroke-width="2"/>
   <circle cx="170" cy="12" r="4" fill="#9aa4bd"/>`,340,24),a={informative:`Graphic · “${t}”`,decorative:`Ignored · presentational`};function o(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <span class="sp-heading sp-context" style="font-size: 14px">Quarterly note</span>
        <img
          data-part="decorative"
          data-subject
          src="${i}"
          alt=""
          style="display: block; width: 100%; height: 24px; margin-top: 6px"
        />
        <span class="sp-label sp-context" style="display: block; margin-top: 2px">alt=""</span>
        <div class="sp-stack sp-context" style="gap: 6px; margin-top: 12px">
          <div class="sp-line" style="width: 100%"></div>
          <div class="sp-line" style="width: 78%"></div>
        </div>
        <img
          class="sp-context"
          data-part="informative"
          src="${r}"
          alt="${t}"
          style="display: block; width: 100%; height: 96px; margin-top: 12px; border-radius: 6px; object-fit: cover"
        />
        <div class="sp-surface sp-context" style="margin-top: 12px; padding: 8px 10px">
          <span class="sp-label">Accessibility tree</span>
          <p class="sp-text sp-text--ink" data-part="readout" data-state="idle" style="margin: 4px 0 0; height: 34px; font-size: 12px">
            No image inspected.
          </p>
        </div>
      </div>
    </div>
  `;let o=e(n,`readout`);for(let t of[`decorative`,`informative`]){let r=e(n,t),i=()=>{o.dataset.state=t,o.textContent=a[t]};r.addEventListener(`pointerenter`,i),r.addEventListener(`click`,i)}}export{o as mount};