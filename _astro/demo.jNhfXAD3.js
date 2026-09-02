import{n as e,t}from"./parts.C-YLuC7Q.js";import{n}from"./measure.DK7AY2_i.js";var r={back:.22,mid:.55},i=[{size:46,left:18,top:26},{size:30,left:128,top:58},{size:38,left:236,top:18}],a=[{initials:`CW`,title:`Cliff walk, morning`,meta:`18 photos`},{initials:`HB`,title:`Harbour bend`,meta:`9 photos`},{initials:`LT`,title:`Lighthouse trail`,meta:`24 photos`},{initials:`SB`,title:`South beach`,meta:`11 photos`}];function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 358px; height: 254px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Albums</span>
        </div>
        <div class="sp-body" style="padding: 0">
          <div
            class="sp-scroll"
            data-part="scene"
            data-subject
            style="position: relative; height: 100%; overflow: hidden auto; background: var(--sp-accent-soft)"
          >
            <div
              data-part="layer-back"
              style="position: absolute; top: 0; left: 0; right: 0; height: 164px; overflow: hidden;
                     background: var(--sp-accent-soft)"
            >${i.map(e=>`
      <span
        style="position: absolute; left: ${e.left}px; top: ${e.top}px; width: ${e.size}px;
               height: ${e.size}px; border-radius: 50%; background: var(--sp-surface); opacity: 0.55"
      ></span>`).join(``)}</div>
            <div
              class="sp-stack"
              data-part="layer-mid"
              style="position: absolute; top: 106px; left: 18px; gap: 2px"
            >
              <span class="sp-heading" style="font-size: 17px">Coast, 2019</span>
              <span class="sp-text sp-text--ink" style="font-size: 12px">Four albums</span>
            </div>
            <div
              class="sp-surface"
              data-part="layer-front"
              style="position: relative; margin-top: 146px; padding: 6px 8px 14px; border-bottom: 0;
                     border-radius: var(--sp-radius) var(--sp-radius) 0 0; box-shadow: var(--sp-shadow)"
            >
              <ul class="sp-list">${a.map(e=>`
      <li class="sp-list-item">
        <span class="sp-avatar">${e.initials}</span>
        <span class="sp-stack sp-grow" style="gap: 2px">
          <span class="sp-text sp-text--ink">${e.title}</span>
          <span class="sp-label">${e.meta}</span>
        </span>
      </li>`).join(``)}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(o,`scene`),c=e(o,`layer-back`),l=e(o,`layer-mid`),u=e(o,`layer-front`),d=()=>n(u,c).top,f=d(),p=()=>{let e=s.scrollTop;c.style.transform=`translateY(${(e*(1-r.back)).toFixed(1)}px)`,l.style.transform=`translateY(${(e*(1-r.mid)).toFixed(1)}px)`,t(s,`data-parted`,Math.abs(d()-f)>24)};s.addEventListener(`scroll`,p),p()}export{o as mount};