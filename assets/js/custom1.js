var holes = document.querySelectorAll('.hole');
var scoreBoard = document.querySelector('.score');
var flowers = document.querySelectorAll('.flower');
var timeUp = false;
var score = 0;
var lastHole;

function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
	var idx = Math.floor(Math.random() * holes.length);
	var hole = holes[idx];

	if (hole === lastHole) {
  		console.log('Ah nah thats the same one bud');
  		return randomHole(holes); 
	}

	lastHole = hole;
	return hole;
}

function clock(time) {
	var totalTime = time;
	var timer = setInterval(function () {
		totalTime--;
		document.getElementById("clock").textContent = totalTime;

		if(totalTime <= 0) 
			clearInterval(timer);
		}, 1000);
}

//pop-up
function revealFlower() {
	var time = randomTime(500, 1250);
	var hole = randomHole(holes);
    
    hole.classList.remove('dead');
    hole.classList.remove('bury');
	hole.classList.add('alive');
	setTimeout( function () {
	 	hole.classList.remove('alive');
	 	if (!timeUp) revealFlower();
	}, time);  
}

function startGame() {
	scoreBoard.textContent = 0;
	timeUp = false;
	score = 0;
	clock(20);
	revealFlower(); 
	setTimeout( function () { timeUp = true; }, 20000);
}

function bonk(e) {
	var parent = this.parentNode;
	if(!e.isTrusted) return; // cheater!
	score++;
	this.classList.remove('alive');
	parent.classList.add('dead');
	setTimeout( function () { parent.classList.add('bury'); }, 1000); 
	scoreBoard.textContent = score;
}

flowers.forEach( function (flower) { flower.addEventListener('click', bonk); });