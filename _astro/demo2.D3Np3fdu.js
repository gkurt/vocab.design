import{n as e}from"./parts.C-YLuC7Q.js";var t=`#e6e9ef`,n=`#ffffff`,r=`#b7bdc9`,i=`#4c5566`,a=`#79839a`,o=`-6px -6px 12px ${n}, 6px 6px 12px ${r}`,s=`inset -5px -5px 10px ${n}, inset 5px 5px 10px ${r}`,c=`-3px -3px 7px ${n}, 3px 3px 7px ${r}`,l=900;function u(n,r){n.innerHTML=`
    <div class="sp-app" style="background: ${t}; gap: 22px; color: ${i}">
      <div class="sp-row" style="gap: 34px">
        <div data-part="dial" class="sp-context" style="width: 84px; height: 84px; border-radius: 50%;
             display: flex; align-items: center; justify-content: center; background: ${t}; box-shadow: ${o}">
          <div style="width: 54px; height: 54px; border-radius: 50%; background: ${t}; box-shadow: ${s};
                      display: flex; align-items: flex-start; justify-content: center; padding-top: 7px">
            <span style="width: 3px; height: 13px; border-radius: 2px; background: ${a}"></span>
          </div>
        </div>

        <button data-part="button" data-subject type="button" data-state="raised"
                style="width: 138px; height: 52px; border: 0; border-radius: 16px; background: ${t}; color: ${i};
                       font: inherit; font-size: 14px; font-weight: 600; letter-spacing: 0.01em; cursor: pointer;
                       box-shadow: ${o}; transition: box-shadow 0.16s var(--sp-ease)">
          Play
        </button>

        <div data-part="switch" class="sp-context" style="width: 68px; height: 36px; border-radius: 999px;
             background: ${t}; box-shadow: ${s}; display: flex; align-items: center; padding: 0 5px">
          <span style="width: 26px; height: 26px; border-radius: 50%; background: ${t}; box-shadow: ${c}"></span>
        </div>
      </div>

      <p data-stage-verdict data-part="caption" style="margin: 0; max-width: 400px; text-align: center; font-size: 12.5px;
                                    line-height: 1.5; color: ${a}">
        One colour for the whole scene. Every control is two shadows of it: light up and to the
        left, dark down and to the right.
      </p>
    </div>
  `;let u=e(n,`button`),d,f=e=>{u.dataset.state=e?`pressed`:`raised`,u.style.boxShadow=e?s:o};u.addEventListener(`pointerdown`,()=>{r.clearTimeout(d),f(!0)});let p=()=>{r.clearTimeout(d),d=r.setTimeout(()=>f(!1),l)};u.addEventListener(`pointerup`,p),u.addEventListener(`pointercancel`,p)}export{u as mount};