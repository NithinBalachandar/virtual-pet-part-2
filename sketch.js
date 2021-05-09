//Create variables here
var dog;
var happyDog;
var database;
var foodS = 0;
var foodStock;
var addFood;
var feedTime;
function preload()
{
	//load images here
  dogimg = loadImage("Dog.png");
  milkbottle = loadImage("Milk.png");
  happydogimg = loadImage("happydog.png");
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();

  dog1 = createSprite(400,300,10,10);
  dog1.addImage(dogimg);
  dog1.scale = 0.15;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  addFood = createButton("Add Food");
  addFood.position(600,500);
  addFood.mousePressed(addFoodFunction);

}
function readStock(data){
foodS = data.val();
console.log(foodS);
}

function getFeedTime (data){
 feedTime = data.val();

}

function displayMilkBottles(){
  var x = 500;
  var y = 50;
  imageMode(CENTER);
  
  if(foodS>0){
    for(var i = 0; i<foodS; i++ ){
      if(i%10 === 0){
        x = 500;
        y = y+50;
      }
      image(milkbottle, x,y,70,70);
      x= x+30;
    }
  }
}

function draw() {
  background(46, 139, 87);  
  drawSprites();
  displayMilkBottles();
  dbref = database.ref("lastFeedTime");
  dbref.on("value", getFeedTime)
    if(keyWentDown(UP_ARROW)){
       writeStock(foodS);
       dog1.addImage(happydogimg);
    }
    fill(255,255,254);
   stroke("black");
    text("Food remaining : "+foodS,170,200);
    textSize(13);
      text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
      fill(255,255,254);
       textSize(15);
        if(feedTime>=12){ 
          text("Last Feed : "+ feedTime%12 + " PM", 350,30);
        }
          else if(feedTime===0){
             text("Last Feed : 12 AM",350,30);
          }
          else{
         text("Last Feed : "+ feedTime + " AM", 350,30); 
      }

  }

  function writeStock(x){
    if(x<0){
      x = 0;
    }else{
      x= x-1;
    }
    database.ref("/").update({Food:x, lastFeedTime:hour()});
  }

  function addFoodFunction(){
    foodS = foodS+1;
    database.ref("/").update({
      Food:foodS
    });
  }