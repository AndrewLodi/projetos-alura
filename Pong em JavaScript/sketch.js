//variáveis da bolinha:
let xBolinha = 350;
let yBolinha = 225;
let diametro = 10;
let raio = diametro /2;

//velocidade da bolinha:
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//variáveis das raquetes:
let larguraRaquete = 4
let alturaRaquete = 70

let xRaquete1 = 10;
let yRaquete1 = 225;

let xRaquete2 = 685;
let yRaquete2 = 225;
let velocidadeYOponente;

let colidiu = false;
let chanceDeErrar = 0;

//placar do jogo:
let meuPonto = 0;
let pontoDoOponente = 0;

//sons do jogo:
let trilha;
let ponto;
let raquetada;


function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}


function setup() {
  createCanvas(700, 450);
  trilha.loop();
}


function draw() {
  background(0);
  designCampo();
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete1, yRaquete1);
  mostraRaquete(xRaquete2, yRaquete2);
  movimentaRaquetePlayer();
  //movimentaRaqueteOponenteMP();
  movimentaRaqueteOponenteSP();
  verificaColisaoRaquete(xRaquete1, yRaquete1);
  verificaColisaoRaquete(xRaquete2, yRaquete2);
  incluiPlacar();
  marcaPonto();
}


function designCampo(){
  //Linhas que acompanham as bordas:
  line(5, 5, 695, 5);
  stroke(125);
  line(695, 5, 695, 445);
  stroke(250);
  line(695, 445, 5, 445);
  stroke(500);
  line(5, 5, 5, 445);
  
  //Linha central:
  line(350, 5, 350, 445);
}


function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}


function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}


function verificaColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}


function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= - 1;
    raquetada.play();
  }
}


function mostraRaquete(x,y){
  rect(x, y, larguraRaquete, alturaRaquete);
}


function movimentaRaquetePlayer(){
  if (keyIsDown(87)){
    yRaquete1 -= 10;
  }
  
  if (keyIsDown(83)){
    yRaquete1 += 10;
  }
}


function movimentaRaqueteOponenteMP(){
  //modo multiplayer:
  if (keyIsDown(UP_ARROW)){
    yRaquete2 -= 10;
  }
  
  if (keyIsDown(DOWN_ARROW)){
    yRaquete2 += 10;
  }
}


function movimentaRaqueteOponenteSP(){
  //modo single-player:
  velocidadeYOponente = yBolinha - yRaquete2 - alturaRaquete / 2 - chanceDeErrar;
  yRaquete2 += velocidadeYOponente;
  
  if(pontoDoOponente > meuPonto){
    chanceDeErrar = 50;
  }
  
  if(pontoDoOponente < meuPonto && chanceDeErrar > 25){
    chanceDeErrar -= 5;
  }
}


function incluiPlacar(){
  textAlign (CENTER);
  textSize (16);
  fill (0);
  rect (308, 20, 25, 20);
  fill (255);
  text (meuPonto, 320, 35);
  fill (0);
  rect (368, 20, 25, 20);
  fill (255);
  text (pontoDoOponente, 380, 35);
}


function marcaPonto(){
  if (xBolinha > 699){
    meuPonto += 1;
    ponto.play();
  }
  
  if (xBolinha < 1){
    pontoDoOponente += 1;
    ponto.play();
  }
}

