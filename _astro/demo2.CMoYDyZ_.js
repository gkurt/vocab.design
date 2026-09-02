import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n=520,r=16,i=10,a=[{id:`tides`,name:`Tides`},{id:`harbour`,name:`Harbour`},{id:`anchorages`,name:`Anchorages`},{id:`lights`,name:`Lights`}],o=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2;function s(s,c){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Pilot handbook</span>
          <span class="sp-label" data-part="readout">at Tides</span>
        </div>
        <div class="sp-row" style="flex: 1 1 auto; min-height: 0; align-items: stretch; gap: 0">
          <nav class="sp-context" style="flex: 0 0 124px; padding: 10px 8px; border-right: 1px solid var(--sp-line)">
            <ul class="sp-nav">${a.map(e=>`<li><span class="sp-nav-item" role="link" data-part="link-${e.id}">${e.name}</span></li>`).join(``)}</ul>
          </nav>
          <div
            class="sp-scroll"
            data-part="page"
            data-subject
            data-at="tides"
            data-state="idle"
            style="position: relative; flex: 1 1 auto; background: var(--sp-sunken)"
          >
            ${a.map(e=>`
      <section data-part="section-${e.id}" style="padding: 12px 14px 18px">
        <span class="sp-heading" style="font-size: 14px">${e.name}</span>
        <span class="sp-line" style="display: block; width: 92%; margin-top: 12px"></span>
        <span class="sp-line" style="display: block; width: 84%; margin-top: 9px"></span>
        <span class="sp-line" style="display: block; width: 88%; margin-top: 9px"></span>
        <span class="sp-line" style="display: block; width: 66%; margin-top: 9px"></span>
        <span class="sp-swatch" style="display: block; height: 40px; margin-top: 12px; --sp-swatch: var(--sp-accent-soft)"></span>
      </section>`).join(``)}
          </div>
        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 8px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Jump" data-part="mode" data-value="glide">
          <button class="sp-segment" data-part="mode-glide" value="glide">Glide</button>
          <button class="sp-segment" data-part="mode-instant" value="instant">Instant</button>
        </sp-segmented>
      </div>
    </div>
  `;let l=e(s,`page`),u=e(s,`readout`),d,f=`glide`,p=e=>a.find(t=>t.id===e)?.name??``,m=t=>{c.clearTimeout(d),d=void 0,l.dataset.at=t,l.dataset.state=`idle`,u.textContent=`at ${p(t)}`;for(let n of a){let r=e(s,`link-${n.id}`);n.id===t?r.dataset.current=``:r.removeAttribute(`data-current`)}},h=a=>{let h=Math.max(e(s,`section-${a}`).offsetTop-i,0),g=l.scrollTop;if(c.clearTimeout(d),f===`instant`||t(s)){l.scrollTop=h,m(a);return}l.dataset.state=`gliding`,u.textContent=`travelling to ${p(a)}`;let _=performance.now(),v=()=>{let e=Math.min((performance.now()-_)/n,1);l.scrollTop=g+(h-g)*o(e),e<1?d=c.setTimeout(v,r):m(a)};d=c.setTimeout(v,r)};for(let t of a)e(s,`link-${t.id}`).addEventListener(`click`,()=>h(t.id));l.addEventListener(`wheel`,()=>{d!==void 0&&(c.clearTimeout(d),d=void 0,l.dataset.state=`idle`,u.textContent=`steered away`)}),e(s,`mode`).addEventListener(`change`,e=>{f=e.detail}),m(`tides`)}export{s as mount};