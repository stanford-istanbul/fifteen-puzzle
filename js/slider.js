function Slider() {
  this.__board = $('#board');
  this.__answer = $('#answer');
  this.__sideLength = 4;

  var answerURL = this.__answer.css('background').replace(/.*url\(/, '').replace(/\).*/,'');
  console.log(answerURL);

  for (var p = 0; p < (Math.pow(this.__sideLength, 2) - 1); p++) {
    var r = Math.floor(p / this.__sideLength);
    var c = p % this.__sideLength;
    console.log(p, r, c);
    var piece = $('<div></div>');


    piece.addClass("piece");
    piece.css({
     
     "background": "url(" + answerURL + ") " + c * -150 + "px " + r * -150 + "px",
     "left": c * 150,
     "top": r * 150
   });

    this.__board.append(piece);
  }
}