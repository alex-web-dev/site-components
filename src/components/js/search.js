window.addEventListener('load', function() {
  const $searchToggle = document.querySelector('.search__toggle');
  
  if($searchToggle) {
    $searchToggle.addEventListener('click', function() {
      const $searchParent = $searchToggle.closest('.search');
      $searchParent.classList.toggle('search_active');
    });
  }
});

