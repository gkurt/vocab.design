import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=`Uploaded 214 files, invalidated the cache, live in 41 seconds.`,r=30;function i(i,a){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 384px; height: 214px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Console</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body">
          <p class="sp-text sp-text--ink sp-context" style="margin: 0">$ deploy --env staging</p>
          <p
            class="sp-text sp-text--ink"
            data-part="line"
            data-subject
            aria-label="${n}"
            style="margin: 10px 0 0; height: 46px; line-height: 1.6"
          ><span data-part="typed" aria-hidden="true"></span><span class="sp-caret"></span></p>
          <p class="sp-text sp-context" data-part="prompt" style="margin: 4px 0 0">$</p>
        </div>
      </div>
    </div>
  `;let o=e(i,`line`),s=e(i,`typed`),c,l=()=>{s.textContent=n,o.removeAttribute(`data-typing`),o.setAttribute(`data-done`,``)},u=()=>{if(a.clearTimeout(c),t(i))return l();o.setAttribute(`data-typing`,``),o.removeAttribute(`data-done`),s.textContent=``;let e=()=>{let t=(s.textContent??``).length;if(t>=62)return l();s.textContent=n.slice(0,t+1),c=a.setTimeout(e,r)};e()};e(i,`replay`).addEventListener(`click`,u),u()}export{i as mount};