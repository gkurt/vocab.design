import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={a:{fill:`70% 30% 52% 48% / 34% 63% 37% 66%`,ring:`45% 55% 68% 32% / 62% 40% 60% 38%`},b:{fill:`32% 68% 39% 61% / 61% 35% 65% 39%`,ring:`66% 34% 33% 67% / 38% 57% 43% 62%`}},n=`a`,r=`border-radius 0.55s var(--sp-ease)`;function i(i){let a=t[n];i.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-surface" data-part="scene"
           style="position: relative; width: 428px; height: 178px; overflow: hidden; background: #fbfbfd">

        <span data-part="blob-fill" data-subject data-shape="${n}" aria-hidden="true"
              style="position: absolute; left: 14px; top: 10px; width: 172px; height: 150px;
                     background: linear-gradient(140deg, #a78bfa, #60a5fa); opacity: 0.9;
                     border-radius: ${a.fill}; transition: ${r}"></span>

        <span class="sp-context" data-part="blob-ring" aria-hidden="true"
              style="position: absolute; left: 104px; top: 60px; width: 138px; height: 108px;
                     border: 2px solid #f0a3c8; border-radius: ${a.ring}; transition: ${r}"></span>

        <div class="sp-window sp-context" data-part="card"
             style="position: absolute; right: 16px; top: 50%; width: 200px; translate: 0 -50%; padding: 13px 15px">
          <div class="sp-heading" style="font-size: 14px">Start free</div>
          <p class="sp-text" style="margin: 5px 0 0; font-size: 12px">
            Two weeks of the full workspace. No card needed.
          </p>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="panel" style="gap: 10px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${n}" data-axis="Preset">
          <button class="sp-segment" data-part="seg-a" value="a">Shape A</button>
          <button class="sp-segment" data-part="seg-b" value="b">Shape B</button>
        </sp-segmented>
        <code data-part="radii"
              style="flex: 0 0 268px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px;
                     color: var(--sp-muted); white-space: nowrap">border-radius: ${a.fill}</code>
      </div>
    </div>
  `;let o=e(i,`blob-fill`),s=e(i,`blob-ring`),c=e(i,`radii`),l=e=>{let n=t[e];n&&(o.dataset.shape=e,o.style.borderRadius=n.fill,s.style.borderRadius=n.ring,c.textContent=`border-radius: ${n.fill}`)};e(i,`segmented`).addEventListener(`change`,e=>l(e.detail))}export{i as mount};