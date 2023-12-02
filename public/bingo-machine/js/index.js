$(() => {
    $("#history-box").html("01.  1 B\n02.  2 B");
    $("#control-button").click(btn_click);
});

const btn_click = () => {
    const main_number = $("#main-number");
    main_number.html(parseInt(main_number.html()) + 1);
    push_number(1, 1);
};

const push_number = (num, index) => {
    const list_number = $("#history-box");
    list_number.html(
        list_number.html() +
            "\n" +
            String(index).padStart(2, "0") +
            ". " +
            String(num).padStart(2, " ") +
            " " +
            select_char(num)
    );
};

const select_char = (num) => {
    switch (Math.floor(num / 15)) {
        case 0:
            return "B";
        case 1:
            return "I";
        case 2:
            return "N";
        case 3:
            return "G";
        case 4:
            return "O";
    }
};
