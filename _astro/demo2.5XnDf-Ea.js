import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=128400,r=24,i=45,a=new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`,maximumFractionDigits:0});function o(o,s){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 316px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Overview</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="refresh">Refresh</button>
        </div>
        <div class="sp-stack" style="gap: 4px; margin-top: 16px">
          <span class="sp-label sp-context">Revenue this quarter</span>
          <span
            data-part="value"
            data-subject
            style="display: block; min-width: 9ch; font-size: 34px; font-weight: 600; line-height: 1.15; font-variant-numeric: tabular-nums"
          >${a.format(0)}</span>
          <span class="sp-row sp-context" style="gap: 8px; margin-top: 2px">
            <span class="sp-chip" style="cursor: default">+12.4%</span>
            <span class="sp-text">vs last quarter</span>
          </span>
        </div>
      </div>
    </div>
  `;let c=e(o,`value`),l,u=e=>{c.textContent=a.format(e)},d=()=>{u(n),c.removeAttribute(`data-counting`),c.setAttribute(`data-settled`,``)},f=()=>{if(s.clearTimeout(l),t(o))return d();c.setAttribute(`data-counting`,``),c.removeAttribute(`data-settled`);let e=0,a=()=>{if(e+=1,e>=r)return d();let t=e/r;u(Math.round(n*(1-(1-t)**3))),l=s.setTimeout(a,i)};u(0),a()};e(o,`refresh`).addEventListener(`click`,f),f()}export{o as mount};