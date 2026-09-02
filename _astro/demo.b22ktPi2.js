import{n as e,r as t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t as n}from"./measure.DK7AY2_i.js";var r=`Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif`,i=`­`,a=`The orch${i}ard was planted by some${i}one who ex${i}pect${i}ed to be dead be${i}fore the first prop${i}er har${i}vest, which is the ordi${i}nary con${i}di${i}tion of any${i}one who plants a tree, and the neigh${i}bours who in${i}her${i}it${i}ed it never learned whose idea the ar${i}range${i}ment had been.`,o=152,s=17,c=2,l=3;function u(e){let t=e.firstChild;if(!(t instanceof Text))return[];let r=e.getBoundingClientRect(),i=n(e),a=document.createRange(),o=new Map;for(let e=0;e<t.data.length;e++){if(t.data[e]!==` `)continue;a.setStart(t,e),a.setEnd(t,e+1);let n=a.getBoundingClientRect();if(n.width<2*i)continue;let c=Math.round((n.top-r.top)/i/s),l=o.get(c)??[];l.push({left:(n.left-r.left)/i,right:(n.right-r.left)/i,line:c}),o.set(c,l)}return[...o.keys()].sort((e,t)=>e-t).map(e=>o.get(e)??[])}function d(e){let t=[],n=[];for(let r of e){let e=r.map(e=>{let t=[e];for(let r of n)r.gap.line===e.line-1&&Math.min(r.gap.right,e.right)-Math.max(r.gap.left,e.left)>=c&&r.run.length+1>t.length&&(t=[...r.run,e]);return{gap:e,run:t}});for(let n of e)n.run.length>t.length&&(t=n.run);n=e}return t}function f(n){let i=(e,t,n)=>`
    <div class="sp-stack" style="gap: 4px">
      <span class="sp-label sp-context">hyphens: ${t}</span>
      <div style="position: relative; width: ${o}px; height: 170px">
        <div data-part="trace-${e}"${n?` data-subject`:``}
             style="position: absolute; left: 0; top: 0; width: ${o}px; height: 170px;
             pointer-events: none; transition: opacity 0.2s, visibility 0.2s"></div>
        <p class="sp-text sp-text--ink" data-part="${e}" lang="en"
           style="position: relative; margin: 0; font-family: ${r}; font-size: 12px; line-height: ${s}px;
                  text-align: justify; -webkit-hyphens: ${t}; hyphens: ${t}">${a}</p>
      </div>
      <span class="sp-label sp-context" data-part="readout-${e}" style="width: ${o}px; height: 16px"></span>
    </div>`;n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 400px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Georgia 12/17, justified</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Trace" data-part="segmented" data-value="on">
            <button class="sp-segment" data-part="seg-off" value="off">off</button>
            <button class="sp-segment" data-part="seg-on" value="on">on</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 16px; margin-top: 10px; align-items: flex-start">
          ${i(`rivered`,`none`,!0)}
          ${i(`fixed`,`auto`,!1)}
        </div>
      </div>
    </div>
  `;for(let t of[`rivered`,`fixed`]){let r=d(u(e(n,t))),i=e(n,`trace-${t}`);if(r.length>=l){let e=Math.min(...r.map(e=>e.left)),t=Math.max(...r.map(e=>e.right)),n=Math.min(...r.map(e=>e.line))*s,a=(Math.max(...r.map(e=>e.line))+1)*s;i.style.left=`${e}px`,i.style.top=`${n}px`,i.style.width=`${t-e}px`,i.style.height=`${a-n}px`,i.innerHTML=r.map(t=>`<span style="position: absolute; left: ${t.left-e}px; top: ${t.line*s-n}px;
                    width: ${t.right-t.left}px; height: ${s}px;
                    background: color-mix(in oklab, var(--sp-accent) 24%, transparent)"></span>`).join(``)}e(n,`readout-${t}`).textContent=r.length>=l?`a channel ${r.length} lines deep`:`no channel found`}let c=e=>{if(e===`on`||e===`off`)for(let r of t(n,`trace-rivered`).concat(t(n,`trace-fixed`)))r.dataset.state=e,r.style.opacity=e===`on`?`1`:`0`,r.style.visibility=e===`on`?`visible`:`hidden`};c(`on`),e(n,`segmented`).addEventListener(`change`,e=>c(e.detail))}export{f as mount};