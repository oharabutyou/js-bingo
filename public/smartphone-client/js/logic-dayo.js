const BOARD_SIZE = 5;
const MAX_NUMBER = 75;
const ROW_MAX_NUMBER = 15;
const LONGPRESS_SECONDS = 1;

// GETパラメータから取得
const getParams = new URLSearchParams(window.location.search)
const board_seed = getParams.get("seed");

// UI要素
const $seed_display = $(".board-seed").html(board_seed);
const $container = $(".container");
const $row = $("<div class='row'></div>");
const $col = $("<div class='col text-center border'></div>");
const highlightClass = "bg-dark text-white";

// 乱数生成器(ライブラリ使用)
const rng = new Math.seedrandom(board_seed);

let usedNumArray = [];
let pressTimer = undefined;

function findCell(row, col) {
    return $container
        .find(".row")
        .eq(row)
        .find(".col")
        .eq(col);
}

// function nodeClickHandler(event) {
//     $eventCell = findCell(event.data.row, event.data.col);
//     console.log($eventCell);

//     $eventCell.addClass(highlightClass);
// }
function nodeClickHandler(row, col) {
    $eventCell = findCell(row, col);
    console.log($eventCell);
    $eventCell.addClass(highlightClass);
}
function nodeLongPressHandler(row, col) {
    $eventCell = findCell(row, col);
    console.log(`long press on ${row}, ${col}`);
    $eventCell.removeClass(highlightClass);
}

for (let r = 0; r < BOARD_SIZE; ++r) {
    let $temp_row = $row.clone();
    $container.append($temp_row);

    for (let c = 0; c < BOARD_SIZE; ++c) {
        let $temp_col = $col.clone();
        let value = 0;
        let bgHighlightTarget = (r % 2 == 0) ? 0 : 1;
        
        $temp_col
            // .on("click", { row: r, col: c }, nodeClickHandler)
            .on("mousedown touchstart", function (event) {
                event.preventDefault();
                nodeClickHandler(r, c);
                pressTimer = setTimeout(nodeLongPressHandler, LONGPRESS_SECONDS * 1000, r, c);
            })
            .on("mouseup mouseleave touchend touchmove", function (event) {
                event.preventDefault();
                clearTimeout(pressTimer);
                console.log("event cleared");
            });
        $temp_row.append($temp_col);

        // 奇数業と偶数行
        if (c % 2 == bgHighlightTarget) {
            $temp_col.addClass('bg-light');
        }

        do {
            value = Math.trunc(rng() * (ROW_MAX_NUMBER * (r+1) - ROW_MAX_NUMBER * (r)) + 1 + (ROW_MAX_NUMBER * r))
        } while (usedNumArray.length > 0 && usedNumArray.includes(value));
        
        if (r == Math.trunc(BOARD_SIZE / 2) && c == Math.trunc(BOARD_SIZE / 2)) {
            $temp_col.html("🆓");
            continue;
        }
        else {
            $temp_col.html(value.toString());
        }
        usedNumArray.push(value);
    }
}



