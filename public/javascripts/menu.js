(() => {
  const btn = document.querySelector('.side-menu-button');
  const clsbtn = document.querySelector('.side-menu-button-close');
  const nav = document.querySelector('nav');
  
  btn.addEventListener('click', () => {
    nav.classList.add('open');
  });

  clsbtn.addEventListener('click', () => {
    nav.classList.remove('open');
  });
})();