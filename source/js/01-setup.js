var setupWindow = document.querySelector('.setup');
setupWindow.classList.remove('hidden');

var setupSimilarWindow = document.querySelector('.setup-similar');
var similarList = setupSimilarWindow.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomIndex = function(maxLength) {
  return Math.floor(Math.random() * Math.floor(maxLength));
};

var wizards = [
  {
    name: WIZARD_NAMES[getRandomIndex(WIZARD_NAMES.length)],
    secondName: WIZARD_SECOND_NAMES[getRandomIndex(WIZARD_SECOND_NAMES.length)],
    coatColor: WIZARD_COAT_COLORS[getRandomIndex(WIZARD_COAT_COLORS.length)],
    eyesColor: WIZARD_EYE_COLORS[getRandomIndex(WIZARD_EYE_COLORS.length)]
  },
  {
    name: WIZARD_NAMES[getRandomIndex(WIZARD_NAMES.length)],
    secondName: WIZARD_SECOND_NAMES[getRandomIndex(WIZARD_SECOND_NAMES.length)],
    coatColor: WIZARD_COAT_COLORS[getRandomIndex(WIZARD_COAT_COLORS.length)],
    eyesColor: WIZARD_EYE_COLORS[getRandomIndex(WIZARD_EYE_COLORS.length)]
  },
  {
    name: WIZARD_NAMES[getRandomIndex(WIZARD_NAMES.length)],
    secondName: WIZARD_SECOND_NAMES[getRandomIndex(WIZARD_SECOND_NAMES.length)],
    coatColor: WIZARD_COAT_COLORS[getRandomIndex(WIZARD_COAT_COLORS.length)],
    eyesColor: WIZARD_EYE_COLORS[getRandomIndex(WIZARD_EYE_COLORS.length)]
  },
  {
    name: WIZARD_NAMES[getRandomIndex(WIZARD_NAMES.length)],
    secondName: WIZARD_SECOND_NAMES[getRandomIndex(WIZARD_SECOND_NAMES.length)],
    coatColor: WIZARD_COAT_COLORS[getRandomIndex(WIZARD_COAT_COLORS.length)],
    eyesColor: WIZARD_EYE_COLORS[getRandomIndex(WIZARD_EYE_COLORS.length)]
  }
];

var renderWizard = function(wizard) {
  var wizardClone = similarWizardTemplate.cloneNode('true');
  wizardClone.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.secondName;
  wizardClone.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardClone.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardClone;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
};

similarList.appendChild(fragment);
setupSimilarWindow.classList.remove('hidden');
