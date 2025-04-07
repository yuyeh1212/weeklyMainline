// 使用立即執行函數包裝代碼，避免全局污染
(function () {
  // 初始資料
  let data = [
    {
      id: 0,
      name: "肥宅心碎賞櫻3日",
      imgUrl:
        "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      area: "高雄",
      description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
      group: 87,
      price: 1400,
      rate: 10,
    },
    {
      id: 1,
      name: "貓空纜車雙程票",
      imgUrl:
        "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      area: "台北",
      description:
        "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
      group: 99,
      price: 240,
      rate: 2,
    },
    {
      id: 2,
      name: "台中谷關溫泉會1日",
      imgUrl:
        "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      area: "台中",
      description:
        "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
      group: 20,
      price: 1765,
      rate: 7,
    },
  ];

  // 快取DOM元素
  const DOM = {
    ticketCardArea: document.querySelector(".ticketCard-area"),
    regionSearch: document.querySelector(".regionSearch"),
    addTicketBtn: document.querySelector(".addTicket-btn"),
    cantFindArea: document.querySelector(".cantFind-area"),
    searchResultText: document.getElementById("searchResult-text"),
    form: document.querySelector(".addTicket-form"),
    formInputs: {
      ticketName: document.getElementById("ticketName"),
      ticketImgUrl: document.getElementById("ticketImgUrl"),
      ticketRegion: document.getElementById("ticketRegion"),
      ticketPrice: document.getElementById("ticketPrice"),
      ticketNum: document.getElementById("ticketNum"),
      ticketRate: document.getElementById("ticketRate"),
      ticketDescription: document.getElementById("ticketDescription"),
    },
  };

  // 生成套票卡片HTML
  function createTicketCardHTML(ticket) {
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
            <p class="ticketCard-price"><span>$${ticket.price}</span> 起</p>
          </div>
        </div>
      </li>`;
  }

  // 渲染套票列表
  function renderTickets(tickets) {
    // 使用文檔片段減少DOM操作
    const fragment = document.createDocumentFragment();
    const tempContainer = document.createElement("div");

    tickets.forEach((ticket) => {
      tempContainer.innerHTML = createTicketCardHTML(ticket);
      fragment.appendChild(tempContainer.firstElementChild);
    });

    DOM.ticketCardArea.innerHTML = "";
    DOM.ticketCardArea.appendChild(fragment);

    // 更新搜尋結果文字與無結果顯示
    DOM.searchResultText.textContent = `本次搜尋共 ${tickets.length} 筆資料`;
    DOM.cantFindArea.style.display = tickets.length ? "none" : "block";
  }

  // 表單驗證
  function validateForm() {
    const inputs = DOM.formInputs;
    const requiredFields = Object.values(inputs);

    // 檢查所有必填欄位
    for (let field of requiredFields) {
      if (!field.value.trim()) {
        alert("所有欄位皆為必填，請確認填寫完整！");
        return false;
      }
    }

    // 檢查星級範圍
    const rate = parseInt(inputs.ticketRate.value, 10);
    if (isNaN(rate) || rate < 1 || rate > 10) {
      alert("套票星級應在 1 到 10 之間");
      return false;
    }

    return true;
  }

  // 取得表單資料
  function getFormData() {
    const inputs = DOM.formInputs;

    return {
      id: data.length,
      name: inputs.ticketName.value.trim(),
      imgUrl: inputs.ticketImgUrl.value.trim(),
      area: inputs.ticketRegion.value,
      description: inputs.ticketDescription.value.trim(),
      group: parseInt(inputs.ticketNum.value, 10),
      price: parseInt(inputs.ticketPrice.value, 10),
      rate: parseInt(inputs.ticketRate.value, 10),
    };
  }

  // 重置表單
  function resetForm() {
    DOM.form.reset();
  }

  // 新增套票處理
  function handleAddTicket() {
    if (!validateForm()) return;

    // 新增資料
    const newTicket = getFormData();
    data.push(newTicket);

    // 重置篩選並重新渲染
    DOM.regionSearch.value = "";
    renderTickets(data);

    // 重置表單
    resetForm();
  }

  // 篩選套票處理
  function handleFilterTickets() {
    const region = DOM.regionSearch.value;
    const filteredData = region
      ? data.filter((ticket) => ticket.area === region)
      : data;

    renderTickets(filteredData);
  }

  // 初始化事件監聽
  function initEventListeners() {
    DOM.regionSearch.addEventListener("change", handleFilterTickets);
    DOM.addTicketBtn.addEventListener("click", handleAddTicket);
  }

  // 初始化應用
  function init() {
    renderTickets(data);
    initEventListeners();
  }

  // 啟動應用
  init();
})();
