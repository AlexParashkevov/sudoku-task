// $(document).ready(function() {
export function setup() {
  for (let i = 0; i < 9; i++) {
    let $break = $("<div class='break'></div>");
    $(".board").append($break);
    for (let j = 0; j < 9; j++) {
      let $input_wrapper = $("<span></span>");
      let $input = $(
        '<input type="number" min="1" max="9" class="row' +
          i +
          " col" +
          j +
          '">'
      );
      $input_wrapper.append($input);
      $break.append($input_wrapper);
    }
    if (i >= 0 && i <= 2) {
      for (let f = 0; f < $break.children().length; f++) {
        if (f >= 0 && f <= 2) {
          const element = $break.children()[f];
          $(element).addClass("first");
        }
      }
    }
    if (i >= 0 && i <= 2) {
      for (let f = 0; f < $break.children().length; f++) {
        if (f >= 3 && f <= 5) {
          const element = $break.children()[f];
          $(element).addClass("second");
        }
      }
    }
    if (i >= 0 && i <= 2) {
      for (let f = 0; f < $break.children().length; f++) {
        if (f >= 6 && f <= 8) {
          const element = $break.children()[f];
          $(element).addClass("third");
        }
      }
    }
    // second row
    if (i >= 3 && i <= 5) {
      for (let f = 0; f < $break.children().length; f++) {
        if (f >= 0 && f <= 2) {
          const element = $break.children()[f];
          $(element).addClass("fourth");
        }
      }
    }
    if (i >= 3 && i <= 5) {
      for (let f = 0; f < $break.children().length; f++) {
        if (f >= 3 && f <= 5) {
          const element = $break.children()[f];
          $(element).addClass("fifth");
        }
      }
    }
    if (i >= 3 && i <= 5) {
      for (let f = 0; f < $break.children().length; f++) {
        if (f >= 6 && f <= 8) {
          const element = $break.children()[f];
          $(element).addClass("sixth");
        }
      }
    }
    // third row
    if (i >= 6 && i <= 8) {
      for (let f = 0; f < $break.children().length; f++) {
        if (f >= 0 && f <= 2) {
          const element = $break.children()[f];
          $(element).addClass("seventh");
        }
      }
    }
    if (i >= 6 && i <= 8) {
      for (let f = 0; f < $break.children().length; f++) {
        if (f >= 3 && f <= 5) {
          const element = $break.children()[f];
          $(element).addClass("eight");
        }
      }
    }
    if (i >= 6 && i <= 8) {
      for (let f = 0; f < $break.children().length; f++) {
        if (f >= 6 && f <= 8) {
          const element = $break.children()[f];
          $(element).addClass("nineght");
        }
      }
    }
  }
  $("input").keydown(function(e) {
    if ($(this).val().length > 0 && e.which != 8) {
      e.preventDefault();
    } else if (e.which < 41 && e.which > 36) {
      e.preventDefault();
    } else if (e.which == 69 || e.which == 190) {
      e.preventDefault();
    } else if (e.which == 9) {
      e.preventDefault();
    }
  });
}
export function reset() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      $(".row" + i + ".col" + j).val("");
    }
  }
}
export function getBoard() {
  let board = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      let n = $(".row" + i + ".col" + j).val();
      if (n === "") n = "0";
      row.push(parseInt(n));
    }
    board.push(row);
  }
  return board;
}
export function getCurrentBoard() {
  let board = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      let n = $(".row" + i + ".col" + j).val();
      if (n === "") n = "0";
      row.push(parseInt(n));
    }
    board.push(row);
  }
  return board;
}
function fill(arr) {
  arr.forEach(function(row, i) {
    row.forEach(function(s, j) {
      if (s !== 0) {
        $(".row" + i + ".col" + j).val(s);
      }
    });
  });
}
export function setBoard(board, stat, dif) {
  $(".diff").text(dif);
  $(".status").text(stat);
  fill(board);
  // console.log(board);
}

// $("body").on("focus", "input", function(e) {
//   let board = getBoard();
//   for (let i = 0; i < board.length; i++) {
//     const element = board[i];
//   }
// });
