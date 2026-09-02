import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=21,r=4,i=29,a=`#ffffff`,o=`#14161a`,s=(e,t,n,i)=>`<rect x="${e+r}" y="${t+r}" width="${n}" height="${i}" fill="${o}"/>`,c=(e,t)=>`${s(e,t,7,7)}<rect x="${e+r+1}" y="${t+r+1}" width="5" height="5" fill="${a}"/>${s(e+2,t+2,3,3)}`,l=(e,t)=>e<8&&t<8||e>=13&&t<8||e<8&&t>=13||e===6||t===6;function u(){let e=[c(0,0),c(14,0),c(0,14)];for(let t=8;t<13;t+=2)e.push(s(t,6,1,1),s(6,t,1,1));let t=20260820;for(let r=0;r<n;r+=1)for(let i=0;i<n;i+=1)t=(t*1103515245+12345)%2147483648,!l(i,r)&&t/2147483648<.48&&e.push(s(i,r,1,1));return e.join(``)}function d(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 244px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Add a device</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="picker" data-axis="Code" data-value="live">
            <button class="sp-segment" type="button" data-part="seg-live" value="live" style="padding: 4px 10px; font-size: 12px">Live</button>
            <button class="sp-segment" type="button" data-part="seg-expired" value="expired" style="padding: 4px 10px; font-size: 12px">Expired</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 16px; padding: 16px">
          <div
            data-part="code"
            data-subject
            role="img"
            aria-label="Pairing code, also printed below as K3F 9QX 2M"
            style="flex: 0 0 auto; width: 116px; height: 116px; border-radius: 6px;
                   background: ${a}; transition: opacity 0.22s ease"
          >
            <svg viewBox="0 0 ${i} ${i}" width="116" height="116" aria-hidden="true"
                 shape-rendering="crispEdges" style="display: block">${u()}</svg>
          </div>

          <div class="sp-stack sp-context sp-grow" style="gap: 8px; min-width: 0">
            <span class="sp-heading" style="font-size: 13px">Scan with your phone</span>
            <span class="sp-text" style="font-size: 12px">Open the camera app and point it at the code. The device pairs itself.</span>

            <div class="sp-stack" style="flex: 0 0 auto; gap: 5px; height: 30px; align-items: flex-start">
              <div class="sp-progress sp-progress--meter" data-part="life" data-zone="ok" style="--sp-value: 58%; width: 150px; height: 5px"><div class="sp-progress-fill"></div></div>
              <span class="sp-label" data-part="status" data-state="live" style="font-size: 11px; height: 17px; line-height: 17px; white-space: nowrap"
                >Expires in 34 s</span
              >
            </div>

            <div class="sp-divider"></div>

            <div class="sp-row" style="gap: 8px; flex: 0 0 auto">
              <span class="sp-label" style="font-size: 11px; white-space: nowrap">No phone?</span>
              <span
                class="sp-text sp-text--ink"
                data-part="fallback"
                style="flex: 0 0 auto; font-size: 12px; font-weight: 600; letter-spacing: 0.14em; white-space: nowrap"
                >K3F 9QX 2M</span
              >
            </div>

            <div style="flex: 0 0 auto; height: 30px">
              <button class="sp-button sp-button--sm" type="button" data-part="refresh" hidden style="font-size: 12px">Get a new code</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let r=e(n,`picker`),o=e(n,`code`),s=e(n,`life`),c=e(n,`status`),l=e(n,`refresh`),d=()=>{let e=r.value===`expired`;o.style.opacity=e?`0.3`:`1`,s.style.setProperty(`--sp-value`,e?`0%`:`58%`),s.dataset.zone=e?`warn`:`ok`,c.dataset.state=e?`expired`:`live`,c.textContent=e?`This code has expired`:`Expires in 34 s`,c.style.color=e?`var(--sp-warn)`:`var(--sp-muted)`,t(l,`hidden`,!e)};r.addEventListener(`change`,d),l.addEventListener(`click`,()=>{r.value=`live`}),d()}export{d as mount};