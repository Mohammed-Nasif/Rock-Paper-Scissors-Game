const rulesWindow = document.querySelector('.rules');
const clsRules = document.querySelector('.close-rules');
const openRules = document.querySelector('.rules-btn');
const firstScreen = document.querySelector('.container1');
const icons = document.querySelectorAll('.icon');
const shapesScreen = document.querySelector('.select-shape');
const secScreen = document.querySelector('.secondScreen');
const userPick = document.querySelector('.yourpick');
const pcPick = document.querySelector('.housepick');
const resultMsg = document.querySelector('.result');
const playAgainBtn = document.querySelector('.playagain');
const scoreVal = document.querySelector('.scrnum');
const yourResult = document.querySelector('.youlw');

window.onload = function () {
	firstScreen.style.pointerEvents = 'none';
	firstScreen.style.userSelect = 'none';
};

clsRules.onclick = function () {
	rulesWindow.style.display = 'none';
	openRules.style.cursor = 'pointer';
	firstScreen.style.filter = 'brightness(100%)';
	firstScreen.style.pointerEvents = 'auto';
};

openRules.onclick = function () {
	rulesWindow.style.display = 'flex';
	firstScreen.style.filter = 'brightness(50%)';
	firstScreen.style.pointerEvents = 'none';
	firstScreen.style.userSelect = 'none';
};

icons.forEach((icon) => {
	icon.addEventListener('click', () => {
		shapesScreen.style.display = 'none';
		secScreen.style.display = 'flex';
		userPick.insertAdjacentElement('afterbegin', icon);
		setTimeout(function () {
			let i = Math.floor(Math.random() * 3);
			i != [...icons].indexOf(icon)
				? pcPick.insertAdjacentElement('afterbegin', icons[i])
				: pcPick.insertAdjacentElement('afterbegin', icons[Math.abs(i - 1)]);
			if (
				(icon.dataset.shape == 1 &&
					pcPick.firstElementChild.dataset.shape == 2) ||
				(icon.dataset.shape == 2 &&
					pcPick.firstElementChild.dataset.shape == 3) ||
				(icon.dataset.shape == 3 && pcPick.firstElementChild.dataset.shape == 1)
			) {
				scoreVal.textContent = +scoreVal.textContent + 1;
				yourResult.textContent = 'YOU WIN';
				userPick.lastElementChild.style.animation =
					'pulse 1.5s linear infinite alternate';
			} else {
				scoreVal.textContent = +scoreVal.textContent - 1;
				yourResult.textContent = 'YOU LOSE';
				pcPick.lastElementChild.style.animation =
					'pulse 1.5s linear infinite alternate';
			}
		}, 300);
		setTimeout(function () {
			secScreen.style.gap = '30rem';
			setTimeout(function () {
				resultMsg.style.display = 'flex';
			}, 300);
		}, 500);
		secScreen.style.pointerEvents = 'none';
	});
});

playAgainBtn.onclick = function () {
	shapesScreen.style.display = 'flex';
	shapesScreen.append(...icons);
	secScreen.style.display = 'none';
	resultMsg.style.display = 'none';
	secScreen.attributeStyleMap.clear();
	userPick.lastElementChild.style.animation = '';
	pcPick.lastElementChild.style.animation = '';
};
