
function initialise() {
  canvas= document.getElementById('kunal');
  W=canvas.width;
  H=canvas.height;
  //To draw something on the canvas I will take a pen
  pen=canvas.getContext('2d');
  cs=30; //cs==Cell Size
  food= getFood();
  gameover=false;
  snake={
    initialise_len:5,
    color: "blue",
    cells:[],
    direction:"right",
    createSnake: function() {
      for(var i=this.initialise_len;i>0;i--){
        this.cells.push({x:i,y:0});
      }
    },
    drawSnake: function() {
       for(var i=0;i<this.cells.length;i++){
         pen.fillStyle= this.color;
         pen.fillRect(this.cells[i].x*cs+5,this.cells[i].y*cs+33,cs-2,cs-2);
       }
    },
    updateSnake: function() {
      console.log('Updating Snake');
      var headX=this.cells[0].x;
      var headY=this.cells[0].y;
      if(food.x==headX && headY==food.y){
        console.log("Food eaten");
        food=getFood();
      }
      else this.cells.pop();
      var nextX,nextY;
      if(this.direction=="right"){ nextX=headX+1; nextY=headY;}
      else if(this.direction=="left"){ nextX=headX-1; nextY=headY; }
      else if (this.direction=="down"){ nextX=headX; nextY=headY+1;}
      else{ nextX=headX; nextY=headY-1;}
      this.cells.unshift({x:nextX,y:nextY});

      var lastX= Math.round(W/cs);
      var lastY= Math.round(H/cs);
      if(this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x>lastX || this.cells[0].y>lastY){
        gameover=true;
      }
    }
  };
  snake.createSnake();
//Adding an event listener to the document object
  // document.addEventListener('keydown', function(data){
  //   console.log('A key is pressed:',data.key);
  // })
  var keyPressed= function(data) {
    if(data.key=='ArrowRight') snake.direction= "right";
    else if(data.key=='ArrowLeft') snake.direction= "left";
    else if(data.key=='ArrowDown') snake.direction="down";
    else if(data.key=='ArrowUp') snake.direction="up";
    console.log(snake.direction);
  }
  document.addEventListener('keydown',keyPressed);

}

function draw() {
  // console.log('drawing snake');
  pen.clearRect(0,0,W,H);//erase the old frame
   snake.drawSnake();
   pen.fillStyle="red";
   // pen.arc(food.x*cs,food.y*cs,(W-cs)/cs,0,2*Math.PI);
   // pen.stroke();
   pen.fillRect(food.x*cs+5,food.y*cs+33,cs,cs);
}

function update() {
snake.updateSnake();
}

function getFood() {
  var foodX= Math.round(Math.random()*(W-cs)/cs);
  var foodY= Math.round(Math.random()*(H-cs)/(cs+5));
  var food={
    x:foodX,
    y:foodY,
    color:"red",
  }
return food;
}

function gameloop() {
  if(gameover==true){
    clearInterval(f);
    alert("Game Over buddy");
    return;
  }
  draw();
  update();
}

initialise();
var f= setInterval(gameloop,100);
