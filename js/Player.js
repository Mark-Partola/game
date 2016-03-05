;(function (game) {
  "use strict";

/**
* Класс игрока
*/
function Player (options) {
  this.size = Math.floor(options.size);
}

Player.prototype._init = function () {

};

Player.prototype.generate = function () {
  var player = document.createElement('div');
  player.classList.add('player');
  player.style.width = this.size + 'px';
  player.style.height = this.size * 2 + 'px';
  return player;
}

game.Player = Player;

})(game);
