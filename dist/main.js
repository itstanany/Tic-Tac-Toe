/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./back-end/board.js":
/*!***************************!*\
  !*** ./back-end/board.js ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 124:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MoveError = __webpack_require__(/*! ./moveError */ \"./back-end/moveError.js\");\n\nclass Board {\n  constructor() {\n    this.grid = Board.makeGrid();\n  }\n\n  isEmptyPos(pos) {\n    if (!Board.isValidPos(pos)) {\n      throw new MoveError('Is not valid position!');\n    }\n\n    return (this.grid[pos[0]][pos[1]] === null);\n  }\n\n  isOver() {\n    if (this.winner() != null) {\n      return true;\n    }\n\n    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {\n      for (let colIdx = 0; colIdx < 3; colIdx++) {\n        if (this.isEmptyPos([rowIdx, colIdx])) {\n          return false;\n        }\n      }\n    }\n\n    return true;\n  }\n\n  placeMark(pos, mark) {\n    if (!this.isEmptyPos(pos)) {\n      throw new MoveError('Is not an empty position!');\n    }\n\n    this.grid[pos[0]][pos[1]] = mark;\n  }\n\n  print() {\n    const strs = [];\n    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {\n      const marks = [];\n      for (let colIdx = 0; colIdx < 3; colIdx++) {\n        marks.push(\n          this.grid[rowIdx][colIdx] ? this.grid[rowIdx][colIdx] : \" \"\n        );\n      }\n      strs.push(`${marks.join('|')}\\n`);\n    }\n\n    console.log(strs.join('-----\\n'));\n  }\n\n  winner() {\n    const posSeqs = [\n      // horizontals\n      [[0, 0], [0, 1], [0, 2]],\n      [[1, 0], [1, 1], [1, 2]],\n      [[2, 0], [2, 1], [2, 2]],\n      // verticals\n      [[0, 0], [1, 0], [2, 0]],\n      [[0, 1], [1, 1], [2, 1]],\n      [[0, 2], [1, 2], [2, 2]],\n      // diagonals\n      [[0, 0], [1, 1], [2, 2]],\n      [[2, 0], [1, 1], [0, 2]]\n    ];\n\n    for (let i = 0; i < posSeqs.length; i++) {\n      const winner = this.winnerHelper(posSeqs[i]);\n      if (winner != null) {\n        return winner;\n      }\n    }\n\n    return null;\n  }\n\n  winnerHelper(posSeq) {\n    for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {\n      const targetMark = Board.marks[markIdx];\n      let winner = true;\n      for (let posIdx = 0; posIdx < 3; posIdx++) {\n        const pos = posSeq[posIdx];\n        const mark = this.grid[pos[0]][pos[1]];\n\n        if (mark != targetMark) {\n          winner = false;\n        }\n      }\n\n      if (winner) {\n        return targetMark;\n      }\n    }\n\n    return null;\n  }\n\n  static isValidPos(pos) {\n    return (0 <= pos[0]) &&\n      (pos[0] < 3) &&\n      (0 <= pos[1]) &&\n      (pos[1] < 3);\n  }\n\n  static makeGrid() {\n    const grid = [];\n\n    for (let i = 0; i < 3; i++) {\n      grid.push([]);\n      for (let j = 0; j < 3; j++) {\n        grid[i].push(null);\n      }\n    }\n\n    return grid;\n  }\n}\n\nBoard.marks = ['x', 'o'];\n\nmodule.exports = Board;\n\n\n//# sourceURL=webpack:///./back-end/board.js?");

/***/ }),

/***/ "./back-end/game.js":
/*!**************************!*\
  !*** ./back-end/game.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 74:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Board = __webpack_require__(/*! ./board */ \"./back-end/board.js\");\nconst MoveError = __webpack_require__(/*! ./moveError */ \"./back-end/moveError.js\");\n\nclass Game {\n  constructor() {\n    this.board = new Board();\n    this.currentPlayer = Board.marks[0];\n  }\n\n  isOver() {\n    return this.board.isOver();\n  }\n\n  playMove(pos) {\n    this.board.placeMark(pos, this.currentPlayer);\n    this.swapTurn();\n  }\n\n  promptMove(reader, callback) {\n    const game = this;\n\n    this.board.print();\n    console.log(`Current Turn: ${this.currentPlayer}`);\n\n    reader.question('Enter rowIdx: ', rowIdxStr => {\n      const rowIdx = parseInt(rowIdxStr);\n      reader.question('Enter colIdx: ', colIdxStr => {\n        const colIdx = parseInt(colIdxStr);\n        callback([rowIdx, colIdx]);\n      });\n    });\n  }\n\n  run(reader, gameCompletionCallback) {\n    this.promptMove(reader, move => {\n      try {\n        this.playMove(move);\n      } catch (e) {\n        if (e instanceof MoveError) {\n          console.log(e.msg);\n        } else {\n          throw e;\n        }\n      }\n\n      if (this.isOver()) {\n        this.board.print();\n        if (this.winner()) {\n          console.log(`${this.winner()} has won!`);\n        } else {\n          console.log('NO ONE WINS!');\n        }\n        gameCompletionCallback();\n      } else {\n        // continue loop\n        this.run(reader, gameCompletionCallback);\n      }\n    });\n  }\n\n  swapTurn() {\n    if (this.currentPlayer === Board.marks[0]) {\n      this.currentPlayer = Board.marks[1];\n    } else {\n      this.currentPlayer = Board.marks[0];\n    }\n  }\n\n  winner() {\n    return this.board.winner();\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./back-end/game.js?");

