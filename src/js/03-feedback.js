import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-msg';

const FormData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

refs.form.addEventListener('input', evt => {
  const formDataStorage = {
    email: refs.form.elements.email.value,
    message: refs.form.elements.message.value,
  };
  formDataStorage[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formDataStorage));
});

populateTextarea();

function onFormSubmit(event) {
  event.preventDefault();
  console.log('відправили');
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(event) {
  const message = event.target.value;
  localStorage.setItem(STORAGE_KEY, message);
}

function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    // console.log(savedMessage);
    refs.textarea.value = savedMessage.message;
    refs.form.elements.email.value = savedMessage.email;
  }
  console.log(savedMessage);
}
