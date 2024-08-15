var basket;
var score = 1;
var redGroup, greenGroup, bonusGroup;

var startTime;
var gameTime;
var lastChange = 0;

function setup() {
  createCanvas(800, 600);

  // Cria o cesto
  basket = createSprite(350, 585, 50, 20);
  basket.shapeColor = color(255, 0, 0);

  // Cria os grupos de bolas vermelhas, verdes e bônus
  redGroup = new Group();
  greenGroup = new Group();
  bonusGroup = new Group();

  // Inicia o cronômetro
  startTime = millis();
  edges = createEdgeSprites();
}

function draw() {
  background(200);

  // Move o cesto com as setas do teclado
  if (keyDown("a")) {
    basket.position.x -=10;
  }
  if (keyDown("d")) {
    basket.position.x +=10;
  }

  basket.bounceOff(edges);

  // Adiciona bolas vermelhas, verdes e bônus
  redBalls();
  greenBalls();
  addBonus();

  // Verifica a colisão entre o cesto e as bolas vermelhas
  redGroup.forEach(redB => {
    if (basket.overlap(redB)) {
      redB.remove(); // Remove a bola vermelha ao colidir
      score--; // Diminui a pontuação
    }
  });

  // Verifica a colisão entre o cesto e as bolas verdes
  greenGroup.forEach(greenB => {
    if (basket.overlap(greenB)) {
      greenB.remove(); // Remove a bola verde ao colidir
      score++; // Aumenta a pontuação
    }
  });

  // Verifica a colisão entre o cesto e os bônus
  bonusGroup.forEach(b => {
    if (basket.overlap(b)) {
      score += 5; // Aumenta a pontuação ao pegar um bônus
      b.remove(); // Remove o bônus
    }
  });

  // Aumenta a dificuldade conforme o tempo passa
  increaseDifficulty();

  // Atualiza o tempo decorrido
  gameTime = Math.floor((millis() - startTime) / 1000);

  drawSprites();

  // Mostra a pontuação
  fill(0);
  textSize(24);
  text("Score: " + score, 10, 30);
  text("Time: " + gameTime, 10, 60);

  if (score <= 0) {
    noLoop(); // Para o loop do jogo
    textSize(48);
    textAlign(CENTER, CENTER);
    fill(0);
    text(`Game Over!\nTime Survived: ${gameTime} s`, width / 2, height / 2);
  }
}

function redBalls() {
  if (frameCount % 10 === 0) {
    for (let i = 0; i < 3; i++) {
      let size = random(10, 30);
      let redB = createSprite(random(0, 780), 0, size, size);
      redB.shapeColor = color(random(100, 255), 0, 0);
      redB.velocityY = random(3, 9);
      redB.lifetime = 500;
      redGroup.add(redB);
    }
  }
}

function greenBalls() {
  if (frameCount % 40 === 0) {
    for (let i = 0; i < 2; i++) {
      let size = random(10, 30);
      let greenB = createSprite(random(0, 780), 0, size, size);
      greenB.shapeColor = color(0, random(100, 255), 0);
      greenB.velocityY = random(3, 12);
      greenB.lifetime = 500;
      greenGroup.add(greenB);
    }
  }
}

function addBonus() {
  if (frameCount % 300 === 0) {
    let bonus = createSprite(random(0, 780), 0, 30, 30);
    bonus.shapeColor = color(0, 0, 255);
    bonus.velocityY = 5;
    bonus.lifetime = 500;
    bonusGroup.add(bonus);
  }
}

function increaseDifficulty() {
  if (gameTime % 30 === 0 && gameTime !== lastChange) {
    redGroup.setVelocityEach(random(8, 14)); // Aumenta a velocidade
    lastChange = gameTime; // Atualiza o tempo da última alteração
  }
}
