//Piece movement
function possibleMoves(piece) {
  let possible = [];
  if (piece.piece == "pawn" && currentflip != piece.color) {
    // POSSIBLE MOVES
    possible = [
      { row: piece.row + 1, column: piece.column },
      { row: piece.row + 2, column: piece.column },
      //MAKE IT SO THE FOLLOWING MOVES ARE ONLY POSSIBLE IF ENEMY PIECES ARE DETECTED
    ];
    for (i = 0; i < pieces.length; i++) {
      //MOVE ONE SQUARE
      if (pieces[i].column == piece.column && pieces[i].row == piece.row + 1) {
        for (q = 0; q < possible.length; q++) {
          if (
            possible[q].column == piece.column &&
            possible[q].row == piece.row + 1
          ) {
            possible.splice(q, 1);
          } else if (
            possible[q].column == piece.column &&
            possible[q].row == piece.row + 2
          ) {
            possible.splice(q, 1);
          }
        } //MOVE TWO SQUARES
      } else if (
        (pieces[i].column == piece.column && pieces[i].row == piece.row + 2) ||
        piece.moved == true
      ) {
        for (q = 0; q < possible.length; q++) {
          if (
            possible[q].column == piece.column &&
            possible[q].row == piece.row + 2
          ) {
            possible.splice(q, 1);
          }
        }
      }
      if (
        pieces[i].column == piece.column - 1 &&
        pieces[i].row == piece.row + 1
      ) {
        if (pieces[i].color != piece.color) {
          possible.push({ row: piece.row + 1, column: piece.column - 1 });
        }
      } else if (
        pieces[i].column == piece.column + 1 &&
        pieces[i].row == piece.row + 1
      ) {
        if (pieces[i].color != piece.color) {
          possible.push({ row: piece.row + 1, column: piece.column + 1 });
        }
      }
    }
  } else if (piece.piece == "pawn" && currentflip == piece.color) {
    // POSSIBLE MOVES
    possible = [
      { row: piece.row - 1, column: piece.column },
      { row: piece.row - 2, column: piece.column },
      //MAKE IT SO THE FOLLOWING MOVES ARE ONLY POSSIBLE IF ENEMY PIECES ARE DETECTED
    ];
    for (i = 0; i < pieces.length; i++) {
      //MOVE ONE SQUARE
      if (pieces[i].column == piece.column && pieces[i].row == piece.row - 1) {
        for (q = 0; q < possible.length; q++) {
          if (
            possible[q].column == piece.column &&
            possible[q].row == piece.row - 1
          ) {
            possible.splice(q, 1);
          } else if (
            possible[q].column == piece.column &&
            possible[q].row == piece.row - 2
          ) {
            possible.splice(q, 1);
          }
        } //MOVE TWO SQUARES
      } else if (
        (pieces[i].column == piece.column && pieces[i].row == piece.row - 2) ||
        piece.moved == true
      ) {
        for (q = 0; q < possible.length; q++) {
          if (
            possible[q].column == piece.column &&
            possible[q].row == piece.row - 2
          ) {
            possible.splice(q, 1);
          }
        }
      }
      if (
        pieces[i].column == piece.column - 1 &&
        pieces[i].row == piece.row - 1
      ) {
        if (pieces[i].color != piece.color) {
          possible.push({ row: piece.row - 1, column: piece.column - 1 });
        }
      } else if (
        pieces[i].column == piece.column + 1 &&
        pieces[i].row == piece.row - 1
      ) {
        if (pieces[i].color != piece.color) {
          possible.push({ row: piece.row - 1, column: piece.column + 1 });
        }
      }
    }
  } else if (piece.piece == "queen") {
    //queen
    possible = [];
    //possible moves array
    let hit = false;
    let addcounter = 1;
    //moving up
    while (hit == false) {
      //for each square going up, check if a piece is there and whether is the piece is same color
      for (j = 0; j < pieces.length; j++) {
        if (
          (pieces[j].column == piece.column &&
            pieces[j].row == piece.row + addcounter) ||
          piece.row - addcounter > 7
        ) {
          if (pieces[j].color != piece.color) {
            //push move to moves array if piece is enemy
            possible.push({
              row: piece.row + addcounter,
              column: piece.column,
            });
          }
          //piece is detected and while loop will end
          hit = true;
        }
      }
      if (hit == true || addcounter > 7) {
        break;
      }
      //push move to moves array if no piece is detected
      possible.push({ row: piece.row + addcounter, column: piece.column });
      addcounter++;
      console.log(addcounter);
    }
    hit = false;
    addcounter = 1;
    //moving down
    while (hit == false) {
      for (j = 0; j < pieces.length; j++) {
        if (
          piece.row - addcounter < 0 ||
          (pieces[j].column == piece.column &&
            pieces[j].row == piece.row - addcounter)
        ) {
          if (pieces[j].color != piece.color) {
            possible.push({
              row: piece.row - addcounter,
              column: piece.column,
            });
          }
          hit = true;
        }
      }
      if (hit == true || addcounter > 7) {
        break;
      }
      possible.push({ row: piece.row - addcounter, column: piece.column });
      addcounter++;
    }
    hit = false;
    addcounter = 1;
    //moving right
    while (hit == false) {
      for (j = 0; j < pieces.length; j++) {
        if (
          (pieces[j].row == piece.row &&
            pieces[j].column == piece.column + addcounter) ||
          piece.column + addcounter > 7
        ) {
          hit = true;
          if (pieces[j].color != piece.color) {
            possible.push({
              row: piece.row,
              column: piece.column + addcounter,
            });
          }
        }
      }
      if (hit == true || addcounter > 7) {
        break;
      }
      possible.push({ row: piece.row, column: piece.column + addcounter });
      addcounter++;
    }
    hit = false;
    addcounter = 1;
    //moving left
    while (hit == false) {
      for (j = 0; j < pieces.length; j++) {
        if (
          (pieces[j].row == piece.row &&
            pieces[j].column == piece.column - addcounter) ||
          piece.column - addcounter < 0
        ) {
          hit = true;
          if (pieces[j].color != piece.color) {
            possible.push({
              row: piece.row,
              column: piece.column - addcounter,
            });
          }
        }
      }
      if (hit == true || addcounter > 7) {
        break;
      }
      possible.push({ row: piece.row, column: piece.column - addcounter });
      addcounter++;
    }
    hit = false;
    addcounter = 1;
    //diagonally upwards to the right
    while (hit == false) {
      for (j = 0; j < pieces.length; j++) {
        if (
          (pieces[j].row == piece.row + addcounter &&
            pieces[j].column == piece.column + addcounter) ||
          piece.column - addcounter > 7 ||
          piece.row - addcounter > 7
        ) {
          hit = true;
          if (pieces[j].color != piece.color) {
            possible.push({
              row: piece.row + addcounter,
              column: piece.column + addcounter,
            });
          }
        }
      }
      if (hit == true || addcounter > 7) {
        break;
      }
      possible.push({
        row: piece.row + addcounter,
        column: piece.column + addcounter,
      });
      addcounter++;
    }
    hit = false;
    addcounter = 1;
    //downwards to the left
    while (hit == false) {
      for (j = 0; j < pieces.length; j++) {
        if (
          (pieces[j].row == piece.row - addcounter &&
            pieces[j].column == piece.column - addcounter) ||
          piece.column - addcounter < 0 ||
          piece.row - addcounter < 0
        ) {
          hit = true;
          if (pieces[j].color != piece.color) {
            possible.push({
              row: piece.row - addcounter,
              column: piece.column - addcounter,
            });
          }
        }
      }
      if (hit == true || addcounter > 7) {
        break;
      }
      possible.push({
        row: piece.row - addcounter,
        column: piece.column - addcounter,
      });
      addcounter++;
    }
    hit = false;
    addcounter = 1;
    //upwards to the right
    while (hit == false) {
      for (j = 0; j < pieces.length; j++) {
        if (
          (pieces[j].row == piece.row + addcounter &&
            pieces[j].column == piece.column - addcounter) ||
          piece.column - addcounter < 0 ||
          piece.row - addcounter > 7
        ) {
          hit = true;
          if (pieces[j].color != piece.color) {
            possible.push({
              row: piece.row + addcounter,
              column: piece.column - addcounter,
            });
          }
        }
      }
      if (hit == true || addcounter > 7) {
        break;
      }
      possible.push({
        row: piece.row + addcounter,
        column: piece.column - addcounter,
      });
      addcounter++;
    }
    hit = false;
    addcounter = 1;
    //downwards to the right
    while (hit == false) {
      for (j = 0; j < pieces.length; j++) {
        if (
          (pieces[j].row == piece.row - addcounter &&
            pieces[j].column == piece.column + addcounter) ||
          piece.row - addcounter < 0 ||
          piece.column - addcounter > 7
        ) {
          hit = true;
          if (pieces[j].color != piece.color) {
            possible.push({
              row: piece.row - addcounter,
              column: piece.column + addcounter,
            });
          }
        }
      }
      if (hit == true || addcounter > 7) {
        break;
      }
      possible.push({
        row: piece.row - addcounter,
        column: piece.column + addcounter,
      });
      addcounter++;
    }
  } else if (piece.piece == "rook") {
    //moving rook
    possible = [];
    let hit = false;
    let addcounter = 1;
    //identical code to queen movement sans diagonals
    while (hit == false) {
      for (j = 0; j < pieces.length; j++) {
        if (
          (pieces[j].column == piece.column &&
            pieces[j].row == piece.row + addcounter) ||
          piece.row + addcounter > 7
        ) {
          if (pieces[j].color != piece.color) {
            possible.push({
              row: piece.row + addcounter,
              column: piece.column,
            });
          }
          hit = true;
        }
      }
      if (hit == true || addcounter > 7) {
        break;
      }
      possible.push({ row: piece.row + addcounter, column: piece.column });
      addcounter++;
    }
    hit = false;
    addcounter = 1;
    while (hit == false) {
      for (j = 0; j < pieces.length; j++) {
        if (
          piece.row - addcounter < 0 ||
          (pieces[j].column == piece.column &&
            pieces[j].row == piece.row - addcounter)
        ) {
          if (pieces[j].color != piece.color) {
            possible.push({
              row: piece.row - addcounter,
              column: piece.column,
            });
          }
          hit = true;
        }
      }
      if (hit == true || addcounter > 7) {
        break;
      }
      possible.push({ row: piece.row - addcounter, column: piece.column });
      addcounter++;
    }
    hit = false;
    addcounter = 1;
    while (hit == false) {
      for (j = 0; j < pieces.length; j++) {
        if (
          (pieces[j].row == piece.row &&
            pieces[j].column == piece.column + addcounter) ||
          piece.column + addcounter > 7
        ) {
          hit = true;
          if (pieces[j].color != piece.color) {
            possible.push({
              row: piece.row,
              column: piece.column + addcounter,
            });
          }
        }
      }
      if (hit == true || addcounter > 7) {
        break;
      }
      possible.push({ row: piece.row, column: piece.column + addcounter });
      addcounter++;
    }
    hit = false;
    addcounter = 1;
    while (hit == false) {
      for (j = 0; j < pieces.length; j++) {
        if (
          (pieces[j].row == piece.row &&
            pieces[j].column == piece.column - addcounter) ||
          piece.column - addcounter < 0
        ) {
          hit = true;
          if (pieces[j].color != piece.color) {
            possible.push({
              row: piece.row,
              column: piece.column - addcounter,
            });
          }
        }
      }
      if (hit == true || addcounter > 7) {
        break;
      }
      possible.push({ row: piece.row, column: piece.column - addcounter });
      addcounter++;
    }
  } else if (piece.piece == "bishop") {
    possible = [];
    let hit = false;
    let addcounter = 1;
    //queen movement without rows and columns
    while (hit == false) {
      for (j = 0; j < pieces.length; j++) {
        if (
          (pieces[j].row == piece.row + addcounter &&
            pieces[j].column == piece.column + addcounter) ||
          piece.column - addcounter > 7 ||
          piece.row - addcounter > 7
        ) {
          hit = true;
          if (pieces[j].color != piece.color) {
            possible.push({
              row: piece.row + addcounter,
              column: piece.column + addcounter,
            });
          }
        }
      }
      if (hit == true || addcounter > 7) {
        break;
      }
      possible.push({
        row: piece.row + addcounter,
        column: piece.column + addcounter,
      });
      addcounter++;
    }
    hit = false;
    addcounter = 1;
    //downwards to the left
    while (hit == false) {
      for (j = 0; j < pieces.length; j++) {
        if (
          (pieces[j].row == piece.row - addcounter &&
            pieces[j].column == piece.column - addcounter) ||
          piece.column - addcounter < 0 ||
          piece.row - addcounter < 0
        ) {
          hit = true;
          if (pieces[j].color != piece.color) {
            possible.push({
              row: piece.row - addcounter,
              column: piece.column - addcounter,
            });
          }
        }
      }
      if (hit == true || addcounter > 7) {
        break;
      }
      possible.push({
        row: piece.row - addcounter,
        column: piece.column - addcounter,
      });
      addcounter++;
    }
    hit = false;
    addcounter = 1;
    //upwards to the right
    while (hit == false) {
      for (j = 0; j < pieces.length; j++) {
        if (
          (pieces[j].row == piece.row + addcounter &&
            pieces[j].column == piece.column - addcounter) ||
          piece.column - addcounter < 0 ||
          piece.row - addcounter > 7
        ) {
          hit = true;
          if (pieces[j].color != piece.color) {
            possible.push({
              row: piece.row + addcounter,
              column: piece.column - addcounter,
            });
          }
        }
      }
      if (hit == true || addcounter > 7) {
        break;
      }
      possible.push({
        row: piece.row + addcounter,
        column: piece.column - addcounter,
      });
      addcounter++;
    }
    hit = false;
    addcounter = 1;
    //downwards to the right
    while (hit == false) {
      for (j = 0; j < pieces.length; j++) {
        if (
          (pieces[j].row == piece.row - addcounter &&
            pieces[j].column == piece.column + addcounter) ||
          piece.row - addcounter < 0 ||
          piece.column + addcounter > 7
        ) {
          hit = true;
          if (pieces[j].color != piece.color) {
            possible.push({
              row: piece.row - addcounter,
              column: piece.column + addcounter,
            });
          }
        }
      }
      if (hit == true || addcounter > 7) {
        break;
      }
      possible.push({
        row: piece.row - addcounter,
        column: piece.column + addcounter,
      });
      addcounter++;
    }
  } else if (piece.piece == "knight") {
    possible = [
      { row: piece.row - 2, column: piece.column - 1 },
      { row: piece.row - 1, column: piece.column - 2 },
      { row: piece.row + 1, column: piece.column - 2 },
      { row: piece.row + 2, column: piece.column - 1 },
      { row: piece.row + 2, column: piece.column + 1 },
      { row: piece.row + 1, column: piece.column + 2 },
      { row: piece.row - 1, column: piece.column + 2 },
      { row: piece.row - 2, column: piece.column + 1 },
    ];
    let clear = false;
    let cycle = 0;

    while (cycle < possible.length && !clear) {
      for (let j = 0; j < pieces.length; j++) {
        //check if a move is occupied by a friendly piece
        if (
          possible[cycle].row == pieces[j].row &&
          possible[cycle].column == pieces[j].column &&
          piece.color == pieces[j].color
        ) {
          //remove the move from array
          possible.splice(cycle, 1);
          //subtract 1 from cycle variable to compensate for removed array value
          cycle--;
          break;
        }
      }
      //move to next value
      cycle++;
      if (cycle == possible.length) {
        clear = true;
      }
    }
  } else if (piece.piece == "king") {
    possible = [
      { row: piece.row + 1, column: piece.column },
      { row: piece.row + 1, column: piece.column - 1 },
      { row: piece.row, column: piece.column - 1 },
      { row: piece.row - 1, column: piece.column - 1 },
      { row: piece.row - 1, column: piece.column },
      { row: piece.row - 1, column: piece.column + 1 },
      { row: piece.row, column: piece.column + 1 },
      { row: piece.row + 1, column: piece.column + 1 },
    ];
    for (j = 0; j < pieces.length; j++) {
      //check if a king move has the same position as an existing piece
      const keyValue = possible.findIndex(
        (x) =>
          x.row == pieces[j].row &&
          x.column == pieces[j].column &&
          x.color == pieces[j].color
      );
      if (typeof keyValue === "number" && keyValue >= 0) {
        possible.splice(keyValue, 1);
      }
    }
    let pushed = false;
    let found = false;
    if (piece.castled == false) {
      for (j = 0; j < pieces.length; j++) {
        if (
          pieces[j].column > 4 &&
          pieces[j].column < 7 &&
          pieces[j].row == piece.row
        ) {
          found = true;
          if (pushed == true) {
            const keyValue = possible.findIndex(
              (x) => x.row == piece.row && x.column == piece.column + 2
            );
            if (typeof keyValue === "number" && keyValue >= 0) {
              possible.splice(keyValue, 1);
            }
          }
        } else if (
          pieces[j].row == piece.row &&
          pieces[j].column == 7 &&
          pieces[j].piece == "rook"
        ) {
          if (pieces[j].moved == false && found == false) {
            possible.push({
              row: piece.row,
              column: piece.column + 2,
              shortcastled: true,
            });
            pushed = true;
          }
        }
      }
      pushed = false;
      found = false;
      for (j = 0; j < pieces.length; j++) {
        if (
          pieces[j].column < 4 &&
          pieces[j].column > 0 &&
          pieces[j].row == piece.row
        ) {
          found = true;
          if (pushed == true) {
            const keyValue = possible.findIndex(
              (x) => x.row == piece.row && x.column == piece.column - 2
            );
            if (typeof keyValue === "number" && keyValue >= 0) {
              possible.splice(keyValue, 1);
            }
          }
        } else if (
          pieces[j].row == piece.row &&
          pieces[j].column == 0 &&
          pieces[j].piece == "rook"
        ) {
          if (pieces[j].moved == false && found == false) {
            possible.push({
              row: piece.row,
              column: piece.column - 2,
              longcastled: true,
            });
            pushed = true;
          }
        }
      }
    }
  }
  //clear unwanted values (for ease of using console log)
  clear = false;
  let length = 0;
    while (clear == false) {
      for (q = 0; q < possible.length; q++) {
        if (
          possible[q].column < 0 ||
          possible[q].column > 7 ||
          possible[q].row < 0 ||
          possible[q].row > 7
        ) {
          possible.splice(q, 1);
        } else {
          clear = true;
        }
        for (j = 0; j < possible.length; j++) {
          if (
            possible[j].column < 0 ||
            possible[j].column > 7 ||
            possible[j].row < 0 ||
            possible[j].row > 7
          ) {
            clear = false;
          }
        }
      }
      length++;
      if (length >= possible.length){
        break;
      }
    }
  console.log(possible)
  return possible;
}

//Click function
function getCursorPosition(c, event) {
  const rect = c.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  let clickfound = false;
  let piecex = Math.floor(x / 80);
  let piecey = Math.floor(y / 80);
  let movefound = false;
  for (k = 0; k < pieces.length; k++) {
    if (pieces[k].selected == true) {
      if (pieces[k].color == currentturn.toLowerCase()) {
        let moves = possibleMoves(pieces[k]);
        if (moves.some((e) => e.row == 7 - piecey && e.column == piecex)) {
          for (z = 0; z < pieces.length; z++) {
            if (
              pieces[z].column == piecex &&
              pieces[z].row == 7 - piecey &&
              pieces[z].color != pieces[k].color
            ) {
              if (pieces[z].piece == "king") {
                document.getElementById(
                  "output"
                ).innerHTML = `${currentturn} wins!`;
                gameover = true;
              }
              pieces.splice(z, 1);
            }
          }
          for (j = 0; j < pieces.length; j++) {
            if (pieces[j].selected == true) {
              let keyValue;
              if (pieces[j].piece == "king") {
                pieces[j].castled == true;
              }
              if (pieces[j].piece == "king") {
                keyValue = moves.findIndex(
                  (x) => x.row == 7 - piecey && x.column == piecex
                );
                if (moves[keyValue].shortcastled == true) {
                  let rook = pieces.findIndex(
                    (e) =>
                      e.row == pieces[j].row &&
                      e.column == 7 &&
                      e.piece == "rook"
                  );
                  pieces[rook].column = 5;
                } else if (moves[keyValue].longcastled == true) {
                  let rook = pieces.findIndex(
                    (e) =>
                      e.row == pieces[j].row &&
                      e.column == 0 &&
                      e.piece == "rook"
                  );
                  pieces[rook].column = 3;
                }
                pieces[j].castled = true;
              }

              pieces[j].column = piecex;
              pieces[j].row = 7 - piecey;
              if (
                pieces[j].piece == "pawn" &&
                (pieces[j].row == 7 || pieces[j].row == 0)
              ) {
                pieces[j].piece = "queen";
              }
              pieces[j].selected = false;
              if (pieces[j].piece == "pawn" || pieces[j].piece == "rook") {
                pieces[j].moved = true;
              }
            }
          }
          movefound = true;
        }
        if (currentturn == "White" && movefound == true) {
          currentturn = "Black";
          turnchanged = false;
        } else if (currentturn == "Black" && movefound == true) {
          currentturn = "White";
          turnchanged = false;
        }
      }
      clickfound = true;
      pieces[k].selected = false;
    }
  }
  if (typeof lastSelection == "number") {
    pieces[lastSelection].selected = false;
  }
  if (clickfound == false) {
    for (i = 0; i < pieces.length; i++) {
      if (pieces[i].column == piecex && pieces[i].row == 7 - piecey) {
        pieces[i].selected = true;
        lastSelection = i;
      }
    }
  }
}
