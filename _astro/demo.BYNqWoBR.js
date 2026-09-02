import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={"all-time":{top:[{rank:`1`,name:`Ravi Sundaram`,score:`214,800`},{rank:`2`,name:`Mika Lindqvist`,score:`198,240`},{rank:`3`,name:`Tomas Beck`,score:`187,110`},{rank:`4`,name:`Priya Anand`,score:`176,900`}],gap:`2,313 riders between`,you:{rank:`2,318`,name:`You`,score:`4,210`},note:`Two thousand three hundred names sit between the top four and this reader. The pinned row is the only reason the board says anything to them at all.`},week:{top:[{rank:`1`,name:`Priya Anand`,score:`9,140`},{rank:`2`,name:`Ravi Sundaram`,score:`8,720`},{rank:`3`,name:`Dee Okafor`,score:`8,050`},{rank:`4`,name:`Mika Lindqvist`,score:`7,880`}],gap:`52 riders between`,you:{rank:`57`,name:`You`,score:`910`},note:`A shorter window resets everyone who started earlier, and it moves the reader with it: fifty-two places from the cut rather than two thousand.`},friends:{top:[{rank:`1`,name:`Dee Okafor`,score:`6,420`},{rank:`2`,name:`Sam Whitlock`,score:`5,905`},{rank:`3`,name:`Nadia Sun`,score:`5,120`},{rank:`4`,name:`Ellis Ward`,score:`4,640`}],gap:`next place is 430 points away`,you:{rank:`5`,name:`You`,score:`4,210`},note:`Scoped to people the reader knows, the pinned row sits one place under the cut and the gap is a single evening of riding.`}},n=`all-time`;function r(r){let i=t[n];r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Cadence</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Scope" data-part="scope" data-value="${n}">
            <button class="sp-segment" type="button" data-part="scope-all-time" value="all-time" style="padding: 5px 9px; font-size: 12px">All time</button>
            <button class="sp-segment" type="button" data-part="scope-week" value="week" style="padding: 5px 9px; font-size: 12px">This week</button>
            <button class="sp-segment" type="button" data-part="scope-friends" value="friends" style="padding: 5px 9px; font-size: 12px">Friends</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <div class="sp-surface" style="padding: 8px 10px">
            <table class="sp-table" data-part="board" data-subject data-scope="${n}" style="--sp-cell-pad: 4px 8px">
              <thead>
                <tr>
                  <th style="width: 46px">Rank</th>
                  <th>Rider</th>
                  <th style="text-align: right">Points</th>
                </tr>
              </thead>
              <tbody>
                ${i.top.map((e,t)=>`<tr data-part="row-${t+1}">
        <td style="width: 46px; color: var(--sp-muted); font-variant-numeric: tabular-nums">${e.rank}</td>
        <td data-part="name-${t+1}">${e.name}</td>
        <td style="text-align: right; font-variant-numeric: tabular-nums">${e.score}</td>
      </tr>`).join(``)}
                <tr data-part="gap">
                  <td colspan="3" style="height: 20px; padding: 0 8px; border-bottom: 0; font-size: 11px; color: var(--sp-muted)">
                    <span data-part="gap-text">${i.gap}</span>
                  </td>
                </tr>
                <tr data-part="you" data-selected style="box-shadow: inset 0 2px 0 0 var(--sp-accent)">
                  <td data-part="you-rank" style="width: 46px; font-weight: 600; font-variant-numeric: tabular-nums">${i.you.rank}</td>
                  <td style="font-weight: 600">${i.you.name}</td>
                  <td data-part="you-score" style="text-align: right; font-weight: 600; font-variant-numeric: tabular-nums">${i.you.score}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px">${i.note}</span>
    </div>
  `;let a=e(r,`board`),o=e(r,`gap-text`),s=e(r,`you-rank`),c=e(r,`note`),l=n=>{let i=t[n];if(i){a.dataset.scope=n;for(let[t,n]of i.top.entries()){let i=e(r,`row-${t+1}`).children;i[0]&&(i[0].textContent=n.rank),i[1]&&(i[1].textContent=n.name),i[2]&&(i[2].textContent=n.score)}o.textContent=i.gap,s.textContent=i.you.rank,e(r,`you-score`).textContent=i.you.score,c.textContent=i.note}};e(r,`scope`).addEventListener(`change`,e=>l(e.detail))}export{r as mount};