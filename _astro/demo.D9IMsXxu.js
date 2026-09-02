import{n as e}from"./parts.C-YLuC7Q.js";var t=[12,26,41,55,68,79,90,96,100],n=280;function r(r,i){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-heading sp-context">Import catalog</div>
        <p class="sp-text sp-context" style="margin-top: 2px">products.csv, 12.4 MB</p>
        <div
          class="sp-progress"
          data-part="bar"
          data-subject
          data-state="idle"
          role="progressbar"
          aria-label="Upload"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow="0"
          style="--sp-value: 0%; margin-top: 14px"
        >
          <div class="sp-progress-fill" data-part="fill"></div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px">
          <span class="sp-text" data-part="status">Ready to upload</span>
          <span class="sp-text" data-part="percent" style="min-width: 36px; text-align: right">0%</span>
        </div>
        <div class="sp-row sp-context" style="margin-top: 14px">
          <button class="sp-button" data-part="upload" type="button">Upload</button>
        </div>
      </div>
    </div>
  `;let a=e(r,`bar`),o=e(r,`status`),s=e(r,`percent`),c=e(r,`upload`),l=(e,t,n)=>{a.style.setProperty(`--sp-value`,`${e}%`),a.setAttribute(`aria-valuenow`,String(e)),a.dataset.state=t,s.textContent=`${e}%`,o.textContent=n},u;c.addEventListener(`click`,()=>{i.clearTimeout(u),l(0,`running`,`Uploading`);let e=-1,r=()=>{e+=1;let a=t[e];if(a===void 0)return;let o=e===t.length-1;l(a,o?`done`:`running`,o?`Uploaded`:`Uploading`),o||(u=i.setTimeout(r,n))};u=i.setTimeout(r,n)})}export{r as mount};