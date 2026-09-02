import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n=30,r=232,i=11,a=2.6,o=3,s=26,c=[6,14,16,24],l=`Ainsley, Marta.Balfour, Dougal.Bannerman, Iris.Brodie, Callum.Cargill, Senga.Chalmers, Effie.Cormack, Ruaridh.Dalziel, Morag.Drummond, Innes.Eunson, Fergus.Fairbairn, Nessa.Gilfillan, Struan.Halcro, Isla.Inkster, Torquil.Kirkpatrick, Eilidh.Laidlaw, Hamish.Leask, Rhona.Macaulay, Coll.Mowat, Bethia.Nicolson, Angus.Peterkin, Sorcha.Rendall, Kirsty.Sclater, Magnus.Sinclair, Ailsa.Tulloch, Gavin.Umphray, Freya.Vermeulen, Joss.Wishart, Elspeth.Yorston, Niall.Zetland, Bridie`.split(`.`),u=e=>1+i*Math.exp(-((e/a)**2));function d(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 296px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour register</span>
          <span class="sp-label" style="flex: 0 0 auto; font-size: 11px">30 names</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 14px; padding: 12px">
          <div
            data-part="lens"
            data-zone="top"
            style="position: relative; display: flex; flex: 0 0 auto; width: 210px; height: 234px;
                   touch-action: none; cursor: grab"
          >
            <div
              class="sp-context"
              data-part="rows"
              style="position: relative; flex: 1 1 auto; height: 100%; overflow: hidden;
                     border: 1px solid var(--sp-line); border-radius: 6px; background: var(--sp-surface)"
            >${l.map((e,t)=>`
      <div
        data-part="row-${t+1}"
        data-state="far"
        style="display: flex; align-items: center; height: ${r/n}px; padding: 0 6px; overflow: hidden;
               white-space: nowrap; line-height: 1; color: var(--sp-ink);
               background: var(--sp-${t%2==0?`surface`:`sunken`})"
      >${e}</div>`).join(``)}${c.map(e=>`
      <span
        data-part="at-${e}"
        aria-hidden="true"
        style="position: absolute; left: 94px; top: ${(e-.5)*r/n-4}px; width: 8px; height: 8px; pointer-events: none"
      ></span>`).join(``)}</div>
            <div style="position: relative; flex: 0 0 auto; width: 16px">
              <div
                data-part="falloff"
                data-subject
                style="position: absolute; left: 5px; width: 6px; top: 0; height: 0; border-radius: 3px;
                       background: var(--sp-accent)"
              ></div>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 8px">
            <span class="sp-label" style="font-size: 11px">the falloff</span>
            <span class="sp-text" data-part="readout" style="height: 96px; font-size: 12px"></span>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(i,`lens`),d=e(i,`rows`),f=e(i,`falloff`),p=e(i,`readout`),m=l.map((t,n)=>e(i,`row-${n+1}`)),h=!1,g=e=>{let t=m.map((t,n)=>u(n+1-e)),i=r/t.reduce((e,t)=>e+t,0),o=Math.min(n,Math.max(1,Math.round(e))),s=0,c=r;for(let[n,r]of m.entries()){let a=(t[n]??1)*i;r.style.height=`${a.toFixed(2)}px`,r.style.fontSize=`${Math.min(11.5,a*.5).toFixed(2)}px`,r.dataset.state=n+1===o?`focus`:Math.abs(n+1-e)<=3.5?`near`:`far`,n+1<=o&&(s+=a),c=Math.min(c,a)}f.style.top=`${s.toFixed(2)}px`,f.style.height=`${(r-s).toFixed(2)}px`,a.dataset.zone=e<=10?`top`:e<=20?`middle`:`bottom`,p.textContent=`Lens on ${l[o-1]??``}, row ${o} of ${n}. Falloff below: rows ${o+1} to ${n}, smallest ${c.toFixed(1)}px.`},_=e=>{let i=t({clientX:0,clientY:e},d).y/r*n+.5;return Math.min(s,Math.max(o,i))};a.addEventListener(`pointerdown`,e=>{h=!0,e.isTrusted&&a.setPointerCapture(e.pointerId),g(_(e.clientY))}),a.addEventListener(`pointermove`,e=>{h&&g(_(e.clientY))});let v=()=>{h=!1};a.addEventListener(`pointerup`,v),a.addEventListener(`pointercancel`,v),g(6)}export{d as mount};