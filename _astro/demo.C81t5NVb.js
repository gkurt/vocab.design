import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{i as t,n}from"./measure.DK7AY2_i.js";var r=452,i=8,a=6,o=436,s=200,c=[1.5,.75,1.2,1.6,1.3,2.2,.9],l=[[0,1,2,3],[4,5,6]],u=[[1],[6,5],[2,3],[0,4]],d=[{key:`justified`,label:`justified`},{key:`masonry`,label:`masonry`}];function f(e){let t=o-a*(e.length-1),n=e.map(e=>c[e]??1),r=n.reduce((e,t)=>e+t,0),i=Math.floor(t/r),s=n.map(e=>Math.floor(i*e)),l=s.length-1;return s[l]=t-s.slice(0,l).reduce((e,t)=>e+t,0),{height:i,widths:s}}function p(e){let t=o-a*(e-1),n=Math.floor(t/e),r=Array.from({length:e},()=>n);return r[e-1]=t-n*(e-1),r}function m(o){o.innerHTML=`
    <div class="sp-app" style="gap: 8px">
      <div class="sp-row sp-context" style="width: ${r}px">
        <span class="sp-heading sp-grow" style="font-size: 13px">Gallery</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-axis="Layout" data-value="justified">
          ${d.map(e=>`
            <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 10px; font-size: 11px; white-space: nowrap">${e.label}</button>`).join(``)}
        </sp-segmented>
      </div>

      <div
        data-part="box"
        style="position: relative; width: ${r}px; height: ${s}px; padding: ${i}px; overflow: hidden;
               background: var(--sp-sunken); border-radius: var(--sp-radius)"
      >
        <div data-part="rows" style="display: flex; flex-direction: column; gap: ${a}px">
          <div data-part="row-1" data-subject data-fit="flush" style="display: flex; gap: ${a}px"></div>
          <div class="sp-context" data-part="row-2" style="display: flex; gap: ${a}px"></div>
        </div>

        <div class="sp-context" data-part="columns" style="display: none; gap: ${a}px; align-items: flex-start"></div>

        <span class="sp-context" data-part="guide-top" style="position: absolute; left: 0; right: 0; height: 3px; background: var(--sp-accent)"></span>
        <span class="sp-context" data-part="guide-bottom" style="position: absolute; left: 0; right: 0; height: 3px; background: var(--sp-accent)"></span>
      </div>

      <span
        class="sp-text sp-context"
        data-stage-verdict data-part="note"
        role="status"
        style="display: block; width: ${r}px; height: 32px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;let m=e(o,`rows`),h=e(o,`columns`),g=e(o,`guide-top`),_=e(o,`guide-bottom`),v=e(o,`row-1`),y=e(o,`note`),b=c.map((e,t)=>{let n=document.createElement(`div`);return n.dataset.part=`photo-${t+1}`,n.style.cssText=`flex: 0 0 auto; border-radius: 4px; background: linear-gradient(${120+t*22}deg, var(--sp-accent-soft), var(--sp-accent) 150%)`,n.dataset.ratio=String(e),n}),x=u.map(()=>{let e=document.createElement(`div`);return e.style.cssText=`display: flex; flex-direction: column; gap: ${a}px; flex: 0 0 auto`,h.append(e),e}),S=r=>{let s=r===`justified`;if(m.style.display=s?`flex`:`none`,h.style.display=s?`none`:`flex`,g.style.display=s?`block`:`none`,_.style.display=s?`block`:`none`,s){let t=i;for(let[n,r]of l.entries()){let{height:i,widths:s}=f(r),c=n===0?v:e(o,`row-2`);for(let[e,t]of r.entries()){let n=b[t];n&&(n.style.width=`${s[e]}px`,n.style.height=`${i}px`,c.append(n))}n===0&&(g.style.top=`${t-5}px`,_.style.top=`${t+i+2}px`),t+=i+a}}else{let e=p(u.length);for(let[t,n]of u.entries()){let r=x[t];if(!r)continue;let i=e[t]??0;r.style.width=`${i}px`;for(let e of n){let t=b[e];t&&(t.style.width=`${i}px`,t.style.height=`${Math.round(i/(c[e]??1))}px`,r.append(t))}}}if(s){let e=t(v),r=[...v.children].map(e=>n(e,v)),i=r[0],a=r[r.length-1],o=r.every(e=>Math.abs(e.height-(i?.height??0))<1),s=!!i&&!!a&&Math.abs(i.left)<1&&Math.abs(a.left+a.width-e.width)<1;v.dataset.fit=o&&s?`flush`:`loose`,y.textContent=`Four shapes scaled to one ${Math.round(i?.height??0)}px row, flush at both edges. The last one pays the rounding error.`}else{let e=x.map(e=>Math.round(t(e).height)),n=Math.max(...e)-Math.min(...e);h.dataset.edge=n>4?`ragged`:`level`,y.textContent=`Masonry instead: equal column widths, heights left alone, and a bottom edge ${n}px out of level.`}};e(o,`modes`).addEventListener(`change`,e=>S(e.detail)),S(`justified`)}export{m as mount};