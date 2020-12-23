const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href');
    const blockOffsetTop = document.querySelector(blockID).getBoundingClientRect().top;

    window.scrollBy({ top: (blockOffsetTop), left: 0, behavior: 'smooth' });
  })
}