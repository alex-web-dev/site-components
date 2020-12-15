window.addEventListener('load', () => {
  function showModal(options) {
    const $modal = document.createElement('div');
    $modal.className = 'modal';
    $modal.innerHTML = `
      <header class="modal__header">
        <div class="modal__title">${options.title || ''}</div>
        <button class="modal__exit modal__close">
            <img src="images/icons/close.svg" alt="Close">
        </button>
      </header>
      <div class="modal__body">
        <p>${options.text || ''}</p>
      </div>
      <footer class="modal__footer">
        <button class="modal__btn modal__btn_close modal__close">Close</button>
        <button class="modal__btn modal__submit">OK</button>
      </footer>`;

    
    document.body.appendChild($modal);

    const $modalSubmit = $modal.querySelector('.modal__submit');
    $modalSubmit.addEventListener('click', () => {
      $btn.closest('.modal').remove();
      closeAction();
    });

    const $modalCloses = document.querySelectorAll('.modal__close');
    $modalCloses.forEach(($btn) => {
      $btn.addEventListener('click', () => {
        $btn.closest('.modal').remove();
        submitAction();
      });
    });
  }

  function submitAction() {
    setTimeout(() => {
      showModal({
        title: 'Modal title',
        text: 'Modal content text.'
      });
    }, 1000);
  };

  function closeAction() {
    setTimeout(() => {
      showModal({
        title: 'Modal title',
        text: 'Modal content text.'
      });
    }, 1000);
  };
});