var personagem;
var obstaculos = [];
var pontos = 0;
var vidas = 3;
var obstaculoUltrassouLimite = false;

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

  // Verifica se está tocando na esquerda ou direita da tela
  if (mouseX < width / 2) {
    personagem.velocity.x = -10;
  } else if (mouseX > width / 2) {
    personagem.velocity.x = 10;
  } else {
    personagem.velocity.x = 0;
  }

  personagem.position.x = constrain(personagem.position.x, 0, width - 25);

  if (frameCount % 60 === 0) {
    var obstaculo = createSprite(random(width), 0, 20, 20);
    obstaculo.velocity.y = 5;
    obstaculos.push(obstaculo);
    obstaculoUltrassouLimite = false;
  }

  for (let i = 0; i < obstaculos.length; i++) {
    let obstaculo = obstaculos[i];

    if (obstaculo.position.y > height && !obstaculoUltrassouLimite) {
      obstaculo.remove();
      vidas--;
      obstaculoUltrassouLimite = true;
    }

    if (personagem.overlap(obstaculo)) {
      obstaculo.remove();
      pontos++;
    }
  }

  drawSprites();
}

// Adiciona suporte a toque para dispositivos móveis
function touchStarted() {
  if (touches[0].x < width / 2) {
    personagem.velocity.x = -10;
  } else if (touches[0].x > width / 2) {
    personagem.velocity.x = 10;
  }
}

// Para a movimentação do personagem quando o toque é liberado
function touchEnded() {
  personagem.velocity.x = 0;
}
