import{n as e,t}from"./parts.C-YLuC7Q.js";var n=74,r=[{blur:1,from:0,to:30},{blur:1.5,from:20,to:52},{blur:2.5,from:42,to:72},{blur:4,from:62,to:86},{blur:6,from:80,to:100}],i=`linear-gradient(180deg, #2b3f8f 0%, #6f6fd0 46%, #e98a6b 78%, #f7c78a 100%)`,a=[{left:6,width:20,height:30,tone:`rgb(24 20 48 / 0.86)`},{left:28,width:14,height:46,tone:`rgb(18 16 40 / 0.9)`},{left:44,width:24,height:24,tone:`rgb(28 22 54 / 0.82)`},{left:70,width:12,height:40,tone:`rgb(18 16 40 / 0.9)`},{left:84,width:14,height:18,tone:`rgb(30 24 56 / 0.8)`}],o=[{title:`Harbour, 06:12`,wash:`linear-gradient(120deg, #f6a06a, #e2617f)`},{title:`Bridge, 07:40`,wash:`linear-gradient(120deg, #7c9cf3, #6ad1c8)`},{title:`Rooftops, 18:05`,wash:`linear-gradient(120deg, #f5c46b, #ef7c5c)`},{title:`Tower, 19:22`,wash:`linear-gradient(120deg, #8f7bf0, #4f6bd6)`},{title:`Quay, 21:48`,wash:`linear-gradient(120deg, #4b6ef5, #2b2f6e)`}];function s(){return r.map(e=>{let t=`linear-gradient(to top, transparent ${e.from}%, #000 ${e.to}%, #000 100%)`;return`<span style="position: absolute; inset: 0; backdrop-filter: blur(${e.blur}px); -webkit-backdrop-filter: blur(${e.blur}px); mask-image: ${t}; -webkit-mask-image: ${t}"></span>`}).join(``)}function c(){return`
    <div aria-hidden="true" style="position: relative; height: 104px; background: ${i}">
      <span style="position: absolute; right: 18%; top: 26px; width: 26px; height: 26px; border-radius: 50%; background: radial-gradient(circle, #fff2c4, #ffb35c 70%, rgb(255 179 92 / 0))"></span>
      ${a.map(e=>`<span style="position: absolute; left: ${e.left}%; bottom: 0; width: ${e.width}%; height: ${e.height}px; background: ${e.tone}"></span>`).join(``)}
    </div>
    <div style="padding: 4px 0 12px; background: #191b2c">${o.map(e=>`
      <div style="display: flex; align-items: center; gap: 8px; padding: 6px 10px">
        <span style="flex: 0 0 auto; width: 38px; height: 30px; border-radius: 6px; background: ${e.wash}"></span>
        <span style="font-size: 11px; color: #f2f3f8">${e.title}</span>
      </div>`).join(``)}</div>`}function l(e){let t=e===`ramp`?`<div data-part="ramp" data-subject style="position: absolute; left: 0; right: 0; top: 0; height: ${n}px; pointer-events: none">${s()}</div>`:`<div data-part="hard" style="position: absolute; left: 0; right: 0; top: 0; height: ${n}px; pointer-events: none; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px)"></div>`;return`
    <div style="position: relative; width: 168px; height: 228px; border-radius: 20px; border: 1px solid rgb(255 255 255 / 0.24); background: #191b2c; overflow: hidden">
      <div class="sp-scroll" data-part="scroller-${e}" style="position: absolute; inset: 0; scrollbar-width: none">${c()}</div>
      ${t}
      <div style="position: absolute; left: 0; right: 0; top: 0; display: flex; justify-content: space-between; padding: 9px 13px; color: #ffffff; font-size: 11px; font-weight: 600; pointer-events: none">
        <span>9:41</span>
        <span data-part="title-${e}" style="letter-spacing: 0.02em">Skyline</span>
      </div>
    </div>`}function u(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-row" style="align-items: flex-start; gap: 20px">
        <div class="sp-stack" style="gap: 7px; align-items: center">
          ${l(`ramp`)}
        </div>
        <div class="sp-stack sp-context" style="gap: 7px; align-items: center">
          ${l(`hard`)}
        </div>
      </div>
    </div>
  `;let r=e(n,`scroller-ramp`),i=e(n,`scroller-hard`);r.addEventListener(`scroll`,()=>{i.scrollTop=r.scrollTop,t(r,`data-scrolled`,r.scrollTop>40)})}export{u as mount};