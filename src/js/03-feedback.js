import * as Storages from './storage.js';
import throttle from 'lodash.throttle';
let objNow = {
  email: [],
  message: [],
};
const storageName = 'feedback-form-state';

const messagesUrl = document.querySelector('[name=message]');
const emailUrl = document.querySelector('[name=email]');
const btnUrl = document.querySelector('button');

messagesUrl.addEventListener('input', throttle(dataOnForm, 500));
emailUrl.addEventListener('input', throttle(dataOnForm, 500));

function dataOnForm() {
  objNow.message = messagesUrl.value;
  objNow.email = emailUrl.value;
  Storages.save(storageName, objNow);
}

btnUrl.addEventListener('click', e => {
  e.preventDefault();
  if (emailUrl.value === '' || messagesUrl.value === '') {
    alert('Please fill  email or message');
  }
  if (!(emailUrl.value.includes('@') && emailUrl.value.includes('.'))) {
    alert('Please fill in the email field correctly');
  } else {
    console.log(`email: ${objNow.email}\n message: ${objNow.message}\n`);
    localStorage.clear();
    messagesUrl.value = emailUrl.value = '';
    objNow.message = objNow.email = [];
  }
});

if (!localStorage.getItem(storageName)) {
  return;
} else {
  messagesUrl.value = Storages.load(storageName).message;
  emailUrl.value = Storages.load(storageName).email;
}
