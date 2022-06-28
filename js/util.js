const getRandomIndex = (arr) => {
	return arr[Math.floor(Math.random() * (arr.length - 1))];
};

function getRandomInt(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
	return array;
};

const isEscEvent = (evt) => {
	return evt.key === ('Escape' || 'Esc');
};

const isEnterEvent = (evt) => {
	return evt.key === 'Enter';
};

export { getRandomIndex, getRandomInt, shuffle, isEscEvent, isEnterEvent };
