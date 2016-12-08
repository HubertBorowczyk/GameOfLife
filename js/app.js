document.addEventListener('DOMContentLoaded', function () {
	var GameOfLife = function (boardWidth, boardHeight) {

		this.width = boardWidth;
		this.height = boardHeight;
		this.cells = [];
		this.board = document.getElementById('board');

		this.createBoard = function () {
			this.board.style.width = this.width * 10 + 'px';
			this.board.style.height = this.height * 10 + 'px';
			this.Divs = boardWidth * boardHeight;

			for (var i = 0; i < this.Divs; i++) {
				this.boardDiv = document.createElement('div');
				this.board.appendChild(this.boardDiv);

			}

		this.cells = document.querySelectorAll('#board div');

			for (var i = 0; i < this.cells.length; i++) {
				this.cells[i].addEventListener('click', function () {
					this.classList.toggle('live');
				});
			}
		}

		this.setIndex = function (x, y) {
			return this.cells[x + y * this.width];
		}

		this.setCellState = function (x, y, state) {
			if (this.setIndex(x,y)){
				if (state === 'live') {
					this.setIndex(x, y).classList.add('live');
				} else{
					this.setIndex(x, y).classList.remove('live');
				}
			}
		}

		this.firstGlider = function () {
			this.setCellState(2, 1, 'live');
			this.setCellState(3, 2, 'live');
			this.setCellState(3, 3, 'live');
			this.setCellState(2, 3, 'live');
			this.setCellState(1, 3, 'live');
		}

		this.computeCellNextState = function (x, y) {

			this.liveNeighbours = 0;

			for (var nx = x - 1; nx <= x + 1; nx++) {
				for (var ny = y - 1; ny <= y + 1; ny++) {

					if (nx === x && ny === y ||
						!this.setIndex(nx, ny)) {} else if (this.setIndex(nx, ny).classList.contains('live')) {
						this.liveNeighbours++;
					}
				}
			}
			if (this.setIndex(x, y).classList.contains('live')) {
				if (this.liveNeighbours < 2 || this.liveNeighbours > 3) {
					return 0;
				} else {
					return 1;
				}
			} else {
				if (this.liveNeighbours === 3) {
					return 1;
				}
			}
		}

		this.computeNextGeneration = function () {
			this.stateTable = [];
			for (var y = 0; y < this.height; y++) {
				for (var x = 0; x < this.width; x++) {
					this.stateTable.push(this.computeCellNextState(x, y));
				}
			}
		}

		var self = this;

		this.printNextGeneration = function () {
			for (var i = 0; i < self.cells.length; i++) {
				if (self.stateTable[i] === 1) {
					self.cells[i].classList.add('live')
				} else {
					self.cells[i].classList.remove('live')
				}
			}
		}

		this.gameStep = function () {
			self.computeNextGeneration();
			self.printNextGeneration();
		}
	}

	var playBtn     = document.getElementById('play');
	var pauseBtn    = document.getElementById('pause');
	var settingsDiv = document.getElementById('settings');
	var inputs      = document.querySelectorAll('input');
	var startBtn    = settingsDiv.querySelector('button');
	var gameStarted = false;

	var start = function(){
		var game = new GameOfLife(parseInt(inputs[1].value), parseInt(inputs[0].value));
		game.createBoard();
		game.firstGlider();
		playBtn.addEventListener('click', function (e) {
			if (gameStarted === false){
				var interval = setInterval(game.gameStep, 500);
				gameStarted = true;
			} else {
				e.preventDefault();
			}
				pauseBtn.addEventListener('click', function () {
					clearInterval(interval);
				});
		});
	}

	startBtn.addEventListener('click', function(e){
		e.preventDefault();
		settingsDiv.style.display = 'none';
		start();
	});
});

