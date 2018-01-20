var lyric = document.querySelector("#lyric");
var text = lyric.innerText;

var wordcut = require("wordcut");
wordcut.init();
var words = wordcut.cut(text).split("|");

text = "<span>" + words.join("</span><span>") + "</span>";
lyric.innerHTML = text;

lyric.addEventListener("click", function(event) {
  var target = event.target;
  console.log(target);
  var regex = new RegExp("(<span>" + target.textContent + "</span>)", "ig");
  lyric.innerHTML = text.replace(regex, "<span class='highlight'>$1</span>");
}, false);
