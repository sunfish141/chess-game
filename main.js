const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let squarewidth = canvas.width / 8;
let squareheight = canvas.height / 8;
let lastSelection;
let currentturn = "White";
let checked = [];
let gameover = false;
let boardflip = true;
let turnchanged = true;
let currentflip = 'black';

const imageUrls = [
  "img\\whitepawn.png",
  "img\\whiteknight.png",
  "img\\whitebishop.png",
  "img\\whiterook.png",
  "img\\whitequeen.png",
  "img\\whiteking.png",
  "img\\blackpawn.png",
  "img\\blackknight.png",
  "img\\blackbishop.png",
  "img\\blackrook.png",
  "img\\blackqueen.png",
  "img\\blackking.png",
];

const images = [];

//Load images
imageUrls.forEach((url) => {
  const img = new Image();
  img.src = url;
  console.log(img.src);
  console.log(url);
  img.onload = () => {
    console.log(img.src);
    images.push(img);
  };
});

let pieces = [
  {
    piece: "pawn",
    color: "white",
    column: 0,
    row: 1,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "white",
    column: 1,
    row: 1,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "white",
    column: 2,
    row: 1,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "white",
    column: 3,
    row: 1,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "white",
    column: 4,
    row: 1,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "white",
    column: 5,
    row: 1,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "white",
    column: 6,
    row: 1,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "white",
    column: 7,
    row: 1,
    selected: false,
    moved: false,
  },
  {
    piece: "rook",
    color: "white",
    column: 0,
    row: 0,
    selected: false,
    moved: false,
  },
  {
    piece: "rook",
    color: "white",
    column: 7,
    row: 0,
    selected: false,
    moved: false,
  },
  { piece: "knight", color: "white", column: 1, row: 0, selected: false },
  { piece: "knight", color: "white", column: 6, row: 0, selected: false },
  { piece: "bishop", color: "white", column: 2, row: 0, selected: false },
  { piece: "bishop", color: "white", column: 5, row: 0, selected: false },
  { piece: "queen", color: "white", column: 3, row: 0, selected: false },
  {
    piece: "king",
    color: "white",
    column: 4,
    row: 0,
    selected: false,
    castled: false,
  },
  //black pieces
  {
    piece: "pawn",
    color: "black",
    column: 0,
    row: 6,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "black",
    column: 1,
    row: 6,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "black",
    column: 2,
    row: 6,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "black",
    column: 3,
    row: 6,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "black",
    column: 4,
    row: 6,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "black",
    column: 5,
    row: 6,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "black",
    column: 6,
    row: 6,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "black",
    column: 7,
    row: 6,
    selected: false,
    moved: false,
  },
  {
    piece: "rook",
    color: "black",
    column: 0,
    row: 7,
    selected: false,
    moved: false,
  },
  {
    piece: "rook",
    color: "black",
    column: 7,
    row: 7,
    selected: false,
    moved: false,
  },
  { piece: "knight", color: "black", column: 1, row: 7, selected: false },
  { piece: "knight", color: "black", column: 6, row: 7, selected: false },
  { piece: "bishop", color: "black", column: 2, row: 7, selected: false },
  { piece: "bishop", color: "black", column: 5, row: 7, selected: false },
  { piece: "queen", color: "black", column: 3, row: 7, selected: false },
  {
    piece: "king",
    color: "black",
    column: 4,
    row: 7,
    selected: false,
    castled: false,
  },
];

function drawBoard() {
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      ctx.beginPath();
      ctx.rect(
        0 + squarewidth * i,
        0 + squareheight * j,
        squarewidth,
        squareheight
      );
      if (currentturn == 'White' || boardflip == false){
      if (i % 2 == 0) {
        if (j % 2 == 0) {
          ctx.fillStyle = "#FFFFFF";
        } else {
          ctx.fillStyle = "#89CFF0";
        }
      } else {
        if (j % 2 == 1) {
          ctx.fillStyle = "#FFFFFF";
        } else {
          ctx.fillStyle = "#89CFF0";
        }
      }
    } else if (currentturn == 'Black' && boardflip == true){
      if (i % 2 == 0) {
        if (j % 2 == 0) {
          ctx.fillStyle = "#89CFF0";
        } else {
          ctx.fillStyle = "#FFFFFF";
        }
      } else {
        if (j % 2 == 1) {
          ctx.fillStyle = "#89CFF0";
        } else {
          ctx.fillStyle = "#FFFFFF";
        }
      }
    }
      ctx.fill();
      ctx.closePath();
    }
  }
}

function drawPieces() {
  for (i = 0; i < pieces.length; i++) {
    let e = pieces[i].color + pieces[i].piece;
    let x = 10 + pieces[i].column * 80;
    let y = 570 - pieces[i].row * 80;
    let width = 60;
    let length = 60;
    if (pieces[i].piece == "bishop") {
      width = 80;
      x -= 10;
    }
    //fix
    let imgValue = images.findIndex((x) => x.src == `img\\${e}.png`);
    const image = new Image();
    image.src = `img\\${e}.png`;
    ctx.drawImage(image, x, y, width, length);
  }
}

function checkTurn() {
  for (i = 0; i < pieces.length; i++) {
    if (pieces[i].color == "white") {
      pieces[i].row = 7 - pieces[i].row;
    } else if (pieces[i].color == "black") {
      pieces[i].row = 7 - pieces[i].row;
    }
  }
  if (currentflip == 'black'){
    currentflip = 'white';
  }
  else if (currentflip == 'white'){
    currentflip = 'black';
  }
  console.log(pieces);
  turnchanged = true;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (turnchanged == false && boardflip == true) {
    checkTurn();
  }
  drawBoard();
  drawPieces();
  if (gameover == false) {
    requestAnimationFrame(draw);
  }
}
draw();

const c = document.querySelector("canvas");
c.addEventListener("mousedown", function (e) {
  if (gameover == false) {
    getCursorPosition(c, e);
  }
});

const flip = document.getElementById('flipbtn');
flip.addEventListener("click",function (){
  if (boardflip == true){
  boardflip = false;
  flip.innerHTML="Enable board flipping"
  } else if (boardflip == false){
    boardflip = true;
    flip.innerHTML="Disable board flipping"
  }
})