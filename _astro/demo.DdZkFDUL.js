import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=452,n=196,r=8,i=[{key:`lead`,title:`The long way round`,ranked:`1 / 1 / 5 / 3`,flat:`1 / 1 / 4 / 2`,rankedPicture:56,rankedType:16,rankedLines:2},{key:`second-1`,title:`Studio notes`,ranked:`5 / 1 / 7 / 2`,flat:`1 / 2 / 4 / 3`,rankedPicture:18,rankedType:12,rankedLines:0},{key:`second-2`,title:`A shorter route`,ranked:`5 / 2 / 7 / 3`,flat:`1 / 3 / 4 / 4`,rankedPicture:18,rankedType:12,rankedLines:0},{key:`brief-1`,title:`Weather holds`,ranked:`1 / 3 / 3 / 4`,flat:`4 / 1 / 7 / 2`,rankedPicture:0,rankedType:11,rankedLines:1},{key:`brief-2`,title:`Ferries resume`,ranked:`3 / 3 / 5 / 4`,flat:`4 / 2 / 7 / 3`,rankedPicture:0,rankedType:11,rankedLines:1},{key:`brief-3`,title:`Market steady`,ranked:`5 / 3 / 7 / 4`,flat:`4 / 3 / 7 / 4`,rankedPicture:0,rankedType:11,rankedLines:1}],a=30,o=12,s=[{key:`ranked`,label:`ranked`},{key:`flat`,label:`equal tiles`}];function c(c){c.innerHTML=`
    <div class="sp-app" style="gap: 8px">
      <div class="sp-row sp-context" style="width: ${t}px">
        <span class="sp-heading sp-grow" style="font-size: 13px">Front page</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-value="ranked" data-axis="Arrangement" data-term="ranked">
          ${s.map(e=>`
            <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 10px; font-size: 11px; white-space: nowrap">${e.label}</button>`).join(``)}
        </sp-segmented>
      </div>

      <div
        data-part="page"
        style="display: grid; gap: ${r}px; grid-template-rows: repeat(6, 1fr); width: ${t}px; height: ${n}px;
               padding: 8px; background: var(--sp-sunken); border-radius: var(--sp-radius)"
      >${i.map(e=>`
    <article
      data-part="${e.key}"
      ${e.key===`lead`?`data-subject data-rank="lead" data-pose="[data-rank=lead]"`:`class="sp-context"`}
      style="display: flex; flex-direction: column; gap: 4px; min-width: 0; overflow: hidden; padding: 5px 8px;
             background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px"
    >
      <div
        data-part="picture-${e.key}"
        style="flex: 0 0 auto; border-radius: 4px; background: linear-gradient(150deg, var(--sp-accent-soft), var(--sp-accent) 160%)"
      ></div>
      <h3
        data-part="headline-${e.key}"
        style="margin: 0; font-weight: 600; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
      >${e.title}</h3>
      <div data-part="copy-${e.key}" style="display: flex; flex-direction: column; gap: 4px">
        <span class="sp-line" style="width: 96%; height: 5px"></span>
        <span class="sp-line" data-part="extra-${e.key}" style="width: 74%; height: 5px"></span>
      </div>
    </article>`).join(``)}</div>

      <span
        class="sp-text sp-context"
        data-stage-verdict data-part="note"
        role="status"
        style="display: block; width: ${t}px; height: 32px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;let l=e(c,`page`),u=e(c,`lead`),d=e(c,`note`),f=i.map(t=>({item:t,el:e(c,t.key)})),p=t=>{let n=t===`ranked`;l.style.gridTemplateColumns=n?`1fr 1fr 116px`:`repeat(3, 1fr)`;for(let{item:t,el:r}of f){r.style.gridArea=n?t.ranked:t.flat;let i=e(c,`picture-${t.key}`),s=n?t.rankedPicture:a;i.style.display=s>0?`block`:`none`,i.style.height=`${s}px`,e(c,`headline-${t.key}`).style.fontSize=`${n?t.rankedType:o}px`;let l=n?t.rankedLines:1;e(c,`copy-${t.key}`).style.display=l>0?`flex`:`none`,e(c,`extra-${t.key}`).style.display=l>1?`block`:`none`}let r=e=>{let t=e.getBoundingClientRect();return t.width*t.height},i=r(u),s=f.filter(({item:e})=>e.key!==`lead`).map(({el:e})=>r(e)),p=Math.max(...s),m=i/Math.max(p,1);u.dataset.rank=m>1.6?`lead`:`equal`,d.textContent=m>1.6?`The lead takes ${m.toFixed(1)} times the area of the next item, and the biggest headline on the page.`:`Six equal tiles: the same six stories, and nothing left saying which one is the lead.`};e(c,`modes`).addEventListener(`change`,e=>p(e.detail)),p(`ranked`)}export{c as mount};