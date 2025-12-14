// Fallback to reveal home cards if AnimOnScroll fails to mark them.
(function () {
  'use strict';

  function revealAllCards() {
    var grid = document.getElementById('grid');
    if (!grid) return;

    var cards = grid.querySelectorAll('article');
    if (!cards.length) return;

    // If at least one card is already visible via animation, do nothing.
    var anyVisible = Array.prototype.some.call(cards, function (card) {
      return card.classList.contains('shown') || card.classList.contains('animate');
    });

    if (!anyVisible) {
      Array.prototype.forEach.call(cards, function (card) {
        card.classList.add('shown');
      });
    }
  }

  function revealHiddenCards() {
    var grid = document.getElementById('grid');
    if (!grid) return;

    var hiddenCards = grid.querySelectorAll('article:not(.shown):not(.animate)');
    if (!hiddenCards.length) return;

    Array.prototype.forEach.call(hiddenCards, function (card) {
      card.classList.add('shown');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Let the animation script run first; then fall back.
    window.setTimeout(revealAllCards, 350);
    // In case only some cards were missed, run a second pass.
    window.setTimeout(revealHiddenCards, 900);
  });
})();
