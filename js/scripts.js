$(document).ready(function() {
  window.possible_words = [
    ["Avraam", "Tată al unei mulțimi"],
    ["Ruben", "Vedeți fiu"],
    ["Simeon", "Ascultare"],
    ["Levi", "Alipire"],
    ["Iuda", "Lăudat fie Domnul"],
    ["Dan", "A judecat"],
    ["Neftali", "Luptele lui Dumnezeu"],
    ["Gad", "Noroc"],
    ["Așer", "Fericit"],
    ["Isahar", "Răsplătire"],
    ["Zabulon", "Locuință"],
    ["Dina", "Judecată"],
    ["Iosif", "Adaos"],
    ["Israel", "Cel ce luptă cu Dumnezeu"],
  ];
  window.game_is_finished = false;
  window.hint = "";
  window.word = "";


  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }


  function get_random_definition() {
    var random_number = Math.floor(Math.random() * possible_words.length);
    var selected_word = possible_words[random_number];
    return selected_word;
  }


  function choose_word() {
    var selected_word = get_random_definition();
    window.word = selected_word[0];
    window.hint = selected_word[1];
  }


  function choose_answers() {
    var answers = [];
    answers.push([window.word, window.hint]);

    while (answers.length <= 4) {
      var new_answer = get_random_definition();

      var exists = false;
      for (var j = 0; j < answers.length; j++) {
        if (answers[j][0] == new_answer[0] || answers[j][1] == new_answer[1]) {
          exists = true;
        }
      }

      if (!exists) {
        answers.push(new_answer);
      }
    }

    var randomized_answers = shuffle(answers);
    for (var i = 0; i < randomized_answers.length; i++) {
      $("p.controls").append(
        "<a href='#' class='btn btn-warning btn-answer'>" + randomized_answers[i][0].toUpperCase() + "</a>"
      );
    }
  }


  function game_over() {
    $("p#status").text("Răspuns corect: " + window.word.toUpperCase());
    game_is_finished = true;
    $("a#next-exercise").show();
  }


  function win() {
    $("p#status").css({"background": "#2ecc71"});
    game_is_finished = true;
    $("a#next-exercise").show();
  }


  function filename(word) {
    var filenames = {
      "lazăr": "lazar"
    }
    var res = filenames[word];
    if (res == undefined) {
      return word;
    } else {
      return res;
    }
  }


  function start_game() {
    choose_word();
    choose_answers();
    $("a#next-exercise").hide();

    $("a.btn.btn-answer").on("click", function(evt) {
      evt.preventDefault();
      var answer = $(this).text();
      if (answer == window.word.toUpperCase()) {
        $(this).removeClass("btn-warning").addClass("btn-success");
        win();
      } else {
        $(this).removeClass("btn-warning").addClass("btn-danger");
      }
    });

    $("p#status").text(window.hint);
  }

  $("a#app-info-details").on("click", function(evt) {
    evt.preventDefault();
    $("div.app-info-details").toggle();
  });

  start_game();
});
