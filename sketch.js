// const Engine = Matter.Engine;
// const World = Matter.World;
// const Bodies = Matter.Bodies;
// const Body = Matter.Body;

var bgImg
var balloon
var bImg

var database,position,firebase;


function preload(){
  bgImg = loadImage("Hot Air Ballon-01.png") 
  bImg = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
}

function setup() {
  createCanvas(1440,730);
  database = firebase.database()
  console.log(database)

  balloon = createSprite(270,530)
  balloon.addAnimation("balloon",bImg)
  balloon.scale = 0.7
  var balloonPosition = database.ref('balloon/position')
  balloonPosition.on('value',readPosition,showError)
  

 
}

function draw() {
  background(bgImg); 
// if(position !== undefined){
  if(keyDown(LEFT_ARROW)){
    writePosition(-9,0)
  }

  else if(keyDown(RIGHT_ARROW)){
    writePosition(9,0)
  }

  else if(keyDown(UP_ARROW)){
   writePosition(0,-9)
    balloon.scale = balloon.scale - 0.012
  }

  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+9)
    balloon.scale = balloon.scale + 0.012
  }
// }

 drawSprites();
}





function changePosition(x,y){
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;
}


function readPosition(data){
  position = data.val()
  balloon.x = position.x
  balloon.y = position.y
}

function writePosition(x,y){
  database.ref('balloon/position').set({
      x: position.x + x,
      y: position.y + y
  })

}

function showError(){
  console.log('there was an error reading from the database')
}