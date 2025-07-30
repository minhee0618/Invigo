(async () => {
  const id = new URLSearchParams(window.location.search).get("id");

  // ✅ 1. 초대장 ID 표시
  document.getElementById("invitationId").textContent = ` 초대장 ID: ${id}`;

  // ✅ 2. 마이페이지 링크에 ID 포함
  const myPageLink = document.getElementById("mypageLink");
  if (myPageLink && id) {
    myPageLink.href = `/Nmy/Nmy.html?id=${id}`;
  }

  if (!id) {
    document.getElementById("summary").textContent = "❌ 초대장 ID가 없습니다.";
    return;
  }

  try {
    const response = await fetch(`/api/invitations/${id}/rsvp/stats`);
    const result = await response.json();

    if (!result.success) {
      document.getElementById("summary").textContent = "❌ 통계 로드 실패";
      return;
    }

    const { yes, no } = result.stats;
    document.getElementById("summary").textContent = `참석: ${yes}명 | 불참: ${no}명`;

    const rsvpList = result.list;

    // ✅ RSVP 차트
    new Chart(document.getElementById("rsvpChart"), {
      type: "pie",
      data: {
        labels: ["참석", "불참"],
        datasets: [{
          label: "응답 수",
          data: [yes, no],
          backgroundColor: ["#B3AFC3", "#111"]
        }]
      }
    });

    // ✅ RSVP 테이블 렌더링 함수
    function renderRsvpTable(list) {
      const tbody = document.getElementById("rsvpBody");
      tbody.innerHTML = "";

      list.forEach((item, index) => {
        const row = `
          <tr>
            <td>${item.name}</td>
            <td>${item.answer === 'yes' ? '⭕' : '❌'}</td>
            <td>${item.email}</td>
            <td>${item.wantsReminder ? '✔️' : '-'}</td>
            <td>${new Date(item.timestamp).toLocaleString()}</td>
          </tr>`;
        tbody.insertAdjacentHTML("beforeend", row);
      });
    }

    renderRsvpTable(rsvpList); // 초기 전체 목록 표시

    // ✅ 필터 상태
    let currentAttendFilter = "all";
    let currentReminderFilter = "all";

    // ✅ 필터 적용 함수
    function applyFilters() {
      const filteredList = rsvpList.filter(item => {
        const attendMatch =
          currentAttendFilter === "all" || item.answer === currentAttendFilter;

        const reminderMatch =
          currentReminderFilter === "all" ||
          (currentReminderFilter === "yes" && item.wantsReminder) ||
          (currentReminderFilter === "no" && !item.wantsReminder);

        return attendMatch && reminderMatch;
      });

      renderRsvpTable(filteredList);
    }

    // ✅ 드롭다운 이벤트 설정
    document.getElementById("attendFilterToggle").addEventListener("click", () => {
      document.getElementById("attendFilterOptions").classList.toggle("hidden");
    });

    document.getElementById("reminderFilterToggle").addEventListener("click", () => {
      document.getElementById("reminderFilterOptions").classList.toggle("hidden");
    });

    document.querySelectorAll("#attendFilterOptions li").forEach(li => {
      li.addEventListener("click", () => {
        currentAttendFilter = li.dataset.value;
        document.getElementById("attendFilterOptions").classList.add("hidden");
        applyFilters();
      });
    });

    document.querySelectorAll("#reminderFilterOptions li").forEach(li => {
      li.addEventListener("click", () => {
        currentReminderFilter = li.dataset.value;
        document.getElementById("reminderFilterOptions").classList.add("hidden");
        applyFilters();
      });
    });

// ✅ 리마인더 이메일 발송 버튼
document.getElementById("ReminderSendBtn").addEventListener("click", () => {
  const recipients = rsvpList
    .filter(item => item.wantsReminder && item.email)
    .map((item, index) => ({
      email: item.email,
      name: item.name,
      id: `recipient-${index}`
    }));

  if (recipients.length === 0) {
    alert("리마인더 이메일 발송에 동의한 사용자가 없습니다.");
    return;
  }

  // ✅ 리스트 렌더링
  const listContainer = document.getElementById("recipientList");
  listContainer.innerHTML = "";

  recipients.forEach(r => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="checkbox" id="${r.id}" checked>
      ${r.name} (${r.email})
    `;
    listContainer.appendChild(label);
  });

  document.getElementById("emailPopupText").textContent =
    ` ${recipients.length}명에게 이메일을 발송할까요?`;

  document.getElementById("emailPopup").classList.remove("hidden");

  document.getElementById("sendEmailBtn").onclick = async () => {

    const selected = recipients.filter(r => {
      const checkbox = document.getElementById(r.id);
      return checkbox && checkbox.checked;
    });

    if (selected.length === 0) {
      alert("선택된 수신자가 없습니다.");
      return;
    }

    const sendBtn = document.getElementById("sendEmailBtn");
    sendBtn.disabled = true;
    const originalText = sendBtn.textContent;
    sendBtn.textContent = "전송 중...";

    try {
      const response = await fetch(`/api/invitations/${id}/reminder-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipients: selected })
      });
    
      const result = await response.json();

      // ✅ 전송 결과 
      if (result.success && Array.isArray(result.results)) {
        const listEl = document.getElementById("emailResultList");
        const summaryEl = document.getElementById("emailResultText");
        listEl.innerHTML = "";

        let successCount = 0;
        let failCount = 0;

        result.results.forEach(r => {
          const li = document.createElement("li");

          if (r.status === "sent") {
            li.textContent = `✔️ ${r.name} (${r.email})`;
            li.classList.add("success");
            successCount++;
          } else {
            li.textContent = `❌ ${r.name} (${r.email}) - ${r.error || "전송 실패"}`;
            li.classList.add("fail");
            failCount++;
          }

          listEl.appendChild(li);
        });

        summaryEl.textContent = `성공: ${successCount}명 / 실패: ${failCount}명`;

        document.getElementById("emailResultPopup").classList.remove("hidden");
      } else {
        alert("❌ 이메일 발송 실패: " + (result.error || "알 수 없는 오류"));
      }
    } catch (err) {
      console.error("이메일 전송 오류:", err);
      alert("❌ 서버 오류로 이메일 발송에 실패했습니다.");
    }

    sendBtn.disabled = false;
    sendBtn.textContent = originalText;
    document.getElementById("emailPopup").classList.add("hidden");
  };

  // 닫기 버튼
  document.getElementById("cancelEmailBtn").onclick = () => {
    document.getElementById("emailPopup").classList.add("hidden");
  };

  document.getElementById("closeEmailResultBtn").onclick = () => {
    document.getElementById("emailResultPopup").classList.add("hidden");
  };
});

  

  // ✅ 설문 통계 차트 추가
  const surveyContainer = document.getElementById("surveyCharts");
  const surveyStats = result.surveyStats;
  const totalRsvpCount = rsvpList.length; // ✅ RSVP 전체 수
  
  Object.entries(surveyStats).forEach(([question, options],index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "survey-block";
  
    let innerHTML = `<h4>Q${index + 1}. ${question}</h4><div class="survey-bars">`;

    const preferredOrder = ["option1", "option2", "무응답"];
    const sortedOptions = Object.entries(options).sort((a, b) => {
      const indexA = preferredOrder.indexOf(a[0]);
      const indexB = preferredOrder.indexOf(b[0]);
      return indexA - indexB;
    });
  
    sortedOptions.forEach(([option, count]) => {
      const percent = ((count / totalRsvpCount) * 100).toFixed(1);
      innerHTML += `
        <div class="bar-row">
          <span class="bar-label">${option}</span>
          <div class="bar-track">
            <div class="bar-fill" style="width:${percent}%; ${option === "무응답" ? 'background-color:#888;' : ''}"></div>
          </div>
          <span class="bar-count">${count}명 (${percent}%)</span>
        </div>`;
    });
  
    innerHTML += `</div>`;
    wrapper.innerHTML = innerHTML;
    surveyContainer.appendChild(wrapper);
  });

  // ✅ 메시지 불러오기
(async () => {
  const res = await fetch(`/api/invitations/${id}/message`);
  const result = await res.json();

  if (result.success) {
    const container = document.getElementById("messageListContainer");
    result.messages.forEach(msg => {
      const card = document.createElement("div");
      card.className = "message-card";

      const text = document.createElement("div");
      text.className = "message-text";
      text.textContent = msg.content;

      const time = document.createElement("div");
      time.className = "message-time";
      time.textContent = new Date(msg.timestamp).toLocaleString();

      card.appendChild(text);
      card.appendChild(time);
      container.appendChild(card);
    });
  }
})();

  } catch (err) {
    console.error("데이터 불러오기 실패:", err);
    document.getElementById("summary").textContent = "❌ 서버 오류 발생";
  }
})();