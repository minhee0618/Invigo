import {
  getTextSettingsHTML,
  attachTextSettingEvents,
  getBackgroundSettingsHTML,
  attachBackgroundSettingEvents,
  getImageSettingsHTML,
  attachImageSettingEvents,
  getMusicSettingsHTML,
  attachMusicSettingEvents,
  getTemplateSettingsHTML,
  attachTemplateSettingEvents,
  getMapSettingsHTML,
  attachMapSettingEvents,
  initFontSlider,
  initTextTemplateSlider,
  initTemplateSlider,
  drawKakaoMap,
} from './Ncreate_element.js';
  import { applyTemplate } from './Ncreate_text_templates.js';

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getAuth, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAvUQ7igS4lvz_8h-WxgHdyT_GgulZKksg",
  authDomain: "nproject2025-88217.firebaseapp.com",
  projectId: "nproject2025-88217",
  appId: "1:512743121549:web:86a08842265cfcb3e1f8c4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
  
  window.drawKakaoMap = drawKakaoMap;
  window.applyTemplate = applyTemplate; 

  export { makeElementDraggable };

  /**toogle T info-box and toggle */
    document.addEventListener("DOMContentLoaded", () => {
      const toggleBtn = document.querySelector(".info-toggle-btn");
      const fieldset = toggleBtn.closest("fieldset");
      
      toggleBtn.addEventListener("click", () => {
      fieldset.classList.toggle("closed");
      toggleBtn.textContent = fieldset.classList.contains("closed") ? "▲" : "▼";
      });
    });
  /**toogle T text-box and toggle */
  document.addEventListener("DOMContentLoaded", () => {
    const textToggleBtn = document.querySelector(".text-toggle-btn");
    const textFieldset = textToggleBtn.closest("fieldset");
  
    textToggleBtn.addEventListener("click", () => {
      textFieldset.classList.toggle("closed");
      textToggleBtn.textContent = textFieldset.classList.contains("closed") ? "▲" : "▼";
    });
  
    const addTextBtn = document.querySelector(".add-text-btn");
    const container = document.querySelector(".custom-text-fields");
  
    addTextBtn.addEventListener("click", () => {
      const fieldWrapper = document.createElement("div");
      fieldWrapper.className = "custom-text-field";
  
      const textarea = document.createElement("textarea");
    textarea.rows = 2;
    textarea.placeholder = "Add text";
    textarea.style.overflow = "hidden";
    textarea.style.resize = "none";

    // 🔥 자동 높이 조절 이벤트
    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-text-btn";
    deleteBtn.textContent = "✕";

    deleteBtn.addEventListener("click", () => {
      fieldWrapper.remove();
    });

    fieldWrapper.appendChild(textarea);
    fieldWrapper.appendChild(deleteBtn);
    container.appendChild(fieldWrapper);
  });
});

  /**toogle button */
  document.addEventListener("DOMContentLoaded", function () {
    const toolToggle = document.querySelector(".tool-toggle");
    const toolPannel = document.querySelector(".tool-pannel");
    const setToggle = document.querySelector(".set-toggle");
    const setPannel = document.querySelector(".set-pannel");

    toolToggle.addEventListener("click", () => {
      togglePanel(toolPannel, "left");
    });
    setToggle.addEventListener("click", () => {
      togglePanel(setPannel, "right");
    });
    
    function togglePanel(panel, direction) {
      const panels = [toolPannel, setPannel];
      const container = document.querySelector(".main-container");
    
      // 다른 패널 닫기
      panels.forEach(p => {
        if (p !== panel) p.classList.remove("open");
      });
    
      panel.classList.toggle("open");
    
      // 컨테이너 클래스 초기화
      container.classList.remove("left-open", "right-open", "default");
    
      if (panel.classList.contains("open")) {
        if (direction === "left") {
          container.classList.add("left-open");
        } else {
          container.classList.add("right-open");
        }
      } else {
        container.classList.add("default");
      }
    }
    /**toogle T// Ratio*/
    const ratioBoxes = document.querySelectorAll(".aspect-ratio-box");
    const previewBox = document.getElementById("preview-box");
    let currentRatio = "4/3"; 

    ratioBoxes.forEach((box) => {
      box.addEventListener("click", () => {
        currentRatio = box.getAttribute("data-ratio");
      
        document.querySelectorAll(".preview-page-section").forEach((card) => {
          card.style.aspectRatio = currentRatio;
        });
  
        ratioBoxes.forEach((b) => b.classList.remove("selected"));
        box.classList.add("selected");
      });
    });

    //**toogle T // Tools*// 
    const defaultBox = document.getElementById("default-tool-info-box");
    const editBox = document.getElementById("edit-sub-tool-box");
    const activeElementBtn = document.getElementById("active-element-btn");
    const backBtn = document.getElementById("back-btn");
    const elementSetting = document.querySelector(".elements-setting");

    document.querySelectorAll(".element-btn").forEach(btn => {
    btn.addEventListener("click", () => {
    const type = btn.dataset.element;

    defaultBox.style.display = "none";
    editBox.style.display = "block";

    activeElementBtn.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    activeElementBtn.setAttribute("data-element", type);
    
    if (type === "text") {
      elementSetting.innerHTML = getTextSettingsHTML();
      attachTextSettingEvents();
      initFontSlider();
      initTextTemplateSlider();
    } else if (type === "background") {
      elementSetting.innerHTML = getBackgroundSettingsHTML();
      attachBackgroundSettingEvents();
    } else if (type === "image") {
      elementSetting.innerHTML = getImageSettingsHTML();
      attachImageSettingEvents();
    } else if (type === "music") {
      elementSetting.innerHTML = getMusicSettingsHTML();
      attachMusicSettingEvents();
    } else if (type === "template") {
      elementSetting.innerHTML = getTemplateSettingsHTML();
      attachTemplateSettingEvents();
      initTemplateSlider();
    } else if (type === "map") {
      elementSetting.innerHTML = getMapSettingsHTML();
      attachMapSettingEvents();
    } 
  });
});

backBtn.addEventListener("click", () => {
  editBox.style.display = "none";
  defaultBox.style.display = "block";
  elementSetting.innerHTML = "";
});
});


