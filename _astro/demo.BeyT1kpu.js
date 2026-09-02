var e=`#bfe8d5`,t=`#6b4b57`,n=`#4a3b42`,r=`
  <svg data-part="mascot" viewBox="0 0 96 72" width="84" height="63" role="presentation" style="display: block">
    <path d="M48 3c23 0 40 13 40 31 0 21-17 35-40 35S8 55 8 34C8 16 25 3 48 3Z" fill="${e}"/>
    <ellipse cx="31" cy="17" rx="11" ry="6" fill="#ffffff" opacity="0.5"/>
    <ellipse cx="20" cy="46" rx="7.5" ry="4.6" fill="#ffb3c9"/>
    <ellipse cx="76" cy="46" rx="7.5" ry="4.6" fill="#ffb3c9"/>
    <ellipse cx="35" cy="38" rx="6" ry="7.6" fill="${n}"/>
    <ellipse cx="61" cy="38" rx="6" ry="7.6" fill="${n}"/>
    <circle cx="37" cy="35" r="2.1" fill="#ffffff"/>
    <circle cx="63" cy="35" r="2.1" fill="#ffffff"/>
    <path d="M43 51q5 5.5 10 0" fill="none" stroke="${n}" stroke-width="2.4" stroke-linecap="round"/>
  </svg>`;function i(e){e.innerHTML=`
    <div class="sp-app">
      <div data-part="window"
           style="width: 298px; height: 256px; overflow: hidden; border-radius: 24px;
                  background: #fff7f1; color: ${t}; box-shadow: 0 10px 22px rgb(150 110 125 / 0.22)">

        <div data-part="topbar" style="display: flex; align-items: center; justify-content: space-between;
                                       padding: 10px 14px; background: #ffd9e6">
          <span style="padding: 3px 12px 4px; border-radius: 999px; background: rgb(255 255 255 / 0.7);
                       font-size: 12px; font-weight: 700">My snacks</span>
          <span class="sp-row" aria-hidden="true" style="gap: 5px">
            <span style="width: 9px; height: 9px; border-radius: 50%; background: rgb(255 255 255 / 0.85)"></span>
            <span style="width: 9px; height: 9px; border-radius: 50%; background: rgb(255 255 255 / 0.85)"></span>
            <span style="width: 9px; height: 9px; border-radius: 50%; background: rgb(255 255 255 / 0.85)"></span>
          </span>
        </div>

        <div style="padding: 12px">
          <div data-part="empty" data-subject
               style="display: flex; flex-direction: column; align-items: center; gap: 7px; padding: 13px 16px 16px;
                      border-radius: 20px; background: #fffdfb; box-shadow: 0 5px 0 rgb(255 214 228 / 0.9)">
            ${r}
            <span data-part="empty-title" style="font-size: 14px; font-weight: 700">Nothing here yet</span>
            <span style="font-size: 11px; text-align: center; opacity: 0.8">Add your first one and it will show up here.</span>
            <button type="button" data-part="empty-button"
                    style="margin-top: 3px; padding: 8px 22px 9px; border: 0; border-radius: 999px; background: #ffbcd6;
                           color: ${t}; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer;
                           box-shadow: 0 4px 0 #f194b8, 0 8px 12px rgb(150 110 125 / 0.24)">
              Add one
            </button>
          </div>
        </div>
      </div>
    </div>
  `}export{i as mount};