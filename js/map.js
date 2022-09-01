const map = document.querySelector('.map');
const mapFilterContainer = document.querySelector('.map__filters-container');

// const renderMapCard = (arr) => {
// 	const mapCard = mapTemplate.cloneNode('true');
// 	const featuresBox = mapCard.querySelector('.popup__features');
// 	const features = mapCard.querySelectorAll('.feature');

// 	mapCard.querySelector('.map__card-avatar').src = arr.author.avatar;
// 	mapCard.querySelector('.popup__title').textContent = arr.offer.title;
// 	mapCard.querySelector('.popup__text--address').textContent = arr.offer.address;
// 	mapCard.querySelector('.popup__price').textContent = arr.offer.price;
// 	mapCard.querySelector('.popup__type').textContent = arr.offer.type;
// 	mapCard.querySelector('.popup__text--capacity').textContent = `${arr.offer.rooms} комнаты для ${arr.offer.guests} гостей`;
// 	mapCard.querySelector('.popup__text--time').textContent = `Заезд после ${arr.offer.checkin}, выезд до ${arr.offer.checkout}`;

// 	features.forEach((feature, i) => {
// 		if (feature.dataset.set !== arr.offer.features[i]) {
// 			featuresBox.removeChild(feature);
// 		}
// 	});

// 	mapCard.querySelector('.popup__description').textContent = arr.offer.description;

// 	const cardPictures = mapCard.querySelector('.popup__photos');
// 	mapCard.querySelector('.popup__photos--img').src = arr.offer.photos[0];

// 	for (let i = 0; i < arr.offer.photos.length - 1; i++) {
// 		const cardItemCopy = mapCard.querySelector('.popup__photos--item').cloneNode('true');
// 		cardItemCopy.querySelector('.popup__photos--img').src = arr.offer.photos[i + 1];
// 		cardPictures.appendChild(cardItemCopy);
// 	};

//   return mapCard;
// };

const appendMapCard = (arr) => {
	const fragment = document.createDocumentFragment();
	fragment.appendChild(renderMapCard(arr));
	return map.insertBefore(fragment, mapFilterContainer);
};

export { appendMapCard };
