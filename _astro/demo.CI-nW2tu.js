var e=`'Courier New', ui-monospace, monospace`,t=`#ff2fb0`,n=`#25e3ff`,r=`#ffb020`,i=`polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))`;function a(a){let o=(t,r,i,a)=>`
    <div data-part="${t}" style="flex: 1 1 0; padding: 6px 7px; background: rgb(37 227 255 / 0.07);
         border-left: 1px solid ${n}; clip-path: polygon(0 0, 100% 0, 100% 100%, 7px 100%, 0 calc(100% - 7px))">
      <div style="font-family: ${e}; font-size: 7.5px; letter-spacing: 0.16em; color: ${n}; opacity: 0.85">${r}</div>
      <div style="margin-top: 5px; height: 4px; background: rgb(255 255 255 / 0.12)">
        <div style="width: ${i}; height: 100%; background: ${a}"></div>
      </div>
    </div>`;a.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="panel" data-subject
           style="width: 270px; padding: 1px; background-image: linear-gradient(140deg, ${t}, ${n});
                  clip-path: ${i}; box-shadow: 0 0 22px rgb(255 47 176 / 0.28)">
        <div style="padding: 12px; background-color: #08060f; background-image: repeating-linear-gradient(to bottom, rgb(255 255 255 / 0.05) 0 1px, transparent 1px 3px); clip-path: ${i}">

          <div data-part="header" class="sp-row sp-row--between"
               style="font-family: ${e}; font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: ${n}">
            <span>Kasei Holdings // node 12</span>
            <span data-part="serial" style="color: ${t}">sn 4417-b</span>
          </div>

          <div data-part="title"
               style="margin-top: 10px; font-family: ${e}; font-size: 27px; font-weight: 700; letter-spacing: 0.06em;
                      line-height: 1.05; text-transform: uppercase; color: #f2f4fb;
                      text-shadow: 2px 0 rgb(255 47 176 / 0.9), -2px 0 rgb(37 227 255 / 0.9)">
            Ghostline
          </div>

          <div data-part="ticks" class="sp-row" aria-hidden="true"
               style="gap: 3px; margin-top: 8px; align-items: flex-end; height: 9px">${Array.from({length:22},(e,t)=>`<span style="width: ${t%4==0?3:1}px; height: ${t%3==0?9:5}px; background: ${n}; opacity: 0.6"></span>`).join(``)}</div>

          <div class="sp-row" style="gap: 8px; margin-top: 10px; align-items: stretch">
            ${o(`meter-a`,`ICE`,`72%`,t)}
            ${o(`meter-b`,`TRACE`,`38%`,n)}
          </div>

          <div data-part="warning"
               style="margin-top: 10px; padding: 4px 8px; background-color: rgb(255 176 32 / 0.1); background-image: repeating-linear-gradient(45deg, rgb(255 176 32 / 0.32) 0 6px, transparent 6px 12px);
                      border-left: 3px solid ${r}; font-family: ${e}; font-size: 8px; letter-spacing: 0.14em;
                      text-transform: uppercase; color: ${r}">
            Unauthorized access logged
          </div>

          <div class="sp-row" style="justify-content: flex-end; margin-top: 10px">
            <button class="sp-button sp-button--sm" data-part="jack" type="button"
                    style="border-radius: 0; background: transparent; border: 1px solid ${t};
                           color: ${t}; font-family: ${e}; font-size: 10px; letter-spacing: 0.18em;
                           text-transform: uppercase">Jack in</button>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption"
         style="max-width: 270px; margin: 0; text-align: center; font-size: 11px">
        Cut corners, two toxic accents, hazard chrome, noir rather than nostalgia.
      </p>
    </div>
  `}export{a as mount};