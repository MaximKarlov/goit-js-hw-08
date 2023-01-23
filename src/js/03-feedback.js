import * as Storages from './storage.js';
const _ = require('lodash');
let objNow = {
  email: [],
  message: [],
};
const storageName = 'feedback-form-state';

const messagesUrl = document.querySelector('[name=message]');
const emailUrl = document.querySelector('[name=email]');
const btnUrl = document.querySelector('button');

messagesUrl.addEventListener('input', event => {
  objNow.message = event.currentTarget.value;
  const throt_fun1 = _.throttle(function () {
    Storages.save(storageName, objNow);
  }, 500);
  throt_fun1();
});

emailUrl.addEventListener('input', event => {
  objNow.email = event.currentTarget.value;
  setTimeout(Storages.save(storageName, objNow), 500);
});

btnUrl.addEventListener('click', e => {
  e.preventDefault();

  if (emailUrl.value === '' || messagesUrl.value === '') {
    alert('Please fill  email or message');
  } else {
    if (!(emailUrl.value.includes('@') && emailUrl.value.includes('.'))) {
      alert('Please fill in the email field correctly');
    } else {
      Storages.save(storageName, objNow);
      console.log(`email: ${objNow.email}\n message: ${objNow.message}\n`);
      localStorage.clear();
      messagesUrl.value = emailUrl.value = '';
      objNow.message = objNow.email = [];
    }
  }
});

if (!localStorage.getItem(storageName)) {
  return;
} else {
  messagesUrl.value = Storages.load(storageName).message;
  emailUrl.value = Storages.load(storageName).email;
}
