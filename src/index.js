const View = require("./ttt-view")// require appropriate file
const Game = require("../back-end/game")// require appropriate file

$(() => {
  // Your code here
  /**
   * when the document is fully loaded,
   * instantiate new game instances
   * query the HTML container for the grid
   * instantiate new View instance that handle playing
   */
  const game = new Game();
  const $container = $('.ttt')
  const view = new View(game, $container);
});
