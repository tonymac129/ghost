let ghost, skull;
let spawnEvery = 60;
let score = 0;
let duration = 30;
let startTime;
let state = "start";
let speed = 2;

function setup() {
  createCanvas(480, 360);
  startTime = millis();
  spawnGhost();
  spawnSkull();
}

function draw() {
  background(15, 10, 25);
  if (state === "start") {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text("Click to start", width / 2, height / 2);
    return;
  }
  if (state === "over") {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text(
      "Game over\nScore: " + score + "\nClick to retry",
      width / 2,
      height / 2
    );
    return;
  }
  background(15, 10, 25);
  noStroke();
  fill(185, 20, 20);
  ellipse(375, 45, 70, 70);
  fill(40, 30, 50);
  rect(70, 260, 50,70);
  ellipse(95, 260,50,50);
  fill(20, 40, 25);
  rect(0, 300, 480, 60);
  strokeWeight(2);
  stroke(150,200,150);
  line(85, 255, 105, 253);
  line(85, 265, 105, 268);
  line(85, 280, 105, 281);
  noStroke();
  fill(130, 80, 23);
  rect(350, 220, 15, 80);
  rect(330, 240, 55, 15);
  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  if (timeLeft <= 0) {
    state = "over";
    return;
  }
  ghost.x = constrain(ghost.x + speed * (ghost.right ? 1 : -1), 50, 420);
  ghost.right = ghost.x <= 50 || (ghost.x >= 420 ? false : ghost.right);
  ghost.y = constrain(ghost.y + speed * (ghost.down ? 1 : -1), 20, 270);
  ghost.down = ghost.y <= 20 || (ghost.y >= 270 ? false : ghost.down);
  drawGhost(ghost.x, ghost.y);
  fill(255);
  textSize(16);
  text("Score: " + score, 70, 10);
  textAlign(RIGHT, TOP);
  text("Time: " + ceil(timeLeft), width - 12, 10);
  drawGhost(ghost.x, ghost.y);
  if (frameCount % spawnEvery === 0) {spawnSkull();speed*=1.055};
  drawSkull(skull.x, skull.y);
}

function spawnGhost() {
  ghost = {
    x: constrain(random(40, width - 40), 250, 350),
    y: random(40, height - 40),
    right: Math.random() > 0.5 ? true : false,
    down: Math.random() > 0.5 ? true : false,
  };
}

function spawnSkull() {
  skull = {
    x: random(40, width - 40),
    y: random(40, height - 40),
  };
}

function drawGhost(x, y) {
  noStroke();
  fill(170, 255, 180);
  ellipse(x, y, 60, 60);
  fill(20);
  ellipse(x - 12, y - 5, 10);
  ellipse(x + 12, y - 5, 10);
  ellipse(x, y + 13, 15, 20);
  fill(50, 50, 180);
  rect(x - 30, y - 35, 60, 20);
  rect(x - 20, y - 60, 40, 40);
}

function drawSkull(x, y) {
  noStroke();
  fill(150,30,30);
  ellipse(x, y, 60, 60);
  rect(x - 20, y + 15, 40, 20);
  fill(255);
  ellipse(x - 12, y - 5, 10);
  ellipse(x + 12, y - 5, 10);
  strokeWeight(2); 
  stroke(255); 
  line(x-10, y+25, x-10, y+35)
  line(x, y+25, x, y+35)
  line(x+10, y+25, x+10, y+35)
}

function mousePressed() {
  if (state === "start" || state === "over") {
    state = "play";
    score = 0;
    startTime = millis();
    spawnGhost();
    return;
  }
  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 40) {
    score++;
    spawnGhost();
  }
  if (dist(mouseX, mouseY, skull.x, skull.y) < 30) {
    score-=2;
    spawnSkull();
  }
}
