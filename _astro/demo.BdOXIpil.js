import{n as e,t}from"./parts.C-YLuC7Q.js";var n={w:216,h:90,cols:6,rows:5},r={w:n.w/n.cols,h:n.h/n.rows},i=.13,a=[392,440,494,587,659],o=40,s={sent:{label:`Message sent`,shape:`rising`,blurb:`Rising, three notes, 392 to 659 Hz`,notes:[{t:0,p:1,d:1},{t:1,p:2,d:1},{t:2,p:4,d:1}]},failed:{label:`Upload failed`,shape:`falling`,blurb:`Falling, two notes, the second held`,notes:[{t:0,p:3,d:1},{t:1,p:0,d:2}]},done:{label:`Task done`,shape:`rising-tail`,blurb:`Rising with a tail, four notes`,notes:[{t:0,p:1,d:1},{t:1,p:2,d:1},{t:2,p:4,d:1},{t:3,p:4,d:2}]}},c=Object.keys(s),l=Array.from({length:n.rows},(e,t)=>`<span style="position: absolute; left: 0; top: ${Math.round(t*r.h+r.h/2)}px; width: ${n.w}px; height: 1px; background: var(--sp-line)"></span>`).join(``),u=c.map(e=>`
    <button
      class="sp-button sp-button--ghost sp-button--sm"
      type="button"
      data-part="event-${e}"
      style="width: 100%; white-space: nowrap; flex: 0 0 auto"
    >${s[e]?.label}</button>`).join(``),d=e=>({x:e.t*r.w+2,y:(n.rows-1-e.p)*r.h+r.h/2-5,w:e.d*r.w-4,h:10});function f(f,p){f.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Sound set</span>
          <span class="sp-text" data-part="readout" data-shape="rising" style="flex: 0 0 auto; width: 290px; text-align: right; white-space: nowrap">${s.sent?.blurb}</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 14px; align-items: stretch">
          <div class="sp-stack sp-context" style="width: 150px; gap: 8px; flex: 0 0 auto">
            <span class="sp-label" style="font-size: 10px">Event</span>
            ${u}
          </div>
          <div class="sp-surface" style="flex: 1 1 auto; padding: 10px 12px; display: flex; flex-direction: column; justify-content: center; gap: 8px">
            <div style="position: relative; width: ${n.w}px; height: ${n.h}px; align-self: center">
              <span class="sp-context" style="position: absolute; inset: 0">${l}</span>
              <span data-part="figure" data-subject data-event="sent" style="position: absolute; left: 0; top: 0; width: 10px; height: 10px"></span>
              <span data-part="playhead" style="position: absolute; left: 0; top: 0; width: 2px; height: ${n.h}px; background: var(--sp-ink); opacity: 0"></span>
            </div>
            <span class="sp-label sp-context" style="font-size: 10px; text-align: center">pitch, over time</span>
          </div>
        </div>
      </div>
    </div>
  `;let m=e(f,`figure`),h=e(f,`playhead`),g=e(f,`readout`),_=c.map(t=>e(f,`event-${t}`)),v,y,b=e=>{let n=s[e];if(!n)return;let r=n.notes.map(d),i=Math.min(...r.map(e=>e.x)),a=Math.min(...r.map(e=>e.y)),o=Math.max(...r.map(e=>e.x+e.w)),l=Math.max(...r.map(e=>e.y+e.h));m.dataset.event=e,m.style.left=`${i}px`,m.style.top=`${a}px`,m.style.width=`${o-i}px`,m.style.height=`${l-a}px`,m.innerHTML=r.map((e,t)=>`
          <span
            data-part="note-${t}"
            style="position: absolute; left: ${e.x-i}px; top: ${e.y-a}px; width: ${e.w}px; height: ${e.h}px;
                   border-radius: 3px; background: var(--sp-accent)"
          ></span>`).join(``),g.dataset.shape=n.shape,g.textContent=n.blurb;for(let[n,r]of _.entries())t(r,`data-selected`,c[n]===e)},x=e=>{let t=s[e];if(!t)return;let n=Math.max(...t.notes.map(e=>e.t+e.d)),a=n*i*1e3,c=0;p.clearTimeout(v),h.style.opacity=`0.55`;let l=()=>{if(c+=o,h.style.left=`${Math.min(c/a,1)*n*r.w}px`,c<a){v=p.setTimeout(l,o);return}h.style.opacity=`0`,h.style.left=`0px`};h.style.left=`0px`,v=p.setTimeout(l,o)},S=e=>{let t=s[e];if(!t)return;y??=new AudioContext,y.state===`suspended`&&y.resume();let n=y.currentTime+.03;for(let e of t.notes){let t=n+e.t*i,r=e.d*i*.9,o=y.createOscillator(),s=y.createGain();o.type=`sine`,o.frequency.value=a[e.p]??440,s.gain.setValueAtTime(1e-4,t),s.gain.linearRampToValueAtTime(.12,t+.012),s.gain.exponentialRampToValueAtTime(5e-4,t+r),o.connect(s).connect(y.destination),o.start(t),o.stop(t+r+.03)}};for(let[e,t]of _.entries()){let n=c[e];n&&t.addEventListener(`click`,e=>{b(n),x(n),e.isTrusted&&S(n)})}b(`sent`)}export{f as mount};