/**Main Info Box - information-preview link */
document.addEventListener("DOMContentLoaded", function (){

  const nameInput = document.getElementById("name");
  const dateInput = document.getElementById("date");
  const timeInput = document.getElementById("time");
  const informationInput = document.getElementById("information");
  const addInput = document.getElementById("add");
  const telephoneInput = document.getElementById("telephone");
  const emailInput = document.getElementById("email");
  
  const previewName = document.getElementById("preview-name");
  const previewDate = document.getElementById("preview-date");
  const previewTime = document.getElementById("preview-time");
  const previewInformation = document.getElementById("preview-information");
  const previewAdd = document.getElementById("preview-add");
  const previewTelephone = document.getElementById("preview-telephone");
  const previewEmail = document.getElementById("preview-email");
  
  function updatePreview(inputElement, previewElement){
    inputElement.addEventListener("input",function(){
      previewElement.textContent = inputElement.value || "";
    });
  }
  
  updatePreview(nameInput, previewName);
  updatePreview(dateInput, previewDate);
  updatePreview(timeInput, previewTime);
  updatePreview(informationInput, previewInformation);
  updatePreview(addInput, previewAdd);
  updatePreview(telephoneInput, previewTelephone);
  updatePreview(emailInput, previewEmail);

  initDraggableTexts();
  });

