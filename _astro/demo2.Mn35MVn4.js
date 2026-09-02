import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[{char:`😀`,key:`grin`,words:`grin happy smile`,cat:`smileys`},{char:`😂`,key:`joy`,words:`joy laugh cry`,cat:`smileys`},{char:`🙂`,key:`slight`,words:`slight smile fine`,cat:`smileys`},{char:`😍`,key:`love`,words:`love hearts adore`,cat:`smileys`},{char:`😎`,key:`cool`,words:`cool sunglasses`,cat:`smileys`},{char:`🤔`,key:`think`,words:`think hmm doubt`,cat:`smileys`},{char:`😅`,key:`sweat`,words:`sweat relief phew`,cat:`smileys`},{char:`🥳`,key:`party`,words:`party celebrate`,cat:`smileys`},{char:`😴`,key:`sleep`,words:`sleep tired zzz`,cat:`smileys`},{char:`👋`,key:`wave`,words:`wave hello hi bye`,cat:`smileys`},{char:`👍`,key:`thumbsup`,words:`thumbs up yes ok`,cat:`smileys`},{char:`👏`,key:`clap`,words:`clap applause`,cat:`smileys`},{char:`🙌`,key:`raised`,words:`raised hands praise`,cat:`smileys`},{char:`💪`,key:`muscle`,words:`muscle strong`,cat:`smileys`},{char:`🤝`,key:`shake`,words:`handshake deal`,cat:`smileys`},{char:`🎉`,key:`tada`,words:`tada party popper`,cat:`smileys`},{char:`🌊`,key:`ocean`,words:`ocean sea tide surf`,cat:`nature`},{char:`⭐`,key:`star`,words:`star night`,cat:`nature`},{char:`🔥`,key:`fire`,words:`fire hot flame`,cat:`nature`},{char:`🐙`,key:`octopus`,words:`octopus sea creature`,cat:`nature`},{char:`🌙`,key:`moon`,words:`moon night crescent`,cat:`nature`},{char:`🍃`,key:`leaf`,words:`leaf wind green`,cat:`nature`},{char:`☕`,key:`coffee`,words:`coffee tea hot drink`,cat:`food`},{char:`🍉`,key:`melon`,words:`melon fruit summer`,cat:`food`},{char:`🍞`,key:`bread`,words:`bread loaf bakery`,cat:`food`},{char:`🍜`,key:`noodles`,words:`noodles ramen bowl`,cat:`food`},{char:`🍰`,key:`cake`,words:`cake slice birthday`,cat:`food`},{char:`🍇`,key:`grapes`,words:`grapes fruit vine`,cat:`food`}],r=[`thumbsup`,`tada`,`slight`,`coffee`,`ocean`,`fire`],i=[{key:`recent`,label:`Recently used`},{key:`smileys`,label:`Smileys and people`},{key:`nature`,label:`Nature`},{key:`food`,label:`Food and drink`}],a=`Survey went well`,o=e=>`
  <button
    class="sp-icon-button"
    type="button"
    data-part="emoji-${e.key}"
    aria-label="${e.words.split(` `)[0]}"
    style="width: 100%; min-width: 0; height: 26px; font-size: 16px; line-height: 1"
  >${e.char}</button>`;function s(s){let c=i.map(e=>`
    <button class="sp-chip" type="button" data-part="cat-${e.key}" style="padding: 3px 7px; font-size: 11px">${e.key===`recent`?`Recent`:e.label.split(` `)[0]}</button>`).join(``);s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-avatar">HS</span>
          <span class="sp-heading sp-grow">Harbour survey</span>
          <span class="sp-label">4 people</span>
        </div>
        <div class="sp-body" style="position: relative; display: flex; flex-direction: column; gap: 10px">
          <div class="sp-row sp-context" style="justify-content: flex-start">
            <span style="max-width: 70%; padding: 7px 11px; border-radius: 12px 12px 12px 4px; background: var(--sp-surface); border: 1px solid var(--sp-line); font-size: 13px">
              Low water at six, all measured.
            </span>
          </div>
          <div class="sp-row sp-context" style="justify-content: flex-end">
            <span style="max-width: 70%; padding: 7px 11px; border-radius: 12px 12px 4px 12px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 13px">
              Nice, that was quick.
            </span>
          </div>

          <div class="sp-row sp-context" style="margin-top: auto; gap: 8px">
            <div
              class="sp-grow"
              data-part="composer"
              data-count="0"
              style="display: flex; align-items: center; min-height: 32px; padding: 5px 10px; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); border-radius: 8px; font-size: 13px"
            >
              <span data-part="composer-text">${a}&nbsp;</span><span class="sp-caret"></span>
            </div>
            <button
              class="sp-icon-button"
              type="button"
              data-part="trigger"
              aria-label="Insert emoji"
              style="flex: 0 0 auto; font-size: 16px; line-height: 1"
            >🙂</button>
            <button class="sp-button sp-button--sm" type="button" style="flex: 0 0 auto">Send</button>
          </div>

          <div
            data-part="picker"
            data-subject
            role="dialog"
            aria-label="Emoji"
            style="position: absolute; right: 12px; bottom: 54px; width: 252px; padding: 8px; background: var(--sp-surface);
                   border: 1px solid var(--sp-line); border-radius: var(--sp-radius); box-shadow: var(--sp-shadow);
                   opacity: 0; visibility: hidden; transform: translateY(6px);
                   transition: opacity 0.18s, visibility 0.18s, transform 0.18s var(--sp-ease)"
          >
            <div class="sp-row" style="gap: 6px">
              <input class="sp-input" type="text" data-part="search" placeholder="Search emoji" style="height: 28px" />
              <button class="sp-icon-button" type="button" data-part="close" aria-label="Close" style="flex: 0 0 auto; width: 24px; height: 24px">${t(`close`)}</button>
            </div>
            <div class="sp-row sp-row--wrap" style="gap: 4px; margin-top: 6px">${c}</div>
            <div class="sp-label" data-part="section" style="margin-top: 6px">Recently used</div>
            <div
              class="sp-grid"
              data-part="grid"
              role="listbox"
              aria-label="Emoji"
              style="grid-template-columns: repeat(8, 1fr); gap: 4px; margin-top: 4px; height: 86px; align-content: start"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(s,`picker`),u=e(s,`grid`),d=e(s,`section`),f=e(s,`search`),p=e(s,`composer`),m=e(s,`composer-text`),h=0,g=()=>{for(let e of u.querySelectorAll(`[data-part^="emoji-"]`))e.addEventListener(`click`,()=>{h+=1,m.innerHTML=`${m.innerHTML}${e.textContent??``}`,p.dataset.count=String(h)})},_=(e,t)=>{d.textContent=t,u.innerHTML=e.slice(0,24).map(o).join(``),g()},v=t=>{for(let n of i){let r=e(s,`cat-${n.key}`);n.key===t?r.setAttribute(`data-selected`,``):r.removeAttribute(`data-selected`)}let a=i.find(e=>e.key===t)??i[0],o=r.map(e=>n.find(t=>t.key===e)).filter(e=>e!==void 0);_(t===`recent`?o:n.filter(e=>e.cat===t),a.label)};for(let t of i)e(s,`cat-${t.key}`).addEventListener(`click`,()=>{f.value=``,v(t.key)});f.addEventListener(`input`,()=>{let t=f.value.trim().toLowerCase();if(t===``)return v(`recent`);for(let t of i)e(s,`cat-${t.key}`).removeAttribute(`data-selected`);_(n.filter(e=>e.words.includes(t)||e.key.includes(t)),`Results for “${t}”`)});let y=e=>{l.style.opacity=e?`1`:`0`,l.style.visibility=e?`visible`:`hidden`,l.style.transform=e?`translateY(0)`:`translateY(6px)`};e(s,`trigger`).addEventListener(`click`,()=>y(!0)),e(s,`close`).addEventListener(`click`,()=>y(!1)),v(`recent`),y(!1)}export{s as mount};