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
var nextItemCanvas = document.getElementById('nextItem');
var nextItemContent = nextItemCanvas.getContext('2d');

var content = new Board();

console.log(content.getAvailableMoves());


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

    }
}
