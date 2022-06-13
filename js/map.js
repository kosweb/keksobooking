'use strict'

const minPrice = 1000;
const maxPrice = 5000;
const minRooms = 1;
const maxRooms = 4;
const minGuests = 2;
const maxGuests = 6;
const pinWidth = 44 / 2;
const pinHeight = 40 + 18;
const minXcoordinates = 50;
const maxXcoordinates = 1150;
const minYcoordinates = 130;
const maxYcoordinates = 630;
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
};

const getRandomIndex = (arr) => {
	return arr[Math.floor(Math.random() * (arr.length - 1))];
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
	return array;
};

const getMapOffers = () => {
	let newArr = [];

	for (let i = 0; i < 8; i++) {

		let getXcoordinate = getRandomInt(minXcoordinates, maxXcoordinates) + pinWidth;
		let getYcoordinate = getRandomInt(minYcoordinates, maxYcoordinates) + pinHeight;

		let newObj = {
			author: {
				avatar: `img/avatars/user0${i+1}.png`
			},
			offer: {
				title: offers[i],
				address: `${getXcoordinate}, ${getYcoordinate}`,
				price: getRandomInt(minPrice, maxPrice),
				type: getRandomIndex(houseTypes),
				rooms: getRandomInt(minRooms, maxRooms),
				guests: getRandomInt(minGuests, maxGuests),
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
	mapCard.querySelector('.popup__price').textContent = arr.offer.price;
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

const appendMapCard = (arr) => {
	const fragment = document.createDocumentFragment();
	fragment.appendChild(renderMapCard(arr[0]));
	return map.appendChild(fragment);
};

// appendMapCard(mapOffers);

const renderMapPins = () => {
	const fragment = document.createDocumentFragment();

	mapOffers.forEach((mapOffer) => {
		const mapPinClone = mapPinTemplate.cloneNode('true');
		mapPinClone.style = `left: ${mapOffer.offer.location.x}px; top: ${mapOffer.offer.location.y}px;`;
		mapPinClone.querySelector('.map__pin-avatar').src = mapOffer.author.avatar;
		mapPinClone.querySelector('.map__pin-avatar').alt = mapOffer.offer.title;
		fragment.appendChild(mapPinClone);
	});

	mapPins.appendChild(fragment);
};

renderMapPins();
