import{n as e}from"./parts.C-YLuC7Q.js";var t=900;function n(n,r){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-context" aria-hidden="true" data-part="grid"
           style="position: absolute; inset: 0; background-image: repeating-linear-gradient(to right, rgb(128 128 128 / 0.16) 0 1px, transparent 1px 28px), repeating-linear-gradient(to bottom, rgb(128 128 128 / 0.16) 0 1px, transparent 1px 28px)"></div>
      <div class="sp-brutal" data-part="card" data-subject style="position: relative; width: 296px; padding: 18px">
        <div style="font-size: 21px; font-weight: 800; letter-spacing: -0.01em">WEEKLY DROP</div>
        <p style="font-size: 13px; line-height: 1.45; margin: 8px 0 0">
          Six links, one build note, no filler. Sent every Thursday.
        </p>
        <button class="sp-brutal" data-part="button" type="button"
                style="margin-top: 16px; padding: 9px 16px; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer; --sp-brutal-fill: #7cf0b4">
          SIGN ME UP
        </button>
        <div data-part="status" style="min-height: 18px; margin-top: 10px; font-size: 12px; font-weight: 600">
          Free, and one click to leave.
        </div>
      </div>
    </div>
  `;let i=e(n,`button`),a=e(n,`status`),o;i.addEventListener(`click`,()=>{a.textContent=`On the list. See you Thursday.`,i.setAttribute(`data-pressed`,``),r.clearTimeout(o),o=r.setTimeout(()=>i.removeAttribute(`data-pressed`),t)})}export{n as mount};