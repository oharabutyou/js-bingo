const BOARD_SIZE = 5;

const $container = $(".container");
const $row = $("<div class='row'></div>");
const $col = $("<div class='col text-center'>c</div>");

let usedNumArray = [];

for (let r = 0; r < BOARD_SIZE; ++r) {
    let $temp_row = $row.clone();
    for (let c = 0; c < BOARD_SIZE; ++c) {
        $temp_row.append($col.clone());
    }
    $container.append($temp_row);
}



