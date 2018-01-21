var lyric = document.querySelector("#lyric");
var text = lyric.innerText;

var wordcut = require("wordcut");
wordcut.init();
var words = wordcut.cut(text).split("|");

//TODO remove spans with only white spaces (but keep the white spaces like new lines)

text = "<span>" + words.join("</span><span>") + "</span>";
console.log(text);
text = text.replace(new RegExp("<span> </span>", "ig"), "&nbsp;");
text = text.replace(new RegExp("<span>[\r\n\f]</span>", "ig"), "<br>");
console.log(text);
lyric.innerHTML = text;

// lyric.addEventListener("mouseover", function(event) {
//   targetText = event.target.innerText;
//   var regex = new RegExp("<span>(" + targetText + ")</span>", "ig");
//   lyric.innerHTML = text.replace(regex, "<span class='editable'>$1</span>");
// }, false);

var targetText;
var justClicked = false;
lyric.addEventListener("click", function(event) {
  targetText = event.target.innerText;
  var regex = new RegExp("<span>(" + targetText + ")</span>", "ig");
  lyric.innerHTML = text.replace(regex, "<span class='highlight'>$1</span>");
  // lyric.innerHTML = lyric.innerHTML.replace(/editable/ig, "highlight");

  justClicked = true;
}, false);

document.addEventListener("keyup", function(event) {
  if (lyric.querySelectorAll(".highlight")) {
    var regex = new RegExp(targetText, "ig");
    if (justClicked) { //text replacement
      targetText = event.key;
    } else { //append key
      targetText += event.key;
    }
    text = text.replace(regex, targetText);
    // lyric.innerHTML = text;
    lyric.innerHTML = lyric.innerHTML.replace(regex, targetText);

    //TODO somehow highlight the edits

    justClicked = false;
  }
});
