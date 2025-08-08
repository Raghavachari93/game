const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const W = canvas.width, H = canvas.height;
let player = { x: W/2 - 15, y: H - 50, w:30, h:30, speed:6 };
let keys = {};
let obstacles = [];
let tick = 0;
let score = 0;
let gameOver = false;

document.addEventListener('keydown', e => keys[e.keyCode] = true);
document.addEventListener('keyup', e => keys[e.keyCode] = false);

function spawn() {
  obstacles.push({ x: Math.random() * (W-30), y: -30, w: 30, h: 30, speed: 2 + Math.random()*3 });
}

function update() {
  if (gameOver) return;
  // move player
  if (keys[37]) player.x -= player.speed;
  if (keys[39]) player.x += player.speed;
  player.x = Math.max(0, Math.min(W - player.w, player.x));

  // spawn
  tick++;
  if (tick % 45 === 0) spawn();

  // move obstacles
  for (let o of obstacles) {
    o.y += o.speed;
  }

  // collision
  for (let o of obstacles) {
    if (o.x < player.x + player.w && o.x + o.w > player.x &&
        o.y < player.y + player.h && o.h + o.y > player.y) {
      gameOver = true;
    }
  }

  // remove offscreen
  obstacles = obstacles.filter(o => o.y < H+50);
  score++;
}

function draw() {
  ctx.clearRect(0,0,W,H);
  // player
  ctx.fillStyle = '#0f0';
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // obstacles
  ctx.fillStyle = '#f44';
  for (let o of obstacles) ctx.fillRect(o.x, o.y, o.w, o.h);

  // ui
  ctx.fillStyle = '#fff';
  ctx.font = '18px Arial';
  ctx.fillText('Score: ' + Math.floor(score/10), 10, 20);
  if (gameOver) {
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0,H/2 - 40, W, 80);
    ctx.fillStyle = '#fff';
    ctx.font = '28px Arial';
    ctx.fillText('Game Over', W/2 - 80, H/2);
    ctx.font = '16px Arial';
    ctx.fillText('Press F5 to restart', W/2 - 75, H/2 + 30);
  }
}

function loop(){
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
