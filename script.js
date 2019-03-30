var interval_ms = 20;
var frames = 1000 / interval_ms;

var myGamePiece;
var myGameEnemy;

var myGameArea = {
	canvas : document.getElementById("myCanvas"),
	end: true,
	start : function() {
    this.context = this.canvas.getContext("2d");
    // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, interval_ms);	//	50 frames per second
  },
  clear : function() {
  	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  	// this.context.fillRect(0,0, this.canvas.width, this.canvas.height);
  	this.context.fillStyle = '#b8a0bf';
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
  	clearInterval(this.interval);
  	console.log("game over");
  	// startGame();
  }
}

function startGame() {
	myGameArea.start();
	myGamePiece = new component(15, 15, 15, "#efec4c", 3, 100);
	myGameEnemy = new enemy(30, 30, "red", 700, 1);
}

function component(width, height, radius, color, x, y) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.gravity = 10;
	this.x_speed = 4;
	this.y_speed = 0;
	this.angle = 0;
	this.dx_angle = 1 * Math.PI/100;
	
	this.update = function() {
		ctx = myGameArea.context;
		// ctx.save();
		// ctx.translate(this.x, this.y); 
		// ctx.rotate(this.angle);
		// ctx.fillStyle = color;
		// ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height); 
		// ctx.restore(); 
		ctx.fillStyle = color; //red
		ctx.beginPath();
		ctx.arc(this.x, this.y, radius, 0, Math.PI*2,true);
		ctx.closePath();
		ctx.fill();

		// ctx.fillStyle = color;
		// ctx.arc(this.width, this.height, radius, 0, 2 * Math.PI);
		// ctx.stroke();

	}

	this.new_position = function() {
		if(this.x > myGameArea.canvas.width - width || this.x <= 0){
			this.x_speed = -this.x_speed;
			this.dx_angle = -this.dx_angle;
		}
		if(this.y+this.height > myGameArea.canvas.height){
			myGameArea.stop();
		}
		this.y_speed = this.y_speed + this.gravity / frames;
		myGamePiece.x += this.x_speed;
		myGamePiece.y += this.y_speed;
	}
}

function enemy(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.x_speed = 0;
	this.y_speed = 1;
	this.angle = 0;
	this.dx_angle = 1 * Math.PI/100;
	
	this.update = function() {
		ctx = myGameArea.context;
		
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height); 
	}

	this.new_position = function() {
		myGameEnemy.y += this.y_speed;
	}
}

function updateGameArea() {
  myGameArea.clear();
  myGamePiece.angle += myGamePiece.dx_angle;
  myGamePiece.update();
  myGamePiece.new_position();
  myGameEnemy.update();
  myGameEnemy.new_position();
}

function jump() {
  myGamePiece.y_speed = -7;
}
