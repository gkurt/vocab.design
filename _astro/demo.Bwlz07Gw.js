import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{i as n,t as r}from"./measure.DK7AY2_i.js";var i=`'Geist Mono Variable', ui-monospace, monospace`,a=19,o=210,s=80,c=[`Product`,`Catalog`,`Sync`,`Scheduler`],l={none:{joiner:``,read:`No legal break anywhere in the name, so it runs past its column instead of wrapping.`},shy:{joiner:`­`,read:`The tick marks where the line was allowed to break: a soft hyphen breaks it there, and draws a hyphen.`},zwsp:{joiner:`​`,read:`The tick marks where the line was allowed to break: a zero-width space breaks it there, and draws nothing at all.`}},u=e=>e in l;function d(e){let t=e.firstChild;if(!t)return[];let n=e.ownerDocument.createRange();n.selectNodeContents(t);let i=r(e),a=[...n.getClientRects()].map(e=>({width:e.width/i,right:e.right/i,top:e.top/i,bottom:e.bottom/i})),o=[],s=NaN;for(let e of a.filter(e=>e.width>.5).sort((e,t)=>e.top-t.top)){let t=o.at(-1);if(t&&Math.abs(e.top-s)<4){t.width+=e.width,t.right=Math.max(t.right,e.right),t.bottom=Math.max(t.bottom,e.bottom);continue}s=e.top,o.push({width:e.width,right:e.right,bottom:e.bottom})}return o}function f(f){f.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="zwsp" data-axis="Character" data-term="zwsp" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="seg-none" value="none" style="white-space: nowrap">nothing</button>
            <button class="sp-segment" data-part="seg-shy" value="shy" style="white-space: nowrap">soft hyphen</button>
            <button class="sp-segment" data-part="seg-zwsp" value="zwsp" style="white-space: nowrap">ZWSP</button>
          </sp-segmented>
        </div>
        <span class="sp-label sp-context" style="display: block; margin-top: 12px">a name too long for its column</span>
        <div data-part="column"
             style="position: relative; width: 234px; height: ${s}px; margin-top: 4px; padding: 10px 12px;
                    background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius);
                    overflow: hidden">
          <p data-part="string" data-mode="zwsp" data-lines="1"
             style="margin: 0; width: ${o}px; font-family: ${i}; font-size: ${a}px; line-height: 1.55"></p>
          <span data-part="break" data-subject data-mode="zwsp" data-pose="[data-mode=zwsp]"
                style="position: absolute; width: 3px; height: 9px; background: var(--sp-accent); border-radius: 1px"></span>
          <span data-part="ruler" aria-hidden="true"
                style="position: absolute; top: 0; left: 0; visibility: hidden; white-space: pre;
                       font-family: ${i}; font-size: ${a}px">${c[0]}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 2px">${l.zwsp.read}</p>
      </div>
    </div>
  `;let p=e(f,`string`),m=e(f,`break`),h=e(f,`column`),g=e(f,`caption`),_=e(f,`ruler`),v=c.map((e,t)=>(_.textContent=c.slice(0,t+1).join(``),n(_).width));_.textContent=c[0];let y=e=>{if(!u(e))return;let{joiner:n,read:i}=l[e];p.textContent=c.join(n),p.dataset.mode=e,g.textContent=i;let a=d(p);p.dataset.lines=String(Math.max(a.length,1));let o=a[0],s=a.length>1&&o!==void 0;if(t(m,`hidden`,!s),m.dataset.mode=e,!s||!o){p.dataset.hyphen=`no`;return}let f=v.reduce((e,t)=>Math.abs(t-o.width)<Math.abs(e-o.width)?t:e);p.dataset.hyphen=o.width-f>4?`yes`:`no`;let _=h.getBoundingClientRect(),y=r(h);m.style.left=`${Math.min(o.right-_.left/y,228)}px`,m.style.top=`${o.bottom-_.top/y-4}px`};y(`zwsp`),e(f,`segmented`).addEventListener(`change`,e=>y(e.detail))}export{f as mount};