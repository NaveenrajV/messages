window.onload = function() {
  const realFileBtn = document.getElementById("file");
  const customBtn = document.getElementById("image");
  // const customTxt = document.getElementById("custom-text");

  console.log("loaded");
  customBtn.addEventListener("click", function() {
    realFileBtn.click();
  });
};
// realFileBtn.addEventListener("change", function() {
//   console.log("loaded");
//   if (realFileBtn.value) {
//     customTxt.innerHTML = realFileBtn.value.match(
//       /[\/\\]([\w\d\s\.\-\(\)]+)$/
//     )[1];
//   } else {
//     customTxt.innerHTML = "No file chosen, yet.";
//   }
// });
