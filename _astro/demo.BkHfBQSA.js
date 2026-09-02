import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{n as r}from"./measure.DK7AY2_i.js";var i=[{key:`ada`,name:`Ada Lovelace`},{key:`marco`,name:`Marco Diaz`},{key:`priya`,name:`Priya Raman`}],a=196,o=8;function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 290px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Team</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <ul class="sp-list sp-grow" data-part="members">${i.map(e=>`
      <li class="sp-list-item" data-part="row-${e.key}">
        <span class="sp-grow">${e.name}</span>
        <button class="sp-icon-button" data-part="remove-${e.key}" aria-label="Remove ${e.name}">${n(`trash`)}</button>
      </li>`).join(``)}</ul>
          <span class="sp-text" data-part="count" role="status">3 members</span>
        </div>
        <div
          class="sp-popover"
          data-part="popconfirm"
          data-subject
          role="dialog"
          aria-labelledby="pc-question"
          style="width: ${a}px; padding: 10px"
        >
          <span class="sp-text sp-text--ink" id="pc-question" data-part="question">Remove this member?</span>
          <div class="sp-row" style="justify-content: flex-end; margin-top: 10px">
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="cancel">Cancel</button>
            <button class="sp-button sp-button--sm" data-part="confirm">Remove</button>
          </div>
        </div>
      </div>
    </div>
  `;let c=s.querySelector(`.sp-frame`),l=e(s,`popconfirm`),u=e(s,`question`),d=e(s,`count`),f=e(s,`members`),p,m=e=>{let t=r(e,c),n=t.left+t.width/2,i=Math.min(Math.max(n-a+26,o),c.offsetWidth-a-o);l.style.left=`${i}px`,l.style.top=`${t.top+t.height+8}px`,l.style.setProperty(`--sp-arrow-x`,`${n-i-4}px`)},h=e=>{t(l,`data-open`,e),e||(p=void 0)},g=t=>{p=t,u.textContent=`Remove ${t.name} from the project?`,m(e(s,`remove-${t.key}`)),h(!0)},_=()=>{p&&(e(s,`row-${p.key}`).remove(),d.textContent=`${f.children.length} members`,h(!1))};for(let t of i)e(s,`remove-${t.key}`).addEventListener(`click`,()=>g(t));e(s,`confirm`).addEventListener(`click`,_),e(s,`cancel`).addEventListener(`click`,()=>h(!1)),s.addEventListener(`pointerdown`,e=>{let t=e.target;t&&l.contains(t)||t?.closest(`[data-part^="remove-"]`)||h(!1)}),s.addEventListener(`keydown`,e=>{e.key===`Escape`&&h(!1)})}export{s as mount};