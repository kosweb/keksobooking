import './events.js';
import './leaflet.js';
import './filters.js';

import { sendRequest } from "./util.js";
import { formEnabled } from "./events.js";
import { renderPins } from './leaflet.js';
import { runFilters } from './filters.js';

const getRequestURL = 'https://24.javascript.pages.academy/keksobooking/data';

sendRequest('GET', getRequestURL)
.then(data => {
	formEnabled();
	renderPins(data);
	runFilters(data);
}).catch(err => console.log(err));
