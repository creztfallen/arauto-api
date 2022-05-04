// Front

const get = document.querySelector(".dices");

setInterval(() => {
  fetch("/dices")
    .then((res) => res.json())
    .then(({ dices }) => {
      console.log(dices);
      let ul = "";
      for (var i = 0; i < dices.length; i++) {
        ul += `<li>${dices[i].playerName}: ${dices[i].diceValue}</li>`;
      }
      get.innerHTML = ul;
    })
    .catch((error) => console.log(error));
}, 5000);

const myForm = document.getElementById("form");
// const formData = new FormData(myForm);

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("/dices", {
    method: "POST",
    body: JSON.stringify({
      playerName: document.getElementById("playerName").value,
      diceType: document.getElementById("diceType").value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => {
      if (res.status != 200) {
        throw new Error("Bad server response");
      }
      return res.json();
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
});
