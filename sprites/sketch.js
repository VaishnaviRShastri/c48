
var car;
var carImg;
var road,roadImg;
var obstacle,obstacleImg,obastacleGrp;
var gameState="Start";
var rand;
var barImg;
var coinImg,fuelImg,lowFuel,lowFuelImg;
var coinCount=0,fuelCount=50;
var inv1,inv2;
var mus1,mus2,mus3;

function preload(){
  carImg=loadImage("Car.png.png");
  roadImg=loadImage("track_img3.jpg");
  obstacleImg=loadImage("Cone.png");
  barImg=loadImage("barricade2.png");
  coinImg= loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png");
  fuelImg=loadImage("fuel.png");
  lowFuelImg=loadImage("lowFuel.png");
  mus1=loadSound("crash.mp3.wav");
  mus2=loadSound("Continuous.mp3.mp3");
  mus3=loadSound("Coincollect.mp3.wav");
}
function setup() {
  createCanvas(400, 600);
 

road=createSprite(350,200)
road.addImage("road",roadImg);
road.scale=2;


car =createSprite(130,550,10,20);
car.addImage("car",carImg);
car.scale=0.1;

lowFuel=createSprite(320,550,50,50);
lowFuel.addImage("fuel",lowFuelImg);
lowFuel.visible=false;
lowFuel.scale=0.5;

inv1=createSprite(40,550,5,200);
inv1.visible=false;
inv2=createSprite(345,550,5,200);
inv2.visible=false;

obstacleGrp=new Group();
coinGrp=new Group();
fuelGrp=new Group();
}

function draw() {
  background("black"); 

  car.collide(inv1);
  car.collide(inv2);

  if(gameState==="Start"){
    var bgs;
    background("black");
    fill("White");
    textSize(25);
    text("Car Racing Game",80,50);
    textSize(20);
    text("Instructions To Play-",35,100);
    textSize(15);
    textFont("Calibri")
    text("Move the car with the help of your left,right arrow keys.",35,140);
    text("Keep collecting fuel and coins to keep going.",35,180);
    textSize(20);
    text("Press Space To start",50,250);
     
    if(keyDown("space")){
      gameState="Play";
    }

  }
   
  if(gameState==="Play"){

    //mus2.play();

    road.velocityY=5;

lowFuel.visible=false;
    if(keyDown("left")){
      car.x=car.x-15;   
    }
    
    if(keyDown("right")){
      car.x=car.x+15;
    }
    if(road.y>380){
        road.y=height/2
    }
     
    spawnObstacle()
    spawnCoin()
    spawnFuel()

    if(coinGrp.isTouching(car)){
      coinGrp.destroyEach();
      coinCount+=1; 
      mus3.play();
 
    }

    if(fuelGrp.isTouching(car)){
      fuelGrp.destroyEach();
      fuelCount+=50; 
      mus3.play();     
    }

    if(frameCount%70===0){
      fuelCount-=10;
    }

    if(fuelCount<=20){
   lowFuel.visible=true;
       }

    if(fuelCount<=0){
      gameState="End";
    }   
        


    if(obstacleGrp.isTouching(car)){
      road.velocityY=0;
      car.x=130;
      car.y=550;
      obstacleGrp.destroyEach();
      obstacleGrp.setVelocityYEach(0);
      gameState="End";
      mus1.play();

  }
  drawSprites();
  fill("white")
    textSize(20)
    text("Coin:"+coinCount,100,20);
    text("Fuel:"+fuelCount,250,20);
  }

  if(gameState==="End"){
    background("black");
    fill("Yellow");
    textSize(30);
    text("Game Over", 150,300);
    textSize(24);
    text("Press Space To Restart",100,370);
    if(keyDown("Space")){
      reset();
    }
  }


  
  

  
  
  //car.velocityY=-5;
  
  
}

function spawnObstacle(){
    if(frameCount%90===0){
      obstacle=createSprite(Math.round(random(110,280),-20,10,10))
       //obstacle.addImage(obstacleImg);
      obstacle.velocityY=3;
      rand=Math.round(random(1,2))
      switch(rand){
        case 1 : obstacle.addImage(obstacleImg)
        obstacle.scale=0.2;
        break;
        case 2 : obstacle.addImage(barImg)
        obstacle.scale=0.3;
        break;
        
      }
    
    obstacle.lifetime=200
    obstacleGrp.add(obstacle)
     }
}

function spawnFuel(){
  if(frameCount%120===0){
    var fuel=createSprite(Math.round(random(110,280),-20,10,10))
     fuel.velocityY=3;
     fuel.addImage(fuelImg);
    fuel.lifetime=200
    fuelGrp.add(fuel);
    fuel.scale=0.3
   }
}
function spawnCoin(){
  if(frameCount%180===0){
    var coin=createSprite(Math.round(random(110,280),-20,10,10))
     coin.velocityY=3;
     coin.addAnimation("coin",coinImg);
    coin.lifetime=200;
    coinGrp.add(coin);
    coin.scale=0.8;
   }
}

function reset(){
  gameState="Play"
  coinCount=0;
  fuelCount=50;
}