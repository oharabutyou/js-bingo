const BOARD_SIZE = 5;
const MAX_NUMBER = 75;

// GETパラメータから取得
const getParams = new URLSearchParams(window.location.search)
const board_seed = getParams.get("seed");

// UI要素
const $seed_display = $(".board-seed").html(board_seed);
const $container = $(".container");
const $row = $("<div class='row'></div>");
const $col = $("<div class='col text-center'></div>");

// 乱数生成器(ライブラリ使用)
const rng = new Math.seedrandom(board_seed);

let usedNumArray = [];

for (let r = 0; r < BOARD_SIZE; ++r) {
    let $temp_row = $row.clone();
    for (let c = 0; c < BOARD_SIZE; ++c) {
        let $temp_col = $col.clone();
        let value = 0;
        
        usedNumArray.push(value);
        $temp_row.append($temp_col);

        do {
            value = Math.trunc(rng() * MAX_NUMBER + 1)
        } while (usedNumArray.length > 0 && usedNumArray.includes(value));
        
        if (r == Math.trunc(BOARD_SIZE / 2) && c == Math.trunc(BOARD_SIZE / 2)) {
            $temp_col.html("👍");
            continue;
        }
        else {
            $temp_col.html(value.toString());
        }
    }
    $container.append($temp_row);
}



