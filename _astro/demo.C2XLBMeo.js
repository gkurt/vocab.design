import{n as e}from"./parts.C-YLuC7Q.js";var t=[{key:`left`,label:`Left`},{key:`center`,label:`Center`},{key:`right`,label:`Right`},{key:`justify`,label:`Justify`}],n=[`display: flex`,`flex-direction: column`,`align-items: center`,`gap: 2px`,`width: 74px`,`padding: 6px 0`,`cursor: pointer`].join(`; `),r=`The ferry leaves at seven, weather permitting, and the harbour master posts any delay on the noticeboard by six.`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Format</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px">
          <div
            class="sp-row sp-surface"
            role="toolbar"
            aria-label="Alignment"
            data-part="toolbar"
            data-subject
            style="gap: 6px; padding: 4px"
          >${t.map(({key:e,label:t},r)=>`
      <div
        class="sp-button sp-button--quiet sp-button--sm"
        role="button"
        aria-label="Align ${t.toLowerCase()}"
        tabindex="${r===0?`0`:`-1`}"
        data-part="item-${e}"
        style="${n}"
      >
        <span>${t}</span>
        <span class="sp-label" data-part="index-${e}" style="width: 100%; text-align: center">${r===0?`0`:`-1`}</span>
      </div>`).join(``)}</div>
          <p class="sp-prose" data-part="sample" data-align="left" style="width: 306px; margin: 0; --sp-measure: 48ch; text-align: left">${r}</p>
        </div>
      </div>
    </div>
  `;let a=e(i,`sample`),o=t.map(({key:t})=>e(i,`item-${t}`)),s=t.map(({key:t})=>e(i,`index-${t}`)),c=0,l=e=>{c=Math.min(Math.max(e,0),o.length-1);for(let[e,t]of o.entries()){let n=e===c;t.tabIndex=n?0:-1;let r=s[e];r&&(r.textContent=n?`0`:`-1`),n?t.setAttribute(`data-sim-focus`,``):t.removeAttribute(`data-sim-focus`)}},u=e=>{let n=t[e];n&&(a.dataset.align=n.key,a.style.textAlign=n.key)};l(0);for(let[e,t]of o.entries())t.addEventListener(`click`,()=>{l(e),u(e)});i.addEventListener(`keydown`,e=>{let{key:t}=e;if(t===`ArrowRight`||t===`ArrowDown`)l(c+1);else if(t===`ArrowLeft`||t===`ArrowUp`)l(c-1);else if(t===`Home`)l(0);else if(t===`End`)l(o.length-1);else if(t===`Enter`||t===` `)u(c);else return;e.preventDefault()})}export{i as mount};