const useLeafletMap = (addressField, pinDataArr) => {
	const map = L.map('map', {
		scrollWheelZoom: false
	})
	.on('load', () =>{
		console.log('Карта инициализирована');
	})
	.setView(
		[35.652832, 139.839478],
		13
	);

	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '© OpenStreetMap'
	}).addTo(map);

	const mainPinIcon = L.icon({
		iconUrl: '../img/main-pin.svg',
		iconSize: [52, 52],
		iconAnchor: [26, 52]
	});

	const mainPinMarker = L.marker(
		{
			lat: 35.652832,
			lng: 139.839478
		},
		{
			draggable: true,
			icon: mainPinIcon
		}
	).addTo(map);

	const renderCard = (el) => {
		const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
		const cardCopy = cardTemplate.cloneNode('true');
		const featuresBox = cardCopy.querySelector('.popup__features');
		const features = cardCopy.querySelectorAll('.popup__feature');
		const offerFeatures = el.offer.features;

		cardCopy.querySelector('.popup__avatar').src = el.author.avatar;
		cardCopy.querySelector('.popup__title').textContent = el.offer.title;
		cardCopy.querySelector('.popup__text--address').textContent = el.offer.address;
		cardCopy.querySelector('.popup__text--price-span').textContent = el.offer.price;
		cardCopy.querySelector('.popup__type').textContent = el.offer.type;
		cardCopy.querySelector('.popup__text--capacity').textContent = `${el.offer.rooms} комнаты для ${el.offer.guests} гостей`;
		cardCopy.querySelector('.popup__text--time').textContent = `Заезд после ${el.offer.checkin}, выезд до ${el.offer.checkout}`;
		cardCopy.querySelector('.popup__description').textContent = el.offer.description;

		features.forEach((feature, i) => {
			if (offerFeatures !== undefined) {
				let num = 0;
				for (let offerFeature of offerFeatures) {
					if (feature.dataset.set === offerFeature) {
						num++;
					}
				}
				if (num === 0) {
					featuresBox.removeChild(feature);
				}
			} else {
				featuresBox.innerHTML = '';
			}
		});

		const cardPictures = cardCopy.querySelector('.popup__photos');
		const offerPhotos = el.offer.photos;

		if (offerPhotos !== undefined) {
			cardCopy.querySelector('.popup__photo').src = offerPhotos[0];
			if (offerPhotos.length >= 2) {
				for (let i = 0; i < offerPhotos.length - 1; i++) {
					const photoCopy = cardCopy.querySelector('.popup__photo').cloneNode('true');
					photoCopy.src = offerPhotos[i + 1];
					cardPictures.appendChild(photoCopy);
				};
			}
		} else {
			cardPictures.innerHTML = '';
		}

		return cardCopy;
	};

	pinDataArr.forEach(element => {
		const pinIcon = L.icon({
			iconUrl: '../img/pin.svg',
			iconSize: [40, 40],
			iconAnchor: [20, 40]
		});

		const pin = L.marker(
			{
				lat: element.location.lat,
				lng: element.location.lng
			},
			{
				icon: pinIcon
			}
		);

		pin
			.addTo(map)
			.bindPopup(renderCard(element));
	});

	mainPinMarker.on('moveend', (evt) => {
		addressField.value = `${evt.target._latlng.lat}, ${evt.target._latlng.lng}`;
	});
};

export {useLeafletMap};
