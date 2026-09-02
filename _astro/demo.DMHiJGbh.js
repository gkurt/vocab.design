function e(e){e.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="card"
           style="width: 306px; padding: 18px 20px 16px; background: #d9d9d1; border-radius: 6px;
                  border: 1px solid #c2c2b8; box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.7)">
        <div data-part="deboss" data-subject
             style="font-size: 33px; font-weight: 800; letter-spacing: 0.015em; line-height: 1.1;
                    color: #adada2; text-shadow: 0 1px 0 rgb(255 255 255 / 0.95)">PRESSED IN</div>
        <div aria-hidden="true"
             style="height: 2px; margin: 13px 0; background: linear-gradient(#c0c0b6 0 1px, #eeeee6 1px 2px)"></div>

        <div data-part="emboss"
             style="font-size: 33px; font-weight: 800; letter-spacing: 0.015em; line-height: 1.1;
                    color: #eeeee6; text-shadow: 0 1px 1px rgb(38 38 32 / 0.45)">RAISED UP</div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 306px; margin: 0; text-align: center">
        One pixel decides it, and only because the surface is neither white nor black.
      </p>
    </div>
  `}export{e as mount};