import './events.js';
import './leaflet.js';
import './filters.js';


import { sendRequest } from "./util.js";
import { formEnabled } from "./events.js";
import { filter } from './filters.js';
import { renderPins } from './leaflet.js';

const getRequestURL = 'https://24.javascript.pages.academy/keksobooking/data';

sendRequest('GET', getRequestURL)
.then(data => {
	formEnabled();
	renderPins(data);
	filter(data);
}).catch(err => console.log(err));
