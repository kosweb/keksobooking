import { isEscEvent } from "./util.js";
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
	noticeForm.classList.remove('notice__form--disabled');
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
			delDomMapCard();
			appendMapCard(mapOffers[i]);
			document.addEventListener('keydown', onPopupEscPress);
			closeMapCard();
		})
	});
};

mapPinMain.addEventListener('click', (evt) => {
	evt.preventDefault();
	openMap();

	// если нажать повторно, выдаёт ошибку при нажатии на пины
	renderMapPins();
	runPins();
});

// обработчики и валидация формы
const selectTypeHouse = document.getElementById('type');
const selectTypeHouseOptions = selectTypeHouse.querySelectorAll('option');
const priceInput = document.getElementById('price');
const timeInSelect = document.getElementById('timein');
const timeInOptions = timeInSelect.querySelectorAll('option');
const timeOutSelect = document.getElementById('timeout');
const timeOutOptions = timeOutSelect.querySelectorAll('option');
const roomNumberSelect = document.getElementById('room_number');
const roomNumberOptions = roomNumberSelect.querySelectorAll('option');
const roomCapacitySelect = document.getElementById('capacity');
const roomCapacityOptions = roomCapacitySelect.querySelectorAll('option');

selectTypeHouse.addEventListener('change', () => {
	for (let option of selectTypeHouseOptions) {
		if (option.selected && option.value === 'flat') {
			priceInput.placeholder = '1000';
			priceInput.min = '1000';
		}
		if (option.selected && option.value === 'bungalo') {
			priceInput.placeholder = '0';
			priceInput.min = '0';
		}
		if (option.selected && option.value === 'house') {
			priceInput.placeholder = '5000';
			priceInput.min = '5000';
		}
		if (option.selected && option.value === 'palace') {
			priceInput.placeholder = '10000';
			priceInput.min = '10000';
		}
	}
});

timeInSelect.addEventListener('change', () => {
	timeInOptions.forEach((el, i) => {
		if (el.selected && el.value === '12:00') {
			timeOutOptions[i].selected = true;
		}
		if (el.selected && el.value === '13:00') {
			timeOutOptions[i].selected = true;
		}
		if (el.selected && el.value === '14:00') {
			timeOutOptions[i].selected = true;
		}
	});
});

timeOutSelect.addEventListener('change', () => {
	timeOutOptions.forEach((el, i) => {
		if (el.selected && el.value === '12:00') {
			timeInOptions[i].selected = true;
		}
		if (el.selected && el.value === '13:00') {
			timeInOptions[i].selected = true;
		}
		if (el.selected && el.value === '14:00') {
			timeInOptions[i].selected = true;
		}
	});
});

roomNumberSelect.addEventListener('change', () => {
	roomNumberOptions.forEach(el => {
		if (el.selected && el.value === '1') {
			roomCapacityOptions.forEach(el => {
				if (el.value === '1') {
					el.disabled = false;
					el.selected = true;
				} else {
					el.disabled = true;
					el.selected = false;
				}
			});
		}
		if (el.selected && el.value === '2') {
			roomCapacityOptions.forEach(el => {
				if (el.value === '2') {
					el.disabled = false;
					el.selected = true;
				} else if (el.value === '1') {
					el.disabled = false;
				} else {
					el.disabled = true;
					el.selected = false;
				}
			});
		}
		if (el.selected && el.value === '3') {
			roomCapacityOptions.forEach(el => {
				el.disabled = false;
				if (el.value === '3') {
					el.selected = true;
				}
			});
		}
		if (el.selected && el.value === '100') {
			roomCapacityOptions.forEach(el => {
				el.disabled = true;
				if (el.value === '0') {
					el.disabled = false;
					el.selected = true;
				}
			});
		}
	});
});
