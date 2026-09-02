import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=`font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12.5px; line-height: 19px`,r={com:`var(--sp-muted)`,key:`#9163d8`,str:`#1f9b8e`,num:`#b07a1e`,fn:`#3f7fe0`,param:`#4f9b3d`,txt:`var(--sp-ink)`},i={com:`font-style: italic`,key:`font-weight: 700`},a=[[[`// only the rows that cleared the floor`,`com`]],[[`export`,`key`],[` `,`txt`],[`function`,`key`],[` `,`txt`],[`passing`,`fn`],[`(`,`txt`],[`rows`,`txt`,`param`],[`, `,`txt`],[`floor`,`txt`,`param`],[`) {`,`txt`]],[[`  `,`txt`],[`const`,`key`],[` kept = `,`txt`],[`rows`,`txt`,`param`],[`.filter((`,`txt`],[`r`,`txt`,`param`],[`) => `,`txt`],[`r`,`txt`,`param`],[`.score >= `,`txt`],[`floor`,`txt`,`param`],[`)`,`txt`]],[[`  `,`txt`],[`const`,`key`],[` note = `,`txt`],[`'nothing dropped'`,`str`]],[[`  `,`txt`],[`if`,`key`],[` (kept.length === `,`txt`],[`0`,`num`],[`) `,`txt`],[`return`,`key`],[` `,`txt`],[`null`,`key`]],[[`  `,`txt`],[`return`,`key`],[` { kept, note }`,`txt`]],[[`}`,`txt`]]],o={line:3,index:3},s={line:2,index:3},c={plain:`No pass. One colour for every run, so the shape has to be read rather than seen.`,syntax:`Lexical pass. A grammar of patterns splits the line into keyword, string, number and name.`,semantic:`Semantic pass. A resolver re-colours the names it knows. Here, the parameters.`},l=`syntax`;function u(u){let d=(e,t,n)=>{let r=[];return t===o.line&&n===o.index&&r.push(`data-part="tok-string" data-subject data-pose="[data-lit]"`),t===s.line&&n===s.index&&r.push(`data-part="tok-name" data-role="name"`),`<span ${r.join(` `)} data-kind="${e[1]}" data-semantic="${e[2]??e[1]}">${e[0]}</span>`};u.innerHTML=`
    <div class="sp-app">
      <div class="sp-stack" style="width: 468px; gap: 9px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Pass" data-part="pass" data-value="${l}">
            <button class="sp-segment" type="button" data-part="seg-plain" value="plain" style="font-size: 11px; padding: 4px 11px">plain</button>
            <button class="sp-segment" type="button" data-part="seg-syntax" value="syntax" style="font-size: 11px; padding: 4px 11px">lexical</button>
            <button class="sp-segment" type="button" data-part="seg-semantic" value="semantic" style="font-size: 11px; padding: 4px 11px">semantic</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="code" data-mode="${l}"
             style="padding: 11px 14px; background: var(--sp-sunken); ${n}; color: var(--sp-ink)">${a.map((e,t)=>`<div style="white-space: pre">${e.map((e,n)=>d(e,t,n)).join(``)}</div>`).join(``)}</div>

        <span class="sp-text sp-text--ink" data-stage-verdict data-part="note" data-mode="${l}" style="font-size: 11px; line-height: 15px"></span>
      </div>
    </div>
  `;let f=e(u,`code`),p=e(u,`note`),m=e(u,`tok-string`),h=e(u,`tok-name`),g=[...f.querySelectorAll(`span[data-kind]`)],_=e=>{for(let t of g){let n=e===`semantic`?t.dataset.semantic:t.dataset.kind,a=e===`plain`?`txt`:n;t.style.cssText=`color: ${r[a]}; ${e===`plain`?``:i[a]??``}`}t(m,`data-lit`,e!==`plain`),h.dataset.role=e===`semantic`?`param`:`name`,f.dataset.mode=e,p.dataset.mode=e,p.textContent=c[e]??``};_(l),e(u,`pass`).addEventListener(`change`,e=>{_(e.detail)})}export{u as mount};