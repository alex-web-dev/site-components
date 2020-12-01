const allAccordionsItems = document.querySelectorAll('.accordion__item');
allAccordionsItems.forEach((item) => {
  item.addEventListener('click', toggleAccordion);
});

function toggleAccordion(event) {
  const item = event.target.closest('.accordion__item');
  if (item.open) {
    return;
  }

  const accordion = event.target.closest('.accordion');
  const openedItem = accordion.querySelector('.accordion__item[open]');
  if(openedItem && item != openedItem) {
    openedItem.removeAttribute('open');
  }
}