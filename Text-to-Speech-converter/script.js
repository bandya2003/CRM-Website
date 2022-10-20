let btn = document.getElementById("btn");
let textarea = document.getElementById("textarea");
let gif = document.getElementById("gif");

btn.onclick = () => {
  responsiveVoice.speak(textarea.value, "Hindi Female");
  gif.style.display = "block";
};
