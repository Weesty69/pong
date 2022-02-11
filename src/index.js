class Paddle{
	constructor(side, joueur) {
		this.side = side;
		this.joueur = joueur;
	}
}



let gameState = 'start';
let paddle_1 = new Paddle(document.querySelector('.paddle_1'), 'joueur1');
let paddle_2 = new Paddle(document.querySelector('.paddle_2'), 'joueur2');
let board = document.querySelector('.board');
let initial_ball = document.querySelector('.ball');
let ball = document.querySelector('.ball');
let score_1 = document.querySelector('.joueur_1_score');
let score_2 = document.querySelector('.joueur_2_score');
let message = document.querySelector('.message');
let paddle_1_coord = paddle_1.side.getBoundingClientRect();
let paddle_2_coord = paddle_2.side.getBoundingClientRect();
let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord = initial_ball_coord;
let board_coord = board.getBoundingClientRect();
let paddle_common =
	document.querySelector('.paddle').getBoundingClientRect();
let score1 = 0;
let score2 = 0;

let dx = Math.floor(Math.random() * 4) + 3;
let dy = Math.floor(Math.random() * 4) + 3;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);

document.addEventListener('keydown', (e) => {
if (e.key == 'Enter') {
	gameState = gameState == 'start' ? 'play' : 'start';
	if (gameState == 'play') {
	message.innerHTML = "C'est parti";
	message.style.left = 42 + 'vw';
	requestAnimationFrame(() => {
		dx = Math.floor(Math.random() * 4) + 3;
		dy = Math.floor(Math.random() * 4) + 3;
		dxd = Math.floor(Math.random() * 2);
		dyd = Math.floor(Math.random() * 2);
		moveBall(dx, dy, dxd, dyd);
	});
	}
}
if (gameState == 'play') {
	if (e.key == 'a') {
	paddle_1.side.style.top =
		Math.max(
		board_coord.top,
		paddle_1_coord.top - window.innerHeight * 0.06
		) + 'px';
	paddle_1_coord = paddle_1.side.getBoundingClientRect();
	}
	if (e.key == 'z') {
	paddle_1.side.style.top =
		Math.min(
		board_coord.bottom - paddle_common.height,
		paddle_1_coord.top + window.innerHeight * 0.06
		) + 'px';
	paddle_1_coord = paddle_1.side.getBoundingClientRect();
	}

	if (e.key == 'ArrowUp') {
	paddle_2.side.style.top =
		Math.max(
		board_coord.top,
		paddle_2_coord.top - window.innerHeight * 0.1
		) + 'px';
	paddle_2_coord = paddle_2.side.getBoundingClientRect();
	}
	if (e.key == 'ArrowDown') {
	paddle_2.side.style.top =
		Math.min(
		board_coord.bottom - paddle_common.height,
		paddle_2_coord.top + window.innerHeight * 0.1
		) + 'px';
	paddle_2_coord = paddle_2.side.getBoundingClientRect();
	}
}
});

function moveBall(dx, dy, dxd, dyd) {
if (ball_coord.top <= board_coord.top) {
	dyd = 1;
}
if (ball_coord.bottom >= board_coord.bottom) {
	dyd = 0;
}
if (
	ball_coord.left <= paddle_1_coord.right &&
	ball_coord.top >= paddle_1_coord.top &&
	ball_coord.bottom <= paddle_1_coord.bottom
) {
	dxd = 1;
	dx = Math.floor(Math.random() * 4) + 3;
	dy = Math.floor(Math.random() * 4) + 3;
}
if (
	ball_coord.right >= paddle_2_coord.left &&
	ball_coord.top >= paddle_2_coord.top &&
	ball_coord.bottom <= paddle_2_coord.bottom
) {
	dxd = 0;
	dx = Math.floor(Math.random() * 4) + 3;
	dy = Math.floor(Math.random() * 4) + 3;
}
if (
	ball_coord.left <= board_coord.left ||
	ball_coord.right >= board_coord.right
) {
	if (ball_coord.left <= board_coord.left) {
        score2++
	score_2.innerHTML = score2 ;
    if (score2 == 5) {
        message.innerHTML = "Bravo " + paddle_1.joueur + ",     appuie entrer pour recommencer" ;
		score2 = 0;
		score1 = 0;
		
		score_2.innerHTML = score2 ;
		score_1.innerHTML = score1 ;
    }
	
	} else {
        score1++
	score_1.innerHTML = score1 ;
    if (score1 == 5) {
        message.innerHTML = "Bravo " + paddle_2.joueur + ",       appuie entrer pour recommencer" ;
		score1 = 0;
		score2 = 0;
		score_1.innerHTML = score1 ;
		score_2.innerHTML = score2 ;
    }
	}
	gameState = 'start';


	ball_coord = initial_ball_coord;
	ball.style = initial_ball.style;
	message.style.left = 38 + 'vw';
	return;
}
ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
ball_coord = ball.getBoundingClientRect();
requestAnimationFrame(() => {
	moveBall(dx, dy, dxd, dyd);
});
}
