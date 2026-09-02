import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r=[{key:`rating`,label:`Rating`},{key:`plays`,label:`Play count`},{key:`genre`,label:`Genre`}],i=[{key:`is`,label:`is`},{key:`atleast`,label:`is at least`},{key:`isnot`,label:`is not`}],a=[{genre:`folk`,rating:5,plays:40},{genre:`folk`,rating:5,plays:9},{genre:`dub`,rating:4,plays:22},{genre:`folk`,rating:4,plays:14},{genre:`dub`,rating:4,plays:3},{genre:`jazz`,rating:4,plays:31},{genre:`jazz`,rating:3,plays:18},{genre:`dub`,rating:3,plays:2},{genre:`folk`,rating:2,plays:11},{genre:`jazz`,rating:5,plays:13},{genre:`dub`,rating:1,plays:6},{genre:`folk`,rating:3,plays:27}],o=e=>r.find(t=>t.key===e)?.label??`Choose a field`,s=e=>i.find(t=>t.key===e)?.label??`operator`;function c(c){let l=e=>`
    <div class="sp-menu" data-part="fieldmenu-${e}" role="menu" style="${e===2?`bottom: calc(100% + 4px)`:`top: calc(100% + 4px)`}; left: 0; min-width: 132px; width: 132px; z-index: 3">
      ${r.map(t=>`
        <button class="sp-menu-item" data-part="f-${e}-${t.key}" type="button" style="font-size: 12px">${t.label}</button>`).join(``)}
    </div>`,u=e=>`
    <div class="sp-menu" data-part="opmenu-${e}" role="menu" style="${e===2?`bottom: calc(100% + 4px)`:`top: calc(100% + 4px)`}; left: 0; min-width: 128px; width: 128px; z-index: 3">
      ${i.map(t=>`
        <button class="sp-menu-item" data-part="o-${e}-${t.key}" type="button" style="font-size: 12px">${t.label}</button>`).join(``)}
    </div>`,d=e=>`
    <div class="sp-row" data-part="clause-${e}" style="gap: 6px; height: 30px; ${e===2?`visibility: hidden`:``}">
      <span style="position: relative; flex: 0 0 auto">
        <button
          class="sp-button sp-button--ghost sp-button--sm"
          data-part="field-${e}"
          data-field="none"
          type="button"
          aria-haspopup="true"
          style="display: inline-flex; align-items: center; gap: 6px; width: 132px; height: 28px; padding: 0 9px; font-size: 12px; white-space: nowrap"
        >
          <span class="sp-grow" data-part="field-label-${e}" style="overflow: hidden; text-overflow: ellipsis; text-align: left">Choose a field</span>
          ${n(`chevronDown`)}
        </button>
        ${l(e)}
      </span>
      <span style="position: relative; flex: 0 0 auto">
        <button
          class="sp-button sp-button--ghost sp-button--sm"
          data-part="op-${e}"
          data-op="none"
          type="button"
          aria-haspopup="true"
          style="display: inline-flex; align-items: center; gap: 6px; width: 118px; height: 28px; padding: 0 9px; font-size: 12px; white-space: nowrap"
        >
          <span class="sp-grow" data-part="op-label-${e}" style="overflow: hidden; text-overflow: ellipsis; text-align: left; color: var(--sp-muted)">operator</span>
          ${n(`chevronDown`)}
        </button>
        ${u(e)}
      </span>
      <input
        class="sp-input sp-grow"
        data-part="value-${e}"
        type="text"
        autocomplete="off"
        placeholder="value"
        aria-label="Value for condition ${e}"
        style="height: 28px; padding: 0 9px; font-size: 12px"
      />
      <button class="sp-icon-button" data-part="remove-${e}" type="button" aria-label="Remove this condition" style="flex: 0 0 auto; width: 24px; height: 24px">${n(`close`)}</button>
    </div>`;c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 264px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Smart playlist: Long walks</span>
          <span class="sp-chip" data-part="count" data-hits="12" style="flex: 0 0 auto; padding: 1px 9px; font-size: 11px; cursor: default; white-space: nowrap">12 of 12 match</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div class="sp-surface" style="flex: 0 0 auto; padding: 10px; background: var(--sp-surface)">
            <div data-part="rule" data-subject data-clauses="1" style="display: flex; flex-direction: column; gap: 6px">
              ${d(1)}
              <sp-segmented class="sp-segmented" data-axis="Join" data-part="join" data-value="and" style="align-self: flex-start; visibility: hidden">
                <button class="sp-segment" data-part="join-and" type="button" value="and" style="padding: 2px 10px; font-size: 11px">and</button>
                <button class="sp-segment" data-part="join-or" type="button" value="or" style="padding: 2px 10px; font-size: 11px">or</button>
              </sp-segmented>
              ${d(2)}
            </div>
          </div>

          <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 8px; height: 28px">
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="add" type="button" style="flex: 0 0 auto; white-space: nowrap">Add condition</button>
            <span class="sp-label sp-grow" style="font-size: 10.5px">Saved with the playlist, applied whenever the library changes.</span>
          </div>

          <div class="sp-surface sp-context" style="flex: 1 1 auto; min-height: 0; padding: 8px 10px">
            <span class="sp-text sp-text--ink" data-part="readback" style="display: block; height: 16px; line-height: 16px; font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">Every track in the library.</span>
            <div class="sp-row" data-part="dots" style="gap: 5px; margin-top: 7px">
              ${a.map((e,t)=>`<span data-part="dot-${t}" style="flex: 0 0 auto; width: 10px; height: 10px; border-radius: 50%; background: var(--sp-accent)"></span>`).join(``)}
            </div>
          </div>
        </div>
      </div>

    </div>
  `;let f={1:{field:`none`,op:`none`,value:``,live:!0},2:{field:`none`,op:`none`,value:``,live:!1}},p=e(c,`rule`),m=e(c,`count`),h=e(c,`readback`),g=e(c,`join`),_=()=>{for(let t of[1,2])e(c,`fieldmenu-${t}`).removeAttribute(`data-open`),e(c,`opmenu-${t}`).removeAttribute(`data-open`)},v=e=>e.live&&e.field!==`none`&&e.op!==`none`&&e.value.trim()!==``,y=(e,t)=>{if(t.field===`genre`){let n=t.value.trim().toLowerCase();return t.op===`isnot`?e.genre!==n:e.genre===n}let n=Number(t.value);if(Number.isNaN(n))return!0;let r=t.field===`rating`?e.rating:e.plays;return t.op===`atleast`?r>=n:t.op===`isnot`?r!==n:r===n},b=e=>`${o(e.field)} ${s(e.op)} ${e.value.trim()}`,x=()=>{let t=[f[1],f[2]].filter(v),n=a.map(e=>{if(t.length===0)return!0;if(t.length===1)return y(e,t[0]);let[n,r]=t;return g.value===`or`?y(e,n)||y(e,r):y(e,n)&&y(e,r)}),r=n.filter(Boolean).length;m.dataset.hits=String(r),m.textContent=`${r} of ${a.length} match`;for(let[t,r]of n.entries())e(c,`dot-${t}`).style.background=r?`var(--sp-accent)`:`var(--sp-line)`;h.textContent=t.length===0?`Every track in the library.`:t.map(b).join(` ${g.value} `).concat(`.`)},S=t=>{let n=f[t],r=e(c,`field-${t}`),i=e(c,`op-${t}`);r.dataset.field=n.field,i.dataset.op=n.op,e(c,`field-label-${t}`).textContent=o(n.field);let a=e(c,`op-label-${t}`);a.textContent=n.op===`none`?`operator`:s(n.op),a.style.color=n.op===`none`?`var(--sp-muted)`:`var(--sp-ink)`,e(c,`value-${t}`).value=n.value,x()},C=t=>{f[2].live=t,p.dataset.clauses=t?`2`:`1`,e(c,`clause-2`).style.visibility=t?`visible`:`hidden`,g.style.visibility=t?`visible`:`hidden`,x()};for(let n of[1,2]){e(c,`field-${n}`).addEventListener(`click`,()=>{_(),t(e(c,`fieldmenu-${n}`),`data-open`,!0)}),e(c,`op-${n}`).addEventListener(`click`,()=>{_(),t(e(c,`opmenu-${n}`),`data-open`,!0)});for(let t of r)e(c,`f-${n}-${t.key}`).addEventListener(`click`,()=>{f[n].field=t.key,f[n].op===`none`&&(f[n].op=`is`),_(),S(n)});for(let t of i)e(c,`o-${n}-${t.key}`).addEventListener(`click`,()=>{f[n].op=t.key,_(),S(n)});e(c,`value-${n}`).addEventListener(`input`,e=>{f[n].value=e.target.value,x()}),e(c,`remove-${n}`).addEventListener(`click`,()=>{f[n]={field:`none`,op:`none`,value:``,live:n===1},n===2&&C(!1),S(n)})}e(c,`add`).addEventListener(`click`,()=>{f[2].live||C(!0)}),g.addEventListener(`change`,()=>x()),S(1),S(2)}export{c as mount};