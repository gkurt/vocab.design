import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[{title:`Gate closed on Ridge Path`,body:`Take the west approach instead`,top:92},{title:`Survey window opens Friday`,body:`Three sections still need a walker`,top:158}],r=(e,t)=>`display: flex; align-items: center; justify-content: center; flex: 0 0 auto;
  width: ${e}px; height: ${e}px; border-radius: ${t}px; background: rgb(255 255 255 / 0.92); color: #24355e`,i=(e,n,i,a)=>`
  <div
    class="sp-glass sp-row"
    data-part="notice-${e+1}"
    ${e===0?`data-subject`:``}
    role="status"
    style="position: absolute; left: 10px; right: 10px; top: ${a}px; gap: 9px; padding: 8px 10px;
           align-items: flex-start; opacity: 0; visibility: hidden; transform: translateY(-14px);
           transition: opacity 0.26s var(--sp-ease), transform 0.26s var(--sp-ease), visibility 0.26s"
  >
    <span aria-hidden="true" style="${r(22,7)}">${t(`bell`)}</span>
    <span class="sp-grow" style="min-width: 0">
      <span style="display: block; font-size: 10px; letter-spacing: 0.05em; opacity: 0.85">RIDGE TRAILS</span>
      <span style="display: block; font-size: 12px; font-weight: 600; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${n}</span>
      <span style="display: block; font-size: 11px; line-height: 1.3; opacity: 0.9; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${i}</span>
    </span>
    <button
      class="sp-icon-button"
      type="button"
      data-part="dismiss-${e+1}"
      aria-label="Dismiss ${n}"
      style="width: 20px; height: 20px; flex: 0 0 auto; color: inherit"
    >${t(`close`)}</button>
  </div>`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-row" style="gap: 18px; align-items: center">
        <div
          data-part="phone"
          style="position: relative; flex: 0 0 auto; width: 172px; height: 292px;
                 border: 1px solid var(--sp-line); border-radius: 26px; overflow: hidden"
        >
          <div class="sp-aurora" style="--sp-aurora-wash: linear-gradient(155deg, #24355e, #5b4a86 52%, #a8697e)"></div>
          <div class="sp-context" style="position: absolute; left: 0; right: 0; top: 20px; text-align: center; color: #ffffff">
            <span style="display: block; font-size: 30px; font-weight: 600; line-height: 1.1">9:41</span>
            <span style="display: block; font-size: 11px; opacity: 0.85">Tuesday 14 April</span>
          </div>
          ${n.map((e,t)=>i(t,e.title,e.body,e.top)).join(``)}
          <div class="sp-row sp-context" style="position: absolute; left: 0; right: 0; bottom: 16px; justify-content: center; gap: 16px">
            <span style="position: relative; display: block">
              <span aria-hidden="true" style="${r(42,12)}">${t(`bell`)}</span>
              <span
                data-part="badge"
                data-count="0"
                aria-label="0 unread"
                hidden
                style="position: absolute; top: -5px; right: -5px; display: flex; align-items: center; justify-content: center;
                       min-width: 18px; height: 18px; padding: 0 5px; border-radius: 999px;
                       background: #e5484d; color: #ffffff; font-size: 11px; font-weight: 600"
              >0</span>
            </span>
            <span aria-hidden="true" style="display: block; width: 42px; height: 42px; border-radius: 12px; background: rgb(255 255 255 / 0.34)"></span>
          </div>
        </div>

        <div class="sp-stack sp-context" style="width: 152px; gap: 8px">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="deliver">Deliver</button>
        </div>
      </div>
    </div>
  `;let o=e(a,`badge`),s=n.map((t,n)=>({el:e(a,`notice-${n+1}`),dismiss:e(a,`dismiss-${n+1}`),shown:!1})),c=()=>{let e=s.filter(e=>e.shown).length;o.textContent=String(e),o.dataset.count=String(e),o.setAttribute(`aria-label`,`${e} unread`),o.hidden=e===0},l=(e,t)=>{e.shown=t,e.el.style.opacity=t?`1`:`0`,e.el.style.visibility=t?`visible`:`hidden`,e.el.style.transform=t?`translateY(0)`:`translateY(-14px)`,c()};e(a,`deliver`).addEventListener(`click`,()=>{let e=s.find(e=>!e.shown);e&&l(e,!0)});for(let e of s)e.dismiss.addEventListener(`click`,()=>l(e,!1));c()}export{a as mount};