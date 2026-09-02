import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=3,r=8,i=[58,84,44,70,52,66,60,54],a=6;function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 452px; height: 294px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Gallery</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="add"
                  style="display: inline-flex; align-items: center; gap: 6px">${t(`plus`)}Add item</button>
        </div>
        <div class="sp-body" style="padding: 12px; overflow: hidden">
          <div data-part="wall" data-subject
               style="display: flex; align-items: flex-start; gap: ${r}px; height: 100%">
            ${Array.from({length:n},(e,t)=>`<div data-part="col-${t+1}" style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: ${r}px"></div>`).join(``)}
          </div>
        </div>
      </div>
    </div>
  `;let s=Array.from({length:n},(t,n)=>e(o,`col-${n+1}`)),c=Array.from({length:n},()=>0),l=0,u=()=>{let e=i[l]??56,t=0;for(let e=1;e<n;e++)(c[e]??0)<(c[t]??0)&&(t=e);l+=1;let a=document.createElement(`div`);a.className=`sp-surface`,a.dataset.part=`item-${l}`,a.dataset.col=String(t+1),a.style.cssText=`flex: 0 0 auto; height: ${e}px; padding: 6px 8px; display: flex; align-items: flex-end`,a.innerHTML=`<span class="sp-label">${l}</span>`,s[t]?.append(a),c[t]=(c[t]??0)+e+(s[t]?.childElementCount===1?0:r)};for(let e=0;e<a;e++)u();e(o,`add`).addEventListener(`click`,()=>{l<i.length&&u()})}export{o as mount};