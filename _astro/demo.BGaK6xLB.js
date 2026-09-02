var e=[`#e6effc`,`#d0e0f6`],t={litA:`#7186bd`,shadeA:`#4a5f8f`,litB:`#8098c9`,shadeB:`#56709c`},n=[`#f2f6ff`,`#d8e2f6`],r=[`#46996f`,`#3f8f6b`,`#35805f`,`#2f7355`],i=[`#9fe7de`,`#6bcfc4`,`#43b9ad`,`#35a196`,`#2c8880`],a=(e,t,n)=>`<polygon points="${e}" fill="${t}"${n?` data-part="${n}"`:``} />`,o=[`36,6 62,26 36,34`,`62,26 52,64 36,34`,`52,64 20,64 36,34`,`20,64 10,26 36,34`,`10,26 36,6 36,34`],s=`36,6 62,26 52,64 20,64 10,26`;function c(c){c.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-window" style="width: 424px; padding: 13px 14px">
        <div class="sp-row" style="align-items: flex-start; gap: 13px">
          <span data-part="scene" data-subject aria-hidden="true"
                style="flex: 0 0 auto; display: block; width: 290px; height: 186px; overflow: hidden;
                       border-radius: 6px; border: 1px solid var(--sp-line)">
            <svg viewBox="0 0 288 184" width="288" height="184" role="presentation">${[a(`0,0 288,0 288,58 0,84`,e[0]??`#e6effc`),a(`0,84 288,58 288,141 0,141`,e[1]??`#d0e0f6`),a(`245,38 238,49 226,49 219,38 226,27 238,27`,`#ffd166`,`sun`),a(`214,72 150,140 214,140`,t.shadeB),a(`214,72 284,140 214,140`,t.litB,`facet-far`),a(`96,44 8,140 96,140`,t.shadeA,`facet-shade`),a(`96,44 176,140 96,140`,t.litA,`facet-lit`),a(`96,44 70,72 96,72`,n[0]??`#f2f6ff`,`facet-cap`),a(`96,44 122,72 96,72`,n[1]??`#d8e2f6`),a(`0,140 72,140 36,184`,r[1]??`#3f8f6b`),a(`0,140 36,184 0,184`,r[2]??`#35805f`),a(`72,140 144,140 108,184`,r[0]??`#46996f`),a(`72,140 108,184 36,184`,r[3]??`#2f7355`),a(`144,140 216,140 180,184`,r[1]??`#3f8f6b`),a(`144,140 180,184 108,184`,r[2]??`#35805f`),a(`216,140 288,140 252,184`,r[0]??`#46996f`),a(`216,140 252,184 180,184`,r[3]??`#2f7355`),a(`288,140 288,184 252,184`,r[1]??`#3f8f6b`)].join(``)}</svg>
          </span>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 8px; align-items: center">
            <div class="sp-stack" style="gap: 3px; align-items: center">
              <svg data-part="gem-faceted" viewBox="0 0 72 72" width="66" height="66" role="presentation">${o.map((e,t)=>a(e,i[t]??`#43b9ad`)).join(``)}</svg>
              <span class="sp-label" style="font-size: 11px">Flat shaded</span>
            </div>
            <div class="sp-stack" style="gap: 3px; align-items: center">
              <svg data-part="gem-smooth" viewBox="0 0 72 72" width="66" height="66" role="presentation">
                <defs>
                  <radialGradient id="lp-smooth" cx="36%" cy="26%" r="78%">
                    <stop offset="0" stop-color="${i[0]}" />
                    <stop offset="1" stop-color="${i[4]}" />
                  </radialGradient>
                </defs>
                <polygon points="${s}" fill="url(#lp-smooth)" />
              </svg>
              <span class="sp-label" style="font-size: 11px">Interpolated</span>
            </div>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 424px; margin: 0; text-align: center">
        Same silhouette either way. Turning the smoothing off is what leaves the edges showing.
      </p>
    </div>
  `}export{c as mount};