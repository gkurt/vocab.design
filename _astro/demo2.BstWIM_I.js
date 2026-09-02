import{n as e,r as t,t as n}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{n as r}from"./measure.DK7AY2_i.js";var i=444,a=176,o=`Berths are released every Monday at 09:00 and held for 48 hours. Short stay pontoons take a 16 A supply and the outer wall is 32 A only. A season ticket is £1,240 and includes the winter lift out. Everything else, including the deposit and the cancellation window, is set out in the berth application, which the office countersigns on the day you arrive.`,s=[`Monday`,`32`],c=[`£1,240`],l=[`berth`,`application`],u={formatted:`A keyword hunt: isolated fixations, each one on a word that looks different from its neighbours.`,flat:`Unformatted, the same words give the hunt nothing to land on, and it dies after two lines.`},d=e=>{let t=/^(.*?)([.,;:]?)$/.exec(e);return[t?.[1]??e,t?.[2]??``]};function f(f){let p=e=>o.split(` `).map(t=>{let[n,r]=d(t);return e===`flat`?`<span data-part="word">${t}</span>`:s.includes(n)?`<span data-part="word" data-spot style="font-weight: 700">${n}</span>${r}`:c.includes(n)?`<span data-part="word" data-spot style="font-weight: 600; padding: 0 4px; border: 1px solid var(--sp-line); border-radius: 4px; background: var(--sp-sunken)">${n}</span>${r}`:l.includes(n)?`<span data-part="word"${n===`application`?` data-spot`:``} style="font-weight: 500; text-decoration: underline; text-underline-offset: 2px">${n}</span>${r}`:`<span data-part="word">${t}</span>`}).join(` `);f.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour handbook</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Text" data-part="switcher" data-value="formatted">
            <button class="sp-segment" type="button" data-part="seg-formatted" value="formatted">formatted</button>
            <button class="sp-segment" type="button" data-part="seg-flat" value="flat">flat</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="page" style="position: relative; flex: 0 0 auto; width: ${i}px; height: ${a}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div class="sp-context" style="padding: 12px 16px 0">
              <div class="sp-row sp-row--between">
                <span class="sp-heading" style="font-size: 12px">Berthing rules</span>
                <span class="sp-label">page 3 of 7</span>
              </div>
            </div>
            <p class="sp-context" data-part="prose" style="margin: 0; padding: 10px 16px 14px; font-size: 12.5px; line-height: 1.75"></p>
            <div data-part="spray" data-subject style="position: absolute; pointer-events: none"></div>
            <div data-part="stalled" hidden style="position: absolute; pointer-events: none"></div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 40px; max-width: 434px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let m=e(f,`page`),h=e(f,`prose`),g=e(f,`spray`),_=e(f,`stalled`),v=e(f,`readout`),y=(e,t,n)=>{let i=t.map(e=>{let t=r(e,m);return{x:t.left+t.width/2,y:t.top+t.height/2}});if(!i.length)return;let a=n,o=Math.min(...i.map(e=>e.x))-a,s=Math.min(...i.map(e=>e.y))-a,c=Math.max(...i.map(e=>e.x))+a,l=Math.max(...i.map(e=>e.y))+a;e.style.left=`${o}px`,e.style.top=`${s}px`,e.style.width=`${c-o}px`,e.style.height=`${l-s}px`,e.innerHTML=i.map(({x:e,y:t})=>`<span style="position: absolute; left: ${e-o-n/2}px; top: ${t-s-n/2}px; width: ${n}px; height: ${n}px; border-radius: 50%; background: var(--sp-accent); opacity: 0.44"></span>`).join(``)},b=e=>{let n=new Map;for(let e of t(h,`word`)){let t=e.getBoundingClientRect(),r=Math.round(t.top);n.has(r)||n.set(r,e)}return[...n.values()].slice(0,e)},x=e=>{h.innerHTML=p(e),v.textContent=u[e],n(g,`hidden`,e!==`formatted`),n(_,`hidden`,e!==`flat`),e===`formatted`?y(g,[...h.querySelectorAll(`[data-spot]`)],20):y(_,b(2),20)};e(f,`switcher`).addEventListener(`change`,e=>x(e.detail)),x(`formatted`)}export{f as mount};