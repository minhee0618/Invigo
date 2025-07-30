import { getShareCardHTML } from "./sharecardModule.js";

(async () => {
  document.getElementById("shareCardContainer").innerHTML = getShareCardHTML();

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const res = await fetch(`/api/invitations/${id}`);
  const result = await res.json();

  if (!result.success) {
    document.body.innerHTML = "<p>❌ 초대장을 불러올 수 없습니다.</p>";
    return;
  }

  const data = result.invitation;

  // 📅 구글 캘린더
  const addToGoogleBtn = document.getElementById("GoogleCalendarBtn");

  if (addToGoogleBtn) {
    const title = `InviGo - ${data.title || "초대장 일정"}`;
    const location = data.address || "";
    const info = [
      "InviGo에서 생성된 초대장입니다.",
      `일시: ${data.date || "날짜 미정"} ${data.time || "시간 미정"}`,
      "",
      data.information || "초대장 내용입니다."
    ].join("\n");
  
    // 날짜/시간
    let start = new Date();
    if (data.date && data.time) {
      const datetime = `${data.date}T${data.time}`;
      const parsed = new Date(datetime);
      if (!isNaN(parsed)) start = parsed;
    }
  
    const end = new Date(start.getTime() + 60 * 60 * 1000); // 1시간 후
  
    const formatGoogleTime = (d) =>
      d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  
    const googleCalendarUrl =
      `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent(title)}` +
      `&dates=${formatGoogleTime(start)}/${formatGoogleTime(end)}` +
      `&details=${encodeURIComponent(info)}` +
      `&location=${encodeURIComponent(location)}` +
      `&sf=true&output=xml`;
  
    addToGoogleBtn.addEventListener("click", () => {
      window.open(googleCalendarUrl, "_blank");
    });
  }

  // 💬 메시지 카드
  const messageCard = document.getElementById("messageCard");
  const recipientName = document.getElementById("recipientName");
  const messageText = document.getElementById("messageText");
  const blurOverlay = document.getElementById("blurOverlay");
  const shareCard = document.querySelector(".share-card");

  if (data.message && data.message.trim() !== "") {
    recipientName.textContent = data.name ? `${data.name}님께 온 메시지입니다.` : "메시지가 도착했습니다.";
    messageText.textContent = data.message;

    messageCard.classList.remove("hidden");
    blurOverlay.classList.remove("hidden");

    void messageCard.offsetWidth;
    messageCard.style.animation = "fadeInOut 5s ease-in-out forwards";

    setTimeout(() => {
      messageCard.style.display = "none";
      blurOverlay.classList.add("hidden");
      if (shareCard) shareCard.classList.remove("hidden");
    }, 5000);
  } else {
    if (shareCard) shareCard.classList.remove("hidden");
  }

  console.log("📨 받은 메시지:", data.message);
  console.log("👤 받은 이름:", data.name);

  // 📷 초대장 이미지
  const preview = document.getElementById("preview");
  if (!preview) {
    console.error("❌ preview 엘리먼트를 찾을 수 없습니다.");
    return;
  }
  
  // 🔥 AI 배경 이미지가 있을 경우 먼저 적용
const previewSection = document.querySelector(".preview-page-section"); // ✅ 정확한 선택자 사용

if (data.background && previewSection) {
  previewSection.style.backgroundImage = `url(${data.background})`;
  previewSection.style.backgroundSize = "cover";
  previewSection.style.backgroundPosition = "center";
  previewSection.style.zIndex = "0"; // 배경은 가장 뒤로
}
  
  // 📷 초대장 이미지 (덮지 않도록 maxWidth만 설정)
  const img = document.createElement("img");
  img.src = data.image;
  img.style.maxWidth = "100%";
  img.style.borderRadius = "12px";
  img.style.zIndex = "1"; // 🔼 텍스트보다도 아래
  preview.appendChild(img);

  // RSVP 섹션
  if (data.options?.rsvpEnabled) {
    document.getElementById("rsvpSection").classList.add("show");
  }

  // 📊 설문 섹션
  if (data.options?.surveyEnabled && Array.isArray(data.survey)) {
    document.getElementById("surveySection").classList.add("show");
    const surveyContainer = document.getElementById("survey-questions");
    surveyContainer.innerHTML = "";

    data.survey.forEach((item, idx) => {
      const container = document.createElement("div");
      container.className = "survey-question-block";

      const qText = document.createElement("p");
      qText.textContent = `Q${idx + 1}. ${item.question}`;
      container.appendChild(qText);

      const opt1 = document.createElement("label");
      opt1.className = "survey-option";
      opt1.innerHTML = `<input type="radio" name="survey-${idx}" value="${item.option1}" /> ${item.option1}`;
      container.appendChild(opt1);

      const opt2 = document.createElement("label");
      opt2.className = "survey-option";
      opt2.innerHTML = `<input type="radio" name="survey-${idx}" value="${item.option2}" /> ${item.option2}`;
      container.appendChild(opt2);

      surveyContainer.appendChild(container);
    });
  }
})();

