import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[`12:04:01  resolve   registry, 84 packages`,`12:04:02  link      node_modules`,`12:04:04  compile   src/index.ts`,`12:04:05  compile   src/router.ts`,`12:04:06  compile   src/kit/tokens.css`,`12:04:08  bundle    entry chunk 41.2 kB`,`12:04:09  bundle    vendor chunk 88.7 kB`,`12:04:11  minify    entry chunk`,`12:04:12  minify    vendor chunk`,`12:04:14  emit      dist/index.html`,`12:04:15  emit      dist/assets/app.js`,`12:04:16  done      built in 15.4s`],r={focusable:[`field`,`log`,`copy`],plain:[`field`,`copy`]},i={field:`Filter field`,log:`Log output, scrollable`,copy:`Copy log button`},a={focusable:`One tabindex made the scroller a stop of its own, so the arrow keys reach the twelve lines a wheel already could.`,plain:`Tab goes straight from the field to the button. Nothing inside the log is focusable, so most of its rows can never be read by keyboard.`},o=26,s=3;function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Log pane" data-term="focusable" data-value="focusable" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-focusable" value="focusable">Focusable</button>
            <button class="sp-segment" data-part="seg-plain" value="plain">Not focusable</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" style="margin-top: 8px; padding: 7px 10px">
          <div class="sp-context">
            <input class="sp-input" data-part="field" type="text" value="warn" readonly aria-label="Filter"
                   style="font-size: 12px; padding: 4px 8px" />
          </div>

          <div class="sp-scroll" data-part="log" data-subject data-pose="[data-focusable]" data-focusable
               data-scrolled="0" tabindex="0" role="region" aria-label="Build log"
               style="margin-top: 7px; height: 52px; padding: 5px 8px; background: var(--sp-sunken);
                      border: 1px solid var(--sp-line); border-radius: 6px">
            ${n.map(e=>`<div class="sp-text" style="font-size: 10.5px; line-height: 1.45; white-space: nowrap">${e}</div>`).join(``)}
          </div>

          <div class="sp-row sp-row--between sp-context" style="margin-top: 7px; gap: 10px">
            <span class="sp-label" data-part="ti" data-ti="0" style="flex: 0 0 auto; font-size: 10px; white-space: nowrap">tabindex="0"</span>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="copy">Copy log</button>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; gap: 10px">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="tab">Press Tab</button>
          <span class="sp-text sp-text--ink" data-part="where" data-at="field"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${i.field}</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="focusable"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${a.focusable}</p>
      </div>
    </div>
  `;let l=e(c,`log`),u=e(c,`field`),d=e(c,`copy`),f=e(c,`ti`),p=e(c,`where`),m=e(c,`caption`),h=`focusable`,g=0,_=0,v=()=>{let e=r[h],n=e[g]??e[0]??`field`;t(u,`data-sim-focus`,n===`field`),t(l,`data-sim-focus`,n===`log`),t(d,`data-sim-focus`,n===`copy`),p.dataset.at=n,p.textContent=i[n]??``},y=e=>{h=e,g=0,_=0,l.scrollTop=0,l.dataset.scrolled=`0`;let n=e===`focusable`;t(l,`data-focusable`,n),n?l.tabIndex=0:l.removeAttribute(`tabindex`),f.dataset.ti=n?`0`:`none`,f.textContent=n?`tabindex="0"`:`no tabindex`,m.dataset.mode=e,m.textContent=a[e],v()};y(`focusable`),e(c,`tab`).addEventListener(`click`,()=>{g=Math.min(g+1,r[h].length-1),v()}),l.addEventListener(`keydown`,e=>{let t=e.key;(t===`ArrowDown`||t===`ArrowUp`)&&r[h][g]===`log`&&(e.preventDefault(),_=Math.min(Math.max(_+(t===`ArrowDown`?1:-1),0),s),l.scrollTop=_*o,l.dataset.scrolled=String(_))}),e(c,`segmented`).addEventListener(`change`,e=>{y(e.detail)})}export{c as mount};