import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`#f4f5f7`,n=`#23262b`,r=`#dfe1e6`,i=`#9aa0a8`,a=`#3557e8`,o={solid:{inset:-4,width:2,colour:a,thickness:`2 px`,change:`5.2:1`,verdict:`Passes 2.4.13`,caption:`Two pixels thick, drawn clear of the control, and 5.2:1 against the page colour it covers. That is every part of the criterion answered.`},thin:{inset:-4,width:1,colour:`#aab8f2`,thickness:`1 px`,change:`1.8:1`,verdict:`Fails 2.4.13`,caption:`One pixel is thinner than the criterion allows in any direction, and a pale tint of the same blue changes the page by only 1.8:1.`},recolour:{inset:0,width:2,colour:a,thickness:`2 px`,change:`2.2:1`,verdict:`Fails 2.4.13`,caption:`The indicator sits on the two pixels the border already occupied, so no area was added. Grey to blue measures 2.2:1, under the 3:1 the change itself owes.`}},s=[{key:`thickness`,label:`Thickness, needs 2 px`},{key:`change`,label:`Change from unfocused, needs 3:1`},{key:`verdict`,label:`Focus Appearance (2.4.13)`}];function c(a){let c=(e,t,n)=>`
    <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 2px">
      <span class="sp-label" style="font-size: 9.5px; line-height: 1.25; height: 24px">${t}</span>
      <span class="sp-text sp-text--ink" data-part="${e}" data-treatment="solid"
            style="font-size: 12px; font-weight: 500; white-space: nowrap">${n}</span>
    </div>`,l=o.solid;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="treatment" data-value="solid" data-axis="Indicator" data-term="solid">
            <button class="sp-segment" type="button" data-part="seg-solid" value="solid"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Solid 2 px</button>
            <button class="sp-segment" type="button" data-part="seg-thin" value="thin"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Thin, pale</button>
            <button class="sp-segment" type="button" data-part="seg-recolour" value="recolour"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Recolour</button>
          </sp-segmented>
        </div>

        <div data-part="panel"
             style="margin-top: 10px; height: 96px; display: flex; align-items: center; justify-content: center;
                    border-radius: 8px; background: ${t}; color: ${n}">
          <span style="position: relative; display: inline-flex">
            <button type="button" data-part="control" data-sim-focus
                    style="appearance: none; font: inherit; font-size: 14px; font-weight: 500; outline: none;
                           width: 136px; height: 40px; border-radius: 8px; cursor: default;
                           border: 2px solid ${i}; background: ${r}; color: ${n}">Publish</button>
            <span data-part="ring" data-subject data-pose="[data-treatment=solid]" data-treatment="solid"
                  style="position: absolute; inset: ${l.inset}px; border-radius: 10px;
                         border: ${l.width}px solid ${l.colour}"></span>
          </span>
        </div>

        <div class="sp-row sp-context" style="margin-top: 9px; height: 44px; gap: 12px; align-items: stretch">
          ${s.map(e=>c(e.key,e.label,l[e.key])).join(``)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-treatment="solid"
           style="margin: 7px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${l.caption}</p>
      </div>
    </div>
  `;let u=e(a,`ring`),d=e(a,`caption`),f=t=>{let n=o[t];u.dataset.treatment=t,u.style.inset=`${n.inset}px`,u.style.borderWidth=`${n.width}px`,u.style.borderColor=n.colour,u.style.borderRadius=n.inset===0?`8px`:`10px`;for(let r of s){let i=e(a,r.key);i.dataset.treatment=t,i.textContent=n[r.key]}d.dataset.treatment=t,d.textContent=n.caption};e(a,`treatment`).addEventListener(`change`,e=>{f(e.detail)}),f(`solid`)}export{c as mount};