"use strict" 
/*не позволяет объявлять переменные без использования let*/
let balance = document.querySelector(".balance");
let displayText = document.querySelector(".display-text");
let progressBar = document.querySelector(".progress-bar");
let coffeeCup = document.querySelector(".coffee-cup img");

let coffeeStatus = "waiting"; // "cooking" "ready" - ожидание заказа

coffeeCup.onclick = takeCoffee; // повесили событие как свойство  - вариант 1

// coffeeCup.addEventListener("click", takeCoffee, par1, par2); // варинат 2  - добавить слушателя событий. 
// coffeeCup.addEventListener("click", () => { takeCoffe })
 

function buyCoffee(name, cost, elem) {
  if (coffeeStatus != "waiting") {
    return;
  }
  let afterBuyValue = +balance.value - cost;
  if ( (balance.value - cost) < 0 || Number.isNaN(afterBuyValue)) {
    balance.style.border = "2px solid red";
    balance.style.backgroundColor = "pink";
    changeDisplayText("Недостаточно средств");
    return;
  }
  balance.style.border = "none";
  balance.style.backgroundColor = "white";
  balance.value = (+balance.value - cost).toFixed(2);
  cookCoffee(name, elem);
}
  // alert("Ваш " + name + " готовится!");


function cookCoffee(name, elem) {
  coffeeStatus = "cooking";
  changeDisplayText("Ваш " + name + " готовится");
  
  let cupImg = elem.querySelector("img");
  let cupSrc = cupImg.getAttribute("src");
  coffeeCup.setAttribute("src", cupSrc); // какой атрибут меня, на что его меняем
 // console.log(cupImg);
  coffeeCup.style.opacity = "0%";
  coffeeCup.classList.remove("d-none");
 
 //coffeCup.classList.add(""); // list всех классов кот. там есть, add добавить класс
  //coffeCup.classList.remove(""); //убрать класс
  //coffeCup.classList.toggle(""); // включить/выключить класс
  
 //coffeCup.classList.contains("d-none"); // Содержит ли?
  
  let readyPercent = 0; // насколько % кофе приготовился
  let cookingInterval = setInterval(() => {
    readyPercent++
    progressBar.style.width = readyPercent + "%";
    coffeeCup.style.opacity = readyPercent + "%";
    if(readyPercent == 100) {
      coffeeStatus = "ready";
      changeDisplayText("Ваш " + name + " готов!");
      coffeeCup.style.cursor = "pointer";
      clearInterval(cookingInterval);
    }
  }, 100);
}

function takeCoffee()  { //будет переводить кофе машину в состояние waiting, ожид заказа
  if (coffeeStatus != "ready") {
    return;
  }
  coffeeStatus = "waiting";
  coffeeCup.classList.add("d-none");
  coffeeCup.style.cursor = "auto";
  progressBar.style.width = "0%";
  changeDisplayText("Выберите кофе");

}

function changeDisplayText(text) {
  // displayText.innerText = "<span>"+text+"</span>";
  displayText.innerHTML = "<span>"+text+"</span>";
}

// ------------------------------------- Drag 'n' Drop -------------------------------------------------------

let bills = document.querySelectorAll(".wallet img");

for(let i = 0; i < bills.length; i++) {
  bills[i].onmousedown = takeMoney;
  // bills[i].onmousedown = () => {takeMoney()};
}

function takeMoney(event) {  // event - e сокращенно
  event.preventDefault(); // сбрасывает изначально записанные события
  
  let bill = this;
  let billCost = bill.getAttribute("cost");
  console.log(billCost);
  
  bill.style.position = "absolute";
  bill.style.transform = "rotate(90deg)";
  
  let billCoords = bill.getBoundingClientRect();
  let billWidth = billCoords.width;
  let billHeight = billCoords.height;
  // console.log(billWidth, billHeight);
  // console.log(event);
  // console.log(event.clientX, event.clientY);
  
  bill.style.top = event.clientY - billWidth/2 + "px"; // позиция это левый верхний край
  bill.style.left = event.clientX - billHeight/2 + "px";
  
  window.onmousemove = (event) => {
    //console.log(event.clientX, event.clientY);
    bill.style.top = event.clientY - billWidth/2 + "px"; 
    bill.style.left = event.clientX - billHeight/2 + "px";
  };
  
  bill.onmouseup = dropMoney;
}

function dropMoney() {
  window.onmousemove = null; // свойство CSS z-index определяет слои
}
