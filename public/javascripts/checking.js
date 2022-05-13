(() => {
  const checkingItems = document.getElementById('checking').title;
  const checkingItemstoJSON = JSON.parse("[" + checkingItems + "]");

  checkingItemstoJSON.forEach(element => {
    console.log(element);
    document.getElementById(`checking${element}`).checked = true;
  });
})();