function e(e){e.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-stack" style="gap: 4px">
          <span class="sp-label sp-context">superseded price</span>
          <div class="sp-row" data-part="price-row" style="gap: 10px; align-items: baseline">
            <s data-part="old-price" data-subject
               style="font-size: 20px; color: var(--sp-muted); text-decoration-thickness: 1.5px">£64.00</s>
            <span data-part="new-price" style="font-size: 20px; font-weight: 600">£39.00</span>
            <span class="sp-label sp-context">sale ends Sunday</span>
          </div>
        </div>
        <div class="sp-divider sp-context" style="margin: 14px 0"></div>
        <div class="sp-stack sp-context" style="gap: 6px">
          <span class="sp-label">finished task</span>
          <div class="sp-row" data-part="task" style="gap: 8px">
            <span class="sp-checkbox" data-checked role="img" aria-label="done"></span>
            <span class="sp-text sp-text--ink" style="text-decoration: line-through">Book the rehearsal room</span>
          </div>
          <div class="sp-row" style="gap: 8px">
            <span class="sp-checkbox" role="img" aria-label="not done"></span>
            <span class="sp-text sp-text--ink">Send the set list around</span>
          </div>
        </div>
        <div class="sp-divider sp-context" style="margin: 14px 0"></div>
        <div class="sp-stack sp-context" style="gap: 4px">
          <span class="sp-label">tracked deletion</span>
          <p class="sp-text sp-text--ink" data-part="tracked" style="margin: 0">
            The deadline is <del style="color: var(--sp-muted)">Friday</del>
            <ins style="text-decoration: underline">Monday</ins>, and the room is booked either way.
          </p>
        </div>
      </div>
    </div>
  `}export{e as mount};