var fireballSize = 22;
var getFireballSpeed = function(left) {
  return left ? 5 : 2;
};

var wizardSpeed = 3;
var wizardWidth = 70;
var getWizardHeight = function() {
  return 1.337 * wizardWidth;
};

var getWizardX = function(width) {
  return width / 2 - wizardWidth / 2;
};

var getWizardY = function(height) {
  return height / 3 * 2 - getWizardHeight();
};



var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var FONT_GAP = 10;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var barHeight = 110;


var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var sortMaxElement = function(arr) {
	for (var i = 0; i < arr.length; i++) {
		for (var j = i + 1; j <= arr.length; j++) {
			if (arr[j] > arr[i]) {
				var swap = arr[i];
				arr[i] = arr[j];
				arr[j] = swap;
			}
		};
	};

	return arr;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y * 2, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

	ctx.fillStyle = '#000';


  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP + GAP);

	var getRandomBlue = function() {
		var random = Math.random();
		var alpha = 'rgba(11, 14, 255, ' + random + ')';
		return alpha;
	};

	var sortingTimes = sortMaxElement(times);

  for (var i = 0; i < names.length; i++) {
		ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP * 2 + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + barHeight + (barHeight - (barHeight * times[i] / sortingTimes[0])) - 10);

		if (names[i] === "Вы") {
			ctx.fillStyle = 'rgba(255,0,0,1)';
		} else {
				ctx.fillStyle = getRandomBlue();
			}
		ctx.fillRect(CLOUD_X + GAP * 2 + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + barHeight + (barHeight - (barHeight * times[i] / sortingTimes[0])), COLUMN_WIDTH, barHeight * times[i] / sortingTimes[0]);

		ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + GAP * 2 + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - (GAP + FONT_GAP));
  };
};
