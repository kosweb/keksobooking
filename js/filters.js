import { renderPins } from "./leaflet.js";

const mapFiltersForm = document.querySelector('.map__filters');
const houseType = mapFiltersForm.querySelector('#housing-type');
const housePrice = mapFiltersForm.querySelector('#housing-price');
const houseRooms = mapFiltersForm.querySelector('#housing-rooms');
const houseGuests = mapFiltersForm.querySelector('#housing-guests');
const mapFiltersCheckbox = mapFiltersForm.querySelectorAll('input[type=checkbox]');

const filterOptions= {
	houseType: 'any',
	housePrice: 'any',
	houseRooms: 'any',
	houseGuests: 'any',
	houseFeatures: []
}

const filterData = (data, filterOptions) => {
	return data.filter((el) => {
		if (filterOptions.houseType === 'any') {
			return el;
		} else {
			return el.offer.type === filterOptions.houseType;
		}
		})
		.filter((el) => {
			if (filterOptions.housePrice === 'any') {
				return el;
			}
			if (filterOptions.housePrice === 'middle') {
				return el.offer.price >= 10000 && el.offer.price <= 50000;
			}
			if (filterOptions.housePrice === 'low') {
				return el.offer.price < 10000;
			}
			if (filterOptions.housePrice === 'high') {
				return el.offer.price > 50000;
			}
		})
		.filter((el) => {
			if (filterOptions.houseRooms === 'any') {
				return el;
			} else {
				return el.offer.rooms == filterOptions.houseRooms;
			}
		})
		.filter((el) => {
			if (filterOptions.houseGuests === 'any') {
				return el;
			} else {
				return el.offer.guests == filterOptions.houseGuests;
			}
		})
		.filter((el) => {
			if (filterOptions.houseFeatures.length === 0) {
				return el;
			}
			if (el.offer.features) {
				const houseFeatures = filterOptions.houseFeatures;
				return houseFeatures.every(element => el.offer.features.includes(element));
			} else {
				return false;
			}
		})
};

const filter = (data) => {
	houseType.addEventListener('change', () => {
		filterOptions.houseType = houseType.value;
		const newData = filterData(data, filterOptions);
		renderPins(newData);
	})
	housePrice.addEventListener('change', () => {
		filterOptions.housePrice = housePrice.value;
		const newData = filterData(data, filterOptions);
		renderPins(newData);
	})
	houseRooms.addEventListener('change', () => {
		filterOptions.houseRooms = houseRooms.value;
		const newData = filterData(data, filterOptions);
		renderPins(newData);
	})
	houseGuests.addEventListener('change', () => {
		filterOptions.houseGuests = houseGuests.value;
		const newData = filterData(data, filterOptions);
		renderPins(newData);
	})

	mapFiltersCheckbox.forEach((el) => {
		el.addEventListener('change', () => {
			if (el.checked) {
				filterOptions.houseFeatures.push(el.value);
				const newData = filterData(data, filterOptions);
				renderPins(newData);
			} else {
				const i = filterOptions.houseFeatures.indexOf(el.value);
				filterOptions.houseFeatures.splice(i, 1);
				const newData = filterData(data, filterOptions);
				renderPins(newData);
			}
		})
	})
}

export { filter }
