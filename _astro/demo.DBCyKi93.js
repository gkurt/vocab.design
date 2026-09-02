import{n as e}from"./parts.C-YLuC7Q.js";var t=`font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px`,n=19,r=5,i=`Ctrl+Shift+K`,a=`Ctrl+D`,o=[`const rows = load();`,`const total = sum(rows);`,`report(total);`,`return total;`],s=1,c=new Set([`Control`,`Shift`,`Alt`,`Meta`]),l=e=>`
  <span
    class="sp-kbd"
    data-part="cap-${e}"
    style="min-width: 48px; height: 24px; font-size: 12px"
  ></span>
  <span class="sp-label" data-part="plus-${e}" style="font-size: 12px">+</span>`;function u(u){u.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 272px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Editor</span>
          <span class="sp-text" data-part="readout" style="width: 336px; text-align: right; white-space: nowrap">No chord pressed yet</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div
            class="sp-surface"
            data-part="chord"
            data-subject
            data-state="none"
            style="display: flex; flex-direction: column; gap: 8px; padding: 10px 12px"
          >
            <div class="sp-row" style="gap: 6px">
              ${l(1)}${l(2)}
              <span class="sp-kbd" data-part="cap-3" style="min-width: 48px; height: 24px; font-size: 12px"></span>
              <span class="sp-grow"></span>
              <span
                class="sp-text sp-text--ink"
                data-stage-verdict data-part="verdict"
                style="width: 214px; text-align: right; white-space: nowrap; font-size: 12px"
              >Nothing held</span>
            </div>
          </div>

          <div
            class="sp-surface sp-context"
            data-part="editor"
            data-lines="4"
            style="height: 115px; padding: 10px 12px; overflow: hidden"
          ></div>

          <div class="sp-row sp-context" style="gap: 14px">
            <span class="sp-label"><span class="sp-kbd">Ctrl</span> <span class="sp-kbd">Shift</span> <span class="sp-kbd">K</span> delete line</span>
            <span class="sp-label"><span class="sp-kbd">Ctrl</span> <span class="sp-kbd">D</span> duplicate line</span>
          </div>
        </div>
      </div>
    </div>
  `;let d=e(u,`chord`),f=e(u,`editor`),p=e(u,`verdict`),m=e(u,`readout`),h=[...o],g=s,_=!1,v=()=>{f.dataset.lines=String(h.length),f.innerHTML=h.map((e,r)=>`
        <div
          ${r===g?`data-sim-focus`:``}
          style="display: flex; gap: 10px; height: ${n}px; align-items: center; border-radius: 3px; ${t}"
        >
          <span class="sp-label" style="width: 12px; text-align: right; ${t}">${r+1}</span>
          <span>${e}</span>
          ${r===g?`<span class="sp-caret"></span>`:``}
        </div>`).join(``)},y=(t,n)=>{for(let r of[1,2,3]){let i=e(u,`cap-${r}`),a=t[r-1];i.textContent=a??``,i.style.visibility=a?`visible`:`hidden`,i.style.background=n&&a?`var(--sp-accent-soft)`:``,i.style.borderColor=n&&a?`var(--sp-accent)`:``,i.style.color=n&&a?`var(--sp-ink)`:``,r<3&&(e(u,`plus-${r}`).style.visibility=t[r]?`visible`:`hidden`)}},b=(e,t,n,r)=>{d.dataset.state=e,y(t,!0),p.textContent=n,m.textContent=r},x=e=>{let t=[e.ctrlKey&&`Ctrl`,e.shiftKey&&`Shift`,e.altKey&&`Alt`].filter(Boolean),n=e.key.length===1?e.key.toUpperCase():e.key;return[...t,n].join(`+`)};u.addEventListener(`keydown`,e=>{let t=x(e);if(t===a)return _=!1,h.length<r&&(h=[...h.slice(0,g+1),h[g]??``,...h.slice(g+1)],g+=1),v(),b(`duplicated`,[`Ctrl`,`D`],`fired once, on the D`,`${a} duplicated the line`);if(t===i)return _=!1,h.length>1&&(h=h.filter((e,t)=>t!==g),g=Math.min(g,h.length-1)),v(),b(`deleted`,[`Ctrl`,`Shift`,`K`],`fired once, on the K`,`${i} deleted the line`);if(c.has(e.key))return _=!0,b(`modifier`,[e.key===`Control`?`Ctrl`:e.key],`a modifier, not a command`,`Ctrl down on its own: nothing to fire yet`);if(_&&e.key.length===1&&!e.ctrlKey&&!e.shiftKey&&!e.altKey)return _=!1,b(`sequence`,[e.key.toUpperCase()],`arrived alone: a sequence`,`Ctrl was up already: a sequence, not a chord`);_=!1,b(`stray`,[t],`not bound to anything`,`${t} is not a chord this editor answers`)}),y([`Ctrl`,`Shift`,`K`],!1),v()}export{u as mount};