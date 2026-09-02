import{n as e,t}from"./parts.C-YLuC7Q.js";function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 380px; height: 220px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Maintenance report</span>
          <span class="sp-text">Draft</span>
        </div>
        <div class="sp-body">
          <div class="sp-field">
            <label class="sp-label sp-context" for="vd-textarea-note">What happened?</label>
            <textarea
              class="sp-input"
              id="vd-textarea-note"
              data-part="box"
              data-subject
              rows="3"
              spellcheck="false"
              placeholder="Describe the problem in as much detail as you need"
              style="height: 75px; line-height: 1.55; resize: vertical"
            ></textarea>
          </div>
          <div class="sp-row sp-row--between sp-context" style="margin-top: 10px">
            <span class="sp-text" data-part="measure"></span>
            <button class="sp-button sp-button--sm" data-part="post" type="button">Post</button>
          </div>
        </div>
      </div>
    </div>
  `;let r=e(n,`box`),i=e(n,`measure`),a=r.offsetHeight,o=()=>{let e=r.offsetHeight===a,n=r.scrollHeight>r.clientHeight+1;t(i,`data-steady`,e),t(i,`data-overflow`,n),i.textContent=e?`Box ${a}px. ${n?`Text scrolls.`:`Text fits.`}`:`Box ${r.offsetHeight}px, resized.`};r.addEventListener(`input`,()=>{r.scrollTop=r.scrollHeight,o()}),e(n,`post`).addEventListener(`click`,()=>{r.value=``,r.scrollTop=0,o()}),o()}export{n as mount};