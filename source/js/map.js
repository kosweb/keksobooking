var AVATAR_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLE_MESSAGES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFERS_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFERS_CHECK = ['12:00', '13:00', '14:00'];
var OFFERS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TEMPLATE = document.querySelector('template');
var MAP_CARD_TEMP = TEMPLATE.content.querySelector('.map__card');
var MAP_PIN_TEMP = TEMPLATE.content.querySelector('.map__pin');


var MAP = document.querySelector('.map');
var MAP_PIN_CONTAINER = MAP.querySelector('.map__pins');

MAP.classList.remove('map--faded');

var getRandomIndex = function(maxLength) {
  return Math.floor(Math.random() * Math.floor(maxLength));
};

var getRandomInt = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomArr = function(arr) {
  return arr.slice(getRandomInt(0, Math.floor(OFFERS_FEATURES.length / 2)), getRandomInt(Math.floor(OFFERS_FEATURES.length / 2 + 1), OFFERS_FEATURES.length));
};

var describeObjects = [];

var getDescribeObjects = function () {
  var mapWidth = MAP.offsetWidth;

  for (var i = 0; i < AVATAR_NUMBERS.length; i++) {
    var describeObjectTemp = {
      author: {
        avatar: `img/avatars/user${AVATAR_NUMBERS[i]}.png`
      },

      location: {
        x: getRandomInt(1, mapWidth),
        y: getRandomInt(130, 630)
      },

      offer: {
        title: TITLE_MESSAGES[i],
        address: null,
        price: getRandomInt(1000, 1000000),
        type: OFFERS_TYPE[getRandomIndex(OFFERS_TYPE.length)],
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(2, 10),
        checkin: OFFERS_CHECK[getRandomIndex(OFFERS_CHECK.length)],
        checkout: OFFERS_CHECK[getRandomIndex(OFFERS_CHECK.length)],
        features: getRandomArr(OFFERS_FEATURES),
        description: null,
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      }
    };

    describeObjectTemp.offer.address = `${describeObjectTemp.location.x}, ${describeObjectTemp.location.y}`;
    describeObjects.push(describeObjectTemp);
  };

  return describeObjects;
};

getDescribeObjects();
console.log(describeObjects);



var renderPins = function(describeObjects) {
  var pinClone = MAP_PIN_TEMP.cloneNode('true');
  pinClone.style = `left: ${describeObjects.location.x + 23}px; top: ${describeObjects.location.y + 62}px;`;
  pinClone.querySelector('img').src = describeObjects.author.avatar;
  pinClone.querySelector('img').alt = describeObjects.offer.title;

  return pinClone;
}

var renderCard = function(describeObjects) {
  var cardClone = MAP_CARD_TEMP.cloneNode('true');
  cardClone.querySelector('.popup__avatar').src = describeObjects.author.avatar;
  cardClone.querySelector('.popup__title').textContent = describeObjects.offer.title;
  cardClone.querySelector('.popup__text--address').textContent = describeObjects.offer.address;
  cardClone.querySelector('.popup__price').textContent = `${describeObjects.offer.price} ₽ / ночь`;

  if (describeObjects.offer.type === 'flat') {
    cardClone.querySelector('.popup__type').textContent = 'Квартира';
  } if (describeObjects.offer.type === 'bungalo') {
    cardClone.querySelector('.popup__type').textContent = 'Бунгало';
  } if (describeObjects.offer.type === 'palace') {
    cardClone.querySelector('.popup__type').textContent = 'Дворец';
  } else {
    cardClone.querySelector('.popup__type').textContent = 'Дом';
  };

  if (describeObjects.offer.rooms >= 5) {
    cardClone.querySelector('.popup__text--capacity').textContent = `${describeObjects.offer.rooms} комнат для ${describeObjects.offer.guests} гостей`;
  } else {
    cardClone.querySelector('.popup__text--capacity').textContent = `${describeObjects.offer.rooms} комнаты для ${describeObjects.offer.guests} гостей`;
  };

  cardClone.querySelector('.popup__text--time').textContent = `Заезд после ${describeObjects.offer.checkin}, выезд до ${describeObjects.offer.checkout}`;
  var features = cardClone.querySelectorAll('.feature');

  for (var i = 0; i < features.length; i++) {
    features[i].style = 'display: none;';
    for (var j = 0; j < describeObjects.offer.features.length; j++) {
      if (features[i].classList.contains(`feature--${describeObjects.offer.features[j]}`)) {
        features[i].style = 'display: inline-block;';
      };
    };
  };

  cardClone.querySelector('.popup__description').textContent = describeObjects.offer.description;

  return cardClone;
};

var pinFragment = document.createDocumentFragment();
var cardFragment = document.createDocumentFragment();

for (var i = 0; i < describeObjects.length; i++) {
  pinFragment.appendChild(renderPins(describeObjects[i]));
  cardFragment.appendChild(renderCard(describeObjects[i]));
};

MAP_PIN_CONTAINER.appendChild(pinFragment);
MAP.insertBefore(cardFragment, MAP.querySelector('.map__filters-container'));
