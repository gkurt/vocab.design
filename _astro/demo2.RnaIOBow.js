import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n={w:434,h:140},r=1400,i=60,a={near:1,mid:2.2,far:5},o={dolly:{t:.45,z:.55,held:!0,note:`Dolly in, zoom out: the front plane holds and the space behind it falls away.`},zoom:{t:-.45,z:1.45,held:!0,note:`Zoom in, dolly out: the front plane holds again and the space behind it looms in.`},plain:{t:0,z:1.45,held:!1,note:`A plain zoom: every plane grows by the same 1.45, so nothing about the depth changes.`}},s=(e,t)=>{let n=o[e];return n.z*(t/(t-n.t))},c=(e,t,n)=>`<span style="flex: 0 0 auto; width: ${e}px; height: ${t}px; border-radius: 3px; background: ${n}"></span>`,l=(e,t,n)=>`
  <div class="sp-row" style="gap: 6px; width: 128px">
    <span style="flex: 0 0 auto; width: 10px; height: 10px; border-radius: 3px; background: var(${n})"></span>
    <span class="sp-label" style="font-size: 11px">${t}</span>
    <span class="sp-label sp-text--ink" data-part="read-${e}" style="margin-left: auto; font-size: 11px; font-variant-numeric: tabular-nums">1.00</span>
  </div>`;function u(u,d){let f=Array.from({length:27},()=>c(12,44,`var(--dz-far)`)).join(``),p=[c(30,82,`var(--dz-mid)`),c(30,82,`var(--dz-mid)`),`<span style="flex: 0 0 auto; width: 130px"></span>`,c(30,82,`var(--dz-mid)`),c(30,82,`var(--dz-mid)`)].join(``);u.innerHTML=`
    <div class="sp-app">
      <div
        class="sp-frame sp-frame--wide"
        style="height: 284px; --dz-near: var(--sp-accent); --dz-mid: var(--sp-muted); --dz-far: var(--sp-line)"
      >
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Camera</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="move" data-axis="Move" data-value="dolly">
            <button class="sp-segment" type="button" data-part="seg-dolly" value="dolly">Dolly in</button>
            <button class="sp-segment" type="button" data-part="seg-zoom" value="zoom">Zoom in</button>
            <button class="sp-segment" type="button" data-part="seg-plain" value="plain">Plain</button>
          </sp-segmented>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 12px">
          <div
            data-part="scene" data-subject data-move="dolly" data-held="yes" data-state="posed"
            style="position: relative; flex: 0 0 auto; width: ${n.w}px; height: ${n.h}px; overflow: hidden;
                   border-radius: 6px; border: 1px solid var(--sp-line);
                   background: linear-gradient(var(--sp-surface), var(--sp-sunken))"
          >
            <div
              data-part="plane-far"
              style="position: absolute; left: 50%; top: 50%; width: 900px; height: 420px; margin: -210px 0 0 -450px;
                     display: flex; align-items: center; justify-content: center; gap: 16px; transform-origin: 50% 50%;
                     will-change: transform"
            >
              ${f}
              <span style="position: absolute; left: 0; right: 0; top: 62%; height: 2px; background: var(--sp-line)"></span>
            </div>

            <div
              data-part="plane-mid"
              style="position: absolute; left: 50%; top: 50%; width: 700px; height: 320px; margin: -160px 0 0 -350px;
                     display: flex; align-items: center; justify-content: center; gap: 26px; transform-origin: 50% 50%;
                     will-change: transform"
            >
              ${p}
              <span style="position: absolute; left: 0; right: 0; top: 68%; height: 3px; background: var(--sp-muted); opacity: 0.45"></span>
            </div>

            <div
              data-part="plane-near"
              style="position: absolute; left: 50%; top: 50%; width: 300px; height: 200px; margin: -100px 0 0 -150px;
                     display: flex; align-items: center; justify-content: center; transform-origin: 50% 50%;
                     will-change: transform"
            >
              <span
                style="display: flex; align-items: center; justify-content: center; width: 104px; height: 66px;
                       border-radius: 8px; background: var(--sp-accent); color: var(--sp-accent-ink);
                       font-size: 12px; font-weight: 600"
              >front plane</span>
            </div>
          </div>

          <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 16px">
            ${l(`near`,`front`,`--dz-near`)}
            ${l(`mid`,`middle`,`--dz-mid`)}
            ${l(`far`,`far`,`--dz-far`)}
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="note" style="flex: 0 0 auto; height: 30px; font-size: 12px; line-height: 1.3">${o.dolly.note}</span>
        </div>
      </div>
    </div>
  `;let m=e(u,`scene`),h=e(u,`note`),g=t(u),_=[{el:e(u,`plane-near`),read:e(u,`read-near`),depth:a.near},{el:e(u,`plane-mid`),read:e(u,`read-mid`),depth:a.mid},{el:e(u,`plane-far`),read:e(u,`read-far`),depth:a.far}],v=`dolly`,y,b,x=(e,t)=>{for(let n of _){let r=e(n.depth);n.el.style.transition=t>0?`transform ${t}ms cubic-bezier(0.4, 0, 0.2, 1)`:`none`,n.el.style.transform=`scale(${r.toFixed(4)})`,n.read.textContent=r.toFixed(2)}},S=()=>{if(d.clearTimeout(y),d.clearTimeout(b),m.dataset.move=v,m.dataset.held=o[v].held?`yes`:`no`,h.textContent=o[v].note,g){x(e=>s(v,e),0),m.dataset.state=`posed`;return}x(()=>1,0),m.dataset.state=`neutral`,y=d.setTimeout(()=>{x(e=>s(v,e),r),m.dataset.state=`moving`,b=d.setTimeout(()=>{m.dataset.state=`posed`},1480)},i)};e(u,`move`).addEventListener(`change`,e=>{v=e.detail,S()}),e(u,`replay`).addEventListener(`click`,S),S()}export{u as mount};