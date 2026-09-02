import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[[`Ferry pass`,`4 Mar`,`12.00`],[`Bookbinder`,`4 Mar`,`38.50`],[`Kaffa Roast`,`3 Mar`,`4.20`],[`Hardware store`,`2 Mar`,`61.75`],[`Ferry pass`,`1 Mar`,`12.00`],[`Paper mill`,`1 Mar`,`24.90`],[`Kaffa Roast`,`28 Feb`,`4.20`],[`Cinema`,`27 Feb`,`19.00`],[`Bookbinder`,`26 Feb`,`15.40`],[`Ferry pass`,`25 Feb`,`12.00`],[`Paper mill`,`24 Feb`,`31.10`],[`Kaffa Roast`,`24 Feb`,`4.20`]];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 258px">
        <div class="sp-scroll" data-part="page" style="flex: 1 1 auto">
          <div class="sp-context" data-part="lede" style="padding: 14px 12px 16px">
            <span class="sp-heading">March</span>
            <div class="sp-stack" style="margin-top: 10px">
              <div class="sp-line" style="width: 94%"></div>
              <div class="sp-line" style="width: 82%"></div>
              <div class="sp-line" style="width: 88%"></div>
            </div>
          </div>
          <div
            class="sp-row sp-row--between"
            data-part="header"
            data-subject
            style="position: sticky; top: 0; z-index: 1; padding: 9px 12px; background: var(--sp-surface); border-block: 1px solid var(--sp-line)"
          >
            <span class="sp-heading">Transactions</span>
            <span class="sp-label">12 this month</span>
          </div>
          <ul class="sp-list sp-context" data-part="rows" style="padding: 0 6px 12px">${n.map(([e,t,n])=>`
      <li class="sp-list-item">
        <span class="sp-grow">${e}</span>
        <span class="sp-text">${t}</span>
        <span class="sp-text sp-text--ink">${n}</span>
      </li>`).join(``)}</ul>
        </div>
      </div>
    </div>
  `;let i=e(r,`page`),a=e(r,`header`),o=()=>t(a,`data-stuck`,a.getBoundingClientRect().top-i.getBoundingClientRect().top<1);i.addEventListener(`scroll`,o),o()}export{r as mount};