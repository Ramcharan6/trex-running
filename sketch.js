var PLAY=1;
var END=0;
var gameState=PLAY;
var ground,groundImage;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 groundImage=loadImage("sprite_0.png")
}



function setup() {
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
monkey.scale=0.1;
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/4;
  score=0;
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
background(300);
  //displaying score
  text("Score: "+ score, 300,50);
  if (gameState===PLAY){
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
   if(keyDown("space")&& monkey.y >= 200) {
        monkey.velocityY = -12;
    }
   
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score=score+5;
    }
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
    }
  }
   if (gameState===END){
     
     ground.velocityX=0;
     FoodGroup.setVelocityXEach(0);
     obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     obstacleGroup.setVelocityXEach(0);
     
   }
  spawnObstacles();
  spawnBananas();
drawSprites();
   monkey.collide(ground);
}
function spawnObstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(300,330,10,40);
    obstacle.velocityX=-4;
     var rand = Math.round(random(1,6));
      obstacle.addImage(obstacleImage);
   
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
  
}
function spawnBananas(){
  if(frameCount%200===0){
    banana=createSprite(300,220,10,40);
    banana.velocityX=-4;
    var rand=Math.round(random(1,6));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.Lifetime=300;
    FoodGroup.add(banana);
  }
  
}