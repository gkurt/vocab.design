import{n as e,t}from"./parts.C-YLuC7Q.js";var n=116,r=[{key:`ridgeline`,name:`Ridgeline`,style:`banner`,art:`linear-gradient(118deg, #123A4B, #1E6F7C 52%, #E4B15C)`,accent:`#F0C273`,line:`Season three, all eight episodes`,items:[]},{key:`kitchen`,name:`Kitchen Table`,style:`sections`,art:`linear-gradient(118deg, #2A1526, #5C2340 60%, #8E4A3C)`,accent:`#EE9B7A`,line:`Continue cooking`,items:[`Braised short rib`,`Sourdough, day four`,`Winter greens`]},{key:`nocturne`,name:`Nocturne Radio`,style:`banner`,art:`linear-gradient(118deg, #191A3C, #3B2F72 55%, #6E7BD4)`,accent:`#AEB7F5`,line:`Tonight: the small hours mix`,items:[]}];function i(i){let a=e=>`
    <div data-part="banner-${e.key}" ${e.style===`banner`?``:`hidden`}
         style="display: flex; flex-direction: column; justify-content: flex-end; height: 100%;
                padding: 14px 18px; gap: 3px">
      <span data-part="banner-title-${e.key}"
            style="font-size: 21px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.01em">${e.name}</span>
      <span style="font-size: 12px; color: rgb(255 255 255 / 0.82)">${e.line}</span>
    </div>`,o=e=>`
    <div data-part="sections-${e.key}" ${e.style===`sections`?``:`hidden`}
         style="display: flex; flex-direction: column; height: 100%; padding: 11px 16px 13px; gap: 7px">
      <span style="font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
                   color: rgb(255 255 255 / 0.72)">${e.line}</span>
      <div class="sp-row" style="gap: 10px; align-items: stretch">
        ${e.items.map((e,t)=>`
          <div data-part="item-${t}"
               style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; justify-content: flex-end;
                      height: 64px; padding: 7px 9px; border-radius: 5px; background: rgb(255 255 255 / 0.14);
                      box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.2)">
            <span style="font-size: 10.5px; font-weight: 500; color: #FFFFFF; overflow: hidden;
                         text-overflow: ellipsis; white-space: nowrap">${e}</span>
          </div>`).join(``)}
      </div>
    </div>`;i.innerHTML=`
    <div class="sp-app" style="gap: 8px">
      <div class="sp-frame sp-frame--wide" data-part="screen" tabindex="0" role="application"
           aria-label="Television home screen"
           style="height: 250px; background: #0B0D12; border-color: #262B36; padding: 13px 0 0">
        <div data-part="shelf" data-subject data-app="${r[0].key}"
             style="flex: 0 0 auto; height: ${n}px; margin: 0 13px; border-radius: 8px;
                    background: ${r[0].art}; overflow: hidden;
                    box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.16)">
          ${r.map(e=>e.style===`banner`?a(e):o(e)).join(``)}
        </div>

        <div class="sp-context" style="flex: 1 1 auto; min-height: 0; padding: 0 13px">
          <div class="sp-row sp-row--between" style="height: 26px">
            <span data-part="row-label" style="font-size: 10px; letter-spacing: 0.07em; text-transform: uppercase;
                                               color: rgb(232 234 239 / 0.5)">Apps</span>
            <span style="font-size: 10px; color: rgb(232 234 239 / 0.5)">9:41</span>
          </div>
          <div class="sp-row" data-part="tiles" style="gap: 14px">
            ${r.map((e,t)=>`
    <div class="sp-row" data-part="tile-${t}" ${t===0?`data-focused`:``}
         style="flex: 0 0 auto; width: 104px; height: 62px; padding: 0 10px; border-radius: 8px;
                background: ${e.art}; outline: 3px solid transparent; outline-offset: 3px;
                transition: outline-color 0.16s var(--sp-ease)">
      <span style="font-size: 11px; font-weight: 600; color: #FFFFFF; line-height: 1.2">${e.name}</span>
    </div>`).join(``)}
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption"
         style="max-width: 458px; margin: 0; text-align: center; font-size: 10px">
        The remote moves along the row and the band follows: a poster for two of these apps, and rows you can
        open directly for the third.
      </p>
    </div>
  `;let s=e(i,`shelf`),c=r.map((t,n)=>e(i,`tile-${n}`)),l=0,u=()=>{let e=r[l];if(e){s.dataset.app=e.key,s.style.background=e.art,s.style.boxShadow=`inset 0 0 0 1px ${e.accent}59`;for(let t of r){let n=i.querySelector(`[data-part=${t.style===`banner`?`banner`:`sections`}-${t.key}]`);n&&(n.hidden=t.key!==e.key)}for(let[n,r]of c.entries())r.style.outlineColor=n===l?e.accent:`transparent`,t(r,`data-focused`,n===l)}},d={ArrowRight:1,ArrowLeft:-1};e(i,`screen`).addEventListener(`keydown`,e=>{let t=d[e.key];t!==void 0&&(e.preventDefault(),l=Math.min(Math.max(l+t,0),r.length-1),u())}),u()}export{i as mount};