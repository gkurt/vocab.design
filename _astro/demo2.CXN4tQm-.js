import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=140,r=110,i=[{part:`node-svg`,tag:`svg`,indent:14,role:`graphic`},{part:`node-strong`,tag:`strong`,indent:14,role:`text`},{part:`node-ul`,tag:`ul`,indent:14,role:`list`},{part:`node-li-1`,tag:`li`,indent:28,role:`listitem`},{part:`node-li-2`,tag:`li`,indent:28,role:`listitem`}],a=`Archive 3 messages Frees 40 MB`,o={authored:`Six elements, each with a role of its own: a graphic, a run of text, a list and two list items inside one button.`,computed:`The button flattens them. Five roles are gone, their text swept into the one name the button announces, in document order.`};function s(s,c){let l=(e,t,n,r)=>`
    <div data-part="${e}" style="display: grid; grid-template-columns: 108px 1fr; align-items: baseline;
                                    height: 13px; transition: opacity 0.2s ease">
      <span style="padding-left: ${n}px; font-size: 11px; font-weight: 500">${t}</span>
      <span data-part="${e}-role" class="sp-label" style="font-size: 10.5px">${r}</span>
    </div>`;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 484px; padding: 12px 14px">
        <button class="sp-button sp-button--ghost sp-context" type="button" data-part="control"
                style="display: inline-flex; align-items: center; justify-content: flex-start; gap: 9px;
                       width: 100%; height: 32px; padding: 0 12px">
          ${t(`inbox`)}
          <strong style="font-weight: 600; font-size: 12.5px">Archive</strong>
          <ul style="display: flex; gap: 10px; list-style: none; margin: 0; padding: 0;
                     font-size: 11px; color: var(--sp-muted)">
            <li>3 messages</li>
            <li>Frees 40 MB</li>
          </ul>
        </button>

        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 8px 10px">
          <div class="sp-row" style="gap: 10px">
            <span class="sp-label" style="flex: 0 0 auto">Accessibility tree</span>
            <span class="sp-grow"></span>
            <span class="sp-label" data-part="nodes" data-mode="authored"
                  style="flex: 0 0 auto; width: 104px; text-align: right; font-size: 10px; white-space: nowrap">6 nodes</span>
            <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-axis="View" data-value="authored" style="flex: 0 0 auto">
              <button class="sp-segment" type="button" data-part="seg-authored" value="authored"
                      style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Authored</button>
              <button class="sp-segment" type="button" data-part="seg-computed" value="computed"
                      style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Computed</button>
            </sp-segmented>
          </div>

          <div data-part="tree" data-mode="authored" style="margin-top: 7px; display: flex; flex-direction: column; gap: 0">
            ${l(`node-button`,`button`,0,`button`)}
            ${i.map(e=>l(e.part,e.tag,e.indent,e.role)).join(``)}
          </div>
        </div>

                  <p class="sp-text sp-text--ink" data-stage-announce data-part="utterance"
             style="margin: 4px 0 0; height: 22px; line-height: 22px; font-size: 12px; white-space: nowrap">
            “<span data-part="name" data-subject style="font-weight: 600">${a}</span>, button”</p>
        

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="authored"
           style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${o.authored}</p>
      </div>
    </div>
  `;let u=e(s,`tree`),d=e(s,`nodes`),f=e(s,`caption`),p=i.map(t=>({row:e(s,t.part),role:e(s,`${t.part}-role`),authored:t.role})),m=e(s,`node-button-role`),h=[],g=e=>{for(let e of h)c.clearTimeout(e);if(h=[],u.dataset.mode=e,f.dataset.mode=e,f.textContent=o[e],e===`authored`){m.textContent=`button`;for(let{row:e,role:t,authored:n}of p)e.style.opacity=`1`,t.textContent=n;d.dataset.mode=`authored`,d.textContent=`6 nodes`;return}m.textContent=`button, name from contents`,p.forEach(({row:e,role:t},i)=>{h.push(c.setTimeout(()=>{e.style.opacity=`0.5`,t.textContent=`presentational`},n+i*r))}),h.push(c.setTimeout(()=>{d.dataset.mode=`computed`,d.textContent=`1 node, 5 flattened`},n+(p.length-1)*r))};e(s,`mode`).addEventListener(`change`,e=>{g(e.detail)})}export{s as mount};