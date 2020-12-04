class View {
  constructor(game, $el) {
    // instance for backend game logic
    this.game = game;
    // HTML container for rendering the game
    this.$el = $el;
    // render the board UI
    this.setupBoard();
    // bind events to their handlers
    this.bindEvents();
  }

  // prototype methods
  // mathod for binding events for different events that oocur during the play
  bindEvents() {
    // make the background yellow and cursor pointer when user point to any cell
    // and remove these effects when the user leave the cell
    $('li').on('mouseenter', function () {
      $(this).addClass('hoverEffect');
    });

    $('li').on('mouseleave', function () {
      $(this).removeClass('hoverEffect');
    });

    // event delegation, fire click event when user click a cell in the grid
    $('ul').on('click', 'li', (e) => {
      // console.log(e.currentTarget);
      // console.log($(e.currentTarget).data('pos'))
      // if the click is vlid position, record the move in the backend 
      // and call UI function for rendering the move and handle other matters
      // otherwise, in case of invalid move => ALert the user wit invalid move
      try {
        let $li = $(e.currentTarget);
        let posit = $li.data('pos');
        this.game.playMove(posit)
        this.makeMove($li)
      } catch {
        alert('Invalid Move!!!')
      }
    })

  }

  makeMove($square) {
    /**
     * function that takes the clicked cell and print the current mark to the UI
     * it returns nothing
     * $square is a clicked cell -- jQuery object
     */
    // print either x or o
    $square.text(this.game.currentPlayer);
    // disable hover styling when the cell is clicked
    $square.removeClass('hoverEffect');
    // make the cell white backgound and black test
    $square.addClass('player');
    // stop hovering styling when the cell is entered again
    $square.off('mouseenter mouseleave');

    if (this.game.isOver()) {
      /**
       * function that handle game-finishing event, either one player is the winner or Draw
       */
      // make the cells unclickable
      $('ul').off('click');
      // remove any cell calsses so we can add class for finishing state
      $('li').removeClass();
      // stop hovering styling when the cell is entered again
      $('li').off('mouseenter mouseleave');
      // the phrase that will be displayed below the cells
      const $endStatement = $('<h1>');
      // if one player wins, add his mark to the finishing phrase
      // then make cells with winner mark green background and white text
      // and empty or cells of loser mark with white background and red text
      if (this.game.winner() !== null) {
        const winnerMark = this.game.currentPlayer;
        $endStatement.text(`You Win, ${winnerMark.toUpperCase()}!`);
        for (const cell of $('li')) {
          // $(cell).removeClass();
          if ($(cell).text() == winnerMark) {
            $(cell).addClass('winner');
          } else {
            $(cell).addClass('loser');
          }
        }
      } else {
        // in case of finishing player because of Draw, make all cells with white ackground and red text, and make finishing statement valued Draw
        $('li').addClass('loser')
        $endStatement.text('It is a Draw!');
      }
      // print the finishing statement thar declares the winne ror Draw
      this.$el.append($endStatement)
    }
  }

  setupBoard() {
    /**
     * construct the UI of unordered list and list items as a cells,
     * each cell contains data-pos attribute  that is array, first index is the raw and second index is the column
     */

    const $ul = $('<ul>');
    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      for (let colIdx = 0; colIdx < 3; colIdx++) {
        const $li = $('<li>');
        $li.data('pos', [rowIdx, colIdx]);
        $ul.append($li)
      };
    };
    this.$el.append($ul);
  }
}

module.exports = View;
