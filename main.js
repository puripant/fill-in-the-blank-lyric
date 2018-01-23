var lyric = document.querySelector("#lyric");
var text = lyric.textContent;

var wordcut = require("wordcut");
wordcut.init();
var words = wordcut.cut(text).split("|");

text = "<span class=' '>" + words.join("</span><span class=' '>") + "</span>";
text = text.replace(new RegExp("<span class=' '> </span>", "ig"), " ");
text = text.replace(new RegExp("<span class=' '>[\r\n\f]</span>", "ig"), "<br>");
text = text.replace(new RegExp("<span class=' '>[\r\n\f]+</span>", "ig"), "<br><br>"); //NOTE 'edited' class will be added here
lyric.innerHTML = text; //NOTE 'highlight' class will be added here

// lyric.addEventListener("mouseover", function(event) {
//   targetText = event.target.innerText;
//   var regex = new RegExp("<span>(" + targetText + ")</span>", "ig");
//   lyric.innerHTML = text.replace(regex, "<span class='editable'>$1</span>");
// }, false);

var targetSpan;
var targetText;
var justClicked = false;
lyric.addEventListener("click", function(event) {
  targetSpan = event.target;
  targetText = targetSpan.innerText;
  var regex = new RegExp("<span class='(.+?)'>(" + targetText + ")</span>", "ig");
  lyric.innerHTML = text.replace(regex, "<span class='$1 highlight'>$2</span>");

  justClicked = true;
}, false);

document.addEventListener("keyup", function(event) {
  if (lyric.querySelectorAll(".highlight") && (event.key == "Backspace" || event.key.match(/^.$/i))) {
    var regex = new RegExp("<span class='(.+?)'>" + targetText + "</span>", "ig");

    if (event.key == "Backspace") {
      targetText = targetText.substring(0, targetText.length-1);
    } else {
      if (justClicked) { //text replacement
        targetText = event.key;
      } else { //append key
        targetText += event.key;
      }
    }

    text = text.replace(regex, "<span class='$1 edited'>" + targetText + "</span>");
    lyric.innerHTML = text;
    
    justClicked = false;
  }
});
