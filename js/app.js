var worldElem =  document.querySelector('.world');
var mapGenerator = new game.MapGenerator(worldElem, game.Map.stage1);
mapGenerator.generate();
