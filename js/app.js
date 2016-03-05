var blocks = {
	0: {
    type: 'air',
  },

  1: {
  	type: 'floor',
  },

  2: {
  	type: 'box',
  }
};

function Block (options) {;
	this.startPosition = options.startPosition || 0;
  this.size = Math.floor(options.size);
  this.xPos = this.size * Math.floor(options.xPos);
  this.yPos = this.startPosition + (options.size * options.yPos);
  this.type = options.type;
}

Block.prototype.create = function () {
	var block = document.createElement('div');
  block.classList.add('block');
  block.style.top = Math.floor(this.yPos) + 'px';
  block.style.left = this.xPos + 'px';
  block.style.width = Math.floor(this.size) + 'px';
  block.style.height = Math.floor(this.size) + 'px';

  if (this.type) {
    if (this.type === 1) {
      block.classList.add('block--floor');
      block.style.backgroundPosition = -Math.round(parseInt(this.size)) + 'px 0px';
    } else if (this.type ===2) {
      block.classList.add('block--box');
      block.style.backgroundPosition = -Math.round(parseInt(this.size)) + 'px '
        + -Math.round(parseInt(this.size)) + 'px';
    }
    block.style.backgroundSize = (Math.round(parseInt(this.size)) * 2) + 'px';
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
        startPosition: differenceTop,
        type: cell
  		});

  		self._appendBlock(block.create());

    });
  });

  console.log("Map is generated.");
};

Generator.prototype._appendBlock = function (block) {
	this.world.appendChild(block);
};
