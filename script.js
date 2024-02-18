const button = document.querySelector(".icon-circle");
const shareDiv = document.querySelector(".share");

let isShareVisible = false;

button.addEventListener("click", () => {
  shareDiv.style.visibility = isShareVisible ? "hidden" : "visible";
  isShareVisible = !isShareVisible;
});
