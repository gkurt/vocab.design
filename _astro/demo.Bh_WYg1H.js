import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{i as n,r}from"./measure.DK7AY2_i.js";import{t as i}from"./motion.B5_YXmsy.js";var a={w:434,h:184},o=34,s=10,c=27,l={tight:{dot:60,ring:130,note:`dot 60 ms behind, ring 130 ms`},loose:{dot:140,ring:360,note:`dot 140 ms behind, ring 360 ms`},instant:{dot:0,ring:0,note:`no lag: a second arrow, with nothing trailing`}},u=[{key:`a`,label:`Work`,left:40,top:46},{key:`b`,label:`Studio`,left:268,top:34},{key:`c`,label:`Journal`,left:96,top:126},{key:`d`,label:`Contact`,left:310,top:118}],d=e=>`
  <span
    class="sp-text sp-text--ink" data-part="link-${e.key}" data-link
    style="position: absolute; left: ${e.left}px; top: ${e.top}px; padding-bottom: 2px;
           border-bottom: 2px solid var(--sp-accent); font-size: 14px; font-weight: 500"
  >${e.label}</span>`;function f(f){f.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Lag</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="loose" data-axis="Follow">
            <button class="sp-segment" type="button" data-part="seg-tight" value="tight">Tight</button>
            <button class="sp-segment" type="button" data-part="seg-loose" value="loose">Loose</button>
            <button class="sp-segment" type="button" data-part="seg-instant" value="instant">Instant</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div
            data-part="field"
            data-hover-driven
            style="position: relative; width: ${a.w}px; height: ${a.h}px; border-radius: 6px;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); overflow: hidden; cursor: none"
          >
            <div class="sp-context">
              <div data-part="texture" style="position: absolute; left: 40px; top: 82px; width: 210px">
                <span class="sp-line" style="display: block; width: 100%"></span>
                <span class="sp-line" style="display: block; width: 74%; margin-top: 8px"></span>
              </div>
              ${u.map(d).join(``)}
              <span
                class="sp-label" data-part="readout"
                style="position: absolute; left: 12px; bottom: 8px; font-size: 11px"
              >${l.loose.note}</span>
            </div>

            <span
              data-part="ring" data-subject data-pose=":not([data-lag=instant])" data-lag="loose"
              style="position: absolute; left: 0; top: 0; width: ${o}px; height: ${o}px;
                     margin: ${-34/2}px 0 0 ${-34/2}px; border: 2px solid var(--sp-accent);
                     border-radius: 50%; background: color-mix(in srgb, var(--sp-accent) 12%, transparent);
                     pointer-events: none; will-change: transform"
            ></span>
            <span
              data-part="dot"
              style="position: absolute; left: 0; top: 0; width: ${s}px; height: ${s}px;
                     margin: ${-10/2}px 0 0 ${-10/2}px; border-radius: 50%; background: var(--sp-accent);
                     pointer-events: none; will-change: transform"
            ></span>
          </div>
        </div>
      </div>
    </div>
  `;let p=e(f,`field`),m=e(f,`ring`),h=e(f,`dot`),g=e(f,`readout`),_=i(f),v=`loose`,y=!1,b={x:a.w/2,y:a.h/2},x=()=>{m.style.transform=`translate(${b.x}px, ${b.y}px) scale(${y?1.55:1})`,h.style.transform=`translate(${b.x}px, ${b.y}px)`},S=()=>{let{dot:e,ring:t,note:n}=l[v],r=`cubic-bezier(0.2, 0.7, 0.3, 1)`;m.style.transition=_?`none`:`transform ${t}ms ${r}`,h.style.transition=_?`none`:`transform ${e}ms ${r}`,m.dataset.lag=v,g.textContent=_?`dot 0 ms behind, ring 0 ms`:n},C=(e,t)=>Math.min(Math.max(e,c),t-c);f.addEventListener(`pointermove`,e=>{let i=n(p),a=r(e,p);b={x:C(a.x,i.width),y:C(a.y,i.height)},y=e.target instanceof Element&&e.target.closest(`[data-link]`)!==null,t(m,`data-over`,y),x()}),e(f,`mode`).addEventListener(`change`,e=>{v=e.detail,S()}),S(),x()}export{f as mount};