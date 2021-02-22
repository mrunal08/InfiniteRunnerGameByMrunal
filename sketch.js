
var ground,groundImage;
var cat,catImage;
var IVground,IVgroundImage;
var emy,emyImage;
var cloud,cloudImage;
var coin,coinImage;
var bullet,bulletImage;
var cute, cuteImage;
var catHead, catHeadImage;
var catDead, catDeadImage;

var bg;
var log,logImage;
var score = 0
var life = 5
var restart, restartImage;
var gameOver, gameOverImage;


var PLAY = 1
var END = 0
var gameState = PLAY
localStorage["HighestScore"]=0

function preload() {
bg = loadImage("bg1.png")
groundImage = loadImage("ground.png")
catImage = loadAnimation("d1.png","d2.png","d3.png","d4.png","d5.png","d6.png")
emyImage = loadAnimation("emy1.png","emy2.png","emy3.png")
logImage = loadImage("enemy.png")
cloudImage = loadImage("cloud.png")
coinImage = loadImage("coin.png")
bulletImage = loadImage("bullet.png")
cuteImage = loadImage("cute.png")
gameOverImage = loadImage("gameOver.png")
restartImage = loadImage("restart.png")
catDeadImage = loadImage("catDead.png")
catHeadImage = loadImage("catHead.png")
textimg = loadImage("cuteeee.png");
}


function setup() {
createCanvas(windowWidth, windowHeight);


ground = createSprite(width/2,height,width,20)
ground.addImage("ground",groundImage)
ground.x = ground.width/2

cat = createSprite(50,height-70,20,20)
cat.addAnimation("cat",catImage)
cat.scale = 0.6

instruct = createSprite(width/2,height-200);
	instruct.addImage("instruct",textimg);
	instruct.lifetime =200;

IVground = createSprite(width/2,height-10,width,10)
IVground.visible = false


restart = createSprite(width/2,height/2-100)
restart.addImage("restart",restartImage)
restart.scale = 0.4
restart.visible = false

coin = createSprite(200,50,10,10)
coin.addImage("coin",coinImage)


logGroup = new Group()
cloudGroup = new Group()
bulletGroup = new Group()
emyGroup = new Group()
coinGroup = new Group()
cuteGroup = new Group()


score = 0

}


function draw() {
  background(bg)
  
  fill("white")
  textSize(35)
  textFont("monospace")
  text("Score   :"+score,70,60)
 
 
  text("Life  :"+life,330,60)
  
  drawSprites();

if(gameState===PLAY){
   
  restart.visible = false
  //gameOver.visible = false
  background.velocityX = -3
    
  if(background.x<0){
  background.x = background.width/2
 }

   ground.velocityX = -7
    
    if(ground.x<500){
    ground.x = ground.width/2
   }

   if(touches.length>0 || keyDown("space")&& cat.y>320){
    cat.velocityY = -20
    touches=[]
   }

   if(keyWentDown("RIGHT_ARROW")){
     bullet = createSprite(cat.x, cat.y)
     bullet.addImage("bullet",bulletImage)
     bullet.velocityX = 4
     bulletGroup.add(bullet)

   }

    cat.velocityY = cat.velocityY +0.8

    spawnlog();
    spawnemy();
    spawnclouds();
    spawncoins();
    spawncute();

    if(cuteGroup.isTouching(cat)){
      textSize(50);
      //textFont(monopause)
      fill("pink")
      text("Hey Vidhisha. Pleased to meet you!!!",width/2-400,height/2-50)
  
    }

  if(logGroup.isTouching(cat)){
    life = life-1
    gameState = END
   
  }

  if(emyGroup.isTouching(cat)){
    life = life-1
    
    cat.changeAnimation("cat",catDead)
    gameState = END
  }

  if(bulletGroup.isTouching(emyGroup)){
    emyGroup.destroyEach()
    bulletGroup.destroyEach()

  }

  
     if(coinGroup.isTouching(cat)){
       score = score+1
      coinGroup[0].destroy()
      
       }

     

     
}
else if(gameState===END){
  
  //gameOver.visible = false
  restart.visible = true
  
  

  if(life === 0){
    gameOver = createSprite(width/2,height/2-50,20,20)
   gameOver.addImage(gameOverImage)
   gameOver.scale = 0.3
   gameOver.visible = true
   restart.visible = false

  }
 
  ground.velocityX = 0
  
  emyGroup.setVelocityXEach(0)
  logGroup.setVelocityXEach(0)
  cloudGroup.setVelocityXEach(0)
  coinGroup.setVelocityXEach(0)

  cloudGroup.setLifetimeEach(-1)
  coinGroup.setLifetimeEach(-1)
  logGroup.setLifetimeEach(-1)
  emyGroup.destroyEach();

  if(mousePressedOver(restart)&& life>0){
    reset()
   }
 
  cat.velocityY = 0

 }
  cat.collide(IVground)
 
}


function spawnlog() {
  //write code here to spawn the pipe
  if (frameCount % 350 === 0) {
    var log = createSprite(width,height-70,40,10);
    log.addImage(logImage);
    log.scale = 1;
    log.velocityX = -6;
    logGroup.add(log)
  }
}

function spawnemy() {
  //write code here to spawn the enemy
  if (frameCount % 150 === 0) {
    var emy = createSprite(width,height-70,40,10);
    emy.addAnimation("emy",emyImage);
    emy.scale = 0.6;
    emy.velocityX = -7;
    emyGroup.add(emy)
  }
}

function spawncoins() {
  //write code here to spawn the coin
  if (frameCount % 150 === 0) {
    for(var i=0;i<5;i++){
    coin = createSprite(width+i*30,height-350,10,10);
   coin.addImage("coin",coinImage);
    coin.scale = 1.5;
    coin.velocityX = -4;
    coin.lifetime = 400
    coinGroup.add(coin)
    }
  }
}

function spawnclouds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(80,190));
    cloud.addImage(cloudImage);
    cloud.scale = 3;
    cloud.velocityX = -3;
    cloudGroup.add(cloud)

  }
}

function spawncute() {
  //write code here to spawn the enemy
  if (frameCount % 100 === 0) {
    var cute = createSprite(width,random(50,150),40,10);
    cute.addAnimation("cute",cuteImage);
    cute.scale = 0.2;
    cute.velocityX = -7;
    cuteGroup.add(cute)
   
    
  }
}

function reset(){
 gameState = PLAY
 logGroup.destroyEach()
 cloudGroup.destroyEach()
 emyGroup.destroyEach()
 coinGroup.destroyEach()
 restart.visible = false

 if(localStorage["HighestScore"]<score){

  localStorage["HighestScore"]=score
  
 }
 score = 0

}