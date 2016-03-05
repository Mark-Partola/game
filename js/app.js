var blocks = {
	0: {
    type: 'air',
  	bgcolor: "transparent",
  	border: "1px solid transparent"
  },

  1: {
  	type: 'floor',
    bgcolor: "#943",
  	border: "1px solid #fff"
  },

  2: {
  	type: 'box',
    bgcolor: "#ff0",
  	border: "1px solid #fff"
  }
};

var map = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1]
];

function Block (options) {;
	this.startPosition = options.startPosition || 0;
  this.size = options.size + 'px';
  this.xPos = options.size * options.xPos + 'px';
  this.yPos = this.startPosition + (options.size * options.yPos) + 'px';
  this.bgc = options.color || '#fff';
  this.border = options.border;
}

Block.prototype.create = function () {
	var block = document.createElement('div');
  block.classList.add('block');
  block.style.top = this.yPos;
  block.style.left = this.xPos;
  block.style.width = this.size;
  block.style.height = this.size;
  block.style.backgroundColor = this.bgc;

  if (this.border) {
  	block.style.borderRight = this.border;
  	block.style.borderTop = this.border;
  }

  return block;
};

function Generator (world, map) {
	this.world = world;
  this.map = map;
};

Generator.prototype._getBlockSize = function () {
	var scene = document.querySelector('.scene');
	var rowsCount = this.map.length;
  var worldHeight = this.world.clientHeight;
  var blockSizeWidth = worldHeight / 100 * rowsCount;
  var blockSizeHeight = scene.clientWidth / 22;
  return Math.min(blockSizeWidth, blockSizeHeight);
};

Generator.prototype._calculateDifferenceTop = function (countRow, blockSize) {
	var lastRowBottomPosition = countRow * blockSize;
  console.log(lastRowBottomPosition);
	return this.world.clientHeight - lastRowBottomPosition;
};

Generator.prototype.generate = function () {
	console.log('Generating map..');

  var blockSize = this._getBlockSize();
  var block;
  var self = this;
  var differenceTop = self._calculateDifferenceTop(this.map.length, blockSize);

  this.map.forEach(function (row, rowIndex) {
  	row.forEach(function (cell, cellIndex) {

    	block = new Block({
        size: blockSize,
        xPos: cellIndex,
        yPos: rowIndex,
        color: blocks[cell].bgcolor,
        border: blocks[cell].border,
        startPosition: differenceTop
  		});

  		self._appendBlock(block.create());

    });
  });

  console.log("Map is generated.");
};

Generator.prototype._appendBlock = function (block) {
	this.world.appendChild(block);
};


var worldElem =  document.querySelector('.world');
var map = new Generator(worldElem, map);
map.generate();