// ✅ RSVP 및 survey 선택 시 스타일 효과
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("rsvp-choice")) {
    document.querySelectorAll(".rsvp-choice").forEach(b => b.classList.remove("selected"));
    e.target.classList.add("selected");
  }

  if (e.target.type === "radio") {
    const name = e.target.name;
    document.querySelectorAll(`input[name="${name}"]`).forEach(input => {
      input.parentElement.classList.remove("selected");
    });
    e.target.parentElement.classList.add("selected");
  }
});

// ✅ RSVP 제출
document.getElementById("finalSubmitBtn").addEventListener("click", async () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const name = document.getElementById("rsvpName")?.value || "";
  const email = document.getElementById("rsvpEmail")?.value || "";
  const wantsReminder = document.getElementById("rsvpReminder")?.checked || false;
  const selectedBtn = document.querySelector(".rsvp-choice.selected");
  const answer = selectedBtn ? selectedBtn.dataset.choice : "";

  const surveyAnswers = [];

  document.querySelectorAll(".survey-question-block").forEach((block, idx) => {
    const rawText = block.querySelector("p")?.textContent || `Q${idx + 1}`;
    const question = rawText.replace(/^Q\d+\.\s*/, '').trim(); // ← 핵심 수정
    const selected = block.querySelector("input[type='radio']:checked");
    if (selected) {
      surveyAnswers.push({
        question,
        answer: selected.value
      });
    }
  });

  const payload = {
    name,
    email,
    wantsReminder,
    answer,
    survey: surveyAnswers,
    timestamp: new Date().toISOString()
  };

  try {
    const res = await fetch(`/api/invitations/${id}/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert("응답이 저장되었습니다!");
      window.location.reload();
    } else {
      alert("❌ 저장 실패");
    }
  } catch (err) {
    console.error("❌ 저장 오류:", err);
    alert("네트워크 오류");
  }
});

// ✅ 메시지 전송
document.getElementById("comment-btn").addEventListener("click", async () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const content = document.getElementById("annComment").value.trim();

  if (!content) {
    alert("메시지를 입력해주세요.");
    return;
  }

  try {
    const res = await fetch(`/api/invitations/${id}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        timestamp: new Date().toISOString()
      })
    });

    const result = await res.json();
    if (result.success) {
      alert("메시지가 전송되었습니다!");
      document.getElementById("annComment").value = "";
    } else {
      alert("❌ 전송 실패: " + result.error);
    }
  } catch (err) {
    console.error("❌ 메시지 전송 오류:", err);
    alert("서버 오류로 메시지를 전송할 수 없습니다.");
  }
});

// ✅ 메시지 입력 제한 (2줄, 50자)
const commentBox = document.getElementById("annComment");

commentBox.addEventListener("input", () => {
  const lines = commentBox.value.split("\n");
  if (lines.length > 2) {
    commentBox.value = lines.slice(0, 2).join("\n");
  }
});

commentBox.setAttribute("maxlength", "50");
