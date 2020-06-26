console.log("client side js file");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");
const msg3 = document.querySelector("#msg3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  msg1.textContent = "Loading...";
  msg2.textContent = "";
  msg3.textContent = "";

  const location = search.value;
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = data.location;
        msg2.textContent = data.forecast;
        msg3.textContent = data.description;
        console.log(data);
      }
    });
  });
});
