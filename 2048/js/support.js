/**
 * Created by Lu on 2016/8/26.
 */
var documentWidth = $(window).width();
var documentHeight = $(window).height();

var width = getWidth();
function getWidth() {
    if (documentWidth <= documentHeight - $("#header").height()) {
        return documentWidth - 20;
    } else {
        return documentHeight - $("#header").height() - 20;
    }
}

var gridContainerWidth = 0.92 * width;
var cellSideLength = 0.18 * width;
var cellSpace = 0.04 * width;

function getPositionTop(i, j) {
    return cellSpace + i * (cellSpace + cellSideLength);
}

function getPositionLeft(i, j) {
    return cellSpace + j * (cellSpace + cellSideLength);
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67e5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
        default :
            return "black";
    }
}

function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65";
    } else {
        return "#f9f6f2";
    }
}

function noSpace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

function noBlockHorizontal(row, col1, col2, board) {
    for (var j = col1 + 1; j < col2; j++) {
        if (board[row][j] != 0) {
            return false;
        }
    }
    return true;
}

function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true
                }
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockVertical(row1, row2, col, board) {
    for (var i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}

function canMoveUp(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function noMove(board) {
    return !(canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board));
}