'use strict'

const MIN_COORDINATES = 50;
const MAX_COORDINATES = 1000;
const MIN_PRICE = 1000;
const MAX_PRICE = 100000;
const map = document.querySelector('.map').classList.remove('map--faded');
const mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
const mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
const mapPins = document.querySelector('.map__pins');

var offers = [
	'Большая уютная квартира',
	'Маленькая неуютная квартира',
	'Огромный прекрасный дворец',
	'Маленький ужасный дворец',
	'Красивый гостевой домик',
	'Некрасивый негостеприимный домик',
	'Уютное бунгало далеко от моря',
	'Неуютное бунгало по колено в воде'
];

var houseTypes = ['palace', 'flat', 'house', 'bungalo'];
var checkTimes = ['12:00', '13:00', '14:00'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photoArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
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
		let newObj = {
			author: {
				avatar: `img/avatars/user0${i+1}.png`
			},
			offer: {
				title: offers[i],
				address: `${getRandomArbitrary(MIN_COORDINATES, MAX_COORDINATES + 1)}, ${getRandomArbitrary(MIN_COORDINATES, MAX_COORDINATES + 1)}`,
				price: getRandomArbitrary(MIN_PRICE, MAX_PRICE + 1),
				type: getRandomIndex(houseTypes),
				rooms: getRandomArbitrary(1, 5),
				guests: getRandomArbitrary(2, 6),
				checkin: getRandomIndex(checkTimes),
				checkout: getRandomIndex(checkTimes),
				features: featuresArr.slice(getRandomArbitrary(0, 2), getRandomArbitrary(3, 7)),
				description: '',
				photos: shuffle(photoArr),
				location: {
					x: getRandomArbitrary(50, 1150),
					y: getRandomArbitrary(130, 630)
				}
			}
		}
		newArr.push(newObj);
	}

	return newArr;
};

const mapOffers = getMapOffers();

const renderMapPin = (offers) => {
	const mapPin = mapPinTemplate.cloneNode('true');

  mapPin.style = `left: ${offers.offer.location.x}px; top: ${offers.offer.location.y}px;`;
  mapPin.querySelector('.map__pin-avatar').src = offers.author.avatar;
  mapPin.querySelector('.map__pin-avatar').alt = offers.offer.title;

  return mapPin;
};

var fragment = document.createDocumentFragment();
for (let i = 0; i < mapOffers.length; i++) {
	fragment.appendChild(renderMapPin(mapOffers[i]));
};

mapPins.appendChild(fragment);
