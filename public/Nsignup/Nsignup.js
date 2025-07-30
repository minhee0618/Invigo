
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const signupBtn = document.querySelector(".signup-btn");

  const emailSendBtn = document.querySelector(".signup-email-btn");
  const emailCodeVerifyBtn = document.querySelector(".signup-email-code-btn");

  // ✅ 1. 이메일 인증번호 요청 버튼
  emailSendBtn.addEventListener("click", async() => {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();

    if (!name || !email) {
      alert("이름과 이메일을 입력해주세요.");
      return;
    }

    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ 이메일로 인증번호가 발송되었습니다.");
      } else {
        alert("❌ 인증번호 전송 실패: " + data.error);
      }
    } catch (err) {
      console.error("전송 오류:", err);
      alert("인증번호 요청 중 오류 발생");
    }
  });

  // ✅ 2. 인증번호 입력 확인 버튼
  emailCodeVerifyBtn.addEventListener("click", async () => {
    const email = document.getElementById("signup-email").value.trim();
    const code = document.getElementById("signup-email-code").value.trim();

    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code })
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ 이메일 인증이 완료되었습니다.");
      } else {
        alert("❌ 인증 실패: " + data.error);
      }
    } catch (err) {
      console.error("검증 오류:", err);
      alert("인증번호 확인 중 오류 발생");
    }
  });

  // ✅ 3. 회원가입 버튼
  signupBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const passwordConfirm = document.getElementById("signup-password-confirm").value;

    if (!name || !email || !password || !passwordConfirm) {
      alert("모든 입력란을 작성해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const verifyRes = await fetch(`/api/auth/verify-status?email=${email}`);
      const verifyData = await verifyRes.json();
      if (!verifyData.success || !verifyData.verified) {
        alert("📩 이메일 인증을 먼저 완료해주세요.");
        return;
      }
    } catch (err) {
      console.error("인증 상태 확인 실패:", err);
      alert("이메일 인증 상태 확인 중 오류 발생");
      return;
    }
        // Firebase Auth로 계정 생성
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const uid = user.uid;

      await user.updateProfile({ displayName: name });

      // Firestore에 사용자 정보 저장
      await db.collection("users").doc(uid).set({
        name,
        email,
        createdAt: new Date(),
        emailVerified: true,
      });

      alert(`${name}님, 회원가입이 완료되었습니다!`);
      window.location.href = "/Nlogin/Nlogin.html";
    } catch (error) {
      console.error("회원가입 오류:", error.message);
      alert("회원가입 실패: " + error.message);
    }
  });
});