import { makeElementDraggable } from './Ncreate.js'; 

/**text setting */
export function getTextSettingsHTML() {
  return `
    <div class="elements-title">Text Settings</div>
  
    <div class="setting-block">
      <label for="font" class="setting-label">Text Font</label>
      <div class="font-slider-container">
        <button class="font-arrow-left" onclick="prevfont()"> &#10094; </button>
        <div class="font-slider-wrapper">
        <div class="font-slider">
          <div class="font-box" data-font="Noto-Sans">Noto Sans</div>
          <div class="font-box" data-font="Noto-Serif">Noto Serif</div>
          <div class="font-box" data-font="Nanum-Gothic">Nanum Gothic</div>
          <div class="font-box" data-font="Nanum-Myeongjo">Nanum Myeongjo</div>
          <div class="font-box" data-font="Nanum-Pen-Script">Nanum Pen Script</div>
          <div class="font-box" data-font="Black-Han-Sans">Black Han Sans</div>
          <div class="font-box" data-font="Dongle">Dongle</div>
          <div class="font-box" data-font="Black-ANd-White-Picture">Black And White Picture</div>
          <div class="font-box" data-font="Hi-Melody">Hi Melody</div>
          <div class="font-box" data-font="Dokdo">Dokdo</div>
          <div class="font-box" data-font="Bagel-Fat-One">Bagel Fat One</div>
          <div class="font-box" data-font="Moirai-One">Moirai One</div>
        </div>
        </div>
        <button class="font-arrow-right" onclick="nextFont()">&#10095;</button>
      </div>
    </div>

    <div class="setting-block">
      <label for="font-color" class="setting-label">Text Color</label>
      <input type="color" id="font-color" />
    </div>

    <div class="setting-block">
      <label for="font-size" class="setting-label">Text Size</label>
      <input type="range" id="font-size" min="10" max="50" value="20" />
    </div>

    <div class="setting-block">
      <label for="font-weight" class="setting-label">Text Weight</label>
      <input type="range" id="font-weight" min="100" max="900" step="100" value="400" />
    </div>

    <div class="setting-block">
      <label for="template" class="setting-label">Text Template</label>
      <div class="text-template-slider-container">
        <button class="text-tem-arrow-left" onclick="prevTextTemplate()"> &#10094; </button>
        <div class="text-template-slider-wrapper">
        <div class="text-template-slider">
          <div class="text-template-box" data-tem="sample0"> Sample 0</div>
          <div class="text-template-box" data-tem="sample1"> Sample 1</div>
          <div class="text-template-box" data-tem="sample2"> Sample 2</div>
          <div class="text-template-box" data-tem="sample3"> Sample 3</div>          
          <div class="text-template-box" data-tem="sample4"> Sample 4</div>
          <div class="text-template-box" data-tem="sample5"> Sample 5</div>
          <div class="text-template-box" data-tem="sample6"> Sample 6</div>
          <div class="text-template-box" data-tem="sample7"> Sample 7</div>
          <div class="text-template-box" data-tem="sample8"> Sample 8</div>
          <div class="text-template-box" data-tem="sample9"> Sample 9</div>
          <div class="text-template-box" data-tem="sample10"> Sample 10</div>
          <div class="text-template-box" data-tem="sample11"> Sample 11</div>
          <div class="tex-template-box" data-tem="sample12"> Sample 12</div>
        </div>
        </div>
        <button class="text-tem-arrow-right" onclick="nextTextTemplate()"> &#10095; </button>
      </div>  
    </div>
  `;
}