/***/ }),

/***/ "./back-end/moveError.js":
/*!*******************************!*\
  !*** ./back-end/moveError.js ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 8:0-14 */
/***/ ((module) => {

eval("\nconst MoveError = function (msg) { this.msg = msg; };\n\n// MoveError really should be a child class of the built in Error object provided\n// by Javascript, but since we haven't covered inheritance yet, we'll just\n// let it be a vanilla Object for now!\n\nmodule.exports = MoveError;\n\n\n//# sourceURL=webpack:///./back-end/moveError.js?");

/***/ }),

/***/ "./src/ttt-view.js":
/*!*************************!*\
  !*** ./src/ttt-view.js ***!
  \*************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 114:0-14 */
/***/ ((module) => {

eval("class View {\n  constructor(game, $el) {\n    // instance for backend game logic\n    this.game = game;\n    // HTML container for rendering the game\n    this.$el = $el;\n    // render the board UI\n    this.setupBoard();\n    // bind events to their handlers\n    this.bindEvents();\n  }\n\n  // prototype methods\n  // mathod for binding events for different events that oocur during the play\n  bindEvents() {\n    // make the background yellow and cursor pointer when user point to any cell\n    // and remove these effects when the user leave the cell\n    $('li').on('mouseenter', function () {\n      $(this).addClass('hoverEffect');\n    });\n\n    $('li').on('mouseleave', function () {\n      $(this).removeClass('hoverEffect');\n    });\n\n    // event delegation, fire click event when user click a cell in the grid\n    $('ul').on('click', 'li', (e) => {\n      // console.log(e.currentTarget);\n      // console.log($(e.currentTarget).data('pos'))\n      // if the click is vlid position, record the move in the backend \n      // and call UI function for rendering the move and handle other matters\n      // otherwise, in case of invalid move => ALert the user wit invalid move\n      try {\n        let $li = $(e.currentTarget);\n        let posit = $li.data('pos');\n        this.game.playMove(posit)\n        this.makeMove($li)\n      } catch {\n        alert('Invalid Move!!!')\n      }\n    })\n\n  }\n\n  makeMove($square) {\n    /**\n     * function that takes the clicked cell and print the current mark to the UI\n     * it returns nothing\n     * $square is a clicked cell -- jQuery object\n     */\n    // print either x or o\n    $square.text(this.game.currentPlayer);\n    // disable hover styling when the cell is clicked\n    $square.removeClass('hoverEffect');\n    // make the cell white backgound and black test\n    $square.addClass('player');\n    // stop hovering styling when the cell is entered again\n    $square.off('mouseenter mouseleave');\n\n    if (this.game.isOver()) {\n      /**\n       * function that handle game-finishing event, either one player is the winner or Draw\n       */\n      // make the cells unclickable\n      $('ul').off('click');\n      // remove any cell calsses so we can add class for finishing state\n      $('li').removeClass();\n      // stop hovering styling when the cell is entered again\n      $('li').off('mouseenter mouseleave');\n      // the phrase that will be displayed below the cells\n      const $endStatement = $('<h1>');\n      // if one player wins, add his mark to the finishing phrase\n      // then make cells with winner mark green background and white text\n      // and empty or cells of loser mark with white background and red text\n      if (this.game.winner() !== null) {\n        const winnerMark = this.game.currentPlayer;\n        $endStatement.text(`You Win, ${winnerMark.toUpperCase()}!`);\n        for (const cell of $('li')) {\n          // $(cell).removeClass();\n          if ($(cell).text() == winnerMark) {\n            $(cell).addClass('winner');\n          } else {\n            $(cell).addClass('loser');\n          }\n        }\n      } else {\n        // in case of finishing player because of Draw, make all cells with white ackground and red text, and make finishing statement valued Draw\n        $('li').addClass('loser')\n        $endStatement.text('It is a Draw!');\n      }\n      // print the finishing statement thar declares the winne ror Draw\n      this.$el.append($endStatement)\n    }\n  }\n\n  setupBoard() {\n    /**\n     * construct the UI of unordered list and list items as a cells,\n     * each cell contains data-pos attribute  that is array, first index is the raw and second index is the column\n     */\n\n    const $ul = $('<ul>');\n    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {\n      for (let colIdx = 0; colIdx < 3; colIdx++) {\n        const $li = $('<li>');\n        $li.data('pos', [rowIdx, colIdx]);\n        $ul.append($li)\n      };\n    };\n    this.$el.append($ul);\n  }\n}\n\nmodule.exports = View;\n\n\n//# sourceURL=webpack:///./src/ttt-view.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
eval("const View = __webpack_require__(/*! ./ttt-view */ \"./src/ttt-view.js\")// require appropriate file\nconst Game = __webpack_require__(/*! ../back-end/game */ \"./back-end/game.js\")// require appropriate file\n\n$(() => {\n  // Your code here\n  /**\n   * when the document is fully loaded,\n   * instantiate new game instances\n   * query the HTML container for the grid\n   * instantiate new View instance that handle playing\n   */\n  const game = new Game();\n  const $container = $('.ttt')\n  const view = new View(game, $container);\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");
})();

/******/ })()
;