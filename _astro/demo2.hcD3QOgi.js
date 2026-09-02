import{n as e}from"./parts.C-YLuC7Q.js";var t=`ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace`,n=`sysinfo`;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div data-part="terminal" data-subject
           style="position: relative; width: 336px; padding: 14px 16px 16px; border-radius: 6px; background: #08100b; color: #4aff8a; font-family: ${t}; font-size: 13px; line-height: 1.55; text-shadow: 0 0 7px rgb(74 255 138 / 0.45); box-shadow: 0 0 0 1px #1d3a28, 0 10px 26px rgb(0 0 0 / 0.5); overflow: hidden">
        <div style="color: #2f9c5c">SYS/OS 2.1 READY. 32K FREE.</div>
        <div data-part="prompt" style="margin-top: 3px; white-space: pre">&gt; <input
          data-part="command" type="text" spellcheck="false" aria-label="command"
          style="width: 1ch; padding: 0; border: 0; background: transparent; color: inherit; font: inherit; text-shadow: inherit; outline: none; caret-color: transparent"><span
          class="sp-caret sp-caret--block" data-part="caret" aria-hidden="true"></span></div>
        <div data-part="output" style="height: 82px; margin-top: 6px; opacity: 0; transition: opacity 0.2s linear">
          <div>disk ............. OK</div>
          <div>tape ............. OK</div>
          <div style="color: #ffb347">modem ............ NOT FOUND</div>
          <div style="color: #2f9c5c">3 devices checked, 1 fault</div>
        </div>
        <span data-part="scanlines" aria-hidden="true"
              style="position: absolute; inset: 0; pointer-events: none; background-image: repeating-linear-gradient(to bottom, rgb(0 0 0 / 0.32) 0 1px, transparent 1px 3px)"></span>
      </div>
      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 336px; text-align: center">
        One cell per character, one phosphor colour, a block cursor, scanlines over the lot.
      </p>
    </div>
  `;let i=e(r,`command`),a=e(r,`output`),o=()=>{i.style.width=`${Math.max(1,i.value.length)}ch`};i.addEventListener(`input`,o),i.addEventListener(`keydown`,e=>{e.key===`Enter`&&(i.value=n,o(),a.style.opacity=`1`,a.setAttribute(`data-done`,``))})}export{r as mount};