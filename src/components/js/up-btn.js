window.addEventListener('load', function() {
  const upBtn = document.querySelector('.up-btn');

  if(upBtn) {
    upBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  
    checkUpBtn(upBtn);
  
    window.addEventListener('scroll', function() {
      checkUpBtn(upBtn);
    });
  }
});

function checkUpBtn(btn) {
  const showOffset = 50;
  
  if(window.pageYOffset >= showOffset && btn.classList.contains('up-btn_hide')) {
    btn.classList.remove('up-btn_hide');
  } else if(window.pageYOffset < showOffset && !btn.classList.contains('up-btn_hide')) {
    btn.classList.add('up-btn_hide');
  }
}