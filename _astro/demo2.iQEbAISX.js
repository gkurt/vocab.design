import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=190,n=78,r=`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${n}" viewBox="0 0 ${t} ${n}">
     <rect width="${t}" height="${n}" fill="#2F3A57"/>
     <circle cx="46" cy="40" r="24" fill="#7C89AB"/>
     <rect x="82" y="26" width="86" height="9" rx="4" fill="#9AA6C4"/>
     <rect x="82" y="43" width="60" height="9" rx="4" fill="#6F7C9D"/>
   </svg>`)}`,i=`data:image/png;base64,AAAAAAAAAAAA`,a=`Spring sale: 20% off`,o={blocked:`One fallback kept the box and the weight the picture had. The other collapsed to a line of body copy.`,loaded:`With the pictures in place the two blocks are indistinguishable, which is the whole trap.`};function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 440px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="blocked" data-axis="Images" data-term="blocked">
            <button class="sp-segment" data-part="seg-blocked" value="blocked">Blocked</button>
            <button class="sp-segment" data-part="seg-loaded" value="loaded">Fetched</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 11px; align-items: flex-start">
          <div class="sp-stack" style="flex: 0 0 ${t}px; gap: 5px">
            <div data-part="styled-slot" style="width: ${t}px; height: ${n}px">
              <img
                data-part="styled"
                data-subject
                data-pose="[data-state=blocked]"
                data-state="blocked"
                src="${i}"
                alt="${a}"
                width="${t}"
                height="${n}"
                style="display: block; width: ${t}px; height: ${n}px; overflow: hidden; object-fit: cover;
                       border-radius: 6px; background: #DDE4F6; color: #23408F;
                       font-size: 15px; font-weight: 700; line-height: ${n}px; text-align: center"
              />
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 0 0 ${t}px; gap: 5px">
            <div data-part="plain-slot" style="width: ${t}px; height: ${n}px">
              <img data-part="plain" data-state="blocked" src="${i}" alt="${a}" />
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 10px 0 0; height: 32px; font-size: 12px; line-height: 1.35">${o.blocked}</p>
      </div>
    </div>
  `;let c=e(s,`styled`),l=e(s,`plain`),u=e(s,`note`),d=e=>{let t=e!==`loaded`,n=t?`blocked`:`loaded`;for(let e of[c,l])e.dataset.state=n,e.src=t?i:r;u.textContent=o[n]??``};e(s,`segmented`).addEventListener(`change`,e=>d(e.detail))}export{s as mount};