let cards = document.querySelectorAll(".card");
let wrong_tries = document.querySelector(".scoreboard .wrong-tries .count");

let start = document.querySelector(".start-game span ");
// Start game

start.onclick = function (e) {
  document.querySelector(".start-game").remove();
  get_name();
};

randome_ordering();

flipping_cards();

let selected = [];

function flipping_cards() {
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // If The Card Doesn't Matched Compare
      if (
        !card.classList.contains("matched") &&
        !card.classList.contains("flipped")
      ) {
        // Select Elements If Less Than 2
        if (selected.length < 2) {
          card.classList.add("flipped");
          selected.push(card);
        }
        // If Two Elements Selected
        if (selected.length === 2) {
          // Get Source Images
          let src_1 = selected[0].children[1].children[0].src;
          let src_2 = selected[1].children[1].children[0].src;

          // Compare Two Sources
          if (src_1 === src_2) {
            selected[0].classList.add("matched");
            selected[1].classList.add("matched");

            // Success Effect
            document.querySelector(".right-answer").pause();
            document.querySelector(".right-answer").currentTime = 0;
            document.querySelector(".right-answer").play();

            // Check Success
            check_success(false);
          } else {
            wrong_tries.textContent++;
          }
          setTimeout(() => {
            if (selected[0] !== undefined && selected[1] !== undefined) {
              // Remove Flipped Class And Empty Selected Arr
              selected[0].classList.remove("flipped");
              selected[1].classList.remove("flipped");
              selected = [];
            }
          }, 400);
        }
      }
    });
  });
}

function randome_ordering() {
  let arr = [];
  arr.length = cards.length;
  for (let i = 0; i < arr.length; i++) {
    arr[i] = i;
  }
  let j = 0,
    tmp;
  while (j < cards.length) {
    tmp = Math.floor(Math.random() * arr.length);
    cards[j].style.order = tmp;
    j++;
  }
}

function get_name() {
  let name = document.querySelector(".name");
  let player = prompt("Enter Your Name");
  document.querySelector(".scoreboard .name").textContent = player || "Unkowon";
  // Show Cards Temporaliy
  cards.forEach((card) => card.classList.add("flipped"));
  setTimeout(() => {
    cards.forEach((card) => card.classList.remove("flipped"));
  }, 1200);

  time_counter();
}

var game_time;
let spn_s = document.querySelector("span.sec");
let spn_m = document.querySelector("span.min");
let sec = 0;
let min = 10;
spn_m.textContent = min;
spn_s.textContent = sec;
spn_s.textContent = "00";
// Start Time
function time_counter() {
  game_time = setInterval(() => {
    if (min >= 0 && sec > 0) {
      sec--;
      if (sec >= 10) spn_s.textContent = sec;
      else spn_s.textContent = `0${sec}`;
    } else if (min > 0 && sec === 0) {
      min--;
      sec = 59;
      if (min >= 10) spn_m.textContent = min;
      else spn_m.textContent = `0${min}`;
      spn_s.textContent = sec;
    } else if (min === 0 && sec === 0) {
      check_success(true);
    }
  }, 1000);
}

// Check if success
function check_success(is_setTime) {
  let succ_counter = 0;
  // Is Time Ended
  if (is_setTime) {
    clearInterval(game_time);
    success(false);
  }
  cards.forEach((c) => {
    if (c.classList.contains("matched")) succ_counter++;
  });
  if (succ_counter === cards.length) {
    success(true);
    clearInterval(game_time);
  }
}

// Create Success page
function success(success) {
  let div = document.createElement("div");
  let span = document.createElement("span");
  let text;
  // Check If Success Or Fail
  if (success) {
    text = document.createTextNode("Game Success");
    div.classList.add("success");
  } else {
    text = document.createTextNode("Game Over");
    div.classList.add("fail");
    document.querySelector(".time-end").play();
  }
  // Insert Div
  span.appendChild(text);
  div.appendChild(span);
  document.body.appendChild(div);
  setTimeout(() => {
    div.style = `width: 100%; height: 100%;`;
  }, 100);
}
