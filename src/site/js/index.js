document.querySelectorAll('code[class="html"]').forEach(function(htmlCode) {
  htmlCode.innerHTML = convertHTML(htmlCode.innerHTML);
});

const $articleCopyBtns = document.querySelectorAll('.article__copy-btn');
$articleCopyBtns.forEach($btn => {
  $btn.addEventListener('click', () => {
    copyEvent($btn);
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

const $article = document.querySelector('.article')
const $articleExample = $article.querySelector('.article__example');
if($articleExample) {
  const $articleCopy = $articleExample.querySelector('.article__copy');
  const copyOptions = {
    parent: $articleExample
  }

  const $articleHTML = $article.querySelector('code.html');
  const $articleSCSS = $article.querySelector('code.scss');
  const $articleJS = $article.querySelector('code.js');
  if($articleHTML) {
    copyOptions.html = true

    const $articleSource = $articleHTML.closest('.article__source');
    createCopyBtns({
      parent: $articleSource,
      html: true
    });
  }
  if($articleSCSS) {
    copyOptions.scss = true
    const $articleSource = $articleSCSS.closest('.article__source');
    createCopyBtns({
      parent: $articleSource,
      scss: true
    });
  }
  if($articleJS) {
    copyOptions.js = true
    const $articleSource = $articleJS.closest('.article__source');
    console.log($articleSource);
    
    createCopyBtns({
      parent: $articleSource,
      js: true
    });
  }

  createCopyBtns(copyOptions);
}

function createCopyBtns(options) {
  const $articleCopy = document.createElement('div');
  $articleCopy.className = 'article__copy';

  if(options.html === true) {
    $articleCopy.innerHTML += '<button class="article__copy-btn" data-type="html">HTML</button>';
  }

  if(options.scss === true) {
    $articleCopy.innerHTML += '<button class="article__copy-btn" data-type="scss">SCSS</button>';
  }

  if(options.js === true) {
    $articleCopy.innerHTML += '<button class="article__copy-btn" data-type="js">JS</button>';
  }

  options.parent.appendChild($articleCopy);

  $copyBtns = $articleCopy.querySelectorAll('.article__copy-btn');
  $copyBtns.forEach(($btn) => {
    $btn.addEventListener('click', () => {
      copyEvent($btn);
    });
  });
  

  return $articleCopy;
}

function copyEvent($btn) {
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
    code = jsBlock ? jsBlock.innerText : errMessage = 'JS not found';
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
    });
}