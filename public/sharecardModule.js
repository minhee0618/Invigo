export function getShareCardHTML() {
  injectShareCardCss();
  return `
    <div class="share-card">

      <div class="preview-container" id="preview">
      <div class="preview-page-section">
        <!-- 이미지와 배경이 이 안에 들어갑니다 -->
      </div>
      </div>

      <div class="sub-container">
        <div class="rsvp-section hidden" id="rsvpSection">
          <h2>참석 여부 확인</h2>
          <label for="rsvpName">이름</label><input type="text" id="rsvpName" placeholder="Name" />
          <label for="rsvpEmail">이메일</label><input type="email" id="rsvpEmail" placeholder="Email" />
          <div class="rsvp-reminder">
            <label>
              <input type="checkbox" id="rsvpReminder" />
              리마인더 이메일 받기
            </label>
          </div>
          <div class="rsvp-buttons">
            <button type="button" class="rsvp-choice" data-choice="yes">✔️ 참석</button>
            <button type="button" class="rsvp-choice" data-choice="no">❌ 불참</button>
          </div>
        </div>

        <div class="survey-section hidden" id="surveySection">
          <h2>설문 응답</h2>
          <div id="survey-questions"></div>
        </div>

        <div class="final-submit-buttons">
        <button id="finalSubmitBtn" class="finalSubmit-btn">save</button>
        </div>
      </div>

    </div>
  `;
}
function injectShareCardCss() {
  if (document.getElementById("share-card-style")) return; // 중복 방지

  const style = document.createElement("link");
  style.id = "share-card-style";
  style.rel = "stylesheet";
  
  // 📌 페이지에 따라 CSS 다르게 적용
  const isOpenPage = window.location.pathname.includes("open.html");
  style.href = isOpenPage ? "/open.css" : "/view.css";

  document.head.appendChild(style);
}