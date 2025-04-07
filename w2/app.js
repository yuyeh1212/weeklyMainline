console.clear();
console.log("---第1題---");
/***   作業 1 填答區開始   **/
let a = 4;
let b = 5;
let c = 5;
let d = 6;
let e = 8;
let f = 5;
document.getElementById("a").textContent = a > 0;
document.getElementById("b").textContent = b > a;
document.getElementById("ab").textContent = (a + b) > 1;
document.getElementById("c").textContent = c == d;
document.getElementById("d").textContent = c !== d;
document.getElementById("e").textContent = f >= e;
document.getElementById("f").textContent = f != e;
document.getElementById("ef").textContent = f == e;
/***   作業 1 填答區結束   **/
console.log("---第2題---");
/***   作業 2 填答區開始   **/
let g = 8;
let h = '8';
let i = '9';
let j = '9';
let k = 2;
let l = '5';
const text = "因變數l的值會強制轉成Num，所以2*5=10會>=5";
document.getElementById("g").textContent = g * h == 88;
document.getElementById("h").textContent = g * h == 64;
document.getElementById("gh").textContent = g * h === 64;
document.getElementById("i").textContent = i + j == 99;
document.getElementById("j").textContent = i + j === '99';
document.getElementById("ij").textContent = i + j === 99;
document.getElementById("kl").textContent = (k * l) >= 5;
document.getElementById("illustrate").textContent = text;
/***   作業 2 填答區結束   **/
console.log("---第3題---");
/***   作業 3 填答區開始   **/

// 範例回覆：解答是 
let m = 1;
if (2>1){
  m = 3;
}
document.getElementById("m").textContent = m;

let n = 5;
if (true){
  n += 10;
}
document.getElementById("n").textContent = n;
const text2 = "m原因是(2>1)=true，所以會執行 m = 3。n原因是(true)=true，所以會執行 n += 10。";
document.getElementById("illustrate2").textContent = text2;
/***   作業 3 填答區結束   **/
console.log("---第4題---");
/***   作業 4 填答區開始   **/
let childHeight = 133;
let restaurantChildHeight = 120;
let bill = 600;
let childPrice = 300;
if(childHeight > restaurantChildHeight){
  bill += 300;
}
document.getElementById("billTotal").textContent = `${bill}元`;
/***   作業 4 填答區結束   **/
console.log("---第5題---");
/***   作業 5 填答區開始   **/
let badge = 3;
let buyApples = 4;
let finallyBuyApples = 5;
if(buyApples === finallyBuyApples){
  badge += 3;
}else{
  badge += 1;
}
document.getElementById("badge").textContent = `${badge}個徽章`;
/***   作業 5 填答區結束   **/
console.log("---第6題---");
/***   作業 6 填答區開始   **/
let o = 200;
let p = 300;
document.getElementById("o").textContent = o == 200 || p == 300;
document.getElementById("p").textContent = o !== 200 || p !== 300;
document.getElementById("op").textContent = o == 200 && p == 300;

let hamPrice = 50;
let hamNum = 20;
let isSale = 3000 <= hamPrice * hamNum || hamNum > 10;

document.getElementById("isSale").textContent = isSale;
document.getElementById("illustrate3").textContent = "3000 <= 1000 || 20 > 10";
/***   作業 6 填答區結束   **/
console.log("---第7題---");
/***   作業 7 填答區開始   **/
let weight = 65;
let message = "";
if (weight >= 80){
  message = "過重，要加油減肥!!";
}else if(weight < 80 && weight>=60){
  message = "正常，身體健康繼續保持!!";
}else if(weight < 60 && weight>=40){
  message = "過輕，需稍微增加體重!!";
}else{
  message = "不正常，請盡速就醫!!";
}
document.getElementById("illustrate4").textContent = weight+ `公斤，` + message;
/***   作業 7 填答區結束   **/
console.log("---第8題---");
/***   作業 8 填答區開始   **/
let giftNum = 200;
let giftPriceRule = 399;
let BobPrice = 500;
let BobIsVip = false;
let message2 = "";

if(BobPrice >= giftPriceRule || BobIsVip){
  giftNum--;
  message2 = "客戶您好，您已符合贈品資格";
}else{
  message2 = "客戶您好，您未符合贈品資格";
}
document.getElementById("qualifications").textContent = message2;
document.getElementById("freebies").textContent = `${giftNum}個`;
/***   作業 8 填答區結束   **/
console.log("---第9題---");
/***   作業 9 填答區開始   **/
let mingMoney = 87e4;
let mingBill = 5e3;
if(mingMoney <= 54e4){
  mingBill = mingMoney * 0.3 + mingBill;
}else if(54e4 < mingMoney && mingMoney <= 100e4){
  mingBill = mingMoney * 0.5 + mingBill;
}else if(mingMoney > 100e4){
  mingBill = mingMoney * 0.8 + mingBill;
}

document.getElementById("mingBill").textContent = `${mingBill}元`;
/***   作業 9 填答區結束   **/
console.log("---第10題---");
/***   作業 10 填答區開始   **/
function checkWinner() {
  const playerA = document.getElementById("playerA").value;
  const playerB = document.getElementById("playerB").value;
  let result = "";

  if (playerA === playerB) {
      result = "平手！";
  } else if (
      (playerA === "剪刀" && playerB === "布") ||
      (playerA === "石頭" && playerB === "剪刀") ||
      (playerA === "布" && playerB === "石頭")
  ) {
      result = "玩家 A 勝利！";
  } else {
      result = "玩家 B 勝利！";
  }

  document.getElementById("result").innerText = result;
}
/***   作業 10 填答區結束   **/