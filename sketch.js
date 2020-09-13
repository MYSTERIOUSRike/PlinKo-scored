  //Plinko is a game played on a nearly vertical board populated with offset rows of pegs. 
  //The player chooses one of five slots in the top of the board, drops the chip into it and 
  //watches as the chip bounces down the board.
  //Each time the chip encounters a peg, it will either bounce left or right.
  //In this project, we develop the Plinko Game with a Score Card.

  var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

  //making the gamestates
  var gameState=0
  //var play=0;
  var end;
  var score=0;
 
  //limiting the no.of turns 
  var turn=0;
  
 //making the particle
  var particle;

  //making the arrays
  var particles = [];
  var divisions=[];
  var plinkos = [];

  //giving division height
  var divisionHeight=300;
  
  function setup() {
  //creating the canvas and thw world
    createCanvas(800, 800);
    engine = Engine.create();
    world = engine.world;
   
    //creating the ground
    ground = new Ground(width/2,height,width,20);

    //making the for loops to create divisions
    for (var k = 0; k <=width; k = k + 80) {
      divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
    }

    for (var j = 75; j <=width; j=j+50) 
    {
    
      plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
      plinkos.push(new Plinko(j,175));
    }

    for (var j = 75; j <=width; j=j+50) 
    {
    
      plinkos.push(new Plinko(j,275));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
      plinkos.push(new Plinko(j,375));
    }
  }
  
  function draw() {
    
    background("black");
    
    textSize(20)
    text("Score : "+score,200,30);

    //updating engine to drop the particles from top
    Engine.update(engine);
  
    //displying the for loops 
    for (var i = 0; i < plinkos.length; i++) {
            plinkos[i].display();
    }
      
    for (var j = 0; j < particles.length; j++) {
        particles[j].display();
    }

    for (var k = 0; k < divisions.length; k++) {
        divisions[k].display();
    }

    //showing how much points player gets in the specific division
    text("500",20,600)
    text("500",100,600)
    text("500",180,600)
    text("500",260,600)
    text("100",340,600)
    text("100",420,600)
    text("100",500,600)
    text("200",580,600)
    text("200",660,600)
    text("200",740,600)

    //logic for adding the score to scoreboard
   if(particle!=null){
     
    particle.display();
     
     if(particle.body.position.y>760){
        
        if(particle.body.position.x<270){
          score=score+500;
          if(turn>= 5) gameState="end";
          console.log("I am here in 500 score: "+turn+" "+gameState);
        }
        if(particle.body.position.x>271 && particle.body.position.x<500){
          score=score+100;
          if(turn>= 5) gameState="end";
          console.log("I am here in 100 score: "+turn+" "+gameState);
        }

        if(particle.body.position.x>501 && particle.body.position.x<800){
          score=score+200;
          if(turn>= 5) gameState="end";
          console.log("I am here in 200 score: "+turn+" "+gameState);
        }
        particle=null;

      //Print text Game Over
        if(gameState=="end"){
          
          textSize(50);
          fill ("green");
          text("GAME OVER",200,450);

          console.log("I am here in end game state: "+turn);

          drawSprites();
        
        }
      }
    }
  }

//funtion for dropping the ball and scoring
function mousePressed(){
  if (gameState!=="end"){
    turn++
    particle= new Particle(mouseX,10,10,10)
  }
}