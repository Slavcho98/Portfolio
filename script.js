const button = document.querySelector("button");
const wrapper = document.querySelector(".wrapper");
const banner = document.querySelector(".banner");
const spanNumbers = document.querySelectorAll("span");

let textContent = "";
let currentSpan = null;

function addColor(e) {
  if (currentSpan) {
    currentSpan.style.backgroundColor = "";
  }
  e.target.style.backgroundColor = "#fd7614";
  textContent = e.target.textContent;
  currentSpan = e.target;
}

spanNumbers.forEach((item) => {
  item.addEventListener("click", addColor);
});

function createElements() {
  const div = document.createElement("div");
  div.classList.add("banner", "text-center");

  const img = document.createElement("img");
  img.src = "./images/illustration-thank-you-removebg-preview.png";
  img.classList.add("m-bottom-1rem");

  const h2 = document.createElement("h2");
  h2.innerText = "Thank you!";

  const paragraph = document.createElement("p");
  paragraph.innerText = `You selected ${textContent} out of 5`;
  paragraph.classList.add(
    "color-orange",
    "ft-size-0-8rem",
    "background-radius",
    "padding-1rem",
    "m-bottom-1rem"
  );

  const paragraph2 = document.createElement("p");
  paragraph2.innerText = `We appreciate you taking the time to give a rating. If you ever need more support, don’t hesitate to get in touch!`;
  paragraph2.classList.add("m-top-1rem", "ft-size-0-8rem", "color-grey");

  div.append(img, h2, paragraph, paragraph2);
  document.body.append(div);
}

function removeWrapper() {
  wrapper.remove();
}

function buttonClickHandler() {
  if (!textContent) {
    alert("Please choose a number");
  } else {
    removeWrapper();
    createElements();
  }
}

button.addEventListener("click", buttonClickHandler);
