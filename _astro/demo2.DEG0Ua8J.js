import{n as e}from"./parts.C-YLuC7Q.js";var t=`Georgia, 'Liberation Serif', 'Nimbus Roman', serif`,n=`He said "it's fine."`,r=/[‘’“”]/,i=new Set([``,` `,`
`,`(`,`[`,`{`]);function a(e){return e.replace(/[‘’]/g,`'`).replace(/[“”]/g,`"`)}function o(e){let t=``;for(let n=0;n<e.length;n++){let r=e[n]??``;if(r!==`"`&&r!==`'`){t+=r;continue}let a=i.has(e[n-1]??``);t+=r===`"`?a?`“`:`”`:a?`‘`:`’`}return t}function s(e){return[...e].map(e=>{let t=e===`&`?`&amp;`:e===`<`?`&lt;`:e===`>`?`&gt;`:e;return e===`"`||e===`'`||r.test(e)?`<span style="color: var(--sp-accent)">${t}</span>`:t}).join(``)}function c(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 438px">
        <div class="sp-row sp-context" style="gap: 8px">
          <span class="sp-grow">
            <input class="sp-input" data-part="editor" type="text" aria-label="Editor with smart quotes on"
                   style="font-family: ${t}; font-size: 14px" />
          </span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="clear" type="button">Clear</button>
        </div>
        <div class="sp-stack sp-context" style="gap: 2px; margin-top: 16px">
          <span class="sp-label">keys pressed</span>
          <div class="sp-row" style="height: 30px">
            <span data-part="raw" style="font-family: ${t}; font-size: 19px; white-space: nowrap"></span>
          </div>
        </div>
        <div class="sp-stack" style="gap: 2px; margin-top: 10px">
          <span class="sp-label sp-context">as stored</span>
          <div class="sp-row" style="height: 30px">
            <span data-part="stored" data-subject data-quotes="none"
                  style="font-family: ${t}; font-size: 19px; white-space: nowrap"></span>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 12px">
          Four marks, not one: the opening pair leans into the quotation and the closing pair leans out of
          it. The apostrophe is the closing single quote, the same character in a different job.
        </p>
      </div>
    </div>
  `;let c=e(i,`editor`),l=e(i,`raw`),u=e(i,`stored`),d=()=>{let e=a(c.value),t=o(e);c.value=t,l.innerHTML=s(e),u.innerHTML=s(t),u.dataset.quotes=r.test(t)?`curly`:`none`};c.addEventListener(`input`,d),e(i,`clear`).addEventListener(`click`,()=>{c.value=``,d()}),c.value=n,d()}export{c as mount};