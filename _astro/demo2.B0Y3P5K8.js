import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[`notdef`,`hex`,`fffd`],r={notdef:`Glyph zero, the shape every font file reserves for a character it cannot draw. It means the font was asked and had nothing.`,hex:`A last resort face printing the codepoint it could not set. The most useful box of the three, because it names what went missing.`,fffd:`The replacement character, U+FFFD. Not a missing glyph at all: it is what a decoder leaves where the bytes were not valid text.`},i={notdef:`notdef box`,hex:`hex box`,fffd:`U+FFFD`};function a(e,t){let n=`width: ${Math.round(t*.72)}px; height: ${t}px; vertical-align: -${Math.round(t*.2)}px; margin: 0 1px`,r=`border: 1.5px solid currentcolor; border-radius: 1px`;return e===`notdef`?`<span aria-hidden="true" style="display: inline-block; ${n}; ${r}"></span>`:e===`hex`?`<span aria-hidden="true" style="display: inline-flex; flex-direction: column; justify-content: center; overflow: hidden;
      ${n}; ${r}; font-family: ui-monospace, monospace; font-size: ${(t*.32).toFixed(1)}px;
      line-height: ${(t*.38).toFixed(1)}px; font-weight: 600; text-align: center"><span>09</span><span>2F</span></span>`:`<span aria-hidden="true" style="display: inline-block; position: relative; ${n}">
      <span style="position: absolute; left: 50%; top: 50%; width: ${Math.round(t*.62)}px; height: ${Math.round(t*.62)}px;
        translate: -50% -50%; rotate: 45deg; border-radius: 1px; background: currentcolor"></span>
      <span style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
        font-size: ${(t*.5).toFixed(1)}px; font-weight: 700; line-height: 1; color: var(--sp-surface)">?</span>
    </span>`}var o=e=>`<button class="sp-chip" data-part="key-${e}" data-kind="${e}">${a(e,15)}<span>${i[e]}</span></button>`;function s(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">inbox</span>
          <span class="sp-label">Latin subset, no fallback</span>
        </div>
        <div class="sp-surface" style="margin-top: 10px; padding: 12px 14px">
          <div data-part="line" data-subject style="font-size: 16px; line-height: 24px; white-space: nowrap">${`Message from ${a(`notdef`,18).repeat(6)} about Friday`}</div>
          <div class="sp-text sp-context" style="margin-top: 4px">2 minutes ago</div>
        </div>
        <div class="sp-row sp-context" style="margin-top: 12px">
          ${o(`notdef`)}${o(`hex`)}${o(`fffd`)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="readout" data-showing="notdef" style="margin: 10px 0 0; height: 39px"></p>
      </div>
    </div>
  `;let s=e(i,`readout`),c=n.map(t=>e(i,`key-${t}`)),l=e=>{s.dataset.showing=e,s.textContent=r[e];for(let n of c)t(n,`data-selected`,n.dataset.kind===e)};for(let e of c)e.addEventListener(`click`,()=>l(e.dataset.kind));l(`notdef`)}export{s as mount};