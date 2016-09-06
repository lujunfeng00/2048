/**
 * Created by Lu on 2016/8/26.
 */
var board = [];
var score = 0;
var hasConflicted = [];

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

$(document).ready(function () {
    prepareForMobile();
    newGame();
});

function prepareForMobile() {
    // if (documentWidth > 500) {
    //     gridContainerWidth = 500;
    //     cellSpace = 20;
    //     cellSideLength = 100;
    // }

    $("#grid-container").css("width", gridContainerWidth - 2 * cellSpace);
    $("#grid-container").css("height", gridContainerWidth - 2 * cellSpace);
    $("#grid-container").css("padding", cellSpace);
    $("#grid-container").css("border-radius", 0.02 * gridContainerWidth);

    $(".grid-cell").css("width", cellSideLength);
    $(".grid-cell").css("height", cellSideLength);
    $(".grid-cell").css("border-radius", 0.02 * cellSideLength);

}

function newGame() {
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            //获得小格子
            var gridCell = $("#grid-cell-" + i + "-" + j);
            //计算小格子top值和left值
            gridCell.css('top', getPositionTop(i, j));
            gridCell.css('left', getPositionLeft(i, j));
        }
    }

    for (i = 0; i < 4; i++) {
        board[i] = [];
        hasConflicted[i] = [];
        for (j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();

    score = 0;
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPositionTop(i, j) + cellSideLength / 2);
                theNumberCell.css('left', getPositionLeft(i, j) + cellSideLength / 2);
            } else {
                theNumberCell.css('width', cellSideLength);
                theNumberCell.css('height', cellSideLength);
                theNumberCell.css('top', getPositionTop(i, j));
                theNumberCell.css('left', getPositionLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);

                if (board[i][j] < 100) {
                    theNumberCell.css("font-size", 0.6 * cellSideLength + "px");
                } else if (board[i][j] < 1000) {
                    theNumberCell.css("font-size", 0.5 * cellSideLength + "px");
                } else if (board[i][j] < 10000) {
                    theNumberCell.css("font-size", 0.4 * cellSideLength + "px");
                } else {
                    theNumberCell.css("font-size", 0.3 * cellSideLength + "px");
                }
            }

            hasConflicted[i][j] = false;
        }
    }

    $(".number-cell").css("line-height", cellSideLength + "px");
}

function generateOneNumber() {
    if (noSpace(board)) {
        return false;
    }

    //随机一个位置
    var randomX = parseInt(Math.floor(Math.random() * 4));
    var randomY = parseInt(Math.floor(Math.random() * 4));

    var time = 0;
    while (time < 50) {
        if (board[randomX][randomY] == 0) {
            break;
        }

        randomX = parseInt(Math.floor(Math.random() * 4));
        randomY = parseInt(Math.floor(Math.random() * 4));

        time++;
    }
    if (time == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randomX = i;
                    randomY = j;
                }
            }
        }
    }

    //随机一个数字
    var randomNumber = Math.random() < 0.8 ? 2 : 4;
    //在随机位置显示随机数
    board[randomX][randomY] = randomNumber;
    showNumberWithAnimation(randomX, randomY, randomNumber);

    return true;
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37:    //left
            event.preventDefault();
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 38:    //up
            event.preventDefault();
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 39:    //right
            event.preventDefault();
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 40:    //down
            event.preventDefault();
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        default:
            break;
    }
});

document.addEventListener("touchstart", function (event) {
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});

document.addEventListener("touchmove", function (event) {
    event.preventDefault();
});

document.addEventListener("touchend", function (event) {
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    var deltaX = endX - startX;
    var deltaY = endY - startY;

    if (Math.abs(deltaX) < 0.05 * documentWidth && Math.abs(deltaY) < 0.05 * documentWidth) {
        return;
    }

    if (Math.abs(deltaX) >= Math.abs(deltaY)) {    //x
        if (deltaX > 0) {
            //move right
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        } else if (deltaX < 0) {
            //move left
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        }
    } else {     //y
        if (deltaY > 0) {
            //move down
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        } else if (deltaY < 0) {
            //move up
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        }
    }
});

function isGameOver() {
    if (noSpace(board) && noMove(board)) {
        gameOver();
    }
}

function gameOver() {
    alert("Game Over!");
}

function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }

    //moveLeft
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }

    //moveRight
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }

    //moveUp
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(k, i, j, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(k, i, j, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        break;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }

    //moveDown
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(i, k, j, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        break;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}