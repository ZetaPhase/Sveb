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
	context.moveTo(40, 15);
	context.lineTo(65, 65);
	context.lineTo(15, 65);
	context.lineTo(40, 15);
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
	context.moveTo(15, 15);
	context.lineTo(65, 15);
	context.lineTo(40, 65);
	context.lineTo(15, 15);
	context.stroke();
	context.closePath();
}

function drawRectangle(context){
	//draw rectangle
	context.beginPath();
	context.moveTo(30, 15);
	context.lineTo(50, 15);
	context.lineTo(50, 65);
	context.lineTo(30, 65);
	context.lineTo(30, 15);
	context.stroke();
	context.closePath();
}

function updateNextItem(){
  var item = possibleItems[Math.floor(Math.random()*possibleItems.length)];
  nextItem = item;
	nextItemContext.lineWidth = 3;
	nextItemContext.strokeStyle = "#324c2a";
	if(item == 'triangle'){ //draw triangle in next item box
		drawTriangle(nextItemContext);
	}else if(item == 'circle'){ //draw circle in next item box
		drawCircle(nextItemContext);
	}else if(item == 'nabla'){ //draw inverted triangle
		drawNabla(nextItemContext);
	}else if(item == 'rectangle'){ //draw long vertical rectangle
		drawRectangle(nextItemContext);
	}
}

updateNextItem();

console.log(nextItem);

function loop(x)
{
    if(!bDisabled[x]){ //button does not currently contain X or O and therefore is enabled.
        bDisabled[x] = true; //button now contains something

        button[x].style.webkitTransform = "rotateY(180deg)";

        content.makeMove(nextItem, [Math.floor(x/6), x%6]);

				nextItemContext.clearRect(0, 0, nextItemCanvas.width, nextItemCanvas.height);

				ctx[x].lineWidth = 3;
				ctx[x].strokeStyle = "#324c2a";
				if(nextItem == 'triangle'){
					drawTriangle(ctx[x]);
				}else if(nextItem == 'circle'){
					drawCircle(ctx[x]);
				}else if(nextItem == 'nabla'){
					drawNabla(ctx[x]);
				}else if(nextItem == 'rectangle'){
					drawRectangle(ctx[x]);
				}

				updateNextItem();
    }
}

function groupBoard() //TODO
{
	//modifies the content array
	//groups like tiles together up the growth chart
	//returns true if group was possible

	//returns false if group was not possible
}