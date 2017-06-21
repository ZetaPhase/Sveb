function Board() {
	this.turnCnt = 0;
	this.gamestate = [['','','','','',''],
										['','','','','',''],
										['','','','','',''],
                    ['','','','','',''],
                    ['','','','','',''],
                    ['','','','','','']];
	//Returns the open positions on the board as an array of points as [row, column] or [y, x]
	this.getAvailableMoves = function() {
		var moves = [];

		for(var row in this.gamestate)
			for(var col in this.gamestate[row])
				if(this.gamestate[row][col] === '')
					moves.push([row, col]);

		return moves;
	};

	this.clone = 	function() {
		var newBoard = new Board();

		//Copy over the positions of X's and O's and the turn number to the cloned board
		for(var row = 0; row < 6; row++)
			for(var col = 0; col < 6; col++)
				newBoard.gamestate[row][col] = this.gamestate[row][col];
		newBoard.turnCnt = this.turnCnt;

		return newBoard;
	};

	//Will take in the player making the move as well as an [y, x] array of where to place the player's marker
	this.makeMove = function(player, point) {
		var row = parseInt(point[0]);
		var col = parseInt(point[1]);
		this.gamestate[row][col] = player;
		this.turnCnt++;
	};

	this.isFull = function() {
		return this.turnCnt === 36;
	};
	/*
	this.checkForWin = function() {
		var boardState = this.gamestate;
		var winner;

		//checking the diagonals
		if(boardState[1][1] !== '' &&
			 ((boardState[0][0] === boardState[1][1]
				 && boardState[2][2] === boardState[1][1])
				|| (boardState[0][2] === boardState[1][1]
						&& boardState[2][0] === boardState[1][1]))) {
			winner = boardState[1][1];
			return winner;
		}
		else {
			//Checking the horizontals
			for(var row in boardState) {
				if(boardState[row][0] !== '' &&
					 boardState[row][0] === boardState[row][1]
					 && boardState[row][2] === boardState[row][1]) {
					winner = boardState[row][0];
					return winner;
				}
			}
			//Verticals
			for(var col in boardState) {
				if(boardState[0][col] !== '' &&
					 boardState[0][col] === boardState[1][col]
					 && boardState[1][col] === boardState[2][col]) {
					winner = boardState[0][col];
					return winner;
				}
			}
		}
	};
  */
}

var button = []; //stores the canvases
for(var i=0; i<36; i++) button[i] = document.getElementById('canvas'+i);

var ctx = []; //stores the context of the canvases
for(var i=0; i<36; i++) ctx[i] = button[i].getContext('2d');

var bDisabled = []; //stores the availability of the button
for(var i=0; i<36; i++) bDisabled[i] = false; //all buttons are enabled in the beginning

var isResult = false;
//var content = [];
//for (var i=1; i<10; i++) content[i] = 'n';

//setup nextItem tile
var nextItem;
var nextItemCanvas = document.getElementById('nextItem');
var nextItemContext = nextItemCanvas.getContext('2d');
var possibleItems = ['triangle', 'triangle', 'triangle', 'triangle', 'triangle',
                     'circle', 'circle',
                     'nabla', 'nabla',
                     'rectangle'];

var content = new Board();

console.log(content.getAvailableMoves());

function drawTriangle(context){
	//draw triangle
	context.beginPath();
	nextItemContext.moveTo(40, 15);
	nextItemContext.lineTo(65, 65);
	nextItemContext.lineTo(15, 65);
	nextItemContext.lineTo(40, 15);
	context.stroke();
	context.closePath();
}

function drawCircle(context){
	//draw circle
	context.beginPath();
	context.arc(nextItemCanvas.width/2, nextItemCanvas.height/2, 30, 0, 2*Math.PI, false);
	context.stroke();
	context.closePath();
}

function drawNabla(context){
	//draw nabla
	context.beginPath();
	nextItemContext.moveTo(15, 15);
	nextItemContext.lineTo(65, 15);
	nextItemContext.lineTo(40, 65);
	nextItemContext.lineTo(15, 15);
	context.stroke();
	context.closePath();
}

function drawRectangle(context){
	//draw rectangle
	context.beginPath();
	nextItemContext.moveTo(30, 15);
	nextItemContext.lineTo(50, 15);
	nextItemContext.lineTo(50, 65);
	nextItemContext.lineTo(30, 65);
	nextItemContext.lineTo(30, 15);
	context.stroke();
	context.closePath();
}

function updateNextItem(){
  var item = possibleItems[Math.floor(Math.random()*possibleItems.length)];
  nextItem = item;
	nextItemCanvas.style.webkitTransform = "rotateY(180deg)";
	nextItemContext.lineWidth = 3;
	nextItemContext.strokeStyle = "#aa3c36";
	nextItemContext.beginPath();
	if(item == 'triangle'){ //draw triangle in next item box
		nextItemContext.moveTo(40, 15);
		nextItemContext.lineTo(65, 65);
		nextItemContext.lineTo(15, 65);
		nextItemContext.lineTo(40, 15);
	}else if(item == 'circle'){ //draw circle in next item box
		nextItemContext.arc(nextItemCanvas.width/2, nextItemCanvas.height/2, 30, 0, 2*Math.PI, false);
	}else if(item == 'nabla'){ //draw inverted triangle
		nextItemContext.moveTo(15, 15);
		nextItemContext.lineTo(65, 15);
		nextItemContext.lineTo(40, 65);
		nextItemContext.lineTo(15, 15);
	}else if(item == 'rectangle'){ //draw long vertical rectangle
		nextItemContext.moveTo(30, 15);
		nextItemContext.lineTo(50, 15);
		nextItemContext.lineTo(50, 65);
		nextItemContext.lineTo(30, 65);
		nextItemContext.lineTo(30, 15);
	}
	nextItemContext.stroke();
	nextItemContext.closePath();
}

updateNextItem();

function loop(x)
{
    if(!bDisabled[x]){ //button does not currently contain X or O and therefore is enabled.
        bDisabled[x] = true; //button now contains something
        //console.log("Button pressed.");

        button[x].style.webkitTransform = "rotateY(180deg)";

        content.makeMove('X', [Math.floor(x/6), x%6]);

        setTimeout(function(){
            ctx[x].lineWidth = 3;
            ctx[x].beginPath();
            ctx[x].moveTo(15, 15);
            ctx[x].lineTo(65, 65);
            ctx[x].moveTo(65, 15);
            ctx[x].lineTo(15, 65);
            ctx[x].stroke();
            ctx[x].closePath();
        }, 300);
				nextItemContext.clearRect(0, 0, nextItemCanvas.width, nextItemCanvas.height);
				updateNextItem();
    }
}
