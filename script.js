"use strict" 
/*не позволяет объявлять переменные без использования let*/
let balance = document.querySelector(".balance");

function buyCoffee(name, cost) {
  let afterBuyValue = +balance.value - cost;
 /* alert(`Вы заказали ${name}. Цена: ${cost}`);*/
  if ( (balance.value - cost) < 0 || Number.isNaN(afterBuyValue)) {// Возвращает значение без "="
    alert("Недостаточно средств!");
    return;
  }
  balance.value = (+balance.value - cost).toFixed(2);
  alert("Ваш " + name + " готовится!");
}