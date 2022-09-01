import { isEscEvent, sendRequest } from "./util.js";
import { appendMapCard } from "./map.js";
import { useLeafletMap } from "./leaflet.js";

const mapForm = document.querySelector('.map__filters');
const mapFormSelects = mapForm.querySelectorAll('.map__filter');
const mapFormFeatures = mapForm.querySelector('.map__features');
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const addressField = document.getElementById('address');
const getRequestURL = 'https://24.javascript.pages.academy/keksobooking/data';
let bookingData;

const onPopupEscPress = (evt) => {
	if (isEscEvent(evt)) {
		evt.preventDefault();
	}
};

mapFormSelects.forEach(el => {
	el.disabled = true;
})

mapFormFeatures.disabled = true;

adFormFieldsets.forEach(el => {
	el.disabled = true;
});

const formEnabled = () => {
		mapForm.classList.remove('map__filters--disabled');
		adForm.classList.remove('ad-form--disabled');
		addressField.value = '35.652832, 139.839478';
		mapFormSelects.forEach(el => {
			el.disabled = false;
		});
		adFormFieldsets.forEach(el => {
			el.disabled = false;
		});
		mapFormFeatures.disabled = false;
};


sendRequest('GET', getRequestURL)
.then(data => {
	bookingData = data;
	useLeafletMap(addressField, bookingData);
	formEnabled();
})
.catch(err => console.log(err));

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
const formReset = document.querySelector('.ad-form__reset');

selectTypeHouse.addEventListener('change', () => {
	for (let option of selectTypeHouseOptions) {
		if (option.selected && option.value === 'flat') {
			priceInput.placeholder = '1000';
			priceInput.min = '1000';
		}
		if (option.selected && option.value === 'bungalow') {
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

formReset.addEventListener('click', (evt) => {
	priceInput.placeholder = '1000';
	priceInput.min = '1000';
});























// MAIN PIN DRAG EVENTS

// const mapPinsField = document.querySelector('.map__pins');

// mapPinMain.addEventListener('mousedown', (evt) => {
// 	evt.preventDefault();

// 	let startCoords = {
// 		x: evt.clientX,
// 		y: evt.clientY
// 	};

// 	let onMouseMove = (moveEvt) => {
// 		moveEvt.preventDefault();

// 		let shift = {
// 			x: startCoords.x - moveEvt.clientX,
// 			y: startCoords.y - moveEvt.clientY
// 		};

// 		startCoords = {
// 			x: moveEvt.clientX,
// 			y: moveEvt.clientY
// 		};

// 		mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
// 		mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';


// 		if (mapPinMain.offsetTop <= 100) {
// 			mapPinMain.style.top = '101px';
// 		} else if (mapPinMain.offsetTop >= 655) {
// 			mapPinMain.style.top = '655px';
// 		}
// 	};

// 	let onMouseUp = (upEvt) => {
// 		upEvt.preventDefault();

// 		addressField.value = `${mapPinMain.offsetLeft + mainPinHalfWidth}, ${mapPinMain.offsetTop + mainPinfullHeight}`;
// 		mapPinsField.removeEventListener('mousemove', onMouseMove);
// 		document.removeEventListener('mouseup', onMouseUp);
// 	};

// 	mapPinsField.addEventListener('mousemove', onMouseMove);
// 	document.addEventListener('mouseup', onMouseUp);
// });
