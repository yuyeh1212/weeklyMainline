console.clear();
console.log("---(1)---");
/***   作業 1 填答區開始   **/
let obj = {};
obj.myName = "Tom";
obj.myAge = 18;
obj.myPet = ["John", "Mike"];
obj.isWakeUp = false;

document.getElementById("basicInformation").innerHTML = `
  myName: ${obj.myName} <br>
  myAge: ${obj.myAge} <br>
  myPet: ${obj.myPet.join(", ")} <br>
  isWakeUp: ${obj.isWakeUp}
`;
/***   作業 1 填答區結束   **/
console.log("---(2)---");
/***   作業 2 填答區開始   **/
let colors = ["red", "black", "yellow"];

console.log(colors.push("blue"));
console.log(colors);
document.getElementById("color").textContent = colors.join(", ");
/***   作業 2 填答區結束   **/
console.log("---(3)---");
/***   作業 3 填答區開始   **/
let motherStatus = [
  {
    name: "mary",
    age: 31,
    sons: ["Tom", "Bob"],
  },
];

motherStatus[0].age++;
motherStatus[0].sons.push("John");

document.getElementById("motherStatus").innerHTML = `
  momName: ${motherStatus[0].name} <br>
  momAge: ${motherStatus[0].age} <br>
  sons: ${motherStatus[0].sons.join(", ")}
`;
/***   作業 3 填答區結束   **/
console.log("---(4)---");
/***   作業 4 填答區開始   **/
const bikeStationData = {
  data: [
    {
      StationUID: "KHH501201001",
      StationID: "501201001",
      AuthorityID: "KHH",
      StationName: {
        Zh_tw: "YouBike2.0_捷運美麗島站(10號出口)",
        En: "YouBike2.0_KRT Formosa Boulevard Sta. (Exit 10)",
      },
      StationPosition: {
        PositionLon: 120.30212,
        PositionLat: 22.63213,
        GeoHash: "wsj8c813d",
      },
      StationAddress: {
        Zh_tw: "中山一路168號前方",
        En: "No.168, Zhongshan 1st. Rd.",
      },
      BikesCapacity: 23,
      ServiceType: 2,
      SrcUpdateTime: "2024-10-12T20:05:19+08:00",
      UpdateTime: "2024-10-12T20:05:39+08:00",
    },
    {
      StationUID: "KHH501201002",
      StationID: "501201002",
      AuthorityID: "KHH",
      StationName: {
        Zh_tw: "YouBike2.0_捷運美麗島站(2號出口)",
        En: "YouBike2.0_KRT Formosa Boulevard Sta. (Exit 2)",
      },
      StationPosition: {
        PositionLon: 120.30175,
        PositionLat: 22.63035,
        GeoHash: "wsj89x9p3",
      },
      StationAddress: {
        Zh_tw: "中山一路83號旁停車場前方",
        En: "No.83, Zhongshan 1st. Rd.",
      },
      BikesCapacity: 40,
      ServiceType: 2,
      SrcUpdateTime: "2024-10-12T20:01:19+08:00",
      UpdateTime: "2024-10-12T20:05:39+08:00",
    },
    {
      StationUID: "KHH501201003",
      StationID: "501201003",
      AuthorityID: "KHH",
      StationName: {
        Zh_tw: "YouBike2.0_捷運美麗島站(5號出口)",
        En: "YouBike2.0_KRT Formosa Boulevard Sta. (Exit 5)",
      },
      StationPosition: {
        PositionLon: 120.3031,
        PositionLat: 22.63118,
        GeoHash: "wsj89xfh1",
      },
      StationAddress: {
        Zh_tw: "中正三路179號前方",
        En: "No.179, Zhongzheng 3rd. Rd",
      },
      BikesCapacity: 23,
      ServiceType: 2,
      SrcUpdateTime: "2024-10-12T20:04:19+08:00",
      UpdateTime: "2024-10-12T20:05:39+08:00",
    },
  ],
};

const bikeStationElement = document.getElementById("bikeStationData");

let stationHTML = bikeStationData.data
  .map(
    (station) => `
  <div>
    <strong>站點名稱:</strong> ${station.StationName.Zh_tw} <br>
    <strong>站點地址:</strong> ${station.StationAddress.Zh_tw} <br>
    <strong>可借車輛數:</strong> ${station.BikesCapacity} 台 <br><br>
  </div>
`
  )
  .join("");

bikeStationElement.innerHTML = stationHTML;
/***   作業 4 填答區結束   **/
console.log("---(5)---");
/***   作業 5 填答區開始   **/
let familyPhoto = {
  mother: "John",
  father: "Bill",
  daughter: "Rosa",
  son: "Howard",
  dog: ["Bobo", "Koko"],
};

