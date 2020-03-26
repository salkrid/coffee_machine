"use strict" 
/*не позволяет объявлять переменные без использования let*/
let balance = document.querySelector(".balance");
let displayText = document.querySelector(".display-text");
let progressBar = document.querySelector(".progress-bar");
let coffeeCup = document.querySelector(".coffee-cup img");

let coffeeStatus = "waiting"; // "cooking" "ready" - ожидание заказа


function buyCoffee(name, cost, elem) {
  if(coffeeStatus != "waiting") {
    return;
  }
  let afterBuyValue = +balance.value - cost;
 /* alert(`Вы заказали ${name}. Цена: ${cost}`);*/
  if ( (balance.value - cost) < 0 || Number.isNaN(afterBuyValue)) {// Возвращает значение без "="
    balance.style.border = "2px solid red";
    balance.style.backgroundColor = "pink";
    changeDisplayText("Недостаточно средств");
   /* alert("Недостаточно средств!");*/
    return;
  }
  balance.style.border = "none";
  balance.style.background = "white";
  balance.value = (+balance.value - cost).toFixed(2);
  cookCoffee(name, elem);
  // alert("Ваш " + name + " готовится!");
}

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
  
//  console.log(elem);
}

function changeDisplayText(text) {
  // displayText.innerText = "<span>"+text+"</span>";
  displayText.innerHTML = "<span>"+text+"</span>";
  
}