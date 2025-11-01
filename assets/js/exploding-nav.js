(function () {
  var navWrapper = document.querySelector('.exploding-nav');
  var button = document.querySelector('.exploding-nav-button');

  if (!navWrapper || !button) return;

  function toggleNav() {
    navWrapper.classList.toggle('active');
    navWrapper.classList.remove('first-run');
  }

  button.addEventListener('click', toggleNav);
})();
