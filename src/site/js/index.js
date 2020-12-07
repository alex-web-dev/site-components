document.querySelectorAll('code[class="html"]').forEach(function(htmlCode) {
  htmlCode.innerHTML = convertHTML(htmlCode.innerHTML);
});

const $articleCopyBtns = document.querySelectorAll('.article__copy-btn');
$articleCopyBtns.forEach($btn => {
  $btn.addEventListener('click', () => {
    const $article = $btn.closest('.article');

    let errMessage;
    let code;
    if ($btn.dataset.type === 'html') {
      const htmlBlock = $article.querySelector('.article__example-body');
      code = htmlBlock ? htmlBlock.innerHTML : errMessage = 'HTML not found';
    } else if ($btn.dataset.type === 'scss') {
      const scssBlock = $article.querySelector('.article__original_scss');
      code = scssBlock ? scssBlock.innerText : errMessage = 'SCSS not found';
    } else if ($btn.dataset.type === 'js') {
      const jsBlock = $article.querySelector('.article__original_js');
      code = jsBlock ? jsBlock.innerHTML : errMessage = 'JS not found';
    } else {
      addMessagePopup('Incorrect type');
      return;
    }

    if (errMessage) {
      addMessagePopup(errMessage);
      return;
    }

    const lang = $btn.dataset.type.toUpperCase();
    navigator.clipboard.writeText(code)
      .then(() => {
        addMessagePopup(`${lang} copied to clipboard`);
      })
      .catch(err => {
        addMessagePopup(`Copy to clipboard failed`);
      })
  });
});

function convertHTML(code) {
  return code.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function addMessagePopup(text, delay = 2000) {
  if(document.querySelector('.message-popup')) {
    return;
  }

  const popup = document.createElement('div');
  popup.className = 'message-popup';
  popup.innerHTML = `<div class="message-popup__text">${text}</div>`;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add('message-popup_show');
  }, 50);

  setTimeout(() => {
    popupHide();

    popup.addEventListener('transitionend', () => {
      popup.remove();

      popup.removeEventListener('transitionend', popupHide);
    });
    
  }, delay);

  function popupHide() {
    popup.classList.remove('message-popup_show');
  }
}

// window.addEventListener('resize', () => {
//   const articleHeader = document.querySelector('.article__header');
//   if(articleHeader.closest('.components')) {
//     console.log(1);
    
//   } else {
//     console.log(2);
    
//   }
//   if(window.innerWidth <= 768) {

//   } 
  
// });