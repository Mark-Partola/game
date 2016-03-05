;(function (game) {
  "use strict";

function MapGenerator (world, map) {
	this.world = world;
  this.map = map;
};

/*
* Желаемое количество показываемых блоков
*/
MapGenerator._COUNT_VISIBLE_BLOCKS = 22;

/**
* Получить размер блока.
* Возвращается минимальное из значений высоты/ширины
* Ширина - ширина сцены делить на количество показываемых блоков
* Высота - Высота мира делить на количество строк
*/
MapGenerator.prototype._getBlockSize = function () {
	var scene = document.querySelector('.scene');
	var rowsCount = this.map.length;
  var worldHeight = this.world.clientHeight;
  var blockSizeHeight = worldHeight / 100 * rowsCount;
  var blockSizeWidth = scene.clientWidth / MapGenerator._COUNT_VISIBLE_BLOCKS;
  return Math.min(blockSizeWidth, blockSizeHeight);
};

MapGenerator.prototype._calculateDifferenceTop = function (countRow, blockSize) {
	var lastRowBottomPosition = countRow * blockSize;
  console.log(lastRowBottomPosition);
	return this.world.clientHeight - lastRowBottomPosition;
};

MapGenerator.prototype.generate = function () {
	console.log('Generating map..');

  var blockSize = this._getBlockSize();
  var block, newBlock;
  var self = this;
  var differenceTop = self._calculateDifferenceTop(this.map.length, blockSize);

  this.map.forEach(function (row, rowIndex) {
  	row.forEach(function (cell, cellIndex) {

    	block = new game.Block({
        size: blockSize,
        xPos: cellIndex,
        yPos: rowIndex,
        startPosition: differenceTop,
        type: cell
  		});

      newBlock = block.create();
      if (newBlock) {
          self._appendBlock(newBlock);
      } else {
        console.log('air');
      }

    });
  });

  console.log("Map is generated.");
};

MapGenerator.prototype._appendBlock = function (block) {
	this.world.appendChild(block);
};

game.MapGenerator = MapGenerator;

})(game);
