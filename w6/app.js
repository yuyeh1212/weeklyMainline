// 使用 IIFE 防止全局污染
(() => {
  // 封裝 DOM 元素選擇器 (保留原有結構但使用更現代的方式)
  class DOMElements {
    constructor() {
      this.ticketCardArea = document.querySelector(".ticketCard-area");
      this.regionSearch = document.querySelector(".regionSearch");
      this.addTicketBtn = document.querySelector(".addTicket-btn");
      this.cantFindArea = document.querySelector(".cantFind-area");
      this.searchResultText = document.getElementById("searchResult-text");
      this.form = document.querySelector(".addTicket-form");

      // 使用對象字面量創建關聯數組
      this.formInputs = {
        name: document.getElementById("ticketName"),
        imgUrl: document.getElementById("ticketImgUrl"),
        region: document.getElementById("ticketRegion"),
        price: document.getElementById("ticketPrice"),
        num: document.getElementById("ticketNum"),
        rate: document.getElementById("ticketRate"),
        description: document.getElementById("ticketDescription"),
      };

      this.alertMessages = {
        name: document.getElementById("ticketName-message"),
        imgUrl: document.getElementById("ticketImgUrl-message"),
        region: document.getElementById("ticketRegion-message"),
        price: document.getElementById("ticketPrice-message"),
        num: document.getElementById("ticketNum-message"),
        rate: document.getElementById("ticketRate-message"),
        description: document.getElementById("ticketDescription-message"),
      };
    }
  }

  // 資料管理類別
  class TicketDataManager {
    constructor() {
      this.tickets = [];
      this.apiUrl =
        "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";
      this.localStorageKey = "travelTickets";
    }

    // 從 API 或本地存儲獲取數據
    async fetchData() {
      try {
        // 先嘗試從 localStorage 獲取
        const cachedData = localStorage.getItem(this.localStorageKey);

        if (cachedData) {
          this.tickets = JSON.parse(cachedData);
          return this.tickets;
        }

        // 如果沒有緩存數據，則從 API 獲取
        const response = await axios.get(this.apiUrl);
        this.tickets = response.data.data;

        // 存入 localStorage
        this.saveToLocalStorage();
        return this.tickets;
      } catch (error) {
        console.error("資料獲取失敗:", error);
        NotificationManager.showError("資料載入失敗，請重新整理頁面");
        return [];
      }
    }

    // 保存到本地存儲
    saveToLocalStorage() {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.tickets));
    }

    // 根據地區篩選資料
    filterByRegion(region) {
      if (!region) return this.tickets;
      return this.tickets.filter((ticket) => ticket.area === region);
    }

    // 添加新票券
    addTicket(ticketData) {
      const newTicket = {
        id: Date.now(), // 使用時間戳作為唯一ID
        name: ticketData.name,
        imgUrl: ticketData.imgUrl,
        area: ticketData.region,
        description: ticketData.description,
        group: parseInt(ticketData.num, 10),
        price: parseInt(ticketData.price, 10),
        rate: parseInt(ticketData.rate, 10),
      };

      this.tickets.push(newTicket);
      this.saveToLocalStorage();
      return newTicket;
    }

    // 移除票券 (新增功能)
    removeTicket(id) {
      this.tickets = this.tickets.filter((ticket) => ticket.id !== id);
      this.saveToLocalStorage();
    }

    // 獲取區域統計 (新增功能)
    getRegionStats() {
      const stats = { total: this.tickets.length };
      this.tickets.forEach((ticket) => {
        stats[ticket.area] = (stats[ticket.area] || 0) + 1;
      });
      return stats;
    }
  }

  // UI 管理類別
  class UIManager {
    constructor(dom, dataManager) {
      this.dom = dom;
      this.dataManager = dataManager;
      this.isLoading = false;
    }

    // 建立單一票券卡片元素 (使用 template literals 增強可讀性)
    createTicketCard(ticket) {
      const li = document.createElement("li");
      li.className = "ticketCard";
      li.dataset.id = ticket.id;

      li.innerHTML = `
        <div class="ticketCard-img">
          <img src="${ticket.imgUrl}" alt="${ticket.name}" loading="lazy">
          <div class="ticketCard-region">${ticket.area}</div>
          <div class="ticketCard-rank">${ticket.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3><a href="#" class="ticketCard-name">${ticket.name}</a></h3>
            <p class="ticketCard-description">${ticket.description}</p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">套票組數: ${ticket.group}</p>
            <p class="ticketCard-price"><span>$${ticket.price}</span> 起</p>
          </div>
        </div>
      `;

      // 添加事件監聽器 (可選功能)
      const ticketLink = li.querySelector(".ticketCard-name");
      ticketLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.showTicketDetails(ticket);
      });

      return li;
    }

    // 渲染票券列表 (使用文檔片段優化性能)
    renderTickets(tickets) {
      // 開始渲染前設置載入狀態
      if (this.isLoading) return;

      this.dom.ticketCardArea.innerHTML = "";
      const fragment = document.createDocumentFragment();

      if (tickets.length === 0) {
        this.showNoResults();
        return;
      }

      tickets.forEach((ticket) => {
        const ticketElement = this.createTicketCard(ticket);
        fragment.appendChild(ticketElement);
      });

      this.dom.ticketCardArea.appendChild(fragment);
      this.updateResultCount(tickets.length);
      this.updateRegionStats();
    }

    // 更新結果數量和顯示狀態
    updateResultCount(count) {
      this.dom.searchResultText.innerText = `本次搜尋共 ${count} 筆資料`;
      this.dom.cantFindArea.style.display = count ? "none" : "block";
    }

    // 顯示無結果訊息
    showNoResults() {
      this.dom.cantFindArea.style.display = "block";
      this.updateResultCount(0);
    }

    // 顯示表單錯誤訊息
    showFormError(field, message) {
      const alertElement = this.dom.alertMessages[field];
      if (alertElement) {
        alertElement.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>${message}</span>`;
        // 加入視覺效果強調錯誤欄位
        this.dom.formInputs[field].classList.add("error-input");
      }
    }

    // 清除表單錯誤訊息
    clearFormErrors() {
      Object.values(this.dom.alertMessages).forEach((element) => {
        if (element) {
          element.innerHTML = "";
        }
      });

      // 清除輸入框錯誤狀態
      Object.values(this.dom.formInputs).forEach((input) => {
        input.classList.remove("error-input");
      });
    }

    // 重設表單
    resetForm() {
      this.dom.form.reset();
      this.clearFormErrors();
      NotificationManager.showSuccess("套票新增成功！");
    }

    // 顯示載入中狀態
    showLoading() {
      this.isLoading = true;
      this.dom.ticketCardArea.innerHTML =
        '<div class="loading">資料載入中...</div>';
    }

    // 隱藏載入中狀態
    hideLoading() {
      this.isLoading = false;
    }

    // 初始化表單驗證
    initFormValidation() {
      // 使用事件委派減少事件監聽器數量
      this.dom.form.addEventListener(
        "blur",
        (e) => {
          const target = e.target;
          const fieldName = Object.keys(this.dom.formInputs).find(
            (key) => this.dom.formInputs[key] === target
          );

          if (fieldName) {
            FormValidator.validateField(fieldName, target.value, this);
          }
        },
        true
      );

      // 即時驗證 (可選)
      this.dom.form.addEventListener("input", (e) => {
        const target = e.target;
        const fieldName = Object.keys(this.dom.formInputs).find(
          (key) => this.dom.formInputs[key] === target
        );

        if (fieldName) {
          // 延遲驗證以減少性能影響
          clearTimeout(target.timer);
          target.timer = setTimeout(() => {
            FormValidator.validateField(fieldName, target.value, this);
          }, 300);
        }
      });
    }

    // 更新區域統計 (新增功能)
    updateRegionStats() {
      const stats = this.dataManager.getRegionStats();
      // 這裡可以實現一個區域分布統計圖表
      console.log("區域統計:", stats);
    }

    // 顯示票券詳情 (新增功能)
    showTicketDetails(ticket) {
      // 創建模態框顯示詳細信息
      const modal = document.createElement("div");
      modal.className = "ticket-modal";
      modal.innerHTML = `
        <div class="ticket-modal-content">
          <span class="close-modal">&times;</span>
          <h2>${ticket.name}</h2>
          <div class="ticket-details">
            <img src="${ticket.imgUrl}" alt="${ticket.name}">
            <div class="ticket-info">
              <p><strong>地區:</strong> ${ticket.area}</p>
              <p><strong>價格:</strong> $${ticket.price}</p>
              <p><strong>組數:</strong> ${ticket.group}</p>
              <p><strong>星級:</strong> ${ticket.rate}</p>
              <p><strong>描述:</strong> ${ticket.description}</p>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      // 綁定關閉事件
      const closeBtn = modal.querySelector(".close-modal");
      closeBtn.addEventListener("click", () => {
        document.body.removeChild(modal);
      });

      // 點擊模態框外部也可以關閉
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });
    }
  }

  // 表單驗證類別
  class FormValidator {
    // 靜態方法進行欄位驗證
    static validateField(fieldName, value, uiManager) {
      let errorMessage = "";
      const trimmedValue = value.trim();

      // 檢查必填欄位
      if (!trimmedValue) {
        errorMessage = "必填!";
      } else {
        // 根據不同欄位進行特定驗證
        switch (fieldName) {
          case "name":
            if (trimmedValue.length < 2) {
              errorMessage = "名稱至少需要2個字";
            }
            break;
          case "imgUrl":
            if (!this.isValidUrl(trimmedValue)) {
              errorMessage = "請輸入有效的URL";
            }
            break;
          case "rate":
            const rateValue = parseInt(trimmedValue, 10);
            if (isNaN(rateValue) || rateValue < 1 || rateValue > 10) {
              errorMessage = "套票星級應在 1 到 10 之間";
            }
            break;
          case "price":
            const priceValue = parseInt(trimmedValue, 10);
            if (isNaN(priceValue) || priceValue <= 0) {
              errorMessage = "價格必須大於零";
            }
            break;
          case "num":
            const numValue = parseInt(trimmedValue, 10);
            if (isNaN(numValue) || numValue <= 0) {
              errorMessage = "套票組數必須大於零";
            }
            break;
          case "description":
            if (trimmedValue.length > 100) {
              errorMessage = "描述不得超過 100 字";
            }
            break;
        }
      }

      // 顯示錯誤訊息 (如果有)
      if (errorMessage) {
        uiManager.showFormError(fieldName, errorMessage);
        return false;
      } else {
        // 清除特定欄位的錯誤訊息
        uiManager.dom.alertMessages[fieldName].innerHTML = "";
        uiManager.dom.formInputs[fieldName].classList.remove("error-input");
        return true;
      }
    }

    // 驗證整個表單
    static validateForm(formInputs, uiManager) {
      let isValid = true;
      const formData = {};

      // 檢查每個欄位並收集資料
      Object.entries(formInputs).forEach(([key, input]) => {
        const value = input.value.trim();
        formData[key] = value;

        if (!this.validateField(key, value, uiManager)) {
          isValid = false;
        }
      });

      return isValid ? formData : null;
    }

    // 驗證URL格式
    static isValidUrl(url) {
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    }
  }

  // 通知管理類別
  class NotificationManager {
    static showMessage(message, type = "info", duration = 3000) {
      // 檢查是否已有通知容器
      let container = document.querySelector(".notification-container");

      if (!container) {
        container = document.createElement("div");
        container.className = "notification-container";
        container.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
        `;
        document.body.appendChild(container);
      }

      // 創建通知元素
      const notification = document.createElement("div");
      notification.className = `notification ${type}`;
      notification.textContent = message;

      // 設置樣式
      notification.style.cssText = `
        padding: 10px 20px;
        margin-bottom: 10px;
        border-radius: 5px;
        color: white;
        opacity: 0;
        transform: translateX(50px);
        transition: all 0.3s ease;
      `;

      // 根據類型設置背景色
      switch (type) {
        case "success":
          notification.style.backgroundColor = "#64c3bf";
          break;
        case "error":
          notification.style.backgroundColor = "#b21c01";
          break;
        case "info":
        default:
          notification.style.backgroundColor = "#00807e";
      }

      // 添加到容器
      container.appendChild(notification);

      // 顯示動畫
      setTimeout(() => {
        notification.style.opacity = "1";
        notification.style.transform = "translateX(0)";
      }, 10);

      // 設置自動消失
      setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(50px)";

        // 移除元素
        setTimeout(() => {
          container.removeChild(notification);

          // 如果容器為空，也移除容器
          if (container.children.length === 0) {
            document.body.removeChild(container);
          }
        }, 300);
      }, duration);
    }

    static showSuccess(message) {
      this.showMessage(message, "success", 2000);
    }

    static showError(message) {
      this.showMessage(message, "error", 3000);
    }

    static showInfo(message) {
      this.showMessage(message, "info", 2500);
    }
  }

  // 初始化應用
  class App {
    constructor() {
      this.dom = new DOMElements();
      this.dataManager = new TicketDataManager();
      this.ui = new UIManager(this.dom, this.dataManager);

      // 添加CSS樣式
      this.addCustomStyles();
    }

    // 添加自定義樣式
    addCustomStyles() {
      const styleElement = document.createElement("style");
      styleElement.textContent = `
        .error-input {
          border-color: #b21c01 !important;
          background-color: #fff6f6 !important;
        }
        
        .loading {
          text-align: center;
          padding: 30px;
          font-size: 1.2rem;
          color: #00807e;
        }
        
        .ticket-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .ticket-modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          width: 80%;
          max-width: 800px;
          position: relative;
        }
        
        .close-modal {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 24px;
          cursor: pointer;
        }
        
        .ticket-details {
          display: flex;
          flex-wrap: wrap;
          margin-top: 20px;
        }
        
        .ticket-details img {
          width: 40%;
          object-fit: cover;
          border-radius: 5px;
        }
        
        .ticket-info {
          padding-left: 20px;
          width: 60%;
        }
        
        @media (max-width: 768px) {
          .ticket-details img, .ticket-info {
            width: 100%;
          }
          
          .ticket-info {
            padding-left: 0;
            padding-top: 15px;
          }
        }
      `;

      document.head.appendChild(styleElement);
    }

    // 設置事件監聽器
    setupEventListeners() {
      // 地區篩選事件
      this.dom.regionSearch.addEventListener("change", (e) => {
        const region = e.target.value;
        const filteredTickets = this.dataManager.filterByRegion(region);
        this.ui.renderTickets(filteredTickets);
      });

      // 新增套票事件
      this.dom.addTicketBtn.addEventListener("click", () => {
        // 表單驗證
        const formData = FormValidator.validateForm(
          this.dom.formInputs,
          this.ui
        );
        if (!formData) {
          return;
        }

        // 新增票券
        this.dataManager.addTicket(formData);

        // 重設表單及地區篩選，並重新渲染所有票券
        this.dom.regionSearch.value = "";
        this.ui.resetForm();
        this.ui.renderTickets(this.dataManager.tickets);
      });

      // 事件委派 - 處理票券區域的點擊事件
      this.dom.ticketCardArea.addEventListener("click", (e) => {
        // 這裡可以添加更多交互功能，如收藏、分享等
      });
    }

    // 初始化應用
    async init() {
      // 顯示載入狀態
      this.ui.showLoading();

      // 設置事件監聽
      this.setupEventListeners();

      // 初始化表單驗證
      this.ui.initFormValidation();

      try {
        // 獲取資料並渲染
        const tickets = await this.dataManager.fetchData();
        this.ui.hideLoading();
        this.ui.renderTickets(tickets);

        // 顯示歡迎訊息
        setTimeout(() => {
          NotificationManager.showInfo("歡迎使用台灣旅遊套票網站！");
        }, 500);
      } catch (error) {
        this.ui.hideLoading();
        NotificationManager.showError("資料載入失敗，請稍後再試");
      }
    }
  }

  // 啟動應用
  document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    app.init();
  });
})();
