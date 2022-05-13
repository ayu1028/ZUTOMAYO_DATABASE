(() => {
  window.onload = setTimeout(() => {
    const close = document.getElementById('js-close');
    if(!close) return;
    close.classList.add('close');
  },4000);
})();