import{n as e}from"./parts.C-YLuC7Q.js";var t=[.18,.32,.55,.71,.62,.44,.68,.86,.74,.52,.35,.22,.14,.09,.12,.28,.47,.66,.81,.93,.77,.58,.41,.29,.19,.11,.08,.15,.34,.51,.69,.84,.72,.55,.38,.26,.44,.61,.49,.33,.21,.15,.1,.07],n=t.length,r=64,i=12,a=88,o=e=>Math.round(e*r/n),s=e=>`${Math.floor(e/60)}:${String(e%60).padStart(2,`0`)}`,c=(e,t)=>`
  <button
    type="button"
    data-part="bar-${t}"
    data-index="${t}"
    data-played="${t<i}"
    aria-label="Seek to ${s(o(t))}"
    style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 0; border: 0;
           background: transparent; cursor: pointer"
  ><span style="width: 100%; height: ${Math.round(6+e*72)}px; border-radius: 2px"></span></button>`;function l(l){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 244px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Voice note from Priya</span>
          <span class="sp-label" style="font-size: 12px">${s(r)}</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center; gap: 10px">
          <div class="sp-surface" style="padding: 12px">
            <div data-part="track" style="position: relative; height: ${a}px">
              <div
                class="sp-context"
                aria-hidden="true"
                style="position: absolute; left: 0; right: 0; top: ${a/2-1}px; height: 2px; background: var(--sp-line)"
              ></div>
              <div
                data-part="wave"
                data-subject
                data-at="${i}"
                style="position: relative; display: grid; grid-template-columns: repeat(${n}, 1fr); align-items: center; gap: 3px; height: 100%"
              >${t.map(c).join(``)}</div>
              <div
                class="sp-context"
                data-part="playhead"
                aria-hidden="true"
                style="position: absolute; top: -3px; bottom: -3px; left: 0; width: 3px; border-radius: 2px; background: var(--sp-ink); pointer-events: none"
              ></div>
            </div>

            <div class="sp-row sp-row--between sp-context" style="margin-top: 10px">
              <span
                class="sp-label"
                data-part="elapsed"
                data-time="${s(o(i))}"
                role="status"
                style="font-variant-numeric: tabular-nums"
              >${s(o(i))}</span>
              <span class="sp-label" style="font-variant-numeric: tabular-nums">${s(r)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(l,`wave`),d=e(l,`playhead`),f=e(l,`elapsed`),p=t.map((t,n)=>e(l,`bar-${n}`)),m=i,h=()=>{p.forEach((e,t)=>{let n=t<m;e.dataset.played=String(n);let r=e.firstElementChild;r instanceof HTMLElement&&(r.style.background=n?`var(--sp-accent)`:`var(--sp-muted)`,r.style.opacity=n?`1`:`0.35`)}),u.dataset.at=String(m),d.style.left=`${m*100/n}%`,f.textContent=s(o(m)),f.dataset.time=s(o(m))};u.addEventListener(`click`,e=>{let t=e.target?.closest(`[data-index]`);t instanceof HTMLElement&&(m=Number(t.dataset.index),h())}),h()}export{l as mount};