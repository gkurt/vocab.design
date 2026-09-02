function e(e,t){e.innerHTML=`
    <div class="sp-app">
      <div class="sp-window sp-context">
        <div class="sp-heading">Q3 planning notes</div>
        <p class="sp-text">Edited a moment ago</p>
        <div class="sp-row" style="margin-top: 12px">
          <button class="sp-button" data-part="save-button">Save</button>
          <button class="sp-button sp-button--ghost" data-part="share-button">Share</button>
        </div>
      </div>
      <div class="sp-toast" data-part="toast" data-subject role="status">Changes saved</div>
    </div>
  `;let n=e.querySelector(`[data-part=save-button]`),r=e.querySelector(`[data-part=toast]`);if(!n||!r)return;let i;n.addEventListener(`click`,()=>{r.setAttribute(`data-open`,``),t.clearTimeout(i),i=t.setTimeout(()=>r.removeAttribute(`data-open`),2200)})}export{e as mount};