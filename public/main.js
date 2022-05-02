// Front

const get = document.querySelector(".dices");

setInterval(() => {
  fetch("/dices")
    .then((resp) => resp.json())
    .then(({ dices }) => {
      console.log(dices);
      let ul = "";
      for (var i = 0; i < dices.length; i++) {
        ul += `<li>${dices[i].playerName}: ${dices[i].diceValue}</li>`;
      }
      get.innerHTML = ul;
    });
}, 1000);
