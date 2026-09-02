import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=`­`,r=`Har~bour~mas~ters re~cord~ed ev~ery cross~ing in du~pli~cate, en~ter~ing the par~tic~u~lars twice so that a sin~gle mis~read~ing could nev~er trav~el un~chal~lenged.`.replaceAll(`~`,n),i=120,a=13,o=19,s=171,c=2,l=3;function u(e){let t=``,i=[];for(let a=0;a<165;a++){if(r[a]!==n){t+=r[a];continue}e.has(a)||(i.push({source:a,at:t.length}),t+=n)}return{text:t,points:i}}function d(e){let t=0,n=0,r;for(let i of e)n=r!==void 0&&i.line===r+1?n+1:1,r=i.line,n>t&&(t=n);return t}function f(e){let t=0,n;for(let r of e)if(t=n!==void 0&&r.line===n+1?t+1:1,n=r.line,t>c)return r.source}function p(n,r){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Justified column</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Hyphen limit" data-term="default" data-value="default">
            <button class="sp-segment" data-part="seg-default" value="default">default</button>
            <button class="sp-segment" data-part="seg-limited" value="limited">limit 2</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 18px; align-items: flex-start; margin-top: 10px">
          <div style="flex: 0 0 auto; width: ${i}px; height: ${s}px">
            <p data-part="column" data-subject data-mode="default" data-pose="[data-laddered]"
               style="margin: 0; font-size: ${a}px; line-height: ${o}px; text-align: justify; hyphens: manual"></p>
          </div>
          <div class="sp-stack sp-context" data-part="readout" style="flex: 1 1 auto; gap: 2px">
            <span class="sp-label">longest run of hyphenated lines</span>
            <span data-part="rungs" style="font-size: 22px; font-weight: 600; font-variant-numeric: tabular-nums"></span>
            <span class="sp-text" data-stage-verdict data-part="note" style="font-size: 12px"></span>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(n,`column`),p=e(n,`rungs`),m=e(n,`note`),h=`default`,g=e=>{let{text:t,points:n}=u(e);c.textContent=t;let r=c.firstChild;if(!(r instanceof Text))return[];let i=(c.ownerDocument??document).createRange(),a=e=>(i.setStart(r,e),i.setEnd(r,Math.min(e+1,t.length)),[...i.getClientRects()]),s=a(0)[0]?.top??0,l=[];for(let e of n){let t=a(e.at).find(e=>e.width>.5);t&&l.push({line:Math.round((t.top-s)/o),source:e.source})}return l.sort((e,t)=>e.line-t.line)},_=e=>{if(e!=="default"&&e!==`limited`)return;h=e;let n=new Set,r=g(n);if(e===`limited`)for(let e=0;e<12;e++){let e=f(r);if(e===void 0)break;n.add(e),r=g(n)}let i=d(r);c.dataset.mode=e,t(c,`data-laddered`,i>=l),p.textContent=i===1?`1 line`:`${i} lines`,m.textContent=i>=l?`three in a row is a ladder`:`capped, and the rag still holds`};_(`default`),r.setTimeout(()=>_(h),400),e(n,`segmented`).addEventListener(`change`,e=>_(e.detail))}export{p as mount};