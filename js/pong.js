const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const net = {
	x: canvas.width / 2 - 1,
	y: 0,
	width: 2,
	height: canvas.height,
	color: "#FFF",
};

const player = {
	x: 0,
	y: canvas.height / 2 - 100 / 2,
	width: 10,
	height: 100,
	color: "#FFF",
	score: 0,
};

const ai = {
	x: canvas.width - 10,
	y: canvas.height / 2 - 100 / 2,
	width: 10,
	height: 100,
	color: "#FFF",
	score: 0,
};

const ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	radius: 10,
	speed: 5,
	velocityX: 5,
	velocityY: 5,
	color: "#FFF",
};

function drawRect(x, y, w, h, color) {
	context.fillStyle = color;
	context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
	context.fillStyle = color;
	context.beginPath();
	context.arc(x, y, r, 0, Math.PI * 2, false);
	context.closePath();
	context.fill();
}

function drawNet() {
	drawRect(net.x, net.y, net.width, net.height, net.color);
}

function drawText(text, x, y, color) {
	context.fillStyle = color;
	context.font = "35px Arial";
	context.fillText(text, x, y);
}

function resetBall() {
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	ball.velocityX = -ball.velocityX;
	ball.speed = 5;
}

function collision(b, p) {
	p.top = p.y;
	p.bottom = p.y + p.height;
	p.left = p.x;
	p.right = p.x + p.width;

	b.top = b.y - b.radius;
	b.bottom = b.y + b.radius;
	b.left = b.x - b.radius;
	b.right = b.x + b.radius;

	return (
		p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top
	);
}

function update() {
	ball.x += ball.velocityX;
	ball.y += ball.velocityY;

	if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
		ball.velocityY = -ball.velocityY;
	}

	let playerOrAi = ball.x < canvas.width / 2 ? player : ai;

	if (collision(ball, playerOrAi)) {
		let collidePoint = ball.y - (playerOrAi.y + playerOrAi.height / 2);

		collidePoint = collidePoint / (playerOrAi.height / 2);

		let angleRad = (Math.PI / 4) * collidePoint;

		let direction = ball.x < canvas.width / 2 ? 1 : -1;
		ball.velocityX = direction * ball.speed * Math.cos(angleRad);
		ball.velocityY = ball.speed * Math.sin(angleRad);

		ball.speed += 0.5;
	}

	// Make the AI paddle follow the ball's Y position, ensuring it never misses
	ai.y += (ball.y - (ai.y + ai.height / 2)) * 0.1;

	// Player paddle also follows the ball to keep the game running indefinitely
	player.y += (ball.y - (player.y + player.height / 2)) * 0.1;
}

function render() {
	drawRect(0, 0, canvas.width, canvas.height, "#000");

	drawNet();

	drawText(player.score, canvas.width / 4, canvas.height / 5, "#FFF");
	drawText(ai.score, (3 * canvas.width) / 4, canvas.height / 5, "#FFF");

	drawRect(player.x, player.y, player.width, player.height, player.color);
	drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);

	drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function game() {
	update();
	render();
}

const fps = 60;
setInterval(game, 1000 / fps);
