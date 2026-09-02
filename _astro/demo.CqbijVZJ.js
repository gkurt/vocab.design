import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[{key:`starters`,title:`Starters`,count:`4 dishes`,dishes:[{name:`Padrón peppers`,price:`6.00`,note:`Blistered, sea salt, lemon.`},{name:`Bread and butter`,price:`4.50`,note:`Sourdough, cultured butter.`},{name:`Anchovy toast`,price:`7.50`,note:`White anchovy, tomato, chive.`}]},{key:`mains`,title:`Mains`,count:`6 dishes`,dishes:[{name:`Sea bass`,price:`19.00`,note:`Fennel, brown butter, capers.`},{name:`Mushroom orzo`,price:`15.00`,note:`Wild mushrooms, thyme, pecorino.`},{name:`Lamb shoulder`,price:`22.00`,note:`Slow roast, salsa verde, greens.`}]},{key:`desserts`,title:`Desserts`,count:`3 dishes`,dishes:[{name:`Burnt cheesecake`,price:`7.00`,note:`Basque style, sherry cream.`},{name:`Lemon posset`,price:`6.50`,note:`Shortbread, candied peel.`},{name:`Affogato`,price:`5.50`,note:`Espresso, vanilla ice cream.`}]}],r=`display: flex; align-items: center; gap: 8px; width: 100%; padding: 8px 10px; border: 0; border-radius: 6px; background: transparent; font: inherit; text-align: left; cursor: pointer`;function i(i){let a=n.map(e=>`
      <button data-part="cat-${e.key}" type="button" style="${r}">
        <span class="sp-grow" style="min-width: 0">
          <span class="sp-text sp-text--ink" style="display: block; font-size: 13px">${e.title}</span>
          <span class="sp-label" style="display: block; font-size: 10px">${e.count}</span>
        </span>
        ${t(`chevronRight`)}
      </button>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 272px; height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Wren &amp; Co</span>
          <span class="sp-label" style="font-size: 11px">Menu</span>
        </div>
        <div class="sp-body">
          <section class="sp-surface" data-part="stack" data-subject data-depth="0" style="display: flex; flex-direction: column; height: 100%; overflow: hidden">

            <div class="sp-row" style="position: relative; flex: 0 0 auto; gap: 6px; height: 36px; padding: 0 8px; border-bottom: 1px solid var(--sp-line)">
              <span class="sp-heading" data-part="level-title" style="position: absolute; left: 0; right: 0; text-align: center; font-size: 12px">Menu</span>
              <button
                class="sp-button sp-button--quiet sp-button--sm"
                data-part="back"
                type="button"
                style="position: relative; display: inline-flex; align-items: center; gap: 4px; padding: 4px 6px; font-size: 12px; visibility: hidden"
              >
                ${t(`chevronLeft`)}<span data-part="back-label">Menu</span>
              </button>
            </div>

            <div style="position: relative; flex: 1 1 auto; min-height: 0; overflow: hidden">
              <div data-part="track" style="display: flex; width: 300%; height: 100%; transition: transform 0.26s var(--sp-ease)">
                <div data-part="level-0" style="flex: 0 0 33.3333%; padding: 6px">${a}</div>
                <div data-part="level-1" style="flex: 0 0 33.3333%; padding: 6px"></div>
                <div data-part="level-2" style="flex: 0 0 33.3333%; padding: 10px"></div>
              </div>
            </div>

          </section>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="note" style="width: 420px; font-size: 11px; text-align: center">
          One panel, one level at a time. The way back up is the name of the level above.
        </span>
      
    </div>
  `;let o=e(i,`stack`),s=e(i,`track`),c=e(i,`back`),l=e(i,`back-label`),u=e(i,`level-title`),d=e(i,`level-1`),f=e(i,`level-2`),p=n[1],m=p.dishes[0],h=e=>{o.dataset.depth=String(e),s.style.transform=`translateX(-${e*33.3333}%)`,c.style.visibility=e===0?`hidden`:`visible`,l.textContent=e===2?p.title:`Menu`,u.textContent=e===0?`Menu`:e===1?p.title:m.name},g=e=>{m=p.dishes[e],f.innerHTML=`
      <div class="sp-stack" data-part="detail" style="gap: 6px">
        <span class="sp-heading" style="font-size: 14px">${m.name}</span>
        <span class="sp-text" style="font-size: 12px">${m.note}</span>
        <span class="sp-text sp-text--ink" style="font-size: 13px; font-weight: 600; font-variant-numeric: tabular-nums">${m.price}</span>
        <button class="sp-button sp-button--sm" data-part="add" type="button" style="margin-top: 4px">Add to order</button>
      </div>`,h(2)},_=i=>{p=n.find(e=>e.key===i)??p,d.innerHTML=p.dishes.map((e,n)=>`
          <button data-part="dish-${n}" type="button" style="${r}">
            <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 13px">${e.name}</span>
            <span class="sp-text" style="font-size: 12px; font-variant-numeric: tabular-nums">${e.price}</span>
            ${t(`chevronRight`)}
          </button>`).join(``);for(let t=0;t<p.dishes.length;t++)e(d,`dish-${t}`).addEventListener(`click`,()=>g(t));h(1)};for(let t of n)e(i,`cat-${t.key}`).addEventListener(`click`,()=>_(t.key));c.addEventListener(`click`,()=>{let e=Number(o.dataset.depth??0);e>0&&h(e-1)}),h(0)}export{i as mount};