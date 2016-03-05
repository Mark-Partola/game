var world = new game.World();

var player = new game.Player({
  size: world.getBlockSize()
}).generate();

world.startLive();

world.addItem(player);
