function e(e){e.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 306px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Ridge Quay survey</span>
          <span class="sp-label">Section 2</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <p class="sp-text sp-context" style="margin: 0">
            Low water exposes the housing, which is the only time the staff plate can be
            read directly (<span data-part="xref" style="text-decoration: underline; text-underline-offset: 2px">Figure 3</span>).
          </p>

          <figure data-part="figure" data-subject style="margin: 0">
            <div
              aria-hidden="true"
              style="position: relative; height: 56px; border-radius: 6px; overflow: hidden;
                     background: linear-gradient(180deg, #cfe0ef 0 44%, #5d84a6 44%, #2f5375 100%)"
            >
              <span style="position: absolute; left: 28px; top: 6px; bottom: 0; width: 9px; border-radius: 2px;
                           background: repeating-linear-gradient(180deg, #f4efe6 0 5px, #7a6a55 5px 7px)"></span>
              <span style="position: absolute; right: 18px; top: 12px; width: 40px; height: 10px; border-radius: 5px;
                           background: rgb(255 255 255 / 0.72)"></span>
            </div>
            <figcaption class="sp-label" data-part="caption" style="margin-top: 6px">
              <span style="color: var(--sp-ink); font-weight: 600">Figure 3.</span>
              Tide gauge at low water, Ridge Quay.
            </figcaption>
          </figure>

          <figure data-part="figure-2" style="margin: 0">
            <pre
              style="margin: 0; padding: 7px 9px; border-radius: 6px; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
                     font-size: 10px; line-height: 1.45; overflow-x: auto"
            >&lt;figure&gt;
  &lt;img src="gauge.jpg" alt="Staff gauge"&gt;
  &lt;figcaption&gt;Figure 4&lt;/figcaption&gt;
&lt;/figure&gt;</pre>
            <figcaption class="sp-label" data-part="caption-2" style="margin-top: 6px">
              <span style="color: var(--sp-ink); font-weight: 600">Figure 4.</span>
              Markup for the gauge plate in the survey template.
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  `}export{e as mount};