import{n as e}from"./parts.C-YLuC7Q.js";var t={w:4,gap:3,count:56},n={w:t.count*(t.w+t.gap)-t.gap,h:56},r=48,i=260,a=(e,t)=>{let n=Math.sin((t+1)*12.9898+e*78.233)*43758.5453;return n-Math.floor(n)},o={crumple:{shape:`burst`,blurb:`Paper crumpling`,seconds:`0.42 s`,seed:3,envelope:e=>e<.05?e/.05:Math.exp(-3.4*(e-.05)),grit:.7},whoosh:{shape:`swell`,blurb:`Envelope leaving`,seconds:`0.55 s`,seed:11,envelope:e=>Math.sin(Math.PI*e)**1.5,grit:.16}},s=`
  <button
    type="button"
    data-part="obj-paper"
    style="position: relative; width: 88px; height: 76px; padding: 0; border: 1px solid var(--sp-line); border-radius: 4px;
           background: var(--sp-surface); cursor: pointer; transition: transform 130ms var(--sp-ease)"
  >
    <span style="position: absolute; right: 0; top: 0; border-top: 16px solid var(--sp-sunken); border-left: 16px solid transparent"></span>
    <span style="position: absolute; left: 10px; top: 26px; width: 52px; height: 4px; border-radius: 2px; background: var(--sp-line)"></span>
    <span style="position: absolute; left: 10px; top: 38px; width: 64px; height: 4px; border-radius: 2px; background: var(--sp-line)"></span>
    <span style="position: absolute; left: 10px; top: 50px; width: 40px; height: 4px; border-radius: 2px; background: var(--sp-line)"></span>
  </button>`,c=`
  <button
    type="button"
    data-part="obj-envelope"
    style="position: relative; width: 104px; height: 72px; padding: 0; border: 1px solid var(--sp-line); border-radius: 4px;
           background: var(--sp-surface); overflow: hidden; cursor: pointer; transition: transform 130ms var(--sp-ease)"
  >
    <span style="position: absolute; left: 0; top: 0; border-top: 34px solid var(--sp-sunken); border-left: 51px solid transparent; border-right: 51px solid transparent"></span>
  </button>`;function l(l,u){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 264px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Desk</span>
          <span class="sp-text" data-part="readout" data-shape="swell" style="flex: 0 0 auto; width: 320px; text-align: right; white-space: nowrap">${o.whoosh?.blurb}</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px">
          <div class="sp-row sp-context" style="gap: 28px; align-items: center; justify-content: center; height: 80px">
            ${s}
            ${c}
          </div>
          <div class="sp-surface" style="padding: 8px 10px 6px">
            <div data-part="stage" style="position: relative; width: ${n.w}px; height: ${n.h}px">
              <span class="sp-context" style="position: absolute; left: 0; top: ${n.h/2-1}px; width: ${n.w}px; height: 2px; background: var(--sp-line)"></span>
              <span data-part="wave" data-subject data-sound="whoosh" style="position: absolute; left: 0; top: 0; width: 10px; height: 10px"></span>
            </div>
            <div class="sp-row sp-context" style="justify-content: space-between; margin-top: 4px">
              <span class="sp-label" style="font-size: 10px">Waveform</span>
              <span class="sp-label" data-part="length" style="font-size: 10px">${o.whoosh?.seconds}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let d=e(l,`wave`),f=e(l,`readout`),p=e(l,`length`),m=e(l,`obj-paper`),h=e(l,`obj-envelope`),g,_,v=e=>{let i=o[e];if(!i)return;let s=Array.from({length:t.count},(e,o)=>{let s=o/(t.count-1),c=Math.max(0,Math.min(1,i.envelope(s)))*(1-i.grit+i.grit*a(i.seed,o)),l=Math.max(3,Math.round(c*r));return{x:o*(t.w+t.gap),y:Math.round((n.h-l)/2),h:l}}),c=Math.min(...s.map(e=>e.y)),l=Math.max(...s.map(e=>e.y+e.h));d.dataset.sound=e,d.style.top=`${c}px`,d.style.width=`${n.w}px`,d.style.height=`${l-c}px`,d.innerHTML=s.map(e=>`<span style="position: absolute; left: ${e.x}px; top: ${e.y-c}px; width: ${t.w}px; height: ${e.h}px; border-radius: 2px; background: var(--sp-accent)"></span>`).join(``),f.dataset.shape=i.shape,f.textContent=i.blurb,p.textContent=i.seconds},y=(e,t)=>{u.clearTimeout(g),e.style.transform=t,g=u.setTimeout(()=>{e.style.transform=`none`},i)},b=e=>{let t=o[e];if(!t)return;_??=new AudioContext,_.state===`suspended`&&_.resume();let n=Number.parseFloat(t.seconds),r=Math.floor(_.sampleRate*n),i=_.createBuffer(1,r,_.sampleRate),a=i.getChannelData(0);for(let e=0;e<r;e++){let n=e/r;a[e]=(Math.random()*2-1)*Math.max(0,Math.min(1,t.envelope(n)))*.5}let s=_.createBufferSource(),c=_.createBiquadFilter(),l=_.createGain();s.buffer=i,c.type=e===`crumple`?`highpass`:`bandpass`,c.frequency.value=e===`crumple`?1800:700,l.gain.value=.3,s.connect(c).connect(l).connect(_.destination),s.start()},x=(e,t,n)=>{t.addEventListener(`click`,r=>{v(e),y(t,n),r.isTrusted&&b(e)})};x(`crumple`,m,`scale(0.86) rotate(-3deg)`),x(`whoosh`,h,`translateX(22px) scale(0.96)`),v(`whoosh`)}export{l as mount};