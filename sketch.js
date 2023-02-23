var personagem;
var obstaculos = [];
var pontos = 0;
var vidas = 3;
var ultimaRemocao = 0;

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
    // Pare o jogo
    noLoop();

    // Exiba a mensagem "Game Over" e o botão "Try Again"
    document.getElementById("gameover").style.display = "block";
    document.getElementById("restart-button").addEventListener("click", function () {
      location.reload();
    });
  }

  personagem.velocity.x = 0;
  if (keyIsDown(LEFT_ARROW)) {
    personagem.velocity.x = -10;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    personagem.velocity.x = 10;
  }

  personagem.position.x = constrain(personagem.position.x, 0, width - 25);

  if (frameCount % 60 === 0) {
    var obstaculo = createSprite(random(width), 0, 20, 20);
    obstaculo.velocity.y = 5;
    obstaculos.push(obstaculo);
  }
  
  for (var i = 0; i < obstaculos.length; i++) {
    if (obstaculos[i].position.y > height) {
      if (frameCount - ultimaRemocao > 60) {
        vidas--;
        ultimaRemocao = frameCount;
      }
      obstaculos[i].remove();
    }
    
    if (personagem.overlap(obstaculos[i])) {
      obstaculos[i].remove();
      pontos++;
    }
  }

  drawSprites();
}
