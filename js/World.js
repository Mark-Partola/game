;(function (game) {
  "use strict";

/**
* Мир
*/
function World () {
  this.world =  document.querySelector('.world');

  this._init();
}

World.prototype._init = function () {
  this.map = new game.MapGenerator(this.world, game.Map.stage1);
  this.map.generate();
};

World.prototype.startLive = function () {
  
};

World.prototype.addItem = function (item) {
  this.map.append(item);
};

World.prototype.getBlockSize = function () {
  return this.map.getBlockSize();
};

game.World = World;

})(game);