export function attachTextSettingEvents(previewTarget = ".preview-page-section p") {
  const previewText = document.querySelectorAll(previewTarget);

  document.getElementById("font-color")?.addEventListener("input", e => {
    previewText.forEach(p => p.style.color = e.target.value);
  });

  document.getElementById("font-size")?.addEventListener("input", e => {
    previewText.forEach(p => p.style.fontSize = e.target.value + "px");
  });

  document.getElementById("font-weight")?.addEventListener("input", e => {
    previewText.forEach(p => p.style.fontWeight = e.target.value);
  });

  document.querySelectorAll(".font-box").forEach(box => {
    box.addEventListener("click", () => {
      const font = box.dataset.font;

      previewText.forEach(p => p.style.fontFamily = `var(--font-${font})`);
      document.querySelectorAll(".font-box").forEach(b => b.classList.remove("active"));
      box.classList.add("active");
    });
  });
  document.querySelectorAll(".text-template-box").forEach(box => {
    box.addEventListener("click", () => {
      const textTemplateName = box.dataset.tem;

      document.querySelectorAll(".text-template-box").forEach(b => b.classList.remove("active"));
      box.classList.add("active");
    });
  });
}
        /**font-slider */
export function initFontSlider() {
  const fontSlider = document.querySelector(".font-slider");
  const fontBoxes = document.querySelectorAll(".font-box");
  const leftArrow = document.querySelector(".font-arrow-left");
  const rightArrow = document.querySelector(".font-arrow-right");

  if (!fontSlider || fontBoxes.length === 0) return;

  let currentIndex = 0;
  const boxWidth = fontBoxes[0].getBoundingClientRect().width + 20;

  function getVisibleCount() {
    return Math.floor(fontSlider.parentElement.getBoundingClientRect().width / boxWidth);
  }

  function updateSliderPosition() {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, fontBoxes.length - visibleCount);
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const translateX = -(currentIndex * boxWidth);
    fontSlider.style.transform = `translateX(${translateX}px)`;
  }

  leftArrow?.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  rightArrow?.addEventListener("click", () => {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, fontBoxes.length - visibleCount);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSliderPosition();
    }
  });

  window.addEventListener("resize", updateSliderPosition);
  updateSliderPosition(); 
}
        /**text-template-slider */
export function initTextTemplateSlider() {
  const textTemplateSlider = document.querySelector(".text-template-slider");
  const textTemplateBoxes = document.querySelectorAll(".text-template-box");
  const leftArrow = document.querySelector(".text-tem-arrow-left");
  const rightArrow = document.querySelector(".text-tem-arrow-right");

  if (!textTemplateSlider || textTemplateBoxes.length === 0) return;

  let currentIndex = 0;
  const boxWidth = textTemplateBoxes[0].getBoundingClientRect().width + 20;

  function getVisibleCount() {
    return Math.floor(textTemplateSlider.parentElement.getBoundingClientRect().width / boxWidth);
  }

  function updateSliderPosition() {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, textTemplateBoxes.length - visibleCount);
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const translateX = -(currentIndex * boxWidth);
    textTemplateSlider.style.transform = `translateX(${translateX}px)`;
  }

  leftArrow?.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  rightArrow?.addEventListener("click", () => {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, textTemplateBoxes.length - visibleCount);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSliderPosition();
    }
  });

    // ✅ 템플릿 박스 클릭 시 템플릿 적용
    textTemplateBoxes.forEach(box => {
      box.addEventListener("click", () => {
        const templateName = box.dataset.tem;
        applyTemplate(templateName); // 🔥 연결됨
      });
    });
  
    updateSliderPosition();

  window.addEventListener("resize", updateSliderPosition);
  updateSliderPosition();
}

/**background setting */
export function getBackgroundSettingsHTML() {
  return `
    <div class="elements-title">Background Settings</div>

    <div class="setting-block">
      <label for="background-color" class="setting-label">Background Color</label>
      <input type="color" id="background-color" />
    </div>
  
    <div class="setting-block">
      <label for="background-image" class="setting-label">Background Image</label>
      <input type="file" id="background-image-upload" accept="image"/* />
    </div>     
      <div class="background-image-preview-container">
        <div id="background-image-preview-message"> 권장 이미지크기 800 * 600 </div>
        <img id="background-image-preview"  style="display:none;" />
      </div>
  

    <div class="setting-block">
      <label for="Generate-AI-background" class="setting-label">Generate AI background</label>
      <button id="generate-ai-background-btn" class="generate-ai-background-btn">Generate</button>
    </div>
      <div class="ai-background-image-preview-container">
        <div id="ai-background-image-preview-message"> AI Image를 생성할수 있습니다 </div>
        <img id="ai-background-image-preview"  style="display:none;" />
      </div>
`;
}

export function attachBackgroundSettingEvents() {
  const preview = document.querySelector(".preview-page-section");

  document.getElementById("background-color")?.addEventListener("input", (e) => {
    preview.style.backgroundImage = "none"; 
    preview.style.backgroundColor = e.target.value;
  });

  document.getElementById("background-image-upload")?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();    
    const bgImagePreview = document.getElementById("background-image-preview");
    const bgImageMessage = document.getElementById("background-image-preview-message");

    reader.onload = function () {
      preview.style.backgroundImage = `url(${reader.result})`;
      preview.style.backgroundSize = "cover";
      preview.style.backgroundPosition = "center";
      

      bgImagePreview.src = reader.result;
      bgImagePreview.style.display = "block";
      bgImageMessage.style.display = "none";
    };
    reader.readAsDataURL(file);
  });
  // ✅ AI Background Generate 버튼 클릭 → 모달 열기
  document.getElementById("generate-ai-background-btn")?.addEventListener("click", () => {
    const msg = document.getElementById("modal-ai-image-preview-message");
    const previewImg = document.getElementById("modal-ai-image-preview");

    msg.textContent = "AI 배경 이미지를 생성할 수 있습니다";
    previewImg.style.display = "none";
    previewImg.src = "";

    document.getElementById("applyAiImage").setAttribute("data-mode", "background");
    document.getElementById("aiImageModal").classList.remove("hidden");
  });

  // ✅ 모달 닫기 버튼
  document.getElementById("AIPopupClose")?.addEventListener("click", () => {
    document.getElementById("aiImageModal").classList.add("hidden");
  });

  // ✅ AI 이미지 생성 요청
  document.getElementById("submitAiImagePrompt")?.addEventListener("click", async () => {
    const prompt = document.getElementById("aiImagePrompt").value.trim();
    const msg = document.getElementById("modal-ai-image-preview-message");
    const previewImg = document.getElementById("modal-ai-image-preview");
  
    if (!prompt) {
      msg.textContent = "프롬프트를 입력해주세요.";
      return;
    }
    
    // ✅ 중복 클릭 방지
    const submitBtn = document.getElementById("submitAiImagePrompt"); 

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "⏳ 생성 중...";

    msg.textContent = "⏳ AI 이미지 생성 중입니다...";
    previewImg.style.display = "none";
    previewImg.src = "";

  
    try {
      const res = await fetch("/api/generate-and-upload-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
  
      const data = await res.json();
  
      if (data.success && data.url) {
        msg.textContent = "";
        previewImg.src = data.url;
        previewImg.style.display = "block";
      } else {
        msg.textContent = "❌ 이미지 생성 실패";
      }
    } catch (err) {
      console.error("🔥 서버 요청 실패:", err);
      msg.textContent = "❌ 서버 통신 에러";
    }finally {
      // ✅ 버튼 복원
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

// ✅ 적용하기 버튼 클릭 → 배경 적용
document.getElementById("applyAiImage")?.addEventListener("click", () => {
  const url = document.getElementById("modal-ai-image-preview").src;
  const mode = document.getElementById("applyAiImage").getAttribute("data-mode");
  if (!url || mode !== "background") return;

  const preview = document.querySelector(".preview-page-section");
  preview.style.backgroundImage = `url(${url})`;
  preview.style.backgroundSize = "cover";
  preview.style.backgroundPosition = "center";
  preview.style.zIndex = "0";

  window.appliedAiBackgroundUrl = url;

  // ✅ 미리보기 이미지에도 표시되도록 추가:
  const toolPreview = document.getElementById("ai-background-image-preview");
  const toolMessage = document.getElementById("ai-background-image-preview-message");
  if (toolPreview && toolMessage) {
    toolPreview.src = url;
    toolPreview.style.display = "block";
    toolMessage.style.display = "none";
  }

  document.getElementById("aiImageModal").classList.add("hidden");
});
  
}


/**template setting*/
export function getTemplateSettingsHTML() {
  return `
    <div class="elements-title">Template Settings</div>

      <div class="setting-block">
        <label for="template" class="setting-label">Template</label>
        <div class="template-slider-container">
          <button class="tem-arrow-left" onclick="prevTemplate()"> &#10094; </button>
          <div class="template-slider-wrapper">
          <div class="template-slider">
            <div class="template-box" data-tem="sample0"> Sample 0</div>
            <div class="template-box" data-tem="sample1"> Sample 1</div>
            <div class="template-box" data-tem="sample2"> Sample 2</div>
            <div class="template-box" data-tem="sample3"> Sample 3</div>          
            <div class="template-box" data-tem="sample4"> Sample 4</div>
            <div class="template-box" data-tem="sample5"> Sample 5</div>
            <div class="template-box" data-tem="sample6"> Sample 6</div>
            <div class="template-box" data-tem="sample7"> Sample 7</div>
            <div class="template-box" data-tem="sample8"> Sample 8</div>
            <div class="template-box" data-tem="sample9"> Sample 9</div>
            <div class="template-box" data-tem="sample10"> Sample 10</div>
            <div class="template-box" data-tem="sample11"> Sample 11</div>
            <div class="template-box" data-tem="sample12"> Sample 12</div>
          </div>
          </div>
          <button class="tem-arrow-right" onclick="nextTemplate()"> &#10095; </button>
        </div>  
      </div>
  `;
}

export function attachTemplateSettingEvents() {
  document.querySelectorAll(".template-box").forEach(box => {
    box.addEventListener("click", () => {
      const templateName = box.dataset.tem;

      document.querySelectorAll(".template-box").forEach(b => b.classList.remove("active"));
      box.classList.add("active");
    });
  });
}
        /**template-slider */
export function initTemplateSlider() {
  const templateSlider = document.querySelector(".template-slider");
  const templateBoxes = document.querySelectorAll(".template-box");
  const leftArrow = document.querySelector(".tem-arrow-left");
  const rightArrow = document.querySelector(".tem-arrow-right");

  if (!templateSlider || templateBoxes.length === 0) return;

  let currentIndex = 0;
  const boxWidth = templateBoxes[0].getBoundingClientRect().width + 20;

  function getVisibleCount() {
    return Math.floor(templateSlider.parentElement.getBoundingClientRect().width / boxWidth);
  }

  function updateSliderPosition() {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, templateBoxes.length - visibleCount);
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const translateX = -(currentIndex * boxWidth);
    templateSlider.style.transform = `translateX(${translateX}px)`;
  }

  leftArrow?.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  rightArrow?.addEventListener("click", () => {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, templateBoxes.length - visibleCount);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSliderPosition();
    }
  });

  window.addEventListener("resize", updateSliderPosition);
  updateSliderPosition();
}

/**Image setting */
export function getImageSettingsHTML() {
  return `
    <div class="setting-block">
      <label for="image" class="setting-label">Image</label>
      <input type="file" id="image-upload" accept="image"/* />
    </div>
      <div class="image-preview-container">
        <div id="image-preview-message"> 권장 이미지크기 800 * 600 </div>
        <img id="image-preview"  style="display:none;" />
      </div>

    <div class="setting-block">
      <label for="generate-ai-image" class="setting-label">Generate AI image</label>
      <button id="generate-ai-image-btn" class="generate-ai-image-btn">Generate</button>
    </div>
        <div class="ai-image-preview-container">
        <div id="ai-image-preview-message">AI Image를 생성할수 있습니다</div>
        <img id="ai-image-preview"  style="display:none;" />
      </div>
  `;
}

export function attachImageSettingEvents() {
  const previewCard = document.querySelector(".preview-page-section");
  const imageInput = document.getElementById("image-upload");
  const imagePreview = document.getElementById("image-preview");
  const imageMessage = document.getElementById("image-preview-message");

  imageInput?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
      imagePreview.src = reader.result;
      imagePreview.style.display = "block";
      imageMessage.style.display = "none";

      let img = previewCard.querySelector("img");
      if (!img) {
        img = document.createElement("img");
        img.classList.add("draggable-image");
        previewCard.insertBefore(img, previewCard.firstChild); 
      }

      img.src = reader.result;
      img.style.display = "block";
      img.style.maxWidth = "40%";
      img.style.margin = "10px auto";
      img.style.position = "absolute";
      img.style.left = "10%";
      img.style.top = "10%";
      img.style.cursor = "move";

      makeElementDraggable(img, previewCard);
    };
    reader.readAsDataURL(file);
  });

 //ai image
  document.getElementById("generate-ai-image-btn")?.addEventListener("click", () => {
  document.getElementById("aiImageModal").classList.remove("hidden");

  // 모달 초기화
  const msg = document.getElementById("modal-ai-image-preview-message");
  const previewImg = document.getElementById("modal-ai-image-preview");
  msg.textContent = "AI 이미지가 여기에 표시됩니다";
  previewImg.style.display = "none";
  previewImg.src = "";
});

document.getElementById("AIPopupClose")?.addEventListener("click", () => {
  document.getElementById("aiImageModal").classList.add("hidden");
});

document.getElementById("submitAiImagePrompt")?.addEventListener("click", () => {
  const prompt = document.getElementById("aiImagePrompt").value.trim();
  const msg = document.getElementById("modal-ai-image-preview-message");
  const previewImg = document.getElementById("modal-ai-image-preview");

  if (!prompt) {
    msg.textContent = "프롬프트를 입력해주세요.";
    return;
  }

  msg.textContent = "이미지 생성 중입니다...";
  previewImg.style.display = "none";
  previewImg.src = "";

  setTimeout(async () => {
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.success && data.url) {
        msg.textContent = "";
        previewImg.src = data.url;
        previewImg.style.display = "block";
      } else {
        msg.textContent = "이미지 생성 실패";
      }
    } catch (err) {
      msg.textContent = "요청 실패";
      console.error(err);
    }
  }, 50);
});

// 적용하기
document.getElementById("applyAiImage")?.addEventListener("click", () => {
  const url = document.getElementById("modal-ai-image-preview").src;
  if (!url) return;

  //  툴 패널
  const container = document.querySelector(".ai-image-preview-container");
  container.innerHTML = "";
  const appliedImg = document.createElement("img");
  appliedImg.src = url;
  appliedImg.style.maxWidth = "100%";
  appliedImg.style.marginTop = "1rem";
  container.appendChild(appliedImg);

  //  preview-card
  const previewCard = document.querySelector(".preview-page-section");
  let existingImg = previewCard.querySelector("img.draggable-image");
  if (existingImg) existingImg.remove();

  const cardImg = document.createElement("img");
  cardImg.src = url;
  cardImg.classList.add("draggable-image");
  cardImg.style.maxWidth = "40%";
  cardImg.style.position = "absolute";
  cardImg.style.left = "10%";
  cardImg.style.top = "10%";
  cardImg.style.cursor = "move";

  previewCard.appendChild(cardImg);
  makeElementDraggable(cardImg, previewCard);

  // 모달 닫기
  document.getElementById("aiImageModal").classList.add("hidden");
});

}

/**music setting */
export function getMusicSettingsHTML() {
  return `
  <div class="elements-title">Music Settings</div>

  <div class="setting-block">
    <label for="music" class="setting-label">Music</label><br>
    <input type="file" id="music-upload" accept="audio"/* />
    <audio id="music-preview" controls style="display: none; width: 100%; margin-top: 10px"></audio>
  </div>
`;
}

export function attachMusicSettingEvents() {
  const previewCard = document.querySelector(".preview-page-section");
  const musicInput = document.getElementById("music-upload");
  const musicPreview = document.getElementById("music-preview");

  musicInput?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
      musicPreview.src = reader.result;
      musicPreview.style.display = "block";
      musicPreview.play();
      
      let musicBox = previewCard.querySelector(".music-box");
      if (!musicBox) {
        musicBox = document.createElement("div");
        musicBox.classList.add("music-box");
        musicBox.style.position = "absolute";
        musicBox.style.left = "5%";
        musicBox.style.top = "5%";
        musicBox.style.zIndex = 6;

        previewCard.insertBefore(musicBox, previewCard.firstChild);
        makeElementDraggable(musicBox, previewCard);
      }

      musicBox.textContent = `🎵 ${file.name}`;
    };

    reader.readAsDataURL(file);
  });
}


/**map setting*/
export function getMapSettingsHTML() {
  return `
    <div class="elements-title">Map Settings</div>
    
    <div class="setting-block-map">
      <label for="map-address" class="setting-label">주소 입력</label>
      <input type="text" id="map-address" placeholder="서울특별시 강남구 테헤란로 123" />
      <button type="button" id="search-address-btn">주소 검색</button>  
    </div>

      <div class="map-insert-options">
        <div class="map-option-box" data-type="icon">
          <img src="/image/Kakaomap-icon.png" />
          <p>아이콘</p>
        </div>
        <div class="map-option-box" data-type="mini">
          <img src="/image/Kakaomap-mini.png" />
          <p>미니맵</p>
        </div>
      </div>
  `;
}

export function attachMapSettingEvents() {
  const preview = document.querySelector(".preview-page-section");

  document.getElementById("search-address-btn").addEventListener("click", () => {
    new daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = data.roadAddress || data.jibunAddress;
        document.getElementById("map-address").value = fullAddress;
      }
    }).open();
  });

  document.querySelectorAll(".map-option-box").forEach(box => {
    box.addEventListener("click", () => {
      const type = box.dataset.type;
      const addressInput = document.getElementById("map-address");
      const address = addressInput?.value.trim();

      if (!address) {
        alert("주소를 입력해주세요!");
        return;
      }

      if (preview.querySelector(`.preview-map-container[data-map-type="${type}"]`)) return;

      let mapHTML = "";

      if (type === "icon") {
        const kakaoMapLink = `https://map.kakao.com/?q=${encodeURIComponent(address)}`;
        mapHTML = `
          <div class="preview-map-container" data-map-type="icon">
            <span class="map-icon" style="cursor:pointer;" title="카카오맵에서 열기"
            onclick="window.open('${kakaoMapLink}','blank')">
            <img src="/image/Kakaomap-icon.png" width="30"/> </span>
            <span class="map-address">${address}</span>
          </div>
        `;
        preview.insertAdjacentHTML("beforeend", mapHTML);

        const iconMapEl = preview.querySelector(`.preview-map-container[data-map-type="icon"]`);
        makeElementDraggable(iconMapEl, preview);
      }

      if (type === "mini") {
        const mapId = `kakao-map-${Date.now()}`;
        mapHTML = `
          <div class="preview-map-container" data-map-type="mini">
            <div class="map-info-row">
              <span class="map-address">${address}</span>
            </div>
            <div class="map-embed">
              <div id="${mapId}" class="kakao-map"></div>
            </div>
          </div>
        `;

        preview.insertAdjacentHTML("beforeend", mapHTML);

        const miniMapEl = preview.querySelector(`.preview-map-container[data-map-type="mini"]`);
        
        setTimeout(() => {
          const mapContainer = document.getElementById(mapId);
          if (!mapContainer) {
            console.warn("mapContainer가 아직 없음. drawKakaoMap 강제 실행");
          }
          makeElementDraggable(miniMapEl, preview); 
          window.drawKakaoMap(mapId, address);
        }, 300);
      }
    });
  });
}

export function drawKakaoMap(containerId, address) {
  if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
    setTimeout(() => drawKakaoMap(containerId, address), 300);
    return;
  }

  const mapContainer = document.getElementById(containerId);
  if (!mapContainer) {
    setTimeout(() => drawKakaoMap(containerId, address), 300);
    return;
  }

  const geocoder = new kakao.maps.services.Geocoder();
  geocoder.addressSearch(address, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      const mapOption = {
        center: coords,
        level: 3,
        draggable: true,
        scrollwheel: true,
      };

      const map = new kakao.maps.Map(mapContainer, mapOption);
      new kakao.maps.Marker({
         map: map, 
         position: coords });

      console.log("✅ 지도 성공적으로 생성됨");
    } else {
      console.log("❌ 주소 검색 실패:", status);
    }
  });
}
