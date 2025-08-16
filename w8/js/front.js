console.clear();

const baseUrl = "https://livejs-api.hexschool.io";
const apiPath = "yuyeh";
const customerApi = `${baseUrl}/api/livejs/v1/customer/${apiPath}`;

// DOM 元素選取
const productWarp = document.querySelector(".productWrap");
const productSelect = document.querySelector(".productSelect");
const shoppingCartTable = document.querySelector(".shoppingCart-table");
const shoppingCartTableBody = document.querySelector(
  ".shoppingCart-table tbody"
);
const shoppingCartTableFoot = document.querySelector(
  ".shoppingCart-table tfoot"
);
const orderInfoBtn = document.querySelector(".orderInfo-btn");
const customerName = document.querySelector("#customerName");
const customerPhone = document.querySelector("#customerPhone");
const customerEmail = document.querySelector("#customerEmail");
const customerAddress = document.querySelector("#customerAddress");
const tradeWay = document.querySelector("#tradeWay");
const orderInfoForm = document.querySelector(".orderInfo-form");
const tradeWaySelect = document.getElementById("tradeWay");

let productData = [];
let cartData = [];
let cartTotal = 0;

// 加載動畫控制
function toggleLoading(isVisible) {
  const statusDiv = document.getElementById("status");
  statusDiv.style.display = isVisible ? "block" : "none";
}

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

// 獲取產品
function getProduct() {
  toggleLoading(true);
  axios
    .get(`${customerApi}/products`)
    .then((res) => {
      productData = res.data.products;
      renderProduct(productData);
    })
    .catch((err) => console.log(err))
    .finally(() => toggleLoading(false));
}

function renderProduct(data) {
  let str = "";
  data.forEach((item) => {
    str += `<li class="productCard">
          <h4 class="productType">新品</h4>
          <img src="${item.images}" alt="" />
          <a href="#" class="addCardBtn" data-id="${item.id}">加入購物車</a>
          <h3>${item.title}</h3>
          <del class="originPrice">NT${item.origin_price}</del>
          <p class="nowPrice">NT${formatNumber(item.price)}</p>
        </li>`;
  });
  productWarp.innerHTML = str;
}

// 產品篩選器
function filterProduct(value) {
  const result =
    value === "全部"
      ? productData
      : productData.filter((item) => item.category === value);
  renderProduct(result);
}

productSelect.addEventListener("change", (e) => {
  filterProduct(e.target.value);
});

// 加入購物車
function manageCartItem(cartItemId = null, id = null, newQuantity = 1) {
  let url = `${customerApi}/carts`;
  let method = "post";
  let data = {
    data: {
      productId: cartItemId,
      quantity: newQuantity,
    },
  };

  // 如果是更新數量
  if (id) {
    url = `${customerApi}/carts`;
    method = "patch";
    data = {
      data: {
        id,
        quantity: newQuantity,
      },
    };
  }

  console.log("API 路徑：", url);
  console.log("API 請求數據：", data);

  axios[method](url, data)
    .then((res) => {
      console.log(id ? "更新數量成功" : "新增商品成功", res.data);
      getCart();
      Toast.fire({
        icon: "success",
        title: "已新增至購物車",
      });
    })
    .catch((err) => {
      console.error(
        id ? "更新數量失敗" : "新增商品失敗",
        err.response ? err.response.data : err
      );
    });
}

productWarp.addEventListener("click", (e) => {
  e.preventDefault();
  const productId = e.target.dataset.id;
  if (productId) {
    manageCartItem(productId); // 新增商品，數量默認為 1
  }
});

shoppingCartTable.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    e.target.classList.contains("increase-btn") ||
    e.target.classList.contains("decrease-btn")
  ) {
    const cartItemId = e.target.dataset.id; // 獲取購物車項目 ID
    const quantityElement = e.target
      .closest(".quantity-control")
      .querySelector("span");
    const currentQuantity = parseInt(quantityElement.textContent);

    const newQuantity = e.target.classList.contains("increase-btn")
      ? currentQuantity + 1
      : currentQuantity - 1;

    if (newQuantity < 1) {
      console.log("數量不可小於 1");
      return;
    }

    manageCartItem(null, cartItemId, newQuantity); // 傳遞購物車項目 ID 和新數量
  }
});

// 刪除購物車
function deleteCartItem(cartItemId = null) {
  const url = cartItemId
    ? `${customerApi}/carts/${cartItemId}` // 單一商品刪除
    : `${customerApi}/carts`; // 清空購物車

  Swal.fire({
    title: "Are you sure?",
    text: "確定要刪除商品嗎",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(url)
        .then((res) => {
          console.log(cartItemId ? "刪除單一商品成功" : "清空購物車成功", res);
          getCart(); // 刪除後重新獲取購物車資料
        })
        .catch((err) =>
          console.log(cartItemId ? "刪除單一商品失敗" : "清空購物車失敗", err)
        );
      Swal.fire({
        title: "Deleted!",
        text: "成功刪除商品",
        icon: "success",
      });
    }
  });
}

// 事件委派監聽刪除按鈕
shoppingCartTable.addEventListener("click", (e) => {
  e.preventDefault();

  // 刪除所有品項
  if (e.target.classList.contains("discardAllBtn")) {
    deleteCartItem(); // 不傳遞 ID，表示清空購物車
    return;
  }

  // 刪除單一商品
  if (e.target.classList.contains("material-icons")) {
    const cartItemId = e.target.dataset.id; // 獲取商品的購物車項目 ID
    deleteCartItem(cartItemId); // 傳遞 ID，表示刪除單一商品
  }
});

// 獲取購物清單
function getCart() {
  toggleLoading(true);
  axios
    .get(`${customerApi}/carts`)
    .then((res) => {
      console.log("購物車資料:", res.data);
      cartData = res.data.carts;
      cartTotal = res.data.finalTotal || 0; // 更新總金額
      renderCart(); // 渲染購物車內容
    })
    .catch((err) => console.log("獲取購物車失敗:", err))
    .finally(() => toggleLoading(false));
}

// 渲染購物清單
function renderCart() {
  if (cartData.length === 0) {
    shoppingCartTableBody.innerHTML = "尚無任何商品";
    shoppingCartTableFoot.innerHTML = "";
    cartTotal = 0; // 購物車空時設置總金額為 0
    return;
  }

  let str = "";
  cartData.forEach((item) => {
    str += `<tr>
              <td>
                <div class="cardItem-title">
                  <img src="${item.product.images}" alt="" />
                  <p>${item.product.title}</p>
                </div>
              </td>
              <td>NT${item.product.origin_price}</td>
              <td>
                <div class="quantity-control">
                  <button class="decrease-btn" data-id="${item.id}">-</button>
                  <span>${item.quantity}</span>
                  <button class="increase-btn" data-id="${item.id}">+</button>
                </div>
              </td>
              <td>NT${item.product.price}</td>
              <td class="discardBtn">
                <a href="#" data-id="${item.id}" class="material-icons">clear</a>
              </td>
            </tr>`;
  });

  shoppingCartTableBody.innerHTML = str;

  shoppingCartTableFoot.innerHTML = `<tr>
              <td>
                <a href="#" class="discardAllBtn">刪除所有品項</a>
              </td>
              <td></td>
              <td></td>
              <td><p>總金額</p></td>
              <td>NT${cartTotal}</td>
            </tr>`;
}

// 檢查(驗證)訂單
function checkOrder() {
  const constraints = {
    姓名: {
      presence: { message: "^必填" },
    },
    電話: {
      presence: { message: "^必填" },
    },
    Email: {
      presence: { message: "^必填" },
      email: { message: "^請輸入正確的信箱格式" },
    },
    寄送地址: {
      presence: { message: "^必填" },
    },
  };

  const err = validate(orderInfoForm, constraints);

  // 更新所有欄位的錯誤訊息
  document.querySelectorAll(".orderInfo-input").forEach((input) => {
    const message = document.querySelector(
      `.orderInfo-message[data-message="${input.name}"]`
    );

    // 檢查是否找到對應的錯誤訊息元素
    if (!message) {
      console.warn(`找不到對應的錯誤訊息元素: data-message="${input.name}"`);
      return; // 跳過處理
    }

    if (err && err[input.name]) {
      message.style.display = "block"; // 顯示錯誤訊息
      message.textContent = err[input.name]; // 更新錯誤訊息
    } else {
      message.style.display = "none"; // 隱藏錯誤訊息
    }
  });

  return err; // 回傳驗證結果
}

// 送出訂單
function sendOrder() {
  if (cartData.length === 0) {
    alert("購物車尚無任何商品");
    return;
  }
  if (checkOrder()) {
    alert("請確認必填資料");
    return;
  }

  // 準備送出訂單的資料
  const data = {
    data: {
      user: {
        name: customerName.value.trim(),
        tel: customerPhone.value.trim(),
        email: customerEmail.value.trim(),
        address: customerAddress.value.trim(),
        payment: tradeWay.value,
      },
    },
  };

  // 送出訂單
  toggleLoading(true);
  axios
    .post(`${customerApi}/orders`, data)
    .then((res) => {
      console.log("訂單送出成功：", res);

      // 清空表單
      orderInfoForm.reset();

      // 清空購物車
      return deleteCartItem(); // 確保返回 Promise
    })
    .then(() => {
      // 成功清空購物車後重新獲取購物車資料
      getCart();

      // 顯示成功提示
      Swal.fire({
        icon: "success",
        title: "訂單已成功送出！",
        text: "感謝您的購買，期待再次光臨。",
      });
    })
    .catch((err) => {
      console.error("訂單送出或清空購物車失敗：", err);
    })
    .finally(() => toggleLoading(false));
}

// 即時驗證函式
function validateField(inputElement, messageElement) {
  const value = inputElement.value.trim();

  if (value === "") {
    messageElement.style.display = "block";
    messageElement.textContent = "必填"; // 顯示「必填」訊息
    return;
  }

  // 如果是 Email 類型，檢查格式
  if (inputElement.type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email 格式正則
    if (!emailRegex.test(value)) {
      messageElement.style.display = "block";
      messageElement.textContent = "請輸入正確的信箱格式"; // 顯示格式錯誤訊息
      return;
    }
  }

  // 沒有問題則隱藏訊息
  messageElement.style.display = "none";
}

// 綁定事件給每個輸入框
function bindValidationEvents() {
  const inputs = document.querySelectorAll(".orderInfo-input"); // 所有輸入框
  inputs.forEach((input) => {
    const message = document.querySelector(
      `.orderInfo-message[data-message="${input.name}"]`
    );

    // 綁定輸入事件：動態檢查
    input.addEventListener("input", () => {
      validateField(input, message);
    });
  });
}

orderInfoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sendOrder();
});

// 千分位
function formatNumber(number) {
  let parts = number.toString().split("."); // 分割整數和小數部分
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 格式化整數部分
  return parts.length > 1 ? parts.join(".") : parts[0]; // 拼接小數部分
}

// 初始化
function init() {
  getProduct();
  getCart();
  bindValidationEvents();
}

init();
