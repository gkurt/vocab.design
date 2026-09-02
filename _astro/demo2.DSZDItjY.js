import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=180,n=244,r=5,i=2600,a=[{status:`3 stops away`,mins:12,progress:35,eta:`Arrives 9:53`},{status:`2 stops away`,mins:8,progress:55,eta:`Arrives 9:52`},{status:`1 stop away`,mins:4,progress:78,eta:`Arrives 9:50`},{status:`Arriving now`,mins:1,progress:96,eta:`Arrives 9:49`}],o=[`compact`,`expanded`,`notification`],s=`compact`,c={compact:`slot-compact`,expanded:`slot-sheet`,notification:`slot-sheet`},l=`display: inline-flex; align-items: center; gap: 5px; width: auto; padding: 2px 7px; border-radius: 999px`,u=`display: block; width: 100%; padding: 8px 10px; border-radius: 14px`,d=(e,t)=>`
  <div class="sp-row sp-row--between" style="height: 22px">
    <span class="sp-label">${e}</span>
    <span class="sp-text sp-text--ink" style="font-size: 12px">${t}</span>
  </div>`;function f(f,p){f.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 296px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Order 4821, out for delivery</span>
          <span class="sp-label" style="font-size: 12px">Harbour Supply</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 14px; padding: 8px 12px">
          <div
            data-part="phone"
            style="position: relative; flex: 0 0 auto; width: ${t}px; height: ${n}px; padding: ${r}px;
                   background: #14161a; border-radius: 20px"
          >
            <div
              data-part="display"
              style="position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: 15px; color: #ffffff;
                     background: linear-gradient(155deg, #2b3358 0%, #55386d 55%, #8c4a58 100%)"
            >
              <span
                data-part="cutout"
                style="position: absolute; z-index: 2; top: 4px; left: 50%; translate: -50% 0;
                       width: 44px; height: 15px; border-radius: 999px; background: #000000"
              ></span>

              <div
                data-part="slot-compact"
                style="position: absolute; z-index: 2; top: 3px; left: 6px; display: flex; align-items: center;
                       width: 48px; height: 17px"
              ></div>

              <div style="position: absolute; top: 40px; left: 0; right: 0; text-align: center">
                <span style="display: block; font-size: 30px; font-weight: 600; line-height: 1.1; font-variant-numeric: tabular-nums">9:41</span>
                <span style="display: block; font-size: 10px; opacity: 0.82; margin-top: 2px">Tuesday 18 June</span>
              </div>

              <div data-part="slot-sheet" style="position: absolute; left: 8px; right: 8px; top: 104px; height: 116px"></div>

              <span
                style="position: absolute; left: 50%; bottom: 8px; translate: -50% 0; width: 56px; height: 3px;
                       border-radius: 999px; background: rgb(255 255 255 / 0.55)"
              ></span>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 6px">
              <sp-segmented data-stage-mode class="sp-segmented" data-axis="View" data-part="picker" data-value="${s}" style="align-self: flex-start">
              <button class="sp-segment" type="button" data-part="seg-compact" value="compact" style="padding: 4px 7px; font-size: 11px">Compact</button>
              <button class="sp-segment" type="button" data-part="seg-expanded" value="expanded" style="padding: 4px 7px; font-size: 11px">Expanded</button>
              <button class="sp-segment" type="button" data-part="seg-notification" value="notification" style="padding: 4px 7px; font-size: 11px">Notification</button>
            </sp-segmented>
            <div class="sp-stack" style="height: 108px; margin-top: 8px; gap: 6px">
              ${d(`Courier`,`Dani R., van 12`)}
              ${d(`Drop-off`,`14 Quay Street`)}
              ${d(`Signature`,`Not required`)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let m=`
    <div
      class="sp-glass"
      data-part="activity"
      data-subject
      data-surface="${s}"
      data-live
      data-pose="[data-live]"
      style="${l}"
    ></div>`;e(f,`slot-compact`).insertAdjacentHTML(`afterbegin`,m);let h=e(f,`activity`),g=s,_=0,v=2,y=e=>h.querySelector(`[data-part="${e}"]`),b=()=>{let e=a[_];if(g===`compact`){h.innerHTML=`
        <span aria-hidden="true" style="flex: 0 0 auto; width: 7px; height: 7px; border-radius: 50%; background: #5ee0a0"></span>
        <span data-part="compact-eta" style="font-size: 9px; font-weight: 600; white-space: nowrap; font-variant-numeric: tabular-nums">${e.mins}m</span>`;return}if(g===`expanded`){h.innerHTML=`
        <span class="sp-row" style="gap: 6px; margin-bottom: 5px">
          <span aria-hidden="true" style="flex: 0 0 auto; width: 14px; height: 14px; border-radius: 4px; background: rgb(255 255 255 / 0.38)"></span>
          <span class="sp-grow" style="font-size: 10px; font-weight: 600">Harbour Supply</span>
          <span data-part="badge" style="flex: 0 0 auto; padding: 1px 5px; border-radius: 999px; background: rgb(255 255 255 / 0.3); font-size: 8px; font-weight: 700; letter-spacing: 0.06em">LIVE</span>
        </span>
        <span style="display: block; font-size: 11px; font-weight: 600">Order 4821 on its way</span>
        <span data-part="status" style="display: block; margin: 3px 0 6px; font-size: 10px; opacity: 0.86">${e.status}</span>
        <div class="sp-progress" data-part="progress" style="height: 5px; background: rgb(255 255 255 / 0.26)">
          <div class="sp-progress-fill" data-part="progress-fill" style="background: #ffffff; --sp-value: ${e.progress}%"></div>
        </div>
        <span data-part="eta" style="display: block; margin-top: 5px; font-size: 10px; opacity: 0.86; font-variant-numeric: tabular-nums">${e.eta}</span>`;return}h.innerHTML=`
      <span class="sp-row" style="gap: 6px; margin-bottom: 5px">
        <span aria-hidden="true" style="flex: 0 0 auto; width: 14px; height: 14px; border-radius: 4px; background: rgb(255 255 255 / 0.38)"></span>
        <span class="sp-grow" style="font-size: 10px; font-weight: 600">Harbour Supply</span>
        <span data-part="age" style="flex: 0 0 auto; font-size: 9px; opacity: 0.8; font-variant-numeric: tabular-nums">${v}m ago</span>
      </span>
      <span style="display: block; font-size: 11px; font-weight: 600">Your order has left the depot</span>
      <span style="display: block; margin-top: 3px; font-size: 10px; opacity: 0.86">Order 4821, three stops away when it left.</span>`},x=()=>{let e=a[_],t=y(`compact-eta`);t&&(t.textContent=`${e.mins}m`);let n=y(`status`);n&&(n.textContent=e.status);let r=y(`progress-fill`);r&&r.style.setProperty(`--sp-value`,`${e.progress}%`);let i=y(`eta`);i&&(i.textContent=e.eta);let o=y(`age`);o&&(o.textContent=`${v}m ago`)},S=t=>{o.includes(t)&&(g=t,h.dataset.surface=t,h.setAttribute(`style`,t===`compact`?l:u),t===`notification`?h.removeAttribute(`data-live`):h.setAttribute(`data-live`,``),e(f,c[t]??`slot-sheet`).appendChild(h),b())},C=()=>{_=(_+1)%a.length,v=Math.min(v+1,59),x(),p.setTimeout(C,i)};e(f,`picker`).addEventListener(`change`,e=>S(e.detail)),S(s),p.setTimeout(C,i)}export{f as mount};