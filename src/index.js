module.exports = function solveSudoku(matrix) {
    // your solution
    solve(matrix);
    return matrix;
}

function solve(matrix) {

    if ( noZeros(matrix) ) return true;

    let x = 0;
    let y = 0;
    let minLen = 9;
    let len = 0;
    let options = [];

    for ( let i = 0; i < 9; i++ ) {
        for ( let j=0; j <9; j++ ) {
            if ( matrix[i][j] == 0 ) {
                options = getOptions( matrix, i, j );
                if ( options === false ) return false;
                len = options.length;
                if ( len < minLen ) {
                    minLen = len;
                    x = i;
                    y = j;
                }
            }
        }
    }

    options = getOptions(matrix, x, y);

    for ( let k = 0; k < options.length; k++) {
        matrix[x][y] = options[k];
        if (solve(matrix)) return true;
        matrix[x][y] = 0;
    }
    return false;
}

function getOptions(matrix, row, col) {

    const lStart = Math.floor(row/3)*3;
    const mStart = Math.floor(col/3)*3;
    let guess = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for ( let k = 0; k < 9; k++ ) {
        if ( matrix[row][k] > 0 ) {
            if ( guess.indexOf(matrix[row][k]) !== -1 ) {
                guess.splice(guess.indexOf(matrix[row][k]), 1);
                if ( guess.length == 0 ) return false;
            }
        }
    }

    for ( let k = 0; k < 9; k++ ) {
        if ( matrix[k][col] > 0 ) {
            if ( guess.indexOf(matrix[k][col]) !== -1 ) {
                guess.splice(guess.indexOf(matrix[k][col]), 1);
                if ( guess.length == 0 ) return false;
            }
        }
    }

    for (let l = lStart; l < lStart+3; l++) {
        for (let m = mStart; m < mStart+3; m++){
            if (matrix[l][m] > 0) {
                if (guess.indexOf(matrix[l][m]) !== -1) {
                    guess.splice(guess.indexOf(matrix[l][m]), 1);
                    if (guess.length == 0) return false;
                }
            }
        }
    }
    return guess;
}

function noZeros(matrix){

    for ( let l = 0; l < 9; l++) {
        for ( let m = 0; m < 9; m++) {
            if ( matrix[l][m] === 0 ) return false;
        }
    }
    return true;
}