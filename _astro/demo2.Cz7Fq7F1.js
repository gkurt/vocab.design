import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`,n={w:242,h:196},r={h:32,wide:112,narrow:98},i=4,a={linear:{text:[`flowchart TD`,`  A[Submit] --> B[Validate]`,`  B --> C[Save record]`],nodes:[{id:`A`,label:`Submit`,shape:`step`},{id:`B`,label:`Validate`,shape:`step`},{id:`C`,label:`Save record`,shape:`step`}],edges:[{from:`A`,to:`B`},{from:`B`,to:`C`}],note:`Three steps, one path: the engine stacked them in the order the text names.`},branch:{text:[`flowchart TD`,`  A[Submit] --> B{Valid?}`,`  B -- yes --> C[Save record]`,`  B -- no --> D[Show error]`],nodes:[{id:`A`,label:`Submit`,shape:`step`},{id:`B`,label:`Valid?`,shape:`decision`},{id:`C`,label:`Save record`,shape:`step`},{id:`D`,label:`Show error`,shape:`step`}],edges:[{from:`A`,to:`B`},{from:`B`,to:`C`,label:`yes`},{from:`B`,to:`D`,label:`no`}],note:`One line more, and the whole picture is re-placed: the branch was never drawn by hand.`}},o=`linear`;function s(e){let t=new Map;for(let n of e.nodes)t.set(n.id,0);for(let n=0;n<e.nodes.length;n++)for(let n of e.edges){let e=(t.get(n.from)??0)+1;e>(t.get(n.to)??0)&&t.set(n.to,e)}return t}function c(e){let t=s(e),i=Math.max(...t.values())+1,a=n=>e.nodes.filter(e=>t.get(e.id)===n);return e.nodes.map(e=>{let o=t.get(e.id)??0,s=a(o),c=s.indexOf(e),l=s.length>1?r.narrow:r.wide;return{...e,w:l,h:r.h,cx:n.w*(c+.5)/s.length,cy:n.h*(o+.5)/i}})}function l(e){if(e.shape===`decision`){let t=e.h/2+5;return`<polygon points="${`${e.cx},${e.cy-t} ${e.cx+e.w/2},${e.cy} ${e.cx},${e.cy+t} ${e.cx-e.w/2},${e.cy}`}" fill="var(--sp-accent-soft)" stroke="var(--sp-accent)" stroke-width="1.6"></polygon>`}return`<rect x="${e.cx-e.w/2}" y="${e.cy-e.h/2}" width="${e.w}" height="${e.h}" rx="5"
            fill="var(--sp-sunken)" stroke="var(--sp-line)" stroke-width="1.6"></rect>`}function u(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: auto">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">signup.mmd</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Shape" data-part="picker" data-value="${o}">
            <button class="sp-segment" type="button" data-part="seg-linear" value="linear">one path</button>
            <button class="sp-segment" type="button" data-part="seg-branch" value="branch">a decision</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 12px; display: flex; flex-direction: column; gap: 8px">
          <div style="display: flex; gap: 10px; align-items: stretch">
            <div
              class="sp-context"
              data-part="source"
              style="flex: 0 0 auto; width: 196px; height: ${n.h+2}px; padding: 10px; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
            >
              <span class="sp-label" style="font-size: 10px">source</span>
              <div data-part="code" style="margin-top: 6px; font-family: ${t}; font-size: 10px; line-height: 17px; color: var(--sp-ink)">
                ${Array.from({length:i},(e,t)=>`<div style="height: 17px; white-space: pre"><span data-part="line-${t+1}"></span></div>`).join(``)}
              </div>
            </div>
            <div style="flex: 1 1 auto; min-width: 0; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
              <svg
                data-part="diagram"
                data-subject
                data-mode="${o}"
                role="img"
                aria-label="Signup flowchart"
                viewBox="0 0 ${n.w} ${n.h}"
                style="display: block; width: ${n.w}px; height: ${n.h}px"
              >
                <defs>
                  <marker id="fc-arrow" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M0 0 L 7 4 L 0 8 z" fill="var(--sp-muted)"></path>
                  </marker>
                </defs>
                <g data-part="arrows" fill="none" stroke="var(--sp-muted)" stroke-width="1.6"></g>
                <g data-part="boxes"></g>
              </svg>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="note" style="height: 19px; font-size: 11px; overflow: hidden"></span>
        </div>
      </div>
    </div>
  `;let s=e(r,`diagram`),u=e(r,`arrows`),d=e(r,`boxes`),f=e(r,`note`),p=e(r,`picker`),m=t=>{let n=t===`branch`?a.branch:a.linear,o=c(n),p=e=>o.find(t=>t.id===e);for(let t=0;t<i;t++)e(r,`line-${t+1}`).textContent=n.text[t]??``;d.innerHTML=o.map(e=>`
        <g data-part="node-${e.id}">
          ${l(e)}
          <text x="${e.cx}" y="${e.cy+4}" text-anchor="middle" font-size="11" fill="var(--sp-ink)">${e.label}</text>
        </g>`).join(``),u.innerHTML=n.edges.map(({from:e,to:t,label:n})=>{let r=p(e),i=p(t),a=r.cy+(r.shape===`decision`?r.h/2+5:r.h/2),o=i.cy-(i.shape===`decision`?i.h/2+5:i.h/2)-5,s=(o-a)/2,c={x:(r.cx+3*r.cx+3*i.cx+i.cx)/8,y:(a+o)/2},l=n?`<g data-part="label-${e}-${t}" stroke="none">
               <rect x="${c.x-13}" y="${c.y-8}" width="26" height="16" rx="4" fill="var(--sp-surface)"></rect>
               <text x="${c.x}" y="${c.y+3.5}" text-anchor="middle" font-size="10" fill="var(--sp-muted)">${n}</text>
             </g>`:``;return`<path data-part="arrow-${e}-${t}" d="M ${r.cx} ${a} C ${r.cx} ${a+s}, ${i.cx} ${o-s}, ${i.cx} ${o}"
                      marker-end="url(#fc-arrow)"></path>${l}`}).join(``),s.dataset.mode=t,f.textContent=n.note};p.addEventListener(`change`,e=>m(e.detail)),m(o)}export{u as mount};