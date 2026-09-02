import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=[30,46,20,50,35,26],r=50,i=260,a=70;function o(o,s){let c=e=>n.map((t,n)=>`
        <span
          data-part="bar-${e}-${n}"
          style="flex: 1 1 0; height: 0; border-radius: 4px 4px 0 0; background: var(--sp-accent);
                 transition: height 0.2s var(--sp-ease)"
        ></span>`).join(``),l=e=>`
    <div style="display: flex; align-items: flex-end; gap: 10px; height: ${r}px;
                padding: 0 8px; border-bottom: 1px solid var(--sp-line)">
      ${c(e)}
    </div>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-state="rest" style="width: 408px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="run">Run</button>
        </div>

        <div class="sp-stack sp-context" data-part="batched" style="gap: 6px; margin-top: 12px">
          <div class="sp-row sp-row--between">
            <span class="sp-label sp-text--ink">Read all, then write all</span>
            <span class="sp-label" data-part="count-batched" data-count="0" style="flex: 0 0 132px; text-align: right">
              0 forced layouts
            </span>
          </div>
          ${l(`batched`)}
        </div>

        <div class="sp-stack" data-part="thrash" data-subject data-count="0" style="gap: 6px; margin-top: 12px">
          <div class="sp-row sp-row--between">
            <span class="sp-label sp-text--ink">Read, write, read, write</span>
            <span
              class="sp-label"
              data-part="count-thrash"
              data-count="0"
              style="flex: 0 0 132px; text-align: right; color: var(--sp-warn); font-weight: 600"
            >0 forced layouts</span>
          </div>
          ${l(`thrash`)}
        </div>

      </div>
    </div>
  `;let u=e(o,`scene`),d=e(o,`thrash`),f=[],p=(t,n)=>{let r=e(o,`count-${t}`);r.dataset.count=String(n),r.textContent=n===1?`1 forced layout`:`${n} forced layouts`,t===`thrash`&&(d.dataset.count=String(n))},m=(t,r)=>{for(let i=0;i<n.length;i++)e(o,`bar-${t}-${i}`).style.height=`${i<r?n[i]:0}px`},h=()=>{m(`batched`,n.length),m(`thrash`,n.length),p(`batched`,1),p(`thrash`,n.length),u.dataset.state=`settled`},g=e=>{p(`thrash`,e+1),m(`thrash`,e+1),e+1<n.length&&f.push(s.setTimeout(()=>g(e+1),i))},_=()=>{for(let e of f)s.clearTimeout(e);if(f.length=0,t(o)){h();return}m(`batched`,0),m(`thrash`,0),p(`batched`,0),p(`thrash`,0),u.dataset.state=`running`,f.push(s.setTimeout(()=>{p(`batched`,1),m(`batched`,n.length)},450)),f.push(s.setTimeout(()=>g(0),330)),f.push(s.setTimeout(()=>{u.dataset.state=`settled`},a+i*(n.length+1)))};e(o,`run`).addEventListener(`click`,_),_()}export{o as mount};