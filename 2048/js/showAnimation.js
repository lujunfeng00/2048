/**
 * Created by Lu on 2016/8/26.
 */
function showNumberWithAnimation(i, j, number) {
    var numberCell = $('#number-cell-' + i + '-' + j);

    numberCell.css('background-color', getNumberBackgroundColor(number));
    numberCell.css('color', getNumberColor(number));
    numberCell.text(number);
    numberCell.css("font-size", 0.6 * cellSideLength + "px");


    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPositionTop(i, j),
        left: getPositionLeft(i, j)
    }, 50)
}

function showMoveAnimation(fromX, fromY, toX, toY) {
    var numberCell = $('#number-cell-' + fromX + '-' + fromY);
    numberCell.animate({
        top: getPositionTop(toX, toY),
        left: getPositionLeft(toX, toY)
    }, 200);
}

function updateScore(score) {
    $("#score").text(score);
}
