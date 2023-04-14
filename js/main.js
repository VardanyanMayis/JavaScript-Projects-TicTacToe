'use strict';

// start SETTINGS
const BORDER = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const WinnerBoxes = [[1, 2, 3], [4, 5, 6], [7, 8, 9],[1, 4, 7],
	[2, 5, 8], [3, 6, 9],[1, 5, 9], [7, 5, 3]];
let Empty;
let playerABox;
let playerBBox;
let computerPlay = false;
let whoX = '';

let whoStap = '';
const getWhoStap = () => {
	whoStap = (whoStap == 'X') ? 'O' : 'X';
	return whoStap;
};

// Loginc
setSettings();
const btnBox = document.querySelector('.btn-box');
const playingBox = document.querySelector('.player-box');



function main() {
	setEventRestartBtn();
	countPlayers();
}

main();


// Functions
function createPlayingBox(BORDER) {
	playingBox.innerHTML = '';
	BORDER.forEach((item, index) => {
		playingBox.innerHTML += `<div id='a${index}' class="box data-box"><div>`;
	});

	const boxes = playingBox.querySelectorAll('.box');
	boxes.forEach((item) => {
		item.addEventListener('click', EventForBox);
	});
	if(computerPlay && whoX == 'comp') {
		easyCompyuterStep(); // Now we have onle easy Lavel
	}
}

function EventForBox(event) {
	event.preventDefault();
	event.target.textContent = getWhoStap();
	event.target.classList.remove('data-box');
	event.target.removeEventListener('click', EventForBox);

	let boxNumber = event.target.id;
	boxNumber = +boxNumber[1];
	Empty = Empty.filter((item) => {
		return item != boxNumber;
	});

	(event.target.textContent == 'X') ? playerABox.push(++boxNumber)
		: playerBBox.push(++boxNumber);		

	let check = (event.target.textContent == 'X') ? playerABox : playerBBox;
	checkWinner(check);
	// if we play with computer
	if(computerPlay && Empty.length) {
		easyCompyuterStep(); // Now we have onle easy Lavel
	}
}

function getWhoX() {
	playingBox.innerHTML = '';
	document.querySelector('.restart-btn');

	btnBox.innerHTML = '<button class="choose-btn">X</button><button class="choose-btn">O</button>';
	const chooseBtn = document.querySelectorAll('.choose-btn');
	chooseBtn.forEach(item => {
		item.addEventListener('click', (event) => {
			event.preventDefault();
			whoX = (event.target.textContent == 'X') ? 'person': 'comp';

			createPlayingBox(BORDER);
			btnBox.innerHTML = '<button class="restart-btn">Rest</button>';
			setEventRestartBtn();
		});
	});
}

function setSettings() {
	Empty = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	playerABox= [];
	playerBBox = [];
	whoStap = '';
}

function setEventRestartBtn() {
	const restBtn = document.querySelector('.restart-btn');
	console.log(restBtn);
	restBtn.addEventListener('click', (event) => {
		event.preventDefault();
		console.log(event.target);
		setSettings();
		main();
	});
}

function countPlayers() {
	playingBox.innerHTML = '';
	document.querySelector('.restart-btn').remove();

	btnBox.innerHTML = '<button class="choose-btn question">2 players</button> \
							<button class="choose-btn question">Play with computer</button>';
	const chooseBtn = document.querySelectorAll('.choose-btn');
	chooseBtn.forEach(item => {
		item.addEventListener('click', (event) => {
			event.preventDefault();
			if(+event.target.textContent[0] != 2) {
				computerPlay = true;
				getWhoX();
			} else {
				computerPlay = false;
				createPlayingBox(BORDER);
				btnBox.innerHTML = '<button class="restart-btn">Rest</button>';
				setEventRestartBtn();
			}
		});
	});
}

function checkWinner(who) {
	if(who.length >= 3) {
		let count = 0;

		for(let winKombo of WinnerBoxes){
			console.log(winKombo, who);
			for(let winItem of winKombo){
				for(let box of who){
					if(winItem == box) count++;
				}
			}
			console.log(count);
			(count >= 3) ? showWin() : count = 0;
			if(count < 3 && Empty.length == 0) showDrow();
		}
	}
}

function showWin() {
	computerPlay = false;
	setTimeout(() => {
		playingBox.innerHTML = '';
		playingBox.innerHTML = `<h2 class="winner">${whoStap} - is winner</h2>`;
	}, 500);
}

function showDrow() {
	computerPlay = false;
	setTimeout(() => {
		playingBox.innerHTML = '';
		playingBox.innerHTML = '<h2 class="winner">Drow!!</h2>';
	}, 500);
}

function easyCompyuterStep() {
	console.log(Empty);
	let randBox = Math.floor(Math.random() * Empty.length);
	console.log(randBox);

	const compChooseBox = document.querySelector(`#a${Empty[randBox]}`);
	console.log(compChooseBox);
	compChooseBox.textContent = getWhoStap();
	compChooseBox.classList.remove('data-box');
	compChooseBox.removeEventListener('click', EventForBox);
	
	let boxNumber = compChooseBox.id;
	boxNumber = +boxNumber[1];
	Empty = Empty.filter((item) => {
		return item != boxNumber;
	});

	(whoX == 'comp') ? playerABox.push(++boxNumber)
		: playerBBox.push(++boxNumber);

	let check = (compChooseBox.textContent == 'X') ? playerABox : playerBBox;
	checkWinner(check);
}
