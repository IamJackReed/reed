// Fallback to reveal home cards if AnimOnScroll fails to mark them.
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('grid');
    if (!grid) return;

    var cards = grid.querySelectorAll('article');
    if (!cards.length) return;

    window.setTimeout(function () {
      var anyVisible = Array.prototype.some.call(cards, function (card) {
        return card.classList.contains('shown') || card.classList.contains('animate');
      });

      if (!anyVisible) {
        Array.prototype.forEach.call(cards, function (card) {
          card.classList.add('shown');
        });
      }
    }, 400);
  });
})();
