console.clear();

//(1)
const janeOld = 14;
const janePhoneNumber = "0955713484";
const isWakeUp = false;
document.getElementById("janeOld").textContent = janeOld;
document.getElementById("janePhoneNumber").textContent = janePhoneNumber;
document.getElementById("isWakeUp").textContent = isWakeUp;

//(2)
let price = {
  steak: 50,
  rice: 30,
  drinks: 10,
};
let walletTotal = 200;
document.getElementById("steakPrice").textContent = price.steak;
document.getElementById("ricePrice").textContent = price.rice;
document.getElementById("drinksPrice").textContent = price.drinks;
document.getElementById("walletTotal").textContent = walletTotal;

//(3)
let cost = 0;
cost = price.steak * 2 + price.rice * 2;
let remaining = walletTotal - cost;
document.getElementById("cost").textContent = `${remaining}元`;

//(4)
let setting = {
  isWaiting: true,
  trafficLight: "紅燈",
  lasting: 35,
  people: 10,
  cloudNum: 3,
  sunNum: 1,
};
document.getElementById(
  "context"
).textContent = `小明是否在等紅綠燈:${setting.isWaiting}。現在是${setting.trafficLight}，還有${setting.lasting}秒，目前馬路上有${setting.people}人，看向天空有${setting.sunNum}顆太陽和${setting.cloudNum}朵雲`;

//(5)
let jQueryArr = {
  strategySuccess: 62,
  timeCourse: 393,
  score: 50,
};

function formatTime(hours) {
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  return `${days}天${remainingHours}小時`;
}

document.getElementById("success").textContent = jQueryArr.strategySuccess;
document.getElementById("time").textContent = formatTime(jQueryArr.timeCourse);
document.getElementById("score").textContent = jQueryArr.score;

//(6)
let a = 1; //宣告一個a變數，並賦予一個1的數字型別
let b = 0; //宣告一個b變數，並賦予一個0的數字型別
a = 3; //重新賦予a變數為3的數字型別
a = b + 2; //重新賦予a變數為b+2的數字型別
a - b; //做a-b的運算
b += 1; //將b做賦值運算子
document.getElementById("a").textContent = a;
document.getElementById("b").textContent = b;
const Instruction = "宣告一個a變數，並賦予一個1的數字型別，宣告一個b變數，並賦予一個0的數字型別，重新賦予a變數為3的數字型別，重新賦予a變數為b+2的數字型別，做a-b的運算，將b做賦值運算子，列印出a跟b。";
document.getElementById("description").textContent = Instruction;

//(7)
arr1 = [1, 2, 3]; //宣告一個arr1的陣列，並賦予變數[1,2,3]
arr2 = arr1; //arr1被賦值給arr2
arr2.push(4); //新增陣列一個4的值
arr2 = [5, 6, 7]; //重新賦予arr2的陣列，並賦予變數[5,6,7]
document.getElementById("arr1").textContent = arr1;
document.getElementById("arr2").textContent = arr2;
const Instruction2 = "宣告一個arr1的陣列，並賦予變數[1,2,3]，arr1被賦值給arr2，新增陣列一個4的值，重新賦予arr2的陣列，並賦予變數[5,6,7],列印出arr1跟arr2";
document.getElementById("description2").textContent = Instruction2;

//(8)
let maryAppleNum = 20;
maryAppleNum -= 5;
maryAppleNum -= 12;
maryAppleNum += 4;
document.getElementById("maryAppleNum").textContent = `${maryAppleNum}顆蘋果`;

//(9)
let bill = 0;
let hamburgerPrice = 30;
let hamburgerNum = 3;
let milkTeaPrice = 15;
let milkTeaNum = 32;
bill = hamburgerPrice * hamburgerNum + milkTeaPrice * milkTeaNum;
document.getElementById("billTotal").textContent = `${bill}元`;

//(10)
let g = "hello"; //g是str
let h = 123; //h是num
let i = g + h; //i是str
let j = true; //j是boolean
let k = h + h; //k是num
let l = j + k; //l是num
const Instruction3 = "g是str, h是num, i是str, j是boolean, k是num, l是num";
document.getElementById("description3").textContent = Instruction3;