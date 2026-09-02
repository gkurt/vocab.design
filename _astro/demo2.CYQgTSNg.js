import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r=[[`Harbour ferry pass`,`4 Mar`],[`Bookbinder, Kew`,`4 Mar`],[`Kaffa Roast`,`3 Mar`],[`Hardware store`,`2 Mar`],[`Paper mill`,`1 Mar`],[`Cinema, late show`,`28 Feb`],[`Kaffa Roast`,`27 Feb`],[`Bookbinder, Kew`,`26 Feb`],[`Harbour ferry pass`,`25 Feb`],[`Paper mill`,`24 Feb`],[`Kaffa Roast`,`23 Feb`],[`Cinema, matinee`,`22 Feb`],[`Hardware store`,`21 Feb`],[`Harbour ferry pass`,`20 Feb`]],i=48,a=2,o={sticky:`A sticky bar never leaves, so its strip of the viewport is spent on every screen the reader will ever scroll past.`,hide:`A plain hiding bar leaves on the way down and returns only at the very top, so a reader who wants it has to throw away everything they scrolled through.`,"quick-return":`The first upward flick brings the bar back where the reader is standing. The room it costs is only spent while they are moving away from it.`};function s(s){let c=r.map(([e,t])=>`
      <li class="sp-list-item">
        <span class="sp-grow">${e}</span>
        <span class="sp-text">${t}</span>
      </li>`).join(``);s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 460px; height: 208px">
        <div class="sp-scroll" data-part="page" data-bar="rest" style="flex: 1 1 auto; position: relative">
          <div
            class="sp-row sp-row--between"
            data-part="header"
            data-subject
            data-pose="[data-behaviour=quick-return]"
            data-behaviour="quick-return"
            data-at="rest"
            style="position: sticky; top: 0; z-index: 1; padding: 9px 12px; background: var(--sp-surface); border-bottom: 1px solid var(--sp-line); transform: translateY(0); opacity: 1; transition: transform 0.22s var(--sp-ease), opacity 0.22s"
          >
            <span class="sp-heading" style="font-size: 14px">Statements</span>
            <span class="sp-row" style="gap: 6px">
              <span class="sp-label">Feb to Mar</span>
              <span class="sp-icon-button" style="cursor: default">${n(`search`)}</span>
            </span>
          </div>
          <ul class="sp-list sp-context" data-part="rows" style="padding: 0 6px 14px">${c}</ul>
        </div>
      </div>
      <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="quick-return" data-axis="Header" data-term="quick-return">
        <button class="sp-segment" type="button" data-part="mode-sticky" value="sticky" style="padding: 5px 9px; font-size: 12px">Sticky</button>
        <button class="sp-segment" type="button" data-part="mode-hide" value="hide" style="padding: 5px 9px; font-size: 12px">Hide on scroll</button>
        <button class="sp-segment" type="button" data-part="mode-quick" value="quick-return" style="padding: 5px 9px; font-size: 12px">Quick return</button>
      </sp-segmented>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px">${o[`quick-return`]}</span>
    </div>
  `;let l=e(s,`page`),u=e(s,`header`),d=e(s,`note`),f=`quick-return`,p=!1,m=0,h=()=>{u.dataset.at=p?`away`:`rest`,u.style.transform=p?`translateY(-100%)`:`translateY(0)`,u.style.opacity=p?`0`:`1`,l.dataset.bar=p?`away`:`rest`};l.addEventListener(`scroll`,()=>{let e=l.scrollTop,n=e>i;t(l,`data-deep`,n),f===`sticky`?p=!1:f===`hide`?p=n:n?e>m+a?p=!0:e<m-a&&(p=!1):p=!1,m=e,h()}),e(s,`mode`).addEventListener(`change`,e=>{f=e.detail,u.dataset.behaviour=f,d.textContent=o[f],p=f===`hide`&&l.scrollTop>i,h()})}export{s as mount};