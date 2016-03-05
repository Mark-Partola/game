;(function (game) {
  "use strict";

  function Block (options) {
  	this.startPosition = options.startPosition || 0;
    this.size = Math.floor(options.size);
    this.xPos = this.size * Math.floor(options.xPos);
    this.yPos = this.startPosition + (options.size * options.yPos);
    this.type = options.type;
  }

  Block.prototype.create = function () {
    if (this.type === 0) return;
  	var block = document.createElement('div');
    var size;

    block.classList.add('block');
    block.style.top = Math.floor(this.yPos) + 'px';
    block.style.left = this.xPos + 'px';
    block.style.width = Math.floor(this.size) + 'px';
    block.style.height = Math.floor(this.size) + 'px';

    if (this.type) {
      size = Math.round(parseInt(this.size));
      if (this.type === 1) {
        block.classList.add('block--floor');
        block.style.backgroundPosition = -size + 'px 0px';
      } else if (this.type ===2) {
        block.classList.add('block--box');
        block.style.backgroundPosition = -size + 'px '
          + -size + 'px';
      }
      block.style.backgroundSize = (size * 2) + 'px';
    }

    return block;
  };

  game.Block = Block;

})(game);
