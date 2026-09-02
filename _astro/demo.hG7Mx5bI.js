import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-row" style="align-items: flex-start; gap: 26px">
        <div class="sp-stack" style="gap: 10px">
          <div data-part="minimal" data-subject
               style="width: 190px; min-height: 232px; padding: 22px; background: var(--sp-surface)">
            <div class="sp-label" data-part="eyebrow"
                 style="color: var(--sp-accent); letter-spacing: 0.1em; text-transform: uppercase">Focus</div>
            <div style="margin-top: 16px; font-size: 18px; font-weight: 500; line-height: 1.25; letter-spacing: -0.01em">
              The week's best long reads, one email.
            </div>
            <p style="margin: 14px 0 0; font-size: 13px; line-height: 1.6; color: var(--sp-muted)">
              Sent on Sunday mornings.
            </p>
            <button data-part="start" type="button"
                    style="margin-top: 20px; padding: 0; border: 0; background: none; font: inherit; font-size: 13px; font-weight: 500; color: var(--sp-accent); cursor: pointer">
              Start reading
            </button>
            <div data-stage-verdict data-part="note" style="min-height: 36px; margin-top: 10px; font-size: 12px; line-height: 1.5; color: var(--sp-muted)">
              Free while it stays quiet.
            </div>
          </div>
        </div>

        <div class="sp-stack sp-context" style="gap: 10px">
          <div data-part="decorated"
               style="width: 190px; min-height: 232px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 10px; box-shadow: var(--sp-shadow); overflow: hidden">
            <div class="sp-row sp-row--between"
                 style="padding: 8px 10px; background-image: linear-gradient(120deg, var(--sp-accent-soft), var(--sp-sunken)); border-bottom: 1px solid var(--sp-line)">
              <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">FS</span>
              <span class="sp-chip" style="padding: 2px 8px; font-size: 10px">NEW</span>
            </div>
            <div style="padding: 10px 12px 12px">
              <div class="sp-row" style="gap: 6px">
                ${t(`star`,`sp-icon--filled`)}
                <span style="font-size: 15px; font-weight: 700">Focus Suite</span>
              </div>
              <div class="sp-divider" style="margin: 8px 0"></div>
              <p style="margin: 0; font-size: 12px; line-height: 1.5; color: var(--sp-muted)">
                The week's best long reads, sent every Sunday morning, with editors' picks.
              </p>
              <div class="sp-row" style="margin-top: 10px; gap: 6px">
                <button class="sp-button sp-button--sm" type="button" style="font-size: 12px">Start</button>
                <button class="sp-button sp-button--sm sp-button--ghost" type="button" style="font-size: 12px">Tour</button>
              </div>
              <div class="sp-row" style="margin-top: 12px; gap: 5px">
                <span class="sp-line" style="width: 30px"></span>
                <span class="sp-line" style="width: 44px"></span>
                <span class="sp-line" style="width: 20px"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let r=e(n,`start`),i=e(n,`note`);r.addEventListener(`click`,()=>{i.textContent=`Saved. One letter a week, no images.`,i.setAttribute(`data-done`,``)})}export{n as mount};