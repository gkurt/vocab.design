import{n as e}from"./parts.C-YLuC7Q.js";var t=1100,n=[{minutes:0,key:`now`},{minutes:2,key:`2-min`},{minutes:8,key:`8-min`},{minutes:60,key:`1-h`},{minutes:300,key:`5-h`},{minutes:1500,key:`1-d`},{minutes:4400,key:`past`}],r=2880,i=[{key:`ada`,who:`AM`,what:`Ada added tide readings`,where:`Harbour survey`,base:0,exact:`12 Aug 2026, 14:32`,absolute:`12 Aug`},{key:`ravi`,who:`RS`,what:`Ravi closed two findings`,where:`Quay inspection`,base:45,exact:`12 Aug 2026, 13:47`,absolute:`12 Aug`},{key:`noor`,who:`NK`,what:`Noor uploaded the chart`,where:`Harbour survey`,base:180,exact:`12 Aug 2026, 11:32`,absolute:`12 Aug`}],a=(e,t)=>e>=r?t:e<1?`just now`:e<60?`${e} min ago`:e<1440?`${Math.round(e/60)} h ago`:`yesterday`;function o(o,s){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 270px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Activity</span>
          <span class="sp-label">Harbour survey</span>
        </div>
        <div class="sp-body sp-stack" style="gap: 6px">
          ${i.map((e,t)=>`
    <div class="sp-row" data-part="row-${e.key}" style="flex: 0 0 auto; gap: 10px; height: 46px">
      <span class="sp-avatar sp-context">${e.who}</span>
      <span class="sp-stack sp-context sp-grow" style="gap: 2px; min-width: 0">
        <span class="sp-text sp-text--ink" style="font-size: 13px">${e.what}</span>
        <span class="sp-label" style="font-size: 11px">${e.where}</span>
      </span>
      <time
        data-part="stamp-${e.key}"
        ${t===0?`data-subject`:``}
        data-mode="relative"
        data-age="now"
        datetime="2026-08-12T14:32"
        title="${e.exact}"
        style="width: 72px; text-align: right; font-size: 12px; color: var(--sp-muted); font-variant-numeric: tabular-nums"
      >just now</time>
    </div>`).join(``)}
        </div>
        <div class="sp-row sp-context" style="flex: 0 0 auto; padding: 8px 12px; justify-content: flex-end; border-top: 1px solid var(--sp-line)">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="rewind">Rewind</button>
        </div>
      </div>
    </div>
  `;let c=0,l,u=()=>{let t=n[c]??n[0];if(t)for(let n of i){let i=n.base+t.minutes,s=e(o,`stamp-${n.key}`);s.textContent=a(i,n.absolute),s.dataset.mode=i>=r?`absolute`:`relative`,s.dataset.age=t.key}},d=()=>{c>=n.length-1||(c+=1,u(),l=s.setTimeout(d,t))};e(o,`rewind`).addEventListener(`click`,()=>{s.clearTimeout(l),c=0,u(),l=s.setTimeout(d,t)}),u(),l=s.setTimeout(d,t)}export{o as mount};