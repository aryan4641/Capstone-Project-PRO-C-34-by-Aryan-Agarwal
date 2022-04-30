const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,nut,ground;
var nut_con;
var nut_con_2;
var nut_con_3;
var rope3;

var bg_img;
var food;
var squirrel;

var button,button2,button3;
var max;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var berry, berry2;
var berry_image;
var emptyStar;
var oneStar;
var twoStar;
var scoreDisplay;

function preload()
{
  bg_img = loadImage('Autumn Background.jpg');
  food = loadImage('Peanut.png');
  squirrel = loadImage('Original Squirrel.png');
  
  
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("Original Squirrel.png");
  eat = loadAnimation("Dancing Squirrel.png");
  sad = loadAnimation("Angry Squirrel.png");

   emptyStar = loadAnimation("empty.png");
   oneStar = loadAnimation("one_star.png");
   twoStar = loadAnimation("stars.png");

  berry_image = loadImage("Berry.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('sci.png');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('sci.png');
   button2.position(450,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);
 
   rope = new Rope(7,{x:110,y:90});
   rope2 = new Rope(7,{x:490,y:90});


  mute_btn = createImg('quiet.png');
  mute_btn.position(width-100,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(300,height,width,20);
  //ground = createImg("grass.png");
  //ground.position(300,height);
  
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  max = createSprite(300,height-80,100,100);
  max.scale = 0.5;

  max.addAnimation('blinking',blink);
  max.addAnimation('eating',eat);
  max.addAnimation('crying',sad);
  max.changeAnimation('blinking');

  berry = createSprite(60,310,30,30);
  berry.addImage(berry_image);
  berry.scale = 0.2;

  berry2 = createSprite(300,50,30,30);
  berry2.addImage(berry_image);
  berry2.scale = 0.2;

  scoreDisplay = createSprite(50,50,0, 0);
  scoreDisplay.scale = 0.2;
  scoreDisplay.addAnimation('empty',emptyStar);
  scoreDisplay.addAnimation('one', oneStar);
  scoreDisplay.addAnimation('two',twoStar);
  scoreDisplay.changeAnimation('empty');

  nut = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,nut);

  nut_con = new Link(rope,nut);
  nut_con_2 = new Link(rope2,nut);

  blower = createImg("Wind.png");
  blower.position(250, 350);
  blower.size(100,100);
  blower.mouseClicked(airBlow);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(nut!=null){
    image(food,nut.position.x,nut.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(nut,max)==true)
  {
    World.remove(engine.world,nut);
    nut = null;
    max.changeAnimation('eating');
    eating_sound.play();
  }

  if(nut!=null && nut.position.y>=650)
  {
    max.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    nut=null;
   }
  if(starCollision(nut, berry,20) == true){
    berry.visible = false;
    scoreDisplay.changeAnimation('one');
  }
  if(starCollision(nut, berry2,20) == true){
    berry2.visible = false;
    scoreDisplay.changeAnimation('two');
  }
}

function drop()
{
  cut_sound.play();
  rope.break();
  nut_con.dettach();
  nut_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  nut_con_2.dettach();
  nut_con_2 = null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}
function starCollision(body, sprite, x){
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}
function airBlow(){
  Matter.Body.applyForce(nut, {x:0, y:0}, {x:0, y:-0.03});
}
