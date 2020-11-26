window.addEventListener('load', function() {
  const $searchToggle = document.querySelector('.search__toggle');
  $searchToggle.addEventListener('click', function() {
    const $searchParent = $searchToggle.closest('.search');
    $searchParent.classList.toggle('search_active');
  });
});

