import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=`'Source Serif 4 Variable', Georgia, serif`,r=`0.42em`,i=`0.34em`,a=e=>e===`inline`||e===`hung`,o={inline:`inline: the three lines that begin with a mark start late`,hung:`hung: every line of text starts on the guide`},s=[`The bar shifts a little each`,`winter, and the channel must`,`be sounded again in the spring.`],c=[`soundings taken at low water`,`and the marks moved to suit`];function l(l){let u=(e,t,n)=>`<span ${n} style="display: inline-block; margin-left: -${t}">${e}</span>`;l.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Marks" data-term="hung" data-value="hung" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-inline" value="inline">inline</button>
            <button class="sp-segment" data-part="seg-hung" value="hung">hung</button>
          </sp-segmented>
        </div>
        <div style="position: relative; margin-top: 12px; padding-left: 22px; height: 168px">
          <span data-part="guide" class="sp-context" aria-hidden="true"
                style="position: absolute; left: 22px; top: 0; bottom: 0; width: 2px; background: color-mix(in oklab, var(--sp-accent) 55%, transparent)"></span>
          <div data-part="column" data-hung style="font-family: ${n}; font-size: 18px; line-height: 1.55; white-space: nowrap">
            <div>${u(`&ldquo;`,r,`data-part="quote" data-subject data-pose="[data-hung]" data-hung`)}${s[0]}</div>
            <div>${s[1]}</div>
            <div>${s[2]}&rdquo;</div>
            <div style="height: 10px"></div>
            ${c.map((e,t)=>`<div>${u(`-&nbsp;`,i,`data-part="dash-${t}"`)}${e}</div>`).join(``)}
          </div>
        </div>
        <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="display: block; margin-top: 8px">${o.hung}</span>
      </div>
    </div>
  `;let d=e(l,`column`),f=e(l,`quote`),p=[e(l,`dash-0`),e(l,`dash-1`)],m=e(l,`readout`);e(l,`segmented`).addEventListener(`change`,e=>{let n=e.detail;if(!a(n))return;let s=n===`hung`;t(d,`data-hung`,s),t(f,`data-hung`,s),f.style.marginLeft=s?`-${r}`:`0`;for(let e of p)e.style.marginLeft=s?`-${i}`:`0`;m.textContent=o[n]})}export{l as mount};