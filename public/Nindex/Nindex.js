document.addEventListener("DOMContentLoaded", () => {
  
  /* Preview */
  let currentPreviewIndex = 0;
  const previewBoxes = document.querySelectorAll(".preview-box");
  const previewsPerPage = 1;

  function updatePreviewVisibility() {
    previewBoxes.forEach((box, index) => {
      box.style.display = (index >= currentPreviewIndex && index < currentPreviewIndex + previewsPerPage) ? "inline-block" : "none";
    });
  }

  window.prevSample = function () {
    if (currentPreviewIndex > 0) {
      currentPreviewIndex--;
      updatePreviewVisibility();
    }
  };

  window.nextSample = function () {
    if (currentPreviewIndex + previewsPerPage < previewBoxes.length) {
      currentPreviewIndex++;
      updatePreviewVisibility();
    }
  };

  updatePreviewVisibility(); 
  
  let previewInterval = setInterval(() => {
    window.nextSample();
  }, 3000);

  
  /* FAQ */
  window.toggleFAQ = function (element) {
    element.classList.toggle("active");
    const answer = element.nextElementSibling;
    answer.style.display = (answer.style.display === "block") ? "none" : "block";
  };

  /* Review 슬라이드 */
  let currentReviewIndex = 0;
  const reviewCards = document.querySelectorAll(".review-card");
  const reviewsPerPage = 3;

  function updateReviewVisibility() {
    reviewCards.forEach((card, index) => {
      card.style.display = (index >= currentReviewIndex && index < currentReviewIndex + reviewsPerPage) ? "block" : "none";
    });
  }

  window.prevReview = function () {
    if (currentReviewIndex > 0) {
      currentReviewIndex--;
      updateReviewVisibility();
    }
  };

  window.nextReview = function () {
    if (currentReviewIndex + reviewsPerPage < reviewCards.length) {
      currentReviewIndex++;
      updateReviewVisibility();
    }
  };

  updateReviewVisibility(); // 초기 렌더링

  /* 리뷰 폼 */
  window.openReviewForm = function () {
    const form = document.querySelector(".review-form");
    form.style.display = "block";
    form.style.opacity = "1";
  };

  window.closeReviewForm = function () {
    const form = document.querySelector(".review-form");
    form.style.opacity = "0";
    setTimeout(() => {
      form.style.display = "none";
    }, 300);
  };

  /* AboutUs 카드 뒤집기 */
  window.flipCard = function (element) {
    element.classList.toggle("flipped");
  };
});