function Slider() {
  this.__board = $('#board');
  this.__answer = $('#answer');
  this.__movesLabel = $("#move-counter");
  this.__moves = 0;
  this.__sideLength = 4;
  this.__blank = null;

  this.createPieces();
  this.createBlank();
  this.__movesLabel.text(this.__moves);
}

Slider.prototype.movePiece = function(piece) {
  var blank = this.__blank;

  var blankData = $.extend({}, blank.data());
  var pieceData = piece.data();

  if (Math.abs(blankData.r - pieceData.r) + Math.abs(blankData.c - pieceData.c) == 1) {

    var tempPosition = blank.position();

    blank.css(piece.position());
    blank.data('r', piece.data().r);
    blank.data('c', piece.data().c);
    piece.data('r', blankData.r);
    piece.data('c', blankData.c);

    piece.css(tempPosition);
    this.__moves++;
    this.__movesLabel.text(this.__moves);
  }
}

Slider.prototype.createPieces = function() {
  var answerURL = this.__answer.css('background').replace(/.*url\(/, '').replace(/\).*/,'');
  var pieces = [];
  var obj = this;

  for (var p = 0; p < (Math.pow(this.__sideLength, 2) - 1); p++) {
    var r = Math.floor(p / this.__sideLength);
    var c = p % this.__sideLength;

    var piece = $('<div></div>');
    piece.addClass("piece");
    piece.css({
      "background": "url(" + answerURL + ") " + c * -150 + "px " + r * -150 + "px",
      "left": c * 150,
      "top": r * 150
    });

    piece.data('r', r);
    piece.data('c', c);

    pieces.push(piece);
    this.__board.append(piece);
  }


  pieces.forEach(function(piece) {
    var obj = this;
    piece.click(function() { obj.movePiece(piece); });
  }, obj);
}

// create blank piece as the placeholder
Slider.prototype.createBlank = function() {
  var blankPiece = $('<div></div>');
  blankPiece.addClass('piece');
  blankPiece.attr('id', 'blank');
  blankPiece.css({
    "left": (this.__sideLength - 1) * 150,
    "top": (this.__sideLength - 1) * 150
  });

  blankPiece.data('r', this.__sideLength - 1);
  blankPiece.data('c', this.__sideLength - 1);

  this.__blank = blankPiece;
  this.__board.append(blankPiece);
}