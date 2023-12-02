const BOARD_SIZE = 5;
const MAX_NUMBER = 75;

let board_seed = "わーお。";

const $seed_display = $(".board-seed").html(board_seed);
const $container = $(".container");
const $row = $("<div class='row'></div>");
const $col = $("<div class='col text-center'></div>");

const rng = new Math.seedrandom(board_seed);

let usedNumArray = [];

for (let r = 0; r < BOARD_SIZE; ++r) {
    let $temp_row = $row.clone();
    for (let c = 0; c < BOARD_SIZE; ++c) {
        let $temp_col = $col.clone();
        $temp_col.html(Math.trunc(rng() * MAX_NUMBER + 1).toString());
        $temp_row.append($temp_col);
    }
    $container.append($temp_row);
}



