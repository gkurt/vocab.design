import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=250,n=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],r=[12,16,15,21,26,24,30,55,33,36,37,36],i=[`C4`,`D4`,`E4`,`G4`,`A4`,`C5`,`D5`,`E5`,`G5`,`A5`,`C6`,`D6`],a=0,o=400,s=92,c={left:10,right:344,top:12,bottom:76},l={table:`Every figure, exact, in reading order. Twelve rows of speech to learn one shape.`,summary:`The shape in a sentence, written by whoever made the chart. Fast to hear, impossible to question.`,sonified:`Pitch carries the value, time carries the axis: rise, spike and plateau in three seconds. The pitch is charted here, not sounded.`},u=e=>c.left+e/(r.length-1)*(c.right-c.left),d=e=>c.bottom-(e-a)/60*(c.bottom-c.top),f=e=>i[Math.round((e-a)/60*(i.length-1))]??`C4`,p=e=>r.slice(0,e).map((e,t)=>`${u(t).toFixed(1)},${d(e).toFixed(1)}`).join(` `);function m(i,a){let m=e=>`<text x="${c.right+8}" y="${(d(e)+2.6).toFixed(1)}" font-size="7.5" fill="currentColor">${f(e)}</text>`,h=e=>`
    <div style="flex: 1 1 0; min-width: 0; text-align: center">
      <span class="sp-label" style="display: block; font-size: 8.5px">${n[e]}</span>
      <span class="sp-text sp-text--ink" style="display: block; font-size: 10.5px; line-height: 14px">${r[e]}</span>
    </div>`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Revenue, one series</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Presentation" data-part="mode" data-value="table" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-table" value="table"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Table</button>
            <button class="sp-segment" type="button" data-part="seg-summary" value="summary"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Summary</button>
            <button class="sp-segment" type="button" data-part="seg-sonified" value="sonified"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Sonified</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" style="margin-top: 9px; padding: 6px 8px">
          <svg data-part="chart" viewBox="0 0 ${o} ${s}" width="100%" height="${s}" role="img"
               aria-label="Revenue by month, rising with one spike in August"
               style="display: block; overflow: visible">
            <g class="sp-context" style="color: var(--sp-muted)">
              <line x1="${c.left}" y1="${c.bottom+4}" x2="${c.right}" y2="${c.bottom+4}"
                    stroke="currentColor" stroke-width="1" opacity="0.5" />
              <polyline points="${p(r.length)}" fill="none" stroke="currentColor" stroke-width="1.4"
                        stroke-linejoin="round" opacity="0.55" />
            </g>
            <g data-part="axis" style="color: var(--sp-muted); opacity: 0; transition: opacity 0.2s ease">
              ${m(r[7]??0)}${m(36)}${m(21)}${m(12)}
              <text x="${c.right+8}" y="${c.top-3}" font-size="7.5" fill="currentColor">pitch</text>
            </g>
            <g data-part="trace" data-subject style="color: var(--sp-accent); opacity: 0; transition: opacity 0.18s ease">
              <polyline data-part="swept" points="${p(1)}" fill="none" stroke="currentColor" stroke-width="2.6"
                        stroke-linejoin="round" stroke-linecap="round" />
              <line data-part="playhead" x1="${u(0)}" y1="${c.top-2}" x2="${u(0)}" y2="${c.bottom+4}"
                    stroke="currentColor" stroke-width="2.4" opacity="0.32" />
              <circle data-part="tone" cx="${u(0)}" cy="${d(r[0]??0)}" r="3.4" fill="currentColor" />
            </g>
          </svg>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 9px; padding: 8px 10px">
          <div class="sp-row sp-row--between" style="gap: 10px; height: 14px">
            <span class="sp-label" data-part="alt-label" style="flex: 0 0 auto; font-size: 10px">Preview</span>
            <span class="sp-label" data-part="readout" data-mode="table" data-playing="no"
                  style="flex: 0 0 auto; font-size: 10px">12 rows</span>
          </div>
          <div style="position: relative; height: 32px; margin-top: 4px">
            <div data-part="view-table" class="sp-row" style="position: absolute; inset: 0; gap: 0; align-items: flex-start;
                                                              transition: opacity 0.18s ease">
              ${n.map((e,t)=>h(t)).join(``)}
            </div>
            <p class="sp-text sp-text--ink" data-part="view-summary"
               style="position: absolute; inset: 0; margin: 0; font-size: 11.5px; line-height: 16px; opacity: 0;
                      transition: opacity 0.18s ease">“Revenue rises from 12 in January to 36 in December, with one
              spike to 55 in August.”</p>
            <p class="sp-text sp-text--ink" data-part="view-sonified"
               style="position: absolute; inset: 0; margin: 0; font-size: 11.5px; line-height: 16px; opacity: 0;
                      transition: opacity 0.18s ease">One tone per month, pitch rising with value.<br>
              <span data-part="tone-text" class="sp-label" style="font-size: 10.5px">ready</span></p>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="table"
           style="margin: 9px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${l.table}</p>
      </div>
    </div>
  `;let g=e(i,`axis`),_=e(i,`trace`),v=e(i,`swept`),y=e(i,`playhead`),b=e(i,`tone`),x=e(i,`tone-text`),S=e(i,`readout`),C=e(i,`caption`),w={table:e(i,`view-table`),summary:e(i,`view-summary`),sonified:e(i,`view-sonified`)},T=[],E=e=>{let t=r[e]??0;v.setAttribute(`points`,p(e+1)),y.setAttribute(`x1`,`${u(e)}`),y.setAttribute(`x2`,`${u(e)}`),b.setAttribute(`cx`,`${u(e)}`),b.setAttribute(`cy`,`${d(t)}`),x.textContent=`${n[e]}, ${t}, ${f(t)}`,S.dataset.point=`${e+1}`},D=()=>{E(0),_.style.opacity=`1`,S.dataset.playing=`yes`,S.textContent=`sweeping, 3 seconds`,r.forEach((e,n)=>{n!==0&&T.push(a.setTimeout(()=>E(n),n*t))}),T.push(a.setTimeout(()=>{S.dataset.playing=`done`,S.textContent=`swept`},r.length*t))},O=e=>{for(let e of T)a.clearTimeout(e);T=[];for(let[t,n]of Object.entries(w))n.style.opacity=t===e?`1`:`0`;if(g.style.opacity=e===`sonified`?`1`:`0`,C.dataset.mode=e,C.textContent=l[e],S.dataset.mode=e,S.dataset.playing=`no`,S.removeAttribute(`data-point`),x.textContent=`ready`,e!==`sonified`){_.style.opacity=`0`,S.textContent=e===`table`?`12 rows`:`1 sentence`;return}D()};e(i,`mode`).addEventListener(`change`,e=>{O(e.detail)}),O(`table`)}export{m as mount};