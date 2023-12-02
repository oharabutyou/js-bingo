// 読み込み直後のセットアップ
$(() => {
    $("#control-button").on("click", btn_click);
    set_number_list();
});

// GETパラメータから取得
const getParams = new URLSearchParams(window.location.search);
const board_seed = getParams.get("seed");

// 音声ファイルの取得
const sound = new Audio("./sounds/ドラムロールの音.mp3");

//ビンゴマシンの数字シャッフル
const number_list = [];
const MAX_NUMBER = 75;
let bingo_counter = 0;
const set_number_list = () => {
    const rng = new Math.seedrandom(board_seed);
    const rand_list = [];
    for (let index = 0; index < MAX_NUMBER; index++) {
        rand_list.push({ index, rand: rng() });
    }
    number_list.push(
        ...rand_list
            .sort((a, b) => (a.rand > b.rand ? 1 : -1))
            .map((item) => item.index + 1)
    );
    bingo_counter = 0;
    console.log(board_seed, number_list);
};

// ボタン押下時の動作
const btn_click = () => {
    console.log("clicked!");
    const main_number = $("#main-number");
    $("#control-button").off("click", btn_click);
    sound.play();
    sound.addEventListener("ended", enable_btn);
    setTimeout(() => {
        main_number.html(number_list[bingo_counter]);
        push_number(number_list[bingo_counter], bingo_counter + 1);
        bingo_counter++;
    }, 3000);
};

const enable_btn = (event) => {
    $("#control-button").on("click", btn_click);
    console.log("sound finished!");
    sound.removeEventListener("ended", enable_btn);
};

// 履歴表示の動作
const bingo_list = ["B", "I", "N", "G", "O"];
const push_number = (num, index) => {
    const list_number = $("#history-box");
    list_number.html(
        String(index).padStart(2, "0") +
            ". " +
            String(num).padStart(2, " ") +
            " " +
            bingo_list[Math.floor(num / 15)] +
            "\n" +
            list_number.html()
    );
};
