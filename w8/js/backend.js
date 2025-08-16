const baseUrl = "https://livejs-api.hexschool.io";
const apiPath = "yuyeh";
const adminApi = `${baseUrl}/api/livejs/v1/admin/${apiPath}`;
const token = "liq5zXLAuxSIyKPV3qUVUaTWXn42";

let orderData = [];
const orderPageTableBody = document.querySelector(".orderPage-table tbody");
const categoryChartBtn = document.getElementById("categoryChartBtn");
const productChartBtn = document.getElementById("productChartBtn");
const chartTitle = document.getElementById("chartTitle");

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

// 取得所有訂單
function getOrders() {
  axios
    .get(`${adminApi}/orders`, {
      headers: {
        authorization: token,
      },
    })
    .then((res) => {
      console.log(res);
      orderData = res.data.orders;
      orderData.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      renderOrders();
      saleProductCategory();
      saleProductTitle();
    })
    .catch((err) => {
      console.log(err);
    });
}

// 渲染所有訂單
function renderOrders() {
  let str = "";
  orderData.forEach((order) => {
    let productStr = "";
    order.products.forEach((product) => {
      productStr += `<p>${product.title}</p> x ${product.quantity}`;
    });
    str += `
        <tr data-id="${order.id}">
            <td>${order.id}</td>
            <td>
              <p>${order.user.name}</p>
              <p>${order.user.tel}</p>
            </td>
            <td>${order.user.address}</td>
            <td>${order.user.email}</td>
            <td>
              ${productStr}
            </td>
            <td>${formatTime(order.createdAt)}</td>
            <td class="orderStatus">
              <a href="#">${
                order.paid
                  ? `<sapn style="color: blue">已處理</sapn>`
                  : `<sapn style="color: red">未處理</sapn>`
              }</a>
            </td>
            <td>
              <input type="button" data-id="${
                order.id
              }" class="delSingleOrder-Btn" value="刪除">
            </td>
          </tr>`;
  });
  orderPageTableBody.innerHTML = str;
}

// 格式化時間
function formatTime(timestamp) {
  const time = new Date(timestamp * 1000);
  return time.toLocaleString("zh-TW", { hour12: false });
}

// 刪除訂單
function deleteOrder(id = null) {
  const url = id
    ? `${adminApi}/orders/${id}` // 單一訂單刪除
    : `${adminApi}/orders`; // 清空所有訂單

  // 如果清空訂單，檢查是否有訂單資料
  if (!id && (!orderData || orderData.length === 0)) {
    Swal.fire({
      title: "無訂單",
      text: "目前沒有任何訂單可以刪除。",
      icon: "info",
    });
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    text: id ? "確定要刪除此訂單嗎？" : "確定要清空所有訂單嗎？",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(url, {
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          console.log(id ? "刪除單一訂單成功" : "清空訂單成功", res);
          getOrders(); // 重新獲取訂單資料
          Swal.fire({
            title: "Deleted!",
            text: id ? "訂單已成功刪除。" : "所有訂單已成功清空。",
            icon: "success",
          });
        })
        .catch((err) => {
          console.error(id ? "刪除單一訂單失敗" : "清空訂單失敗", err);
          Swal.fire({
            title: "Error!",
            text: id
              ? "刪除訂單時發生錯誤，請稍後再試。"
              : "清空訂單時發生錯誤，請稍後再試。",
            icon: "error",
          });
        });
    }
  });
}

// 修改訂單狀態
function updateOrderStatus(id, newStatus) {
  const data = {
    data: {
      id,
      paid: newStatus, // 設置新的處理狀態
    },
  };

  axios
    .put(`${adminApi}/orders`, data, {
      headers: {
        authorization: token,
      },
    })
    .then((res) => {
      console.log("訂單狀態更新成功", res);
      getOrders(); // 更新訂單列表
    })
    .catch((err) => {
      console.error("更新訂單狀態失敗", err);
    });
}

// 監聽 "清除全部訂單" 按鈕
document.querySelector(".discardAllBtn").addEventListener("click", (e) => {
  e.preventDefault();
  deleteOrder(); // 清空所有訂單
});

// 監聽單一訂單刪除 or 修改
orderPageTableBody.addEventListener("click", (e) => {
  e.preventDefault();

  // 判斷是否點擊的是狀態切換按鈕
  if (e.target.closest(".orderStatus")) {
    const statusElement = e.target.closest("a"); // 獲取點擊的 <a>
    const orderId = statusElement
      .closest("tr")
      .querySelector("td")
      .textContent.trim(); // 獲取訂單 ID
    const isPaid = statusElement.textContent.includes("已處理"); // 判斷當前狀態

    // 切換狀態
    updateOrderStatus(orderId, !isPaid); // 傳遞訂單 ID 和新的狀態
    return;
  }

  // 判斷是否點擊刪除按鈕
  if (e.target.classList.contains("delSingleOrder-Btn")) {
    const orderId = e.target.dataset.id; // 獲取訂單 ID
    if (orderId) {
      deleteOrder(orderId); // 傳遞訂單 ID，刪除訂單
    } else {
      Swal.fire({
        title: "Error",
        text: "未找到訂單 ID，無法刪除訂單。",
        icon: "error",
      });
    }
    return;
  }
});

// 圖表切換
function toggleChart(type) {
  // 更新圖表及標題
  if (type === "category") {
    saleProductCategory();
    chartTitle.textContent = "全產品類別營收比重";
    categoryChartBtn.classList.add("active");
    productChartBtn.classList.remove("active");
  } else if (type === "product") {
    saleProductTitle();
    chartTitle.textContent = "全品項營收比重";
    productChartBtn.classList.add("active");
    categoryChartBtn.classList.remove("active");
  }
}

// 監聽切換圖表
categoryChartBtn.addEventListener("click", () => {
  toggleChart("category");
});

productChartBtn.addEventListener("click", () => {
  toggleChart("product");
});

// 全產品類別營收比重圖表
function saleProductCategory() {
  const resultObj = {};
  orderData.forEach((order) => {
    order.products.forEach((product) => {
      if (resultObj[product.category] === undefined) {
        resultObj[product.category] = product.price * product.quantity;
      } else {
        resultObj[product.category] += product.price * product.quantity;
      }
    });
  });
  renderChart(Object.entries(resultObj));
}

// 全品項營收比重圖表
function saleProductTitle() {
  const resultObj = {};
  orderData.forEach((order) => {
    order.products.forEach((product) => {
      if (resultObj[product.title] === undefined) {
        resultObj[product.title] = product.price * product.quantity;
      } else {
        resultObj[product.title] += product.price * product.quantity;
      }
    });
  });
  const resultArr = Object.entries(resultObj);
  const sortResultArr = resultArr.sort((a, b) => b[1] - a[1]);
  const topOfThree = [];
  let otherTotal = 0;
  sortResultArr.forEach((product, index) => {
    if (index < 3) {
      topOfThree.push(product);
    } else {
      otherTotal += product[1];
    }
  });
  if (sortResultArr.length > 3) {
    topOfThree.push(["其他", otherTotal]);
  }
  renderChart(topOfThree);
}

// C3.js
function renderChart(data) {
  c3.generate({
    bindto: "#chart", // HTML 元素綁定
    color: {
      pattern: ["#9412BC", "#3E74AE", "#52BFEA", "#1F0737"],
    },
    data: {
      type: "pie",
      columns: data,
    },
  });
}

// 初始化
function init() {
  getOrders();
  saleProductCategory();
}

init();