/**Main text Box - text-preview link */
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".custom-text-fields");
  const previewContainer = document.querySelector(".preview-custom-texts");
  const previewCard = document.querySelector(".preview-card");

  // 감시 대상: 툴박스 안의 textarea들
  const observer = new MutationObserver(() => {
    const allTextFields = container.querySelectorAll("textarea");

    // 연결 초기화
    previewContainer.innerHTML = "";

    allTextFields.forEach(textarea => {
      const previewText = document.createElement("p");
      previewText.className = "preview-custom-text";
      previewText.textContent = textarea.value;

      // 실시간 반영
      textarea.addEventListener("input", () => {
        previewText.textContent = textarea.value;
      });

      previewContainer.appendChild(previewText);

      // ✅ 각 preview 텍스트에 드래그 기능 연결
      makeElementDraggable(previewText, previewCard);
    });
  });

  observer.observe(container, { childList: true, subtree: true });
});


/**Sub Tool Box - aspect ratio-preview link */
window.addEventListener("resize", function() {
  const previewContainer = document.querySelector(".preview-card");
  const width = previewContainer.offsetWidth;
  const height = width * (3 / 4); 
  previewContainer.style.height = `${height}px`;
});

document.addEventListener("DOMContentLoaded", function () {
  const previewCard = document.querySelector(".preview-page-section");
  const ratioBoxes = document.querySelectorAll(".aspect-ratio-box");

  ratioBoxes.forEach(box => {
    box.addEventListener("click", () => {
      const selectedRatio = box.getAttribute("data-ratio");

      previewCard.style.aspectRatio = selectedRatio;

      ratioBoxes.forEach(b => b.classList.remove("active"));
      box.classList.add("active");

      const width = previewCard.offsetWidth;
      const [w, h] = selectedRatio.split("/").map(Number);
      const height = width * (h / w);
      previewCard.style.height = `${height}px`;
    });
  });
});
/**drag and drop logic */  
function makeElementDraggable(el, container) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  el.style.position = "absolute";
  el.style.cursor = "move";

  el.addEventListener("mousedown", (e) => {
    isDragging = true;
    el.style.zIndex = 10;

    const elRect = el.getBoundingClientRect();
    offsetX = e.clientX - elRect.left;
    offsetY = e.clientY - elRect.top;

    e.preventDefault();

  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const containerRect = container.getBoundingClientRect();

    let x = e.clientX - containerRect.left - offsetX;
    let y = e.clientY - containerRect.top - offsetY;

    const maxX = container.clientWidth - el.offsetWidth;
    const maxY = container.clientHeight - el.offsetHeight - 20;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    el.style.left = `${Math.round(x)}px`;
    el.style.top = `${Math.round(y)}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    el.style.zIndex = 1;
  });
}
function initDraggableTexts() {
  document.querySelectorAll(".preview-card").forEach(card => {
    const paragraphs = card.querySelectorAll("p");


    paragraphs.forEach((p, index) => {
      if (!p.style.position) p.style.position = "absolute";
      if (!p.style.top) p.style.top = `${10 + index * 10}%`;
      if (!p.style.left) p.style.left = "10%";
      if (!p.style.cursor) p.style.cursor = "move";

      makeElementDraggable(p, card);
    });
  });
}

/****add rsvp survey */
document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.querySelector(".rsvp-checkbox input");
  const surveyArea = document.querySelector(".survey-area");
  const surveyContainer = document.querySelector(".survey-container");

  checkbox.addEventListener("change", () => {
    surveyArea.style.display = checkbox.checked ? "block" : "none";
    if (!checkbox.checked) surveyContainer.innerHTML = ""; // 체크 해제 시 설문 제거
  });

  const addSurveyBtn = document.querySelector(".add-survey-btn");
  addSurveyBtn.addEventListener("click", () => {
    const surveyHTML = `
      <div class="survey-box survey-item">
        <button class="delete-survey-btn">✕</button>
        <label> Q. <input type="text" class="survey-item"/></label>
        <label>option 1<input type="text" placeholder="Option 1" /></label>
        <label>option 2<input type="text" placeholder="Option 2" /></label>
      </div>
    `;
    surveyContainer.insertAdjacentHTML("beforeend", surveyHTML);

  const deleteBtns = surveyContainer.querySelectorAll(".delete-survey-btn");
    deleteBtns.forEach(btn => {
    btn.onclick = () => btn.parentElement.remove();
  });
  });
});
/***PNG Download */
document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("download-btn");
  const previewCard = document.querySelector(".preview-page-section");

  downloadBtn.addEventListener("click", () => {
    if (!previewCard) {
      alert("초대장을 찾을 수 없습니다!");
      return;
    }

    html2canvas(previewCard, {
      useCORS: true,
      backgroundColor: null
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'inviGO-invitation.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });
});

/** Add Page*/
document.addEventListener("DOMContentLoaded", () => {
const addPageBtn = document.querySelector(".add-page-btn");
const previewCard = document.querySelector(".preview-card");

addPageBtn.addEventListener("click", () => {
  const newSection = document.createElement("div");
  newSection.className = "preview-page-section";
  newSection.innerHTML = `
    <button class="delete-card-btn">✕</button>
    <div class="invite-card invite-card-front">
      <img style="display: none;" />
      <div class="music-preview"><span></span></div>
      <p></p><p></p><p></p><p></p><p></p><p></p><p></p>
    </div>
  `;

  const deleteBtn = newSection.querySelector(".delete-card-btn");
  deleteBtn.addEventListener("click", () => {
    newSection.remove();
  });

  previewCard.appendChild(newSection);
});
});

/***Share button */
document.addEventListener("DOMContentLoaded", () => {
  const shareBtn = document.getElementById("share-btn");
  const previewCard = document.querySelector(".preview-card");

  shareBtn.addEventListener("click", () => {
    if (!previewCard) {
      alert("⛔ 공유할 초대장이 없습니다.");
      return;
    }

    onAuthStateChanged(auth, async (user) => {
      try {
        const previewSection = document.querySelector(".preview-page-section");
        let background = null;

        const backgroundImageUrl = window.appliedAiBackgroundUrl;
        
        if (backgroundImageUrl) {
          background = backgroundImageUrl;
        } else {
          background = null;
        }
  

        // ✅ 초대장 preview를 이미지로 캡처
        const canvas = await html2canvas(previewCard, {
          useCORS: true,
          backgroundColor: null
        });
        const imageData = canvas.toDataURL("image/png");

        // ✅ RSVP/설문 설정 읽기
        const rsvpChecked = document.getElementById("rsvp-check")?.checked;
        const surveyData = getSurveyData();

        const invitationData = {
          image: imageData,
          background: background,
          options: {
            rsvpEnabled: !!rsvpChecked,
            surveyEnabled: surveyData.length > 0
          },
          survey: surveyData,
          title: document.getElementById("preview-name")?.textContent || "",
          date: document.getElementById("preview-date")?.textContent || "",
          time: document.getElementById("preview-time")?.textContent || "",
          address: document.getElementById("preview-add")?.textContent || "",
          information: document.getElementById("preview-information")?.textContent || "",
          userId: user ? user.uid : null
        };

        console.log("📦 전송할 invitationData:", invitationData);

        const res = await fetch('/api/invitations/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(invitationData)
        });

        const result = await res.json();
        if (result.success) {
          const viewUrl = `/view.html?id=${result.id}`;
          window.open(viewUrl, '_blank');
        } else {
          alert("❌ 공유 실패: " + result.error);
        }

        console.log("🔥 로그인 사용자:", user);

      } catch (err) {
        console.error(err);
        alert("❌ 서버 연결 실패: " + err.message);
      }
    }); // end of onAuthStateChanged
  }); // end of shareBtn click

  function getSurveyData() {
    const surveyBoxes = document.querySelectorAll(".survey-container .survey-box");
    const surveyArray = [];

    surveyBoxes.forEach(box => {
      const inputs = box.querySelectorAll("input[type='text']");
      const question = inputs[0]?.value.trim();
      const option1 = inputs[1]?.value.trim();
      const option2 = inputs[2]?.value.trim();

      if (question && option1 && option2) {
        surveyArray.push({ question, option1, option2 });
      }
    });

    return surveyArray;
  }

  console.log("🔥 로그인 사용자:", auth.currentUser);
});



