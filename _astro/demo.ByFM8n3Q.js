var e=[{color:`#3ddc97`,size:`210px`,blur:`46px`,place:`left: -6%; top: -14%`,x:`48px`,y:`30px`},{color:`#5ec8ff`,size:`180px`,blur:`42px`,place:`left: 34%; top: 30%`,x:`-36px`,y:`-28px`},{color:`#b46bff`,size:`200px`,blur:`52px`,place:`right: -8%; top: -6%`,x:`-30px`,y:`40px`},{color:`#f06ca8`,size:`150px`,blur:`40px`,place:`right: 18%; bottom: -18%`,x:`34px`,y:`-22px`}];function t(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-aurora" data-part="aurora" data-subject
           style="--sp-aurora-wash: linear-gradient(155deg, #0d1230, #1a1046 58%, #2b1038); inset: 20px 14px; border-radius: var(--sp-radius)">
        ${e.map((e,t)=>`
      <span class="sp-aurora-blob sp-drift" data-part="blob-${t+1}"
            style="--sp-blob: ${e.color}; --sp-blob-size: ${e.size}; --sp-blob-blur: ${e.blur}; --sp-i: ${t}; --sp-drift-time: ${16+t*3}s; --sp-drift-x: ${e.x}; --sp-drift-y: ${e.y}; ${e.place}"></span>`).join(``)}
      </div>
      <div class="sp-window sp-context" data-part="card" style="position: relative; width: 268px; text-align: center">
        <div class="sp-heading">Northern Lights</div>
        <p class="sp-text" style="margin: 6px 0 0">Gin, blue curacao and a drop of violet, layered over crushed ice.</p>
        <button class="sp-button sp-button--sm" data-part="cta" type="button" style="margin-top: 12px">Read the recipe</button>
      </div>
    </div>
  `}export{t as mount};