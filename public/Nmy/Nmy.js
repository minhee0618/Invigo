// ✅ Firebase 모듈 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// ✅ 여기에 본인의 Firebase 구성 정보 입력 (Firebase 콘솔에서 복사)
const firebaseConfig = {
  apiKey: "AIzaSyAvUQ7igS4lvz_8h-WxgHdyT_GgulZKksg",
  authDomain: "nproject2025-88217.firebaseapp.com",
  projectId: "nproject2025-88217",
  appId: "1:512743121549:web:86a08842265cfcb3e1f8c4",
};

// ✅ Firebase 초기화 및 인증 객체 생성
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ DOM 로드 후 실행
document.addEventListener("DOMContentLoaded", () => {
  const guestSection = document.querySelector(".guest-mode");
  const userSection = document.querySelector(".user-mode");
  const listContainer = document.getElementById("invitationList");
  const inviteId = new URLSearchParams(window.location.search).get("id");
  const backLink = document.getElementById("backToDashboard");

  if (backLink && inviteId) {
    backLink.href = `/dashboard.html?id=${inviteId}`;
  }

  // ✅ 로그인 여부 감지
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // ✅ 로그인 상태 - 사용자 정보 표시
      const uid = user.uid;
      const email = user.email;
      const name = user.displayName || "사용자";

      document.getElementById("user-email").textContent = email;
      document.getElementById("user-name").textContent = name;

      guestSection.style.display = "none";
      userSection.style.display = "block";

      document.getElementById("logoutBtn").addEventListener("click", () => {
        auth.signOut().then(() => {
          alert("로그아웃되었습니다.");
          window.location.href = "/Nlogin/Nlogin.html";
        });
      });

      await loadInvitations(uid);
    } else {
      // ❌ 비로그인 상태
      guestSection.style.display = "block";
      userSection.style.display = "none";
      document.getElementById("preview-id").textContent = inviteId || "알 수 없음";
    }
  });

  // 설정 아이콘 hover 시 드롭다운 표시
const settingsIcon = document.querySelector(".settings-icon");
const dropdown = document.getElementById("settingsDropdown");

if (settingsIcon && dropdown) {
  settingsIcon.addEventListener("mouseenter", () => {
    dropdown.classList.remove("hidden");
  });
  dropdown.addEventListener("mouseleave", () => {
    dropdown.classList.add("hidden");
  });

  settingsIcon.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (!dropdown.matches(":hover")) {
        dropdown.classList.add("hidden");
      }
    }, 200);
  });
}

  // ✅ 초대장 목록 불러오기 함수
  async function loadInvitations(userId) {
    listContainer.innerHTML = "";

    try {
      const response = await fetch(`/api/invitations/user/${userId}`);
      const result = await response.json();

      if (!result.success) {
        listContainer.innerHTML = "<li>❌ 초대장 불러오기에 실패했습니다.</li>";
        return;
      }

      const invitations = result.invitations;

      if (invitations.length === 0) {
        listContainer.innerHTML = "<li>🕊️ 생성한 초대장이 없습니다.</li>";
        return;
      }

      invitations.forEach(invite => {
        const li = document.createElement("li");
        li.classList.add("invitation-item");

        li.innerHTML = `
          <img src="${invite.image || '/image/placeholder.png'}" alt="초대장" class="invite-thumbnail" />
          <div class="invite-details">
            <p class="invite-title">${invite.title || "제목 없음"}</p>
            <p class="invite-date">${invite.date || ""} ${invite.time || ""}</p>
            <p class="invite-id">초대장 ID: ${invite.id}</p>
          </div>
          <div class="invite-actions">
            <a href="/view.html?id=${invite.id}" target="_blank" class="btn">📤 공유하기</a>
            <a href="/dashboard.html?id=${invite.id}" target="_blank" class="btn">📊 통계</a>
            <a href="/email-status.html?id=${invite.id}" target="_blank" class="btn">📧 이메일</a>
            <button class="btn delete-btn" data-id="${invite.id}">🗑 삭제</button>
          </div>
        `;

        listContainer.appendChild(li);
      });
        // ✅ 삭제 버튼 이벤트 연결
        document.querySelectorAll(".delete-btn").forEach(btn => {
          btn.addEventListener("click", async () => {
            const id = btn.dataset.id;
            if (!confirm("정말 삭제하시겠습니까?")) return;
        
            try {
              const res = await fetch(`/api/invitations/${id}`, { method: "DELETE" });
        
              if (!res.ok) {
                const text = await res.text(); // 👈 HTML이라도 에러 디버그 가능
                throw new Error("삭제 실패: " + text);
              }
        
              const data = await res.json();
              if (data.success) {
                btn.closest("li").remove();
                alert("삭제되었습니다.");
              } else {
                alert("삭제 실패: " + data.error);
              }
            } catch (err) {
              console.error("삭제 오류:", err);
              alert("❌ 서버 오류로 삭제에 실패했습니다.");
            }
          });
        });
        
    } catch (err) {
      console.error("불러오기 오류:", err);
      listContainer.innerHTML = "<li>❌ 서버 오류가 발생했습니다.</li>";
    }
  }
});
