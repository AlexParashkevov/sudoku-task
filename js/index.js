import { setup } from "./setupBoard.js";
import { solve } from "./api.js";
import { checkSolved } from "./api.js";
import { reset } from "./setupBoard.js";
import { setBoard } from "./setupBoard.js";
import { validate } from "./api.js";
import { easy } from "./api.js";
import { grade } from "./api.js";
import { getBoard } from "./setupBoard.js";
import { difficulty } from "./api.js";
$(function() {
  setup();
  easy();
  // getSolvedBoard();
  $(".clear").click(function() {
    reset();
  });
  $(".solve").click(function() {
    solve();
  });
  $(".validate").click(function() {
    validate();
  });
  $(".grade").click(function() {
    grade();
  });
  function insideLogic() {
    $("body").on("focus", "input", function(e) {
      var elems = document.querySelectorAll("INPUT");
      [].forEach.call(elems, function(el) {
        el.classList.remove("activeCol");
        el.classList.remove("activeRow");
        el.classList.remove("activeBox");
      });
      let currentClasses = $(this).attr("class");
      let threeByThree = $(this)
        .parent()
        .attr("class");
      let colAndRows = currentClasses.split(" ");
      let columns = colAndRows[1];
      let rows = colAndRows[0];
      $("." + columns).addClass("activeCol");
      $("." + rows).addClass("activeRow");
      $("." + threeByThree)
        .children()
        .addClass("activeBox");
      function checkRowNumber() {
        $(".activeBox").change(function(e) {
          // let userValue = this.value;
          // console.log("user", userValue);
          for (let i = 0; i < $(".activeRow").length; i++) {
            const element = $(".activeRow")[i];
            if (e.target.value != "" && e.target.value === element.value) {
              // console.log("mistake");
              $(element).addClass("mistake");
            } else if (e.target.value !== null && e.target.value === "") {
              $(element).removeClass("mistake");
            } else {
              $(element).removeClass("mistake");
            }
          }
          // final check
          if ($(".mistake").length < 2) {
            $(".activeRow").removeClass("mistake");
          }
        });
      }
      function checkColumnNumber() {
        $(".activeBox").change(function(e) {
          // let userValue = this.value;
          // console.log("user", userValue);
          for (let i = 0; i < $(".activeCol").length; i++) {
            const element = $(".activeCol")[i];
            if (e.target.value != "" && e.target.value === element.value) {
              // console.log("mistake");
              $(element).addClass("mistake");
            } else if (e.target.value !== null && e.target.value === "") {
              $(element).removeClass("mistake");
            } else {
              $(element).removeClass("mistake");
            }
          }
          // final check
          if ($(".mistake").length < 2) {
            $(".activeCol").removeClass("mistake");
          }
        });
      }
      function checkBoxNumber() {
        $(".activeBox").change(function(e) {
          for (let i = 0; i < $(".activeBox").length; i++) {
            const element = $(".activeBox")[i];
            if (e.target.value != "" && e.target.value === element.value) {
              // console.log("mistake");
              $(element).addClass("mistake");
            } else if (e.target.value !== null && e.target.value === "") {
              $(element).removeClass("mistake");
            } else {
              $(element).removeClass("mistake");
            }
          }
          // final check
          if ($(".mistake").length < 2) {
            $(".activeBox").removeClass("mistake");
          }
        });
      }
      function checkIfSolved() {
        let filled = false;
        var elems = document.querySelectorAll("INPUT");
        for (let i = 0; i < elems.length; i++) {
          const element = elems[i];
          if (element.value === "") {
            filled = false;
            $("#solved").text("");
            break;
          } else {
            filled = true;
          }
        }
        if (filled) {
          checkSolved();
        }
      }
      checkRowNumber();
      checkColumnNumber();
      checkBoxNumber();
      checkIfSolved();
    });
  }
  insideLogic();
});
export function disableIntital() {
  var elems = document.querySelectorAll("INPUT");
  for (let i = 0; i < elems.length; i++) {
    const element = elems[i];
    if (!element.value) {
      element.disabled = false;
    } else {
      element.disabled = true;
    }
  }
}
