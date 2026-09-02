import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`d1`,kind:`dialogue`,line:`MARA: You kept it.`,width:24,extendedWidth:20},{key:`ad1`,kind:`ad`,line:`She slides the letter across, unsigned.`,extended:`She slides the letter across the table, unsigned, and does not lift her eyes from it.`,width:14,extendedWidth:22},{key:`d2`,kind:`dialogue`,line:`JUN: I kept all of them.`,width:24,extendedWidth:20},{key:`ad2`,kind:`ad`,line:`He pockets the brass key.`,extended:`He pockets the brass key, and the door behind him stays open on an empty corridor.`,width:14,extendedWidth:22},{key:`d3`,kind:`dialogue`,line:`MARA: Then read this one.`,width:24,extendedWidth:16}],n=`The dialogue has the floor. The describer waits.`,r={standard:`Each description is written to fit the gap it has. Anything longer than the gap has to be cut.`,extended:`Extended description stops playback until the line is finished, so the running time grows.`},i=1200,a=1300,o=1900;function s(s,c){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 448px; padding: 12px 14px">
        <div style="position: relative; height: 92px; border-radius: 6px; overflow: hidden;
                    background: linear-gradient(160deg, #2b3550 0%, #465a7d 58%, #6d7f9c 100%)">
          <div style="position: absolute; left: 44px; top: 20px; width: 46px; height: 46px; border-radius: 50%; background: #dfe6f2; opacity: 0.5"></div>
          <div style="position: absolute; right: 40px; bottom: 0; width: 96px; height: 44px; border-radius: 6px 6px 0 0; background: #1d2436; opacity: 0.55"></div>
        </div>

        <div class="sp-surface" data-part="strip" data-subject data-state="speaking" data-track="standard"
             style="margin-top: 10px; height: 62px; padding: 6px 10px; display: flex; flex-direction: column; gap: 2px">
          <span class="sp-label" style="font-size: 10px">Audio description track</span>
          <span class="sp-text sp-text--ink" data-part="strip-text" style="font-size: 12px; line-height: 1.4">${t[1]?.line??``}</span>
        </div>

        <div class="sp-context" style="margin-top: 10px">
          <div data-part="timeline" data-mode="standard"
               style="position: relative; display: flex; gap: 2px; height: 18px; padding: 2px; border-radius: 5px; background: var(--sp-sunken)">
            ${t.map(e=>`
    <span data-part="slot-${e.key}" data-kind="${e.kind}" data-mode="standard"
          style="width: ${e.width}%; height: 100%; border-radius: 3px; transition: width 0.28s var(--sp-ease);
                 background: ${e.kind===`ad`?`var(--sp-accent)`:`var(--sp-line)`}"></span>`).join(``)}
            <span data-part="playhead"
                  style="position: absolute; top: -3px; bottom: -3px; left: 31%; width: 2px; border-radius: 2px;
                         background: var(--sp-ink); transition: left 0.28s var(--sp-ease)"></span>
          </div>
          <div class="sp-row sp-row--between" style="margin-top: 10px">
            <button class="sp-button sp-button--sm" type="button" data-part="play">Play the scene</button>
            <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="standard" data-axis="Track">
              <button class="sp-segment" data-part="seg-standard" value="standard">Standard</button>
              <button class="sp-segment" data-part="seg-extended" value="extended">Extended</button>
            </sp-segmented>
          </div>
          <p class="sp-text" data-stage-verdict data-part="caption" data-case="standard"
             style="margin: 8px 0 0; height: 28px; font-size: 11px">${r.standard}</p>
        </div>
      </div>
    </div>
  `;let l=e(s,`strip`),u=e(s,`strip-text`),d=e(s,`timeline`),f=e(s,`playhead`),p=e(s,`caption`),m=1,h=!1,g,_=e=>h?e.extendedWidth:e.width,v=()=>{let r=0;for(let[n,i]of t.entries()){let t=e(s,`slot-${i.key}`);t.style.width=`${_(i)}%`,t.dataset.mode=h?`extended`:`standard`,n===m&&(f.style.left=`${r+_(i)/2}%`),r+=_(i)}let i=t[m],a=i?.kind===`ad`,o=a?(h?i?.extended:i?.line)??``:n;l.dataset.state=a?`speaking`:`silent`,l.dataset.track=h?`extended`:`standard`,u.textContent=o,u.className=a?`sp-text sp-text--ink`:`sp-text`,d.dataset.mode=h?`extended`:`standard`,a&&h?d.dataset.paused=``:delete d.dataset.paused},y=()=>{if(m>=t.length-1){delete l.dataset.playing,l.dataset.ended=``,v();return}m+=1,v();let e=t[m]?.kind===`ad`?h?o:a:i;g=c.setTimeout(y,e)};e(s,`play`).addEventListener(`click`,()=>{c.clearTimeout(g),m=0,delete l.dataset.ended,l.dataset.playing=``,v(),g=c.setTimeout(y,i)}),e(s,`segmented`).addEventListener(`change`,e=>{h=e.detail===`extended`,p.dataset.case=h?`extended`:`standard`,p.textContent=h?r.extended:r.standard,v()}),v()}export{s as mount};