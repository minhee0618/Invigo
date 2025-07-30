(async () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const res = await fetch(`/api/invitations/${id}`);
  const result = await res.json();
  const data = result.invitation;

  if (!result.success) {
    document.getElementById("preview").innerHTML = "<p>❌ 초대장을 불러올 수 없습니다.</p>";
    return;
  }

  const myPageLink = document.getElementById("mypageLink");
  if (myPageLink && id) {
    myPageLink.href = `/Nmy/Nmy.html?id=${id}`;
  }

  const dashboardBtn = document.querySelector(".dashboard-btn");
if (dashboardBtn) {
  dashboardBtn.addEventListener("click", () => {
    window.open(`/dashboard.html?id=${id}`, "_blank");
  });
}

const previewSection = document.querySelector(".preview-page-section");
const img = document.getElementById("preview-image");

if (data.background && previewSection && !data.image.startsWith("data:image/")) {
  previewSection.style.backgroundImage = `url(${data.background})`;
}

if (img && data.image) {
  img.src = data.image;
  img.style.maxWidth = "100%";
  img.style.borderRadius = "12px";
}
  if (data.options?.rsvpEnabled) {
    document.querySelector(".rsvp-section")?.classList.add("show");
  }

  if (data.options?.surveyEnabled && Array.isArray(data.survey)) {
    document.querySelector(".survey-section")?.classList.add("show");
    renderSurveyQuestions(data.survey);
  }
})();

function renderSurveyQuestions(surveyArray) {
  const surveySection = document.querySelector(".survey-section");
  surveySection.innerHTML = "<h3>설문 응답</h3>";

  surveyArray.forEach((item, idx) => {
    const container = document.createElement("div");
    container.className = "survey-question-block";

    const qText = document.createElement("p");
    qText.textContent = `Q${idx + 1}. ${item.question}`;
    container.appendChild(qText);

    const opt1 = document.createElement("label");
    opt1.className = "survey-option";
    opt1.innerHTML = `
      <input type="radio" name="survey-${idx}" value="${item.option1}" />
      ${item.option1}
    `;
    container.appendChild(opt1);

    const opt2 = document.createElement("label");
    opt2.className = "survey-option";
    opt2.innerHTML = `
      <input type="radio" name="survey-${idx}" value="${item.option2}" />
      ${item.option2}
    `;
    container.appendChild(opt2);

    surveySection.appendChild(container);
  });
}

// RSVP 선택 시 UI 효과
document.querySelectorAll(".rsvp-choice").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".rsvp-choice").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});
document.addEventListener("click", (e) => {
  if (e.target.type === "radio") {
    const name = e.target.name;
    document.querySelectorAll(`input[name="${name}"]`).forEach(input => {
      input.parentElement.classList.remove("selected");
    });
    e.target.parentElement.classList.add("selected");
  }
});

// 공유 URL 생성
const id =  new URLSearchParams(window.location.search).get("id");
const openUrl = `${window.location.origin}/open.html?id=${id}`;

// ✅ 메시지 서버 저장
async function sendMessageToServer() {
  const message = document.getElementById("shareComment")?.value || "";
  const name = document.getElementById("shareName")?.value || "";

  try {
    const res = await fetch(`/api/invitations/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, name })
    });

    return res.ok;
  } catch (err) {
    console.error("❌ 메시지 전송 실패:", err);
    return false;
  }
}

// ✅ 링크 버튼
document.getElementById("linkBtn").addEventListener("click", () => {
  document.getElementById("link-link").value = openUrl;
  document.getElementById("linkPopup").classList.remove("hidden");
});
document.getElementById("linkPopupClose").addEventListener("click", () => {
  document.getElementById("linkPopup").classList.add("hidden");
});
document.getElementById("linkCopyBtn").addEventListener("click", async () => {
  const success = await sendMessageToServer();
  if (success) {
    const input = document.getElementById("link-link");
    input.select();
    document.execCommand("copy");
    alert("링크가 복사되었습니다!");
    window.open(openUrl, "_blank");
  }
});

// ✅ QR 버튼
document.getElementById("qrBtn").addEventListener("click", () => {
  document.getElementById("qr-link").value = openUrl;
  const qrContainer = document.getElementById("qrImage");
  qrContainer.innerHTML = "";
  new QRCode(qrContainer, { text: openUrl, width: 200, height: 200 });
  document.getElementById("qrPopup").classList.remove("hidden");
});
document.getElementById("qrPopupClose").addEventListener("click", () => {
  document.getElementById("qrPopup").classList.add("hidden");
});
document.getElementById("qrCopyBtn").addEventListener("click", async () => {
  const canvas = document.querySelector("#qrImage canvas");
  const blob = await new Promise(resolve => canvas.toBlob(resolve));
  await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
  
  const success = await sendMessageToServer();
  if (success) {
    alert("QR 이미지가 복사되었습니다!");
    window.open(openUrl, "_blank");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const openUrl = `${window.location.origin}/open.html?id=${id}`;

  // ✅ 카카오톡 버튼 및 팝업 제어
  const kakaoBtn = document.querySelector('button[data-method="kakao"]');
  const kakaoPopup = document.getElementById("kakaoPopup");
  const kakaoPopupClose = document.getElementById("kakaoPopupClose");
  const kakaoSharePopupClose = document.getElementById("KakaoSharePopupClose");
  const kakaoSkipBtn = document.getElementById("kakaoSkipBtn");
  const kakaoSaveBtn = document.getElementById("kakaoSaveBtn");
  const kakaoCopyBtn = document.getElementById("kakaoCopyBtn");

  if (kakaoBtn) {
    kakaoBtn.addEventListener("click", () => {
      kakaoPopup.classList.remove("hidden");
    });
  }
  if (kakaoPopupClose) {
    kakaoPopupClose.addEventListener("click", () => {
      kakaoPopup.classList.add("hidden");
    });
  }
  if (kakaoSharePopupClose) {
    kakaoSharePopupClose.addEventListener("click", () => {
      kakaoPopup.classList.add("hidden");
    });
  }
  if (kakaoSkipBtn) {
    kakaoSkipBtn.addEventListener("click", () => {
      transitionToKakaoSharePopup(openUrl);
    });
  }
  if (kakaoSaveBtn) {
    kakaoSaveBtn.addEventListener("click", async () => {
      const seoData = {
        platform: "kakao",
        title: document.getElementById("kakaoOGTitle").textContent.trim(),
        description: document.getElementById("kakaoOGDesc").textContent.trim(),
        image: getBackgroundImageURL("kakaoOGImage"),
        url: document.getElementById("kakaoOGUrl").textContent.trim()
      };
      await fetch(`/api/invitations/${id}/seo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seoData)
      });
      alert("카카오 설정이 저장되었습니다!");
      transitionToKakaoSharePopup(openUrl);
    });
  }
  if (kakaoCopyBtn) {
    kakaoCopyBtn.addEventListener("click", async () => {
      const success = await sendMessageToServer();
      if (success) {
        const input = document.getElementById("kakao-link");
        input.select();
        document.execCommand("copy");
        alert("링크가 복사되었습니다!");
        window.open(openUrl, "_blank");
      }
    });
  }

  // ✅ 페이스북 버튼 및 팝업 제어
  const facebookBtn = document.querySelector('button[data-method="facebook"]');
  const facebookPopup = document.getElementById("facebookPopup");
  const facebookPopupClose = document.getElementById("facebookPopupClose");
  const facebookSharePopupClose = document.getElementById("facebookSharePopupClose");
  const facebookSkipBtn = document.getElementById("facebookSkipBtn");
  const facebookSaveBtn = document.getElementById("facebookSaveBtn");
  const facebookCopyBtn = document.getElementById("facebookCopyBtn");

  if (facebookBtn) {
    facebookBtn.addEventListener("click", () => {
      facebookPopup.classList.remove("hidden");
    });
  }
  if (facebookPopupClose) {
    facebookPopupClose.addEventListener("click", () => {
      facebookPopup.classList.add("hidden");
    });
  }
  if (facebookSharePopupClose) {
    facebookSharePopupClose.addEventListener("click", () => {
      facebookPopup.classList.add("hidden");
    });
  }
  if (facebookSkipBtn) {
    facebookSkipBtn.addEventListener("click", () => {
      transitionToFacebookSharePopup(openUrl);
    });
  }
  if (facebookSaveBtn) {
    facebookSaveBtn.addEventListener("click", async () => {
      const seoData = {
        platform: "facebook",
        title: document.getElementById("facebookOGTitle").textContent.trim(),
        description: document.getElementById("facebookOGDesc").textContent.trim(),
        image: getBackgroundImageURL("facebookOGImage"),
        url: document.getElementById("facebookOGUrl").textContent.trim()
      };
      await fetch(`/api/invitations/${id}/seo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seoData)
      });
      alert("페이스북 설정이 저장되었습니다!");
      transitionToFacebookSharePopup(openUrl);
    });
  }
  if (facebookCopyBtn) {
    facebookCopyBtn.addEventListener("click", async () => {
      const success = await sendMessageToServer();
      if (success) {
        const input = document.getElementById("facebook-link");
        input.select();
        document.execCommand("copy");
        alert("링크가 복사되었습니다!");
        window.open(openUrl, "_blank");
      }
    });
  }

  // ✅ 이미지 업로드 (카카오 / 페이스북 공통)
  ["kakaoOGImage", "facebookOGImage"].forEach(id => {
    const imageDiv = document.getElementById(id);
    const inputId = id + "Input";
    const input = document.getElementById(inputId);

    imageDiv.addEventListener("click", () => input.click());
    input.addEventListener("change", e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        imageDiv.style.backgroundImage = `url(${reader.result})`;
        imageDiv.textContent = "";
      };
      reader.readAsDataURL(file);
    });
  });
});

// ✅ 공유 전환 함수 (카카오)
function transitionToKakaoSharePopup(openUrl) {
  const og = document.getElementById("kakaoOGSection");
  const share = document.getElementById("kakaoShareSection");

  og.classList.add("hidden");
  og.style.display = "none";

  share.classList.remove("hidden");
  share.style.display = "block";

  document.getElementById("kakao-link").value = openUrl;
}

// ✅ 공유 전환 함수 (페이스북)
function transitionToFacebookSharePopup(openUrl) {
  const og = document.getElementById("facebookOGSection");
  const share = document.getElementById("facebookShareSection");

  og.classList.add("hidden");
  og.style.display = "none";

  share.classList.remove("hidden");
  share.style.display = "block";

  document.getElementById("facebook-link").value = openUrl;
}

const kakaoSharePopupClose = document.getElementById("KakaoSharePopupClose");
if (kakaoSharePopupClose) {
  kakaoSharePopupClose.addEventListener("click", () => {
    document.getElementById("kakaoPopup").classList.add("hidden");
  });
}

const facebookSharePopupClose = document.getElementById("facebookSharePopupClose");
if (facebookSharePopupClose) {
  facebookSharePopupClose.addEventListener("click", () => {
    document.getElementById("facebookPopup").classList.add("hidden");
  });
}
