const $cbForms = document.querySelectorAll('.cb-form');
if($cbForms.length) {
  $cbForms.forEach(($form) => {
    $form.addEventListener('submit', (e) => {
      e.preventDefault();

      clearFormFeedbacks($form);
      
      let isError = false;

      const $name = $form.querySelector('.cb-form__field[name="name"]');
      if(!validateName($name.value)) {
        $name.classList.add('cb-form__field_error');
        const $nameFeedback = $name.closest('.cb-form__item').querySelector('.cb-form__feedback');
        $nameFeedback.innerHTML = 'Please provide a valid name';
        isError = true;
      }

      const $email = $form.querySelector('.cb-form__field[name="email"]');
      if(!validateEmail($email.value)) {
        $email.classList.add('cb-form__field_error');
        const $emailFeedback = $email.closest('.cb-form__item').querySelector('.cb-form__feedback');
        $emailFeedback.innerHTML = 'Please provide a valid email';
        isError = true;
      }

      const $comment = $form.querySelector('.cb-form__field[name="comment"]');
      if(!validateComment($comment.value)) {
        $comment.classList.add('cb-form__field_error');
        const $commentFeedback = $comment.closest('.cb-form__item').querySelector('.cb-form__feedback');
        $commentFeedback.innerHTML = 'Please provide a valid comment';
        isError = true;
      }

      if(!isError) {
        alert('Success');        
      }
      
    });
  });
}

const $cbFormsFields = document.querySelectorAll('.cb-form__field');
if($cbFormsFields.length) {
  $cbFormsFields.forEach(($field) => {
    $field.addEventListener('focus', () => {
      $field.classList.remove('cb-form__field_error');
    });
  });
}

const clearFormFeedbacks = ($form) => {
  const $feedbacks = $form.querySelectorAll('.cb-form__feedback');
  $feedbacks.forEach(($feedback) => {
    $feedback.innerHTML = '';
  });
}

const validateName = (name) => {
  if(name.length < 2 || name.length > 40) {
    return false;
  }

  return true;
}

const validateEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(String(email).toLowerCase());
}

const validatePhone = (phone) => {
  if(phone.length < 8  || phone.length > 20) {
    return false;
  }

  return true;
}

const validateComment = (comment) => {
  if(comment.length > 2000) {
    return false;
  }

  return true;
}