import{n as e,t}from"./parts.C-YLuC7Q.js";import{i as n}from"./measure.DK7AY2_i.js";var r=`[full-start] 1fr [content-start] min(36ch, 100%) [content-end] 1fr [full-end]`;function i(i){i.innerHTML=`
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame" style="width: 430px; height: 276px">
        <div
          data-part="page"
          style="flex: 1 1 auto; display: grid; align-content: start; grid-template-columns: ${r}; row-gap: 12px; padding: 12px 0; background: var(--sp-surface)"
        >
          <span class="sp-heading sp-context" data-part="title" style="grid-column: content">Harbour notes</span>
          <p class="sp-text sp-context" data-part="lede" style="grid-column: content; margin: 0">
            The tide gauge on the north pier has read half a metre high since the
            storm, and the survey is due before the autumn spring tides.
          </p>
          <figure
            data-part="band"
            data-subject
            style="grid-column: full; display: flex; align-items: flex-end; margin: 0; height: 68px; padding: 8px 12px; background: var(--sp-accent-soft); border-block: 1px solid var(--sp-line)"
          >
            <span class="sp-label" data-part="band-label">Plate 4, edge to edge</span>
          </figure>
          <p class="sp-text sp-context" data-part="tail" style="grid-column: content; margin: 0">
            Plate 4 was taken from the breakwater at low water. The rest of the
            survey photographs are held at the pier office.
          </p>
        </div>
      </div>
    </div>
  `;let a=e(i,`page`),o=e(i,`band`),s=e(i,`lede`),c=e=>n(e).width;t(o,`data-bleed`,c(o)>=a.clientWidth-1&&c(o)>c(s)+8)}export{i as mount};