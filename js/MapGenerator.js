;(function (game) {
  "use strict";

/**
* Генератор карты. Принимает мир и карту
*/
function MapGenerator (world, map) {
	this.world = world;
  this.map = map;
};

/**
* Желаемое количество показываемых блоков
*/
MapGenerator._COUNT_VISIBLE_BLOCKS = 22;

/**
* Получить размер блока.
* Возвращается минимальное из значений высоты/ширины
* Ширина - ширина сцены делить на количество показываемых блоков
* Высота - Высота мира делить на количество строк
*/
MapGenerator.prototype.getBlockSize = function () {
	var scene = document.querySelector('.scene');
	var rowsCount = this.map.length;
  var worldHeight = this.world.clientHeight;
  var blockSizeHeight = worldHeight / 100 * rowsCount;
  var blockSizeWidth = scene.clientWidth / MapGenerator._COUNT_VISIBLE_BLOCKS;
  return Math.min(blockSizeWidth, blockSizeHeight);
};

/**
* Вернет разницу высоты между миром и последним элементом карты
* Для того, чтобы начало карты было прижато к низу.
*/
MapGenerator.prototype._calculateDifferenceTop = function (countRow, blockSize) {
	var lastRowBottomPosition = countRow * blockSize;
  console.log(lastRowBottomPosition);
	return this.world.clientHeight - lastRowBottomPosition;
};

/**
* Генерирование карты.
* Пробегается по всем элементам массива карты.
* Создает новые блоки, передавая параметры размера,
* Номера строки и ячейки, разницу высоты, тип
*/
MapGenerator.prototype.generate = function () {
	console.log('Generating map..');

  var blockSize = this.getBlockSize();
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
          self.append(newBlock);
      }

    });
  });

  console.log("Map is generated.");
};

/**
* Добавляет блок в мир
*/
MapGenerator.prototype.append = function (block) {
	this.world.appendChild(block);
};

game.MapGenerator = MapGenerator;

})(game);
