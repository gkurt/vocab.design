import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[{key:`card`,target:`card`,say:`“Ada Lovelace, Reviewer, 2 hours ago”`}],r=[{key:`avatar`,target:`kid-avatar`,say:`“AL”`},{key:`name`,target:`kid-name`,say:`“Ada Lovelace”`},{key:`role`,target:`kid-role`,say:`“Reviewer”`},{key:`time`,target:`kid-time`,say:`“2 hours ago”`}],i={grouped:`One stop. The card is announced as a single item, so the reader hears the whole row at once and swipes past it once.`,ungrouped:`Four stops, and three of them are fragments: a pair of initials, a job word, and a time with nothing attached to it.`},a=[`kid-avatar`,`kid-name`,`kid-role`,`kid-time`];function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Children" data-term="grouped" data-value="grouped" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-grouped" value="grouped">Grouped</button>
            <button class="sp-segment" data-part="seg-ungrouped" value="ungrouped">Ungrouped</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="card" data-subject data-pose="[data-grouped]" data-grouped
             style="margin-top: 8px; padding: 9px 10px; display: flex; align-items: center; gap: 10px">
          <span class="sp-avatar" data-part="kid-avatar">AL</span>
          <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 2px">
            <span class="sp-text sp-text--ink" data-part="kid-name" style="font-size: 12.5px">Ada Lovelace</span>
            <span class="sp-label" data-part="kid-role" style="font-size: 11px">Reviewer</span>
          </div>
          <span class="sp-label" data-part="kid-time" style="flex: 0 0 auto; font-size: 11px">2 hours ago</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; gap: 10px">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="swipe">Swipe right</button>
          <span class="sp-text sp-text--ink" data-part="stops" data-n="1" data-at="card"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">Stop 1 of 1</span>
        </div>

        <span class="sp-text sp-text--ink" data-stage-announce data-part="say" data-at="card"
              style="display: block; margin-top: 9px; height: 18px; font-size: 11.5px; white-space: nowrap">${n[0]?.say}</span>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="grouped"
           style="margin: 7px 0 0; height: 34px; font-size: 11px">${i.grouped}</p>
      </div>
    </div>
  `;let s=e(o,`card`),c=e(o,`stops`),l=e(o,`say`),u=e(o,`caption`),d=`grouped`,f=0,p=()=>{let i=d===`grouped`?n:r,u=i[f]??i[0];if(u){t(s,`data-sim-focus`,u.target===`card`);for(let n of a)t(e(o,n),`data-sim-focus`,n===u.target);c.dataset.n=String(i.length),c.dataset.at=u.key,c.textContent=`Stop ${f+1} of ${i.length}`,l.dataset.at=u.key,l.textContent=u.say}},m=e=>{d=e,f=0,t(s,`data-grouped`,e===`grouped`),u.dataset.mode=e,u.textContent=i[e],p()};m(`grouped`),e(o,`swipe`).addEventListener(`click`,()=>{let e=d===`grouped`?n:r;f=Math.min(f+1,e.length-1),p()}),e(o,`segmented`).addEventListener(`change`,e=>{m(e.detail)})}export{o as mount};