import { disableIntital } from "./index.js";
import { getCurrentBoard, setBoard, getBoard } from "./setupBoard.js";
function random() {
  $.get("https://sugoku.herokuapp.com/board?difficulty=random")
    .done(function(data) {
      setBoard(data.board, "unsolved");
      grade(data.board);
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      disableIntital();
      console.log("loaded board difficulty random successfuly");
    });
}

function hard() {
  $.get("https://sugoku.herokuapp.com/board?difficulty=hard")
    .done(function(data) {
      setBoard(data.board, "unsolved", "hard");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      disableIntital();
      console.log("loaded board difficulty hard successfuly");
    });
}

function medium() {
  $.get("https://sugoku.herokuapp.com/board?difficulty=medium")
    .done(function(data) {
      setBoard(data.board, "unsolved", "medium");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      disableIntital();
      console.log("loaded board difficulty medium successfuly");
    });
}
// base difficulty set to easy
export function easy() {
  $.get("https://sugoku.herokuapp.com/board?difficulty=easy")
    .done(function(data) {
      // console.log(data);
      setBoard(data.board, "unsolved", "easy");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      disableIntital();
      console.log("loaded board difficulty easy successfuly");
    });
}

export var difficulty = {
  easy: easy,
  medium: medium,
  hard: hard,
  random: random,
};
export function checkSolved() {
  var board = getBoard();
  $.post("https://sugoku.herokuapp.com/solve", {
    board: JSON.stringify(board),
  })
    .done(function(data) {
      console.log(board);
      console.log(data.solution);
      function arraysEqual(a1, a2) {
        if (JSON.stringify(a1) == JSON.stringify(a2)) {
          console.log("solved");
          $("#solved").text("Congratulations Board is solved");
        } else {
          $("#solved").text("");
        }
      }
      arraysEqual(data.solution, board);
    })
    .fail(function() {
      console.log("error solve");
    })
    .always(function() {
      console.log("solve posted successfuly");
    });
}
export function solve() {
  var board = getCurrentBoard();
  $.post("https://sugoku.herokuapp.com/solve", {
    board: JSON.stringify(board),
  })
    .done(function(data) {
      setBoard(data.solution, data.status, data.difficulty);
    })
    .fail(function() {
      console.log("error solve");
    })
    .always(function() {
      console.log("solve posted successfuly");
    });
}

export function grade(board) {
  board = board || getBoard();
  $.post("https://sugoku.herokuapp.com/grade", {
    board: JSON.stringify(board),
  })
    .done(function(data) {
      $(".diff").text(data.difficulty);
    })
    .fail(function() {
      console.log("error grade");
    })
    .always(function() {
      console.log("grade posted successfuly");
    });
}

export function validate(board) {
  board = board || getBoard();
  // console.log(board);
  $.post("https://sugoku.herokuapp.com/validate", {
    board: JSON.stringify(board),
  })
    .done(function(data) {
      $(".status").text(data.status);
    })
    .fail(function() {
      console.log("error validation");
    })
    .always(function() {
      console.log("validate posted successfuly");
    });
}
