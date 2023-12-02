// 読み込み直後のセットアップ
$(() => {
    $("#control-button").on("click", btn_click);
    set_number_list();
    // for (let index = 0; index < MAX_NUMBER; index++) {
    //     console.log(index, bingo_list[Math.floor(index / 15)]);
    // }
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
    $("#control-button").removeClass("btn-primary");
    $("#control-button").addClass("btn-secondary");
    sound.play();
    sound.addEventListener("ended", enable_btn);
    const interval = setInterval(() => {
        main_number.html(Math.ceil(Math.random() * MAX_NUMBER));
    }, 20);
    setTimeout(() => {
        main_number.html(number_list[bingo_counter]);
        push_number(number_list[bingo_counter], bingo_counter + 1);
        bingo_counter++;
        clearInterval(interval);
    }, 3000);
};

// 音声終了時にボタンを有効化する
const enable_btn = (event) => {
    $("#control-button").on("click", btn_click);
    console.log("sound finished!");
    sound.removeEventListener("ended", enable_btn);
    $("#control-button").removeClass("btn-secondary");
    $("#control-button").addClass("btn-primary");
};

// 履歴表示の動作
const bingo_list = ["B", "I", "N", "G", "O"];
const push_number = (num, index) => {
    const list_number = $("#history-box");
    list_number.html(
        // String(index).padStart(2, "0") +
        //     ". " +
        String(num).padStart(2, " ") +
            " " +
            bingo_list[Math.floor((num - 1) / 15)] +
            (list_number.html() === "" ? "" : "\n") +
            list_number.html()
    );
};
