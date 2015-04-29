function Slider() {
  this.__board = $('#board');
  this.__answer = $('#answer');
  this.__sideLength = 4;

  var answerURL = this.__answer.css('background').replace(/.*url\(/, '').replace(/\).*/,'');

  var pieces = [];
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

    piece.click(function() {
      debugger;
      var blank = $("#blank");
      var curr = $(this);

      var blankData = $.extend({}, blank.data());
      var currData = curr.data();

      if (Math.abs(blankData.r - currData.r) + Math.abs(blankData.c - currData.c) == 1) {
        
        var tempPosition = blank.position();

        blank.css(curr.position());
        blank.data('r', curr.data().r);
        blank.data('c', curr.data().c);
        debugger;
        curr.data('r', blankData.r);
        curr.data('c', blankData.c);
        
        curr.css(tempPosition);
      }
      debugger;
    });

    this.__board.append(piece);
  }

  var blankPiece = $('<div></div>');
  blankPiece.addClass('piece');
  blankPiece.attr('id', 'blank');
  blankPiece.css({
    "left": (this.__sideLength - 1) * 150,
    "top": (this.__sideLength - 1) * 150
  });

  blankPiece.data('r', this.__sideLength - 1);
  blankPiece.data('c', this.__sideLength - 1);

  this.__board.append(blankPiece);
  

  // create blank piece as the placeholder
}