var e=`'Bookman Old Style', 'Baskerville', 'Times New Roman', Georgia, serif`,t=`#fdf5e3`,n=`#2e6f52`,r=`#c08c3a`,i=`#3f9d6b`,a=`#dcefe2`;function o(o){let s=(e,t,r)=>`<ellipse cx="${e}" cy="${t}" rx="10" ry="4.6" transform="rotate(${r} ${e} ${t})" fill="${i}" fill-opacity="0.55" stroke="${n}" stroke-width="1.1"/>`,c=[0,1,2,3].map(e=>`<rect x="${120+e*10.5}" y="152" width="9" height="17" fill="#33507e" stroke="#22355a" stroke-width="0.8"/>`).join(``);o.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="poster" data-subject
           style="position: relative; width: 268px; height: 236px; overflow: hidden;
                  background: radial-gradient(120% 90% at 50% 16%, #fffaf0, ${t} 76%)">

        <svg viewBox="0 0 268 236" width="268" height="236" aria-hidden="true" style="display: block">
          <defs>
            <linearGradient id="vd-solarpunk-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#ffeac2"/>
              <stop offset="0.55" stop-color="#fdd7a2"/>
              <stop offset="1" stop-color="#f7c48d"/>
            </linearGradient>
            <path id="vd-solarpunk-arc" d="M56 122 A78 78 0 0 1 212 122" fill="none"/>
            <clipPath id="vd-solarpunk-arch">
              <path d="M34 214 L34 122 A100 100 0 0 1 234 122 L234 214 Z"/>
            </clipPath>
          </defs>

          <rect x="9" y="9" width="250" height="218" rx="16" ry="16" fill="none" stroke="${r}" stroke-width="1"/>

          <path data-part="arch" d="M34 214 L34 122 A100 100 0 0 1 234 122 L234 214 Z"
                fill="url(#vd-solarpunk-sky)" stroke="${n}" stroke-width="2.5"/>

          <g clip-path="url(#vd-solarpunk-arch)">
            <circle data-part="sun" cx="134" cy="112" r="46" fill="#ffdf94" fill-opacity="0.85"/>
            <g fill="none" stroke="${r}" stroke-width="1.4" stroke-opacity="0.7">
              <path d="M134 46 v-12M182 60 l7 -10M86 60 l-7 -10M196 106 h12M60 106 h-12"/>
            </g>

            <g data-part="turbine" transform="translate(206 118)">
              <path d="M0 0 V96" stroke="${n}" stroke-width="2.4"/>
              ${[90,210,330].map(e=>`<path d="M0 0 L0 -25" transform="rotate(${e})" stroke="${n}" stroke-width="2.2" stroke-linecap="round"/>`).join(``)}
              <circle r="3.4" fill="${t}" stroke="${n}" stroke-width="1.6"/>
            </g>

            <g data-part="towers" stroke="${n}" stroke-width="1.8">
              <rect x="56" y="132" width="46" height="84" rx="23" fill="${a}"/>
              <rect x="112" y="106" width="52" height="110" rx="26" fill="#e8f4ec"/>
              <rect x="176" y="146" width="42" height="70" rx="21" fill="${a}"/>
              <g stroke-width="1" stroke-opacity="0.55">
                <path d="M79 134 V216M138 108 V216M197 148 V216M56 174 H102M112 150 H164M176 182 H218"/>
              </g>
            </g>

            <g data-part="panels">${c}</g>

            <g data-part="vines" fill="none" stroke="${i}" stroke-width="2.2" stroke-linecap="round">
              <path d="M118 216 C102 192 132 178 120 152 C112 134 136 126 130 110"/>
              <path d="M186 216 C196 196 172 184 184 164 C190 154 182 148 186 142"/>
              <path d="M70 216 C62 198 80 190 74 174"/>
            </g>
            <g>
              ${s(126,168,-38)}${s(112,190,26)}${s(133,130,-20)}
              ${s(178,176,34)}${s(192,200,-28)}${s(66,190,18)}
            </g>

            <path d="M34 202 C70 192 96 208 134 199 C170 190 200 204 234 196 L234 216 L34 216 Z" fill="${i}"/>
            <g fill="${n}" fill-opacity="0.55">
              <circle cx="48" cy="200" r="7"/><circle cx="158" cy="200" r="6"/><circle cx="226" cy="196" r="7"/>
            </g>
          </g>

          <text data-part="title" font-family="${e}" font-size="14" letter-spacing="2.4" fill="${n}">
            <textPath href="#vd-solarpunk-arc" startOffset="50%" text-anchor="middle">SUN AND SOIL</textPath>
          </text>

          <g fill="none" stroke="${r}" stroke-width="1.2" stroke-linecap="round">
            <path d="M34 207 C20 202 18 186 30 183 C39 181 41 193 33 193"/>
            <path d="M234 207 C248 202 250 186 238 183 C229 181 227 193 235 193"/>
          </g>
        </svg>

        <span data-part="foot"
              style="position: absolute; left: 0; right: 0; bottom: 11px; text-align: center; font-family: ${e};
                     font-size: 9px; letter-spacing: 0.26em; text-indent: 0.26em; color: ${n}">CIVIC GREENHOUSE No. 4</span>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 268px; margin: 0; text-align: center">
        Daylight instead of neon, plants over the structure, the machinery left on show.
      </p>
    </div>
  `}export{o as mount};