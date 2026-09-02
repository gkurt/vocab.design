import{n as e,t}from"./parts.C-YLuC7Q.js";import{n}from"./measure.DK7AY2_i.js";var r=8,i=230,a=`
  <p class="sp-text" style="margin: 0">Keys are created under Settings, then Developers. Rotating one revokes the old key immediately.</p>
  <a href="#" data-part="tip-link" style="display: inline-block; margin-top: 8px; font-size: 13px; color: var(--sp-accent)">Read the key policy</a>
`;function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Integrations</span></div>
        <div class="sp-body sp-context">
          <div class="sp-stack" style="gap: 12px">
            <div class="sp-field">
              <div class="sp-row" style="gap: 2px">
                <label class="sp-label" for="api-key">API key</label>
                <button class="sp-icon-button" data-part="info-button" aria-label="More information about the API key">
                  <span aria-hidden="true" style="display: flex; align-items: center; justify-content: center; width: 15px; height: 15px; border: 1.4px solid currentcolor; border-radius: 50%; font-size: 10px; font-weight: 700; line-height: 1">i</span>
                </button>
              </div>
              <input class="sp-input" id="api-key" data-part="key-input" placeholder="sk_live_..." />
            </div>
            <div class="sp-field">
              <label class="sp-label" for="webhook">Webhook URL</label>
              <input class="sp-input" id="webhook" placeholder="https://example.com/hooks" />
            </div>
          </div>
        </div>
        <div class="sp-popover" data-part="tip" data-subject role="status" style="width: ${i}px"></div>
      </div>
    </div>
  `;let s=o.querySelector(`.sp-frame`),c=e(o,`info-button`),l=e(o,`tip`),u=n(c,s),d=u.left+u.width/2,f=Math.min(Math.max(d-26,r),s.offsetWidth-i-r);l.style.left=`${f}px`,l.style.top=`${u.top+u.height+8}px`,l.style.setProperty(`--sp-arrow-x`,`${d-f-4}px`);let p=e=>{e&&(l.innerHTML=a),t(l,`data-open`,e),t(c,`data-open`,e)};c.addEventListener(`click`,()=>p(!l.hasAttribute(`data-open`))),o.addEventListener(`pointerdown`,e=>{let t=e.target;!l.contains(t)&&!c.contains(t)&&p(!1)}),o.addEventListener(`keydown`,e=>{e.key===`Escape`&&p(!1)}),l.addEventListener(`click`,e=>{e.target?.closest(`a`)&&e.preventDefault()})}export{o as mount};