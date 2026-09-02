var e=`border: 1px solid #000; padding: 2px 7px; text-align: left`,t=[[`01`,`Culvert, low tide`,`4:12`],[`02`,`Pylon hum`,`11:38`],[`03`,`Rain on a caravan`,`6:02`]],n=`color: #0000ee; text-decoration: underline; cursor: pointer`,r=`#551a8b`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div data-part="fragment" data-subject
           style="width: 336px; padding: 8px 14px; background: #ffffff; color: #000000; font-family: 'Times New Roman', Times, serif; font-size: 13px; line-height: 1.35">
        <h1 style="margin: 0; font-size: 24px; font-weight: 700; line-height: 1.15">Field Recordings</h1>
        <p style="margin: 5px 0 0">Updated 4 March. Three hundred bytes of CSS, and most of that is the table.</p>
        <p style="margin: 6px 0 0">
          <a data-part="link-index" style="${n}">Index</a>
          |
          <a data-part="link-archive" style="${n}">Archive</a>
          |
          <a data-part="link-notes" style="${n}">Notes</a>
        </p>
        <hr style="border: 0; border-top: 1px solid #000000; margin: 6px 0">
        <table style="border-collapse: collapse; font-family: inherit; font-size: 12px">
          <thead>
            <tr>
              <th style="${e}">No.</th>
              <th style="${e}">Site</th>
              <th style="${e}">Length</th>
            </tr>
          </thead>
          <tbody>${t.map(([t,n,r])=>`
      <tr>
        <td style="${e}">${t}</td>
        <td style="${e}">${n}</td>
        <td style="${e}">${r}</td>
      </tr>`).join(``)}</tbody>
        </table>
        <p style="margin: 6px 0 0">
          Files are WAV. Nothing is centred, nothing is rounded, and the links are the
          colour the browser made them.
        </p>
      </div>
      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 336px; text-align: center">
        System serif, default blue and purple, a real rule, a bordered table.
      </p>
    </div>
  `;for(let e of i.querySelectorAll(`[data-part^="link-"]`))e.addEventListener(`click`,()=>{e.style.color=r,e.setAttribute(`data-visited`,``)})}export{i as mount};