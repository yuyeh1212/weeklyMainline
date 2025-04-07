document.addEventListener("DOMContentLoaded", function () {
  // 動畫效果：載入時讓卡片逐一淡入
  const weekCards = document.querySelectorAll(".week-card");
  weekCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("fade-in");
    }, 100 * index);
  });

  // 點擊卡片事件處理（第1-7週）
  weekCards.forEach((card) => {
    if (!card.id || card.id !== "week8") {
      card.addEventListener("click", function () {
        const folder = this.getAttribute("data-folder");
        // 在新分頁開啟對應的index.html
        window.open(`${folder}/index.html`, "_blank");
      });

      // 懸停效果：移動卡片圖標
      card.addEventListener("mouseenter", function () {
        const icon = this.querySelector(".card-icon i");
        icon.style.transition = "transform 0.5s ease";

        // 隨機選擇動畫效果
        const effectNum = Math.floor(Math.random() * 3);
        switch (effectNum) {
          case 0:
            icon.style.transform = "translateY(-5px)";
            break;
          case 1:
            icon.style.transform = "rotate(15deg)";
            break;
          case 2:
            icon.style.transform = "scale(1.2)";
            break;
        }
      });

      card.addEventListener("mouseleave", function () {
        const icon = this.querySelector(".card-icon i");
        icon.style.transform = "none";
      });
    }
  });

  // 為特殊的第八週卡片添加脈動動畫
  const week8Card = document.getElementById("week8");
  if (week8Card) {
    const icon = week8Card.querySelector(".card-icon i");

    // 設置脈動動畫
    function pulseAnimation() {
      icon.style.transform = "scale(1.2)";
      setTimeout(() => {
        icon.style.transform = "scale(1)";
      }, 1000);
    }

    // 執行脈動動畫
    pulseAnimation();
    setInterval(pulseAnimation, 2000);

    // 按鈕懸停效果
    const buttons = week8Card.querySelectorAll(".btn");
    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.1)";
      });

      btn.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
      });
    });
  }

  // 在滾動時添加視差效果
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    weekCards.forEach((card, index) => {
      // 根據滾動位置微調卡片的位置，創造輕微的視差效果
      const offset = (scrollPosition * 0.03 * ((index % 3) + 1)) / 10;
      card.style.transform = `translateY(${-offset}px)`;
    });
  });
});
