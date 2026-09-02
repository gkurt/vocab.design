import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r={a:`Screen 1 is on. One control here is linked: Search. The field and the two filters are painted on, so pressing them goes nowhere.`,b:`Screen 2 is on, reached by that one link. Every result is the same row, the traveller has one typed-in name, and only Back is linked.`};function i(i){let a=e=>`
    <span data-part="badge-${e}"
          style="display: inline-flex; align-items: center; flex: 0 0 auto; height: 15px; padding: 0 6px;
                 border-radius: 999px; background: var(--sp-accent); color: var(--sp-accent-ink);
                 font-size: 8.5px; font-weight: 600; letter-spacing: 0.02em; opacity: 0;
                 transition: opacity 0.2s">ON SCREEN</span>`,o=e=>`
    <div data-part="result-${e}" class="sp-row"
         style="gap: 6px; height: 26px; padding: 0 7px; border-radius: 5px; background: var(--sp-sunken)">
      <span style="flex: 1 1 auto; min-width: 0; font-size: 10.5px; overflow: hidden;
                   text-overflow: ellipsis; white-space: nowrap">Lisbon, 12 Mar</span>
      <span style="flex: 0 0 auto; font-size: 10.5px; color: var(--sp-muted)">128</span>
    </div>`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 456px; padding: 11px 14px 13px">
        <div class="sp-row sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Trip finder</span>
        </div>

        <div data-part="board" data-subject
             style="position: relative; width: 428px; height: 158px; margin-top: 9px">

          <div class="sp-surface" data-part="screen-a" data-current
               style="position: absolute; left: 0; top: 0; width: 174px; height: 158px; padding: 9px;
                      display: flex; flex-direction: column; gap: 7px; overflow: hidden">
            <div class="sp-row" style="gap: 6px; height: 16px; flex: 0 0 auto">
              <span style="flex: 1 1 auto; min-width: 0; font-size: 11.5px; font-weight: 600">Find a trip</span>
              ${a(`a`)}
            </div>
            <input class="sp-input" data-part="field" type="text" placeholder="Where to?"
                   style="flex: 0 0 auto; height: 26px; padding: 0 8px; font-size: 11px" />
            <div class="sp-row" style="gap: 6px; flex: 0 0 auto">
              <button class="sp-chip" type="button" data-part="chip-flights"
                      style="padding: 2px 8px; font-size: 10px">Flights</button>
              <button class="sp-chip" type="button" data-part="chip-hotels"
                      style="padding: 2px 8px; font-size: 10px">Hotels</button>
            </div>
            <button class="sp-button" type="button" data-part="link-forward"
                    style="flex: 0 0 auto; height: 28px; margin-top: auto; padding: 0 12px; font-size: 11.5px">Search</button>
          </div>

          <svg data-part="wires" viewBox="0 0 80 158" width="80" height="158" aria-hidden="true"
               style="position: absolute; left: 174px; top: 0; overflow: visible">
            <g data-part="wire-back" stroke="var(--sp-line)" fill="var(--sp-line)">
              <circle cx="76" cy="17" r="2.6" stroke="none"/>
              <path d="M76 17H8" fill="none" stroke-width="2" stroke-linecap="round"/>
              <path d="M8 12.6 2 17l6 4.4z" stroke="none"/>
            </g>
            <g data-part="wire-forward" stroke="var(--sp-line)" fill="var(--sp-line)">
              <circle cx="4" cy="135" r="2.6" stroke="none"/>
              <path d="M4 135h68" fill="none" stroke-width="2" stroke-linecap="round"/>
              <path d="M72 130.6 78 135l-6 4.4z" stroke="none"/>
            </g>
          </svg>

          <div class="sp-surface" data-part="screen-b"
               style="position: absolute; left: 254px; top: 0; width: 174px; height: 158px; padding: 9px;
                      display: flex; flex-direction: column; gap: 6px; overflow: hidden">
            <div class="sp-row" style="gap: 6px; height: 16px; flex: 0 0 auto">
              <button class="sp-icon-button" type="button" data-part="link-back" aria-label="Back"
                      style="flex: 0 0 auto; width: 18px; height: 18px">${n(`chevronLeft`)}</button>
              <span style="flex: 1 1 auto; min-width: 0; font-size: 11.5px; font-weight: 600">Lisbon</span>
              ${a(`b`)}
            </div>
            <span style="flex: 0 0 auto; font-size: 9.5px; color: var(--sp-muted)">3 results for Alex Rivera</span>
            ${o(1)}${o(2)}${o(3)}
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-screen="a"
           style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${r.a}</p>
      </div>
    </div>
  `;let s={a:e(i,`screen-a`),b:e(i,`screen-b`)},c={a:e(i,`badge-a`),b:e(i,`badge-b`)},l={a:e(i,`wire-forward`),b:e(i,`wire-back`)},u=e(i,`caption`),d=(e,n)=>{e.setAttribute(`stroke`,n?`var(--sp-accent)`:`var(--sp-line)`),e.setAttribute(`fill`,n?`var(--sp-accent)`:`var(--sp-line)`),t(e,`data-live`,n)},f=e=>{for(let n of[`a`,`b`]){let r=n===e,i=s[n];t(i,`data-current`,r),i.style.borderColor=r?`var(--sp-accent)`:`var(--sp-line)`,i.style.boxShadow=r?`0 0 0 2px var(--sp-accent-soft)`:`none`,c[n].style.opacity=r?`1`:`0`,d(l[n],r)}u.textContent=r[e],u.dataset.screen=e};f(`a`),e(i,`link-forward`).addEventListener(`click`,()=>f(`b`)),e(i,`link-back`).addEventListener(`click`,()=>f(`a`))}export{i as mount};