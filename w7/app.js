// DOM 元素選擇 - 使用常數命名提高可讀性
const DOM = {
  ticketCardArea: document.querySelector(".ticketCard-area"),
  regionSearch: document.querySelector(".regionSearch"),
  addTicketBtn: document.querySelector(".addTicket-btn"),
  cantFindArea: document.querySelector(".cantFind-area"),
  searchResultText: document.getElementById("searchResult-text"),
  form: document.querySelector(".addTicket-form"),
  inputs: {
    name: document.getElementById("ticketName"),
    imgUrl: document.getElementById("ticketImgUrl"),
    region: document.getElementById("ticketRegion"),
    price: document.getElementById("ticketPrice"),
    num: document.getElementById("ticketNum"),
    rate: document.getElementById("ticketRate"),
    description: document.getElementById("ticketDescription"),
  },
  errorMessages: {
    name: document.getElementById("ticketName-message"),
    imgUrl: document.getElementById("ticketImgUrl-message"),
    region: document.getElementById("ticketRegion-message"),
    price: document.getElementById("ticketPrice-message"),
    num: document.getElementById("ticketNum-message"),
    rate: document.getElementById("ticketRate-message"),
    description: document.getElementById("ticketDescription-message"),
  },
};

// 常數和配置
const API_URL =
  "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";
let ticketData = []; // 儲存從 API 獲取的資料

// 初始化應用程式
function initApp() {
  fetchTicketData();
  setupEventListeners();
}

// 獲取旅遊套票資料
async function fetchTicketData() {
  try {
    const response = await axios.get(API_URL);
    ticketData = response.data.data;
    renderData(ticketData);
    renderChart(ticketData);
  } catch (error) {
    console.error("獲取資料失敗:", error);
    showErrorMessage("資料載入失敗，請稍後再試");
  }
}

// 設置事件監聽器
function setupEventListeners() {
  // 地區搜尋篩選
  DOM.regionSearch.addEventListener("change", handleRegionChange);

  // 新增套票按鈕
  DOM.addTicketBtn.addEventListener("click", handleAddTicket);

  // 表單輸入驗證
  Object.values(DOM.inputs).forEach((input) => {
    input.addEventListener("blur", validateInput);
    input.addEventListener("input", clearErrorMessage);
  });
}

// 處理地區變更
function handleRegionChange() {
  const region = DOM.regionSearch.value;
  const filteredData = region
    ? ticketData.filter((ticket) => ticket.area === region)
    : ticketData;

  renderData(filteredData);
  renderChart(filteredData);
}

// 渲染套票卡片
function renderData(tickets) {
  if (!Array.isArray(tickets)) {
    console.error("渲染資料錯誤: 預期為陣列資料");
    return;
  }

  DOM.ticketCardArea.innerHTML = tickets
    .map((ticket) => createTicketCard(ticket))
    .join("");

  // 更新搜尋結果數量
  DOM.searchResultText.innerText = `本次搜尋共 ${tickets.length} 筆資料`;

  // 顯示或隱藏「查無資料」區域
  DOM.cantFindArea.style.display = tickets.length ? "none" : "block";
}

// 建立套票卡片 HTML
function createTicketCard(ticket) {
  return `
    <li class="ticketCard">
      <div class="ticketCard-img">
        <img src="${ticket.imgUrl}" alt="${ticket.name}">
        <div class="ticketCard-region">${ticket.area}</div>
        <div class="ticketCard-rank">${ticket.rate}</div>
      </div>
      <div class="ticketCard-content">
        <h3>${ticket.name}</h3>
        <p>${ticket.description}</p>
        <div class="ticketCard-info">
          <p class="ticketCard-num">套票組數: ${ticket.group}</p>
          <p class="ticketCard-price"><span>$${ticket.price.toLocaleString()}</span> 起</p>
        </div>
      </div>
    </li>`;
}

// 繪製圖表
function renderChart(data) {
  // 計算各地區套票數量
  const regionCounts = data.reduce((counts, item) => {
    counts[item.area] = (counts[item.area] || 0) + 1;
    return counts;
  }, {});

  // 轉換為 C3.js 格式
  const chartData = Object.entries(regionCounts);

  // 繪製圓餅圖
  c3.generate({
    bindto: "#chart",
    data: {
      columns: chartData,
      type: "donut",
    },
    donut: {
      title: "地區分佈",
      label: {
        format: function (value) {
          return value + "筆";
        },
      },
    },
    color: {
      pattern: ["#26C0C7", "#5151D3", "#E68618"],
    },
  });
}

// 處理新增套票
function handleAddTicket() {
  // 表單驗證
  if (!validateForm()) {
    return;
  }

  // 取得表單輸入值並建立新套票物件
  const newTicket = {
    id: Date.now(), // 使用時間戳當作唯一ID
    name: DOM.inputs.name.value.trim(),
    imgUrl: DOM.inputs.imgUrl.value.trim(),
    area: DOM.inputs.region.value,
    description: DOM.inputs.description.value.trim(),
    group: parseInt(DOM.inputs.num.value, 10),
    price: parseInt(DOM.inputs.price.value, 10),
    rate: parseInt(DOM.inputs.rate.value, 10),
  };

  // 加入資料集
  ticketData.push(newTicket);

  // 重置篩選欄位並重新渲染
  DOM.regionSearch.value = "";
  renderData(ticketData);
  renderChart(ticketData);

  // 重置表單並顯示成功訊息
  DOM.form.reset();
  showSuccessMessage("套票新增成功！");
}

// 表單整體驗證
function validateForm() {
  let isValid = true;

  // 檢查每個輸入欄位
  Object.entries(DOM.inputs).forEach(([key, input]) => {
    if (!validateSingleField(key, input.value)) {
      isValid = false;
    }
  });

  return isValid;
}

// 驗證單一輸入欄位
function validateSingleField(fieldName, value) {
  const errorElement = DOM.errorMessages[fieldName];

  // 清除先前的錯誤訊息
  errorElement.innerHTML = "";

  // 1. 檢查是否為空值
  if (!value || (typeof value === "string" && value.trim() === "")) {
    showFieldError(fieldName, "此欄位為必填");
    return false;
  }

  // 2. 特定欄位的驗證
  switch (fieldName) {
    case "imgUrl":
      // 驗證是否為有效的URL
      if (!isValidUrl(value)) {
        showFieldError(fieldName, "請輸入有效的圖片網址");
        return false;
      }
      break;
    case "price":
    case "num":
      // 驗證是否為正數
      if (parseInt(value, 10) <= 0) {
        showFieldError(fieldName, "請輸入大於 0 的數字");
        return false;
      }
      break;
    case "rate":
      // 驗證星級是否在 1-10 之間
      const rate = parseInt(value, 10);
      if (rate < 1 || rate > 10) {
        showFieldError(fieldName, "星級必須介於 1 至 10 之間");
        return false;
      }
      break;
    case "description":
      // 驗證描述字數是否超過限制
      if (value.length > 100) {
        showFieldError(fieldName, "描述內容不得超過 100 字");
        return false;
      }
      break;
  }

  return true;
}

// 單一輸入欄位驗證 (失去焦點時觸發)
function validateInput(event) {
  const field = event.target.id.replace("ticket", "").toLowerCase();
  validateSingleField(field, event.target.value);
}

// 顯示欄位錯誤
function showFieldError(fieldName, message) {
  const errorElement = DOM.errorMessages[fieldName];
  errorElement.innerHTML = `
    <i class="fas fa-exclamation-circle"></i>
    <span>${message}</span>`;
}

// 清除欄位錯誤訊息
function clearErrorMessage(event) {
  const field = event.target.id.replace("ticket", "").toLowerCase();
  DOM.errorMessages[field].innerHTML = "";
}

// 驗證 URL 格式
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

// 顯示成功訊息
function showSuccessMessage(message) {
  alert(message);
}

// 顯示錯誤訊息
function showErrorMessage(message) {
  alert(message);
}

// 初始化應用程式
document.addEventListener("DOMContentLoaded", initApp);
