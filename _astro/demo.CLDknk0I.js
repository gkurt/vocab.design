import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=400,r=152,i=4800,a=`scale(1.1) translate(2%, 1.5%)`,o=`scale(1.26) translate(-2%, -1.5%)`;function s(s,c){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-state="rest" style="width: 440px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Slideshow</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>

        <div
          data-part="photo"
          data-subject
          style="position: relative; width: ${n}px; height: ${r}px; margin-top: 12px; overflow: hidden;
                 border-radius: var(--sp-radius); border: 1px solid var(--sp-line)"
        >
          <div
            data-part="plate"
            aria-hidden="true"
            style="position: absolute; inset: 0; transform-origin: 62% 40%; transform: ${a};
                   background:
                     radial-gradient(circle at 62% 38%, rgb(255 244 206 / 0.95) 0 5%, rgb(255 220 150 / 0.55) 6%, transparent 26%),
                     linear-gradient(180deg, #a9cbe8 0%, #cfd9e6 44%, #f0cfa0 66%, #e0a86f 100%)"
          >
            <div style="position: absolute; left: -12%; bottom: 8%; width: 78%; height: 62%; border-radius: 50%;
                        background: #7f8f7a; opacity: 0.85"></div>
            <div style="position: absolute; right: -18%; bottom: 4%; width: 86%; height: 54%; border-radius: 50%;
                        background: #5d6d63"></div>
            <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 22%;
                        background: linear-gradient(180deg, #46553f, #33402f)"></div>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(s,`scene`),u=e(s,`plate`),d,f=()=>{if(c.clearTimeout(d),t(s)){u.style.transition=`none`,u.style.transform=a,l.dataset.state=`static`;return}u.style.transition=`none`,u.style.transform=a,u.offsetWidth,u.style.transition=`transform ${i}ms linear`,u.style.transform=o,l.dataset.state=`drifting`,d=c.setTimeout(()=>{l.dataset.state=`rested`},4880)};e(s,`replay`).addEventListener(`click`,f),f()}export{s as mount};