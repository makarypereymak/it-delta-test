'use stric';

const listForPhotos =  document.querySelector('.page-main__block-6');
const imgTemplate = document.querySelector('#template')
  .content
  .querySelector('.page-main__block-6-item');

const modal = document.querySelector('.modal');
const modalPicture = modal.querySelector('.modal__pic');
const modalCloseButton = modal.querySelector('.modal__close-button');
const modalPicNumber = modal.querySelector('.modal__pic-number');
const commentForm = modal.querySelector('.modal__form');
const containerForComments = modal.querySelector('.modal__for-commtent');
const inputForMessage = modal.querySelector('.modal__input-form-comment');

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

const addEventListenerForPhotos = () => {
  const pictures = document.getElementsByClassName('page-main__pic');
  let picruresArray = Array.from(pictures);
  picruresArray.forEach((elem, i, picruresArray) => {
    elem.addEventListener('click', function () {
      modal.style.display = "flex";
      modalPicture.src = elem.src;
      modalPicNumber.textContent = i + 1;
    })
  });
}

const addUrl = (list) => {
  for (let i = 0; i <= list.length - 1; i++) {
    const photoElement = imgTemplate.cloneNode(true);
    const image =  photoElement.querySelector('.page-main__pic');
    image.src = list[i].url;
    listForPhotos.appendChild(photoElement);
  }

  addEventListenerForPhotos();
}

const getPhoto = () => {
  fetch('https://boiling-refuge-66454.herokuapp.com/images')
    .then((response) =>  response.json())
    .then((photos) => {
      addUrl(photos);
    })
    .catch(() => {
      showAlert('При загрузке данных с сервара произошла ошибка, попробуйте обновить страницу');
    });
};

modalCloseButton.addEventListener('click', function () {
  modal.style.display = "none";
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    modal.style.display = "none";
  }
});

getPhoto();

commentForm.addEventListener('sibmit', (event) => {
  event.preventDefault();
  fetch(
    'https://boiling-refuge-66454.herokuapp.com/images/:imageId/comments',
    {
      method: 'POST',
      body: formData,
      type: 'multipart/form-data',
    },
  )
    .then(() => {
      const newMessage = createElement('p');
      newMessage.textContent = inputForMessage.value;
      containerForComments.appendChild(photoElement);
      inputForMessage.value = '';
    })
    .catch(() => {
      showAlert('При отправке данных произошла ошибка.');
    })
});
