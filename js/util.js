const getRandomIndex = (arr) => {
	return arr[Math.floor(Math.random() * (arr.length - 1))];
};

function getRandomInt(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
	return array;
};

const isEscEvent = (evt) => {
	return evt.key === ('Escape' || 'Esc');
};

const isEnterEvent = (evt) => {
	return evt.key === 'Enter';
};

function sendRequest(method, url, body = null) {
	return new Promise((resolve, reject) => {

		const xhr = new XMLHttpRequest();

		xhr.responseType = 'json';
		xhr.timeout = 10000;

		xhr.addEventListener('load', () => {
			if (xhr.status >= 400) {
				reject(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
			} else {
				resolve(xhr.response);
			}
		});

		xhr.addEventListener('error', () => {
			reject('Произошла ошибка соединения с сервером');
		});

		xhr.addEventListener('timeout', () => {
			reject(`Запрос не успел выполниться за ${xhr.timeout} мс`);
		});

		xhr.open(method, url);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify(body));
	});
};

export { getRandomIndex, getRandomInt, shuffle, isEscEvent, sendRequest };
