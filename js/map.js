'use strict'

const MIN_PRICE = 1000;
const MAX_PRICE = 100000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 4;
const MIN_GUESTS = 2;
const MAX_GUESTS = 6;
const PIN_WIDTH = 44 / 2;
const PIN_HEIGHT = 40 + 18;
const MIN_X_COORDINATES = 50;
const MAX_X_COORDINATES = 1150;
const MIN_Y_COORDINATES = 130;
const MAX_Y_COORDINATES = 630;
const map = document.querySelector('.map');
map.classList.remove('map--faded');
const mapFilterContainer = document.querySelector('.map__filters-container');
const mapTemplate = document.querySelector('template').content.querySelector('.map__card');
const mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
const mapPins = document.querySelector('.map__pins');

const offers = [
	'Большая уютная квартира',
	'Маленькая неуютная квартира',
	'Огромный прекрасный дворец',
	'Маленький ужасный дворец',
	'Красивый гостевой домик',
	'Некрасивый негостеприимный домик',
	'Уютное бунгало далеко от моря',
	'Неуютное бунгало по колено в воде'
];

const houseTypes = ['palace', 'flat', 'house', 'bungalo'];
const checkTimes = ['12:00', '13:00', '14:00'];
const featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photoArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

function getRandomInt(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const getRandomIndex = (arr) => {
	return arr[Math.floor(Math.random() * (arr.length - 1))];
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
	return array;
}

const getMapOffers = () => {
	let newArr = [];

	for (let i = 0; i < 7; i++) {

		let getXcoordinate = getRandomInt(MIN_X_COORDINATES, MAX_X_COORDINATES) + PIN_WIDTH;
		let getYcoordinate = getRandomInt(MIN_Y_COORDINATES, MAX_Y_COORDINATES) + PIN_HEIGHT;

		let newObj = {
			author: {
				avatar: `img/avatars/user0${i+1}.png`
			},
			offer: {
				title: offers[i],
				address: `${getXcoordinate}, ${getYcoordinate}`,
				price: getRandomInt(MIN_PRICE, MAX_PRICE),
				type: getRandomIndex(houseTypes),
				rooms: getRandomInt(MIN_ROOMS, MAX_ROOMS),
				guests: getRandomInt(MIN_GUESTS, MAX_GUESTS),
				checkin: getRandomIndex(checkTimes),
				checkout: getRandomIndex(checkTimes),
				features: featuresArr.slice(getRandomInt(0, 2), getRandomInt(3, 6)),
				description: '',
				photos: shuffle(photoArr),
				location: {
					x: getXcoordinate,
					y: getYcoordinate
				}
			}
		}
		newArr.push(newObj);
	}

	return newArr;
};

const mapOffers = getMapOffers();

const renderMapCard = (arr) => {
	const mapCard = mapTemplate.cloneNode('true');
	const featuresBox = mapCard.querySelector('.popup__features');
	const features = mapCard.querySelectorAll('.feature');

	mapCard.querySelector('.map__card-avatar').src = arr.author.avatar;
	mapCard.querySelector('.popup__title').textContent = arr.offer.title;
	mapCard.querySelector('.popup__text--address').textContent = arr.offer.address;
	mapCard.querySelector('.popup__text--price').textContent = arr.offer.price;
	mapCard.querySelector('.popup__type').textContent = arr.offer.type;
	mapCard.querySelector('.popup__text--capacity').textContent = `${arr.offer.rooms} комнаты для ${arr.offer.guests} гостей`;
	mapCard.querySelector('.popup__text--time').textContent = `Заезд после ${arr.offer.checkin}, выезд до ${arr.offer.checkout}`;


	features.forEach((feature, i) => {
		if (feature.dataset.set !== arr.offer.features[i]) {
			featuresBox.removeChild(feature);
		}
	});

	mapCard.querySelector('.popup__description').textContent = arr.offer.description;

	const cardPictures = mapCard.querySelector('.popup__photos');
	mapCard.querySelector('.popup__photos--img').src = arr.offer.photos[0];

	for (let i = 0; i < arr.offer.photos.length - 1; i++) {
		const cardItemCopy = mapCard.querySelector('.popup__photos--item').cloneNode('true');
		cardItemCopy.querySelector('.popup__photos--img').src = arr.offer.photos[i + 1];
		cardPictures.appendChild(cardItemCopy);
	};

  return mapCard;
};

const renderMapPin = (arr) => {
	const mapPin = mapPinTemplate.cloneNode('true');

  mapPin.style = `left: ${arr.offer.location.x}px; top: ${arr.offer.location.y}px;`;
  mapPin.querySelector('.map__pin-avatar').src = arr.author.avatar;
  mapPin.querySelector('.map__pin-avatar').alt = arr.offer.title;

  return mapPin;
};


const appendMapPin = () => {
	const fragment = document.createDocumentFragment();

	for (let i = 0; i < mapOffers.length; i++) {
		fragment.appendChild(renderMapPin(mapOffers[i]));
	};

	return mapPins.appendChild(fragment);
}

const appendMapCard = () => {
	const fragment = document.createDocumentFragment();
	fragment.appendChild(renderMapCard(mapOffers[0]));
	return map.appendChild(fragment);
}

appendMapPin();
appendMapCard();
