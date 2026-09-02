import{n as e}from"./parts.C-YLuC7Q.js";var t=`#ffffff`,n=`#404040`,r=`#dfdfdf`,i=`#808080`,a=`#d4d0c8`,o=`#16181c`,s=900;function c(e,a){e.style.borderColor=a?`${t} ${n} ${n} ${t}`:`${n} ${t} ${t} ${n}`,e.style.boxShadow=a?`inset 1px 1px 0 ${r}, inset -1px -1px 0 ${i}`:`inset 1px 1px 0 ${i}, inset -1px -1px 0 ${r}`}function l(n,r){let l=`border-width: 2px; border-style: solid`;n.innerHTML=`
    <div class="sp-app">
      <div data-part="panel" data-subject
           style="width: 296px; padding: 14px; background: ${a}; color: ${o}; font-size: 12px; ${l}">
        <div data-part="emboss"
             style="font-size: 13px; font-weight: 700; letter-spacing: 0.02em; color: #6f6b64; text-shadow: 1px 1px 0 ${t}">
          Appearance
        </div>
        <div data-part="rule" aria-hidden="true"
             style="height: 2px; margin: 8px 0 12px; ${l}; border-width: 1px 0 0 0; border-top-color: ${i}; box-shadow: 0 1px 0 ${t}"></div>

        <div data-part="field" style="padding: 5px 8px; background: #ffffff; ${l}">
          C:\\WINDOWS\\SYSTEM\\SHELL32.DLL
        </div>

        <div style="display: flex; align-items: center; gap: 10px; margin-top: 14px">
          <button data-part="button" type="button"
                  style="padding: 6px 16px; background: ${a}; color: ${o}; font: inherit; font-size: 12px; cursor: pointer; ${l}">
            <span data-part="label" style="display: inline-block">Apply</span>
          </button>
        </div>
      </div>
    </div>
  `;let u=e(n,`panel`),d=e(n,`field`),f=e(n,`button`),p=e(n,`label`);c(u,!0),c(d,!1),c(f,!0);let m;f.addEventListener(`click`,()=>{c(f,!1),p.style.transform=`translate(1px, 1px)`,f.setAttribute(`data-pressed`,``),r.clearTimeout(m),m=r.setTimeout(()=>{c(f,!0),p.style.transform=``,f.removeAttribute(`data-pressed`)},s)})}export{l as mount};