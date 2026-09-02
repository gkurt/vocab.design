import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={depth:`The pre-2013 treatment: a gloss on the artwork, a bevel on the button, a rounded corner and a cast shadow under the card.`,flat:`Every depth cue refused. A solid fill, one hairline edge and colour carry the whole card, and nothing pretends to be lit.`};function n(n){n.innerHTML=`
    <div class="sp-app">
      <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="flat"
                    data-axis="Flat design" data-term="flat">
        <button class="sp-segment" type="button" data-part="mode-depth" value="depth">Without</button>
        <button class="sp-segment" type="button" data-part="mode-flat" value="flat">With</button>
      </sp-segmented>

      <div data-part="card" data-subject data-mode="flat" data-pose="[data-mode=flat]"
           style="width: 172px; padding: 14px; background: var(--sp-surface); border: 1px solid var(--sp-line)">
        <!-- .sp-swatch and .sp-button both declare no border and .sp-bevel adds a 1px one, so
             every element that takes the bevel reserves that border in the flat state too. The
             card would otherwise grow as the gloss arrives, which is a shift the reader did not
             ask for (SPEC §5). -->
        <div class="sp-swatch" data-part="art"
             style="--sp-swatch: #ef4a4a; height: 78px; border-radius: 0; border: 1px solid transparent"></div>
        <div data-part="title" style="margin-top: 10px; font-weight: 600; font-size: 14px">Night Shift</div>
        <div class="sp-text" style="font-size: 12px">Ora Vance</div>
        <div data-part="track" style="height: 6px; margin-top: 10px; background: var(--sp-sunken)">
          <div data-part="fill" style="width: 46%; height: 100%; background: var(--sp-accent)"></div>
        </div>
        <button class="sp-button" type="button" data-part="play"
                style="width: 100%; margin-top: 12px; border-radius: 0; font-size: 13px;
                       border: 1px solid transparent">Play</button>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="verdict" data-mode="flat"
         style="margin: 0">${t.flat}</p>
    </div>
  `;let r=e(n,`card`),i=e(n,`art`),a=e(n,`title`),o=e(n,`track`),s=e(n,`fill`),c=e(n,`play`),l=e(n,`verdict`),u=e=>{let n=e===`depth`;r.dataset.mode=e,r.style.borderRadius=n?`10px`:``,r.style.boxShadow=n?`0 6px 14px rgb(16 24 40 / 0.28)`:``,i.classList.toggle(`sp-bevel`,n),i.style.setProperty(`--sp-swatch`,n?`#c03b3b`:`#ef4a4a`),i.style.borderRadius=n?``:`0`,i.style.borderColor=n?`rgb(0 0 0 / 0.34)`:`transparent`,a.style.textShadow=n?`0 1px 0 rgb(255 255 255 / 0.5)`:``,o.style.borderRadius=n?`999px`:``,o.style.boxShadow=n?`inset 0 1px 2px rgb(16 24 40 / 0.4)`:``,s.classList.toggle(`sp-bevel`,n),s.style.borderRadius=n?`999px`:``,s.style.background=n?`#6b7280`:`var(--sp-accent)`,c.classList.toggle(`sp-bevel`,n),c.style.borderRadius=n?``:`0`,c.style.borderColor=n?`rgb(0 0 0 / 0.34)`:`transparent`,l.dataset.mode=e,l.textContent=t[e]};e(n,`mode`).addEventListener(`change`,e=>{u(e.detail)})}export{n as mount};