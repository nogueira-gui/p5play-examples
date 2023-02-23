var personagem;
var obstaculos = [];
var pontos = 0;
var vidas = 3;

function setup() {
  createCanvas(600, 400);
  personagem = createSprite(50, height / 2, 50, 50);
}

function draw() {
  background(220);
  textSize(32);
  text("Pontos: " + pontos, width - 150, 50);
  text("Vidas: " + vidas, 50, 50);
  
  if (vidas <= 0) {
    textSize(64);
    text("Game Over", width / 2 - 150, height / 2);
    return;
  }

  personagem.velocity.x = 0;
  if (keyIsDown(LEFT_ARROW)) {
    personagem.velocity.x = -5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    personagem.velocity.x = 5;
  }

  personagem.position.x = constrain(personagem.position.x, 0, width - 25);

  if (frameCount % 60 === 0) {
    var obstaculo = createSprite(random(width), 0, 20, 20);
    obstaculo.velocity.y = 5;
    obstaculos.push(obstaculo);
  }

  for (var i = 0; i < obstaculos.length; i++) {
    if (obstaculos[i].position.y > height) {
      obstaculos[i].remove();
      vidas--;
    }
    if (personagem.overlap(obstaculos[i])) {
      obstaculos[i].remove();
      pontos++;
    }
  }

  drawSprites();
}
