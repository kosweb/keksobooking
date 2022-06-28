import { isEscEvent, isEnterEvent } from "./util.js";
import { renderMapPins, appendMapCard } from "./map.js";
import { mapOffers } from "./map.js";

const onPopupEscPress = (evt) => {
	if (isEscEvent(evt)) {
		evt.preventDefault();
		closeUserModal();
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

const checkMapCards = () => {
	for (let j = 0; j < map.childNodes.length; j++) {
		if (map.childNodes[j].className === "map__card popup") {
			map.childNodes[j].remove();
		}
	}
};

const runPins = () => {
	const userMapPins = document.querySelectorAll('.map__pin--user');

	userMapPins.forEach((el, i) => {
		el.addEventListener('mouseup', (evt) => {
			evt.preventDefault();
			checkMapCards();
			appendMapCard(mapOffers[i]);
		})
	});
};

mapPinMain.addEventListener('mouseup', (evt) => {
	evt.preventDefault();
	openMap();
	renderMapPins();
	runPins();
});
