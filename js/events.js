import { isEscEvent, isEnterEvent } from "./util.js";
import { renderMapPins, appendMapCard, mapOffers } from "./map.js";

const onPopupEscPress = (evt) => {
	if (isEscEvent(evt)) {
		evt.preventDefault();
		delDomMapCard();
	}
};

const map = document.querySelector('.map');
const mapPinMain = document.querySelector('.map__pin--main');
const noticeForm = document.querySelector('.notice__form');
const formFieldsets = noticeForm.querySelectorAll('fieldset');
const addressField = document.getElementById('address');
const startAddress = `${mapPinMain.offsetLeft}, ${mapPinMain.offsetTop}`;

formFieldsets.forEach(el => {
	el.disabled = true;
});

const openMap = () => {
	map.classList.remove('map--faded');
	noticeForm.classList.toggle('notice__form--disabled');
	formFieldsets.forEach(el => {
		el.disabled = !(el.disabled);
	});

	if (addressField.value) {
		addressField.value = '';
	} else {
		addressField.value = startAddress;
	}
}

const delDomMapCard = () => {
	for (let j = 0; j < map.childNodes.length; j++) {
		if (map.childNodes[j].className === "map__card popup") {
			map.childNodes[j].remove();
			document.removeEventListener('keydown', onPopupEscPress);
		}
	}
};

const closeMapCard = () => {
	map.addEventListener('click', (evt) => {
		if(evt.target.classList.contains('popup__close')) {
			delDomMapCard();
		}
	});
};

const runPins = () => {
	const userMapPins = document.querySelectorAll('.map__pin--user');

	userMapPins.forEach((el, i) => {
		el.addEventListener('click', (evt) => {
			evt.preventDefault();
			// checkMapCards();
			appendMapCard(mapOffers[i]);
			document.addEventListener('keydown', onPopupEscPress);
			closeMapCard();
		})
	});
};

mapPinMain.addEventListener('mouseup', (evt) => {
	evt.preventDefault();
	openMap();
	renderMapPins();
	runPins();
});
