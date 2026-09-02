import{n as e}from"./parts.C-YLuC7Q.js";import{i as t,n,r}from"./measure.DK7AY2_i.js";function i(i){i.innerHTML=`
    <div class="sp-app" style="padding: 0">
      <div class="sp-context" data-part="backdrop" aria-hidden="true"
           style="position: absolute; inset: 0; background: linear-gradient(125deg, #4b6ef5, #b154c8 52%, #f2913d)">
        <span style="position: absolute; left: 8%; top: 14%; width: 150px; height: 150px; border-radius: 50%; background: #ffd166; filter: blur(6px); opacity: 0.75"></span>
        <span style="position: absolute; right: 12%; bottom: 10%; width: 120px; height: 120px; border-radius: 50%; background: #22d3ee; filter: blur(4px); opacity: 0.7"></span>
        <span data-stage-verdict data-part="caption" style="position: absolute; left: 7%; bottom: 22%; color: #fff; font-size: 22px; font-weight: 600; letter-spacing: -0.01em">
          drag the panel over me
        </span>
      </div>
      <div class="sp-glass" data-part="panel" data-subject
           style="position: absolute; left: 58%; top: 22%; width: 190px; padding: 14px; cursor: grab; touch-action: none">
        <div style="font-weight: 600">Now playing</div>
        <div style="font-size: 12px; opacity: 0.85; margin-top: 2px">Nightjar, The Long Sun</div>
        <div style="height: 4px; border-radius: 2px; background: rgb(255 255 255 / 0.35); margin-top: 12px">
          <div style="width: 42%; height: 100%; border-radius: 2px; background: #fff"></div>
        </div>
      </div>
    </div>
  `;let a=e(i,`panel`),o=i.firstElementChild,s;a.addEventListener(`pointerdown`,e=>{e.isTrusted&&a.setPointerCapture(e.pointerId);let t=n(a,o);s={...r(e,o),left:t.left,top:t.top},a.style.cursor=`grabbing`}),i.addEventListener(`pointermove`,e=>{if(!s)return;let n=t(o),i=r(e,o),c=Math.min(Math.max(s.left+i.x-s.x,0),n.width-a.offsetWidth),l=Math.min(Math.max(s.top+i.y-s.y,0),n.height-a.offsetHeight);a.style.left=`${c}px`,a.style.top=`${l}px`});let c=()=>{s=void 0,a.style.cursor=`grab`};i.addEventListener(`pointerup`,c),i.addEventListener(`pointercancel`,c)}export{i as mount};