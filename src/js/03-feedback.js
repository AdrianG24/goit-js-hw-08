import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-msg';

const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(event) {
  event.preventDefault();
  console.log(formData);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(event) {
  formData[event.target.name] = event.target.value;
  // console.log(formData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    console.log(savedMessage);
    refs.textarea.value = savedMessage.message;
    refs.form.elements.email.value = savedMessage.email;
  }
  // console.log(savedMessage);
}