document.getElementById("familyPhoto").innerHTML = `
  mom: ${familyPhoto.mother} <br>
  dad: ${familyPhoto.father} <br>
  daughter: ${familyPhoto.daughter} <br>
  son: ${familyPhoto.son} <br>
  dogs: ${familyPhoto.dog.join(", ")}
`;
console.log(familyPhoto);
/***   作業 5 填答區結束   **/
console.log("---(6)---");
/***   作業 6 填答區開始   **/
let villaSales = {
  name: "hexVilla",
  place: "Kaohsiung",
  projects: [
    {
      price: 2.8e8,
      numberOfSquareMeters: 900,
      isSwimmingPool: false,
      isBasement: true,
      floorNum: 5,
      bathroomsNum: 3,
      isExclusiveButler: false,
      isSale: true,
    },
    {
      price: 3.2e8,
      numberOfSquareMeters: 1200,
      isSwimmingPool: true,
      isBasement: true,
      floorNum: 7,
      bathroomsNum: 4,
      isExclusiveButler: true,
      isSale: false,
    },
  ],
};

const villaSalesElement = document.getElementById("villaSales");

// 格式化金額（加上千分位逗號）
function formatPrice(price) {
  return price.toLocaleString();
}

let villaHTML = villaSales.projects
  .map(
    (villa, index) => `
  <div>
    <strong>🏡 方案 ${index + 1}</strong><br>
    💰 價格: $${formatPrice(villa.price)} 元<br>
    📏 坪數: ${villa.numberOfSquareMeters} 平方公尺<br>
    🏊 游泳池: ${villa.isSwimmingPool ? "✅ 有" : "❌ 無"}<br>
    🔽 地下室: ${villa.isBasement ? "✅ 有" : "❌ 無"}<br>
    🏢 樓層數: ${villa.floorNum} 層<br>
    🚽 衛浴數量: ${villa.bathroomsNum} 間<br>
    🤵 管家服務: ${villa.isExclusiveButler ? "✅ 有" : "❌ 無"}<br>
    🏷️ 是否出售: ${villa.isSale ? "✅ 在售" : "❌ 已售出"}<br><br>
  </div>
`
  )
  .join("");

villaSalesElement.innerHTML = villaHTML;
/***   作業 6 填答區結束   **/
console.log("---(7)---");
/***   作業 7 填答區開始   **/
let roomDetail = {
  success: true,
  items: [
    {
      id: "3Elqe8kfMxdZv5xFLV4OUeN6jhmxIvQSTyj4eTgIowfIRvF4rerA2Nuegzc2Rgwu",
      imageUrl:
        "https://images.unsplash.com/photo-1551776235-dde6d482980b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80",
      normalDayPrice: 1380,
      holidayPrice: 1500,
      name: "Single Room",
    },
    {
      id: "g0mYhN6ignMz4VYW7eiWsXZN8DHolHzH8LuVmM6hq5h6BrrqrLMw4aJgHv7LZ3RQ",
      imageUrl:
        "https://images.unsplash.com/photo-1564182379166-8fcfdda80151?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
      normalDayPrice: 1899,
      holidayPrice: 2000,
      name: "Deluxe Single Room",
    },
    {
      id: "RA8NhExaXXZB7EODVALSDvFFQzj1JP0a4C1pwZ1acPaieRBwiWoCb0FE0KUbXaxg",
      imageUrl:
        "https://images.unsplash.com/photo-1526913621366-a4583840d736?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      normalDayPrice: 2460,
      holidayPrice: 2500,
      name: "Double Room",
    },
    {
      id: "kICyWhZ5XsfI4n1d4gBOsDjIyIxNozwgmxYKyZpzi5pjLcU2Nl4RhiGrn6zaPuTJ",
      imageUrl:
        "https://images.unsplash.com/photo-1519710889408-a67e1c7e0452?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80",
      normalDayPrice: 2888,
      holidayPrice: 3000,
      name: "Deluxe Double Room",
    },
    {
      id: "VCxbQq1vLeUtxW781k9Dlq3mHBRNl5YP19Lhq8k5TbIr2BeH58gRpnNKGoEgkysz",
      imageUrl:
        "https://images.unsplash.com/photo-1558976825-6b1b03a03719?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      normalDayPrice: 3350,
      holidayPrice: 3500,
      name: "Twin Room",
    },
    {
      id: "YovqNpFDaal598jbpd1A14gXwDE6gekTqJgxOAGcq78B8YnP7claymQVFy2GTwgb",
      imageUrl:
        "https://images.unsplash.com/photo-1552902019-ebcd97aa9aa0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80",
      normalDayPrice: 3899,
      holidayPrice: 4000,
      name: "Deluxe Twin Room",
    },
  ],
};

let totalPrice = 0;
roomDetail.items.forEach((room) => {
  totalPrice += room.normalDayPrice;
});

document.getElementById("totalPrice").textContent = `${totalPrice}元`;
/***   作業 7 填答區結束   **/
console.log("---(8)---");
/***   作業 8 填答區開始   **/
let salaryData = {
  company: "circle center",
  bossName: "casper",
  staff: [
    {
      name: "Bob",
      salary: 32000,
    },
    {
      name: "Jack",
      salary: 28000,
    },
  ],
};

salaryData.staff.forEach((staff) => {
  let raiseAmount = 0;
  if (staff.salary < 40000) {
    raiseAmount = 40000 - staff.salary;
    staff.salary += raiseAmount;
  }

  const staffElement = document.getElementById(staff.name);
  staffElement.innerHTML = `
    👤 員工: ${staff.name} <br>
    💰 調薪後薪水: ${staff.salary.toLocaleString()} 元 <br>
    ${raiseAmount > 0 ? `📈 加薪: ${raiseAmount.toLocaleString()} 元` : "✅ 已達標"}
  `;
});
/***   作業 8 填答區結束   **/
console.log("---(9)---");
/***   作業 9 填答區開始   **/
let lightRail = {
  isImage: false,
  data: [
    {
      seq: 1,
      站序: "1",
      車站代碼: "C1",
      車站中文站名: "籬仔內",
      車站英文站名: "Lizihnei",
      站位地點: "凱旋四路、一心路及瑞隆路交會路口南側",
      備註: "",
    },
    {
      seq: 2,
      站序: "2",
      車站代碼: "C2",
      車站中文站名: "凱旋瑞田",
      車站英文站名: "Kaisyuan Rueitian",
      站位地點: "凱旋四路、瑞田街路口",
      備註: "",
    },
    {
      seq: 3,
      站序: "3",
      車站代碼: "C3",
      車站中文站名: "前鎮之星",
      車站英文站名: "Cianjhen Star",
      站位地點: "中山三路與凱旋四路路口",
      備註: "",
    },
  ],
};
const newText = `
  📌 此筆資料包含了<strong>高雄市輕軌部分車站的資訊</strong>，而這個 <strong>lightRail</strong> 物件包含兩個主要部分：<br><br>
  1️⃣ <strong>isImage 屬性（false）</strong>：此屬性表示資料是否包含圖片。<br><br>
  2️⃣ <strong>data 屬性（陣列）</strong>：這是一個陣列，每個元素都是一個物件，代表輕軌的一個車站。<br>
  &emsp; 🚋 每個車站物件包含：<br>
  &emsp; 🔹 <strong>seq</strong>（順序）<br>
  &emsp; 🔹 <strong>站序</strong>（序號）<br>
  &emsp; 🔹 <strong>車站代碼</strong>（代碼）<br>
  &emsp; 🔹 <strong>車站中文站名</strong><br>
  &emsp; 🔹 <strong>車站英文站名</strong><br>
  &emsp; 🔹 <strong>站位地點</strong>（位置）<br>
`;
const lightRailElement = document.getElementById("lightRail");
lightRailElement.innerHTML = lightRail.data
  .map(
    (station) => `
      <div style="margin-bottom: 10px; padding: 5px; border-bottom: 1px solid #ddd;">
        <strong>🚉 ${station.車站中文站名} (${station.車站英文站名})</strong><br>
        🔢 站序: ${station.站序} | 🏷 車站代碼: ${station.車站代碼} <br>
        📍 位置: ${station.站位地點}
      </div>
    `
  )
  .join("");

const lightRailTitle = document.getElementById("lightRailTitle");
const toggleIcon = document.getElementById("toggleIcon");
lightRailElement.style.display = "none";
lightRailTitle.addEventListener("click", () => {
  if (lightRailElement.style.display === "none") {
    lightRailElement.style.display = "block";
    toggleIcon.textContent = "▼";
  } else {
    lightRailElement.style.display = "none";
    toggleIcon.textContent = "▶";
  }
});

document.getElementById("illustrate").innerHTML = newText;
/***   作業 9 填答區結束   **/
console.log("---(10)---");
/***   作業 10 填答區開始   **/
const bmiData = {
  underWeight: {
    state: "過輕(underWeight)",
    color: "藍色",
  },
  normalWeight: {
    state: "正常(normalWeight)",
    color: "紅色",
  },
  overWeight: {
    state: "過重(overWeight)",
    color: "橙色",
  },
  mildObesity: {
    state: "輕度肥胖(mildObesity)",
    color: "黃色",
  },
  moderatelyObese: {
    state: "中度肥胖(moderatelyObese)",
    color: "黑色",
  },
  kindOfObesity: {
    state: "重度肥胖(kindOfObesity)",
    color: "綠色",
  },
};

const illustrateElement = document.getElementById("illustrate2");

// 轉換成 HTML
const bmiHtml = Object.values(bmiData)
  .map(
    (item) => `
    <div style="margin-bottom: 5px;">
      <strong>${item.state}</strong> - <span style="color: ${item.color};">${item.color}</span>
    </div>
  `
  )
  .join("");

// 顯示到畫面
illustrateElement.innerHTML = bmiHtml;
/***   作業 10 填答區結束   **/
