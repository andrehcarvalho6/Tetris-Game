class Game {
  constructor() {
    this.piece = null;
    this.PiecesArr = [];
    this.height = 10;
  }

  start() {
    this.createNewPiece();

    setInterval(() => {
      //   if (!this.piece || this.piece.isAtBottom() || this.checkCollision()) {
      //     this.stopPiece();
      //     // if (this.piece.height > 105) {
      //     //   window.location.href = "./LetsRetry.html";
      //     //   return;
      //     }
      //   } else {
      this.createNewPiece();
      this.piece.moveDown();
    }, 200);

    document.addEventListener("keydown", (event) => {
      if (this.piece) {
        if (event.key === "ArrowLeft") {
          this.piece.moveLeft();
        } else if (event.key === "ArrowRight") {
          this.piece.moveRight();
        } //else if (event.key === "ArrowDown") {
        //   this.piece.moveDown();
        // }
      }
    });
  }

  createNewPiece() {
    this.piece = new Piece();
    this.PiecesArr.push(this.piece);
  }

  stopPiece() {
    this.piece = null;
  }

  checkCollision() {
    const currentPieceRect = this.piece.pieceElm.getBoundingClientRect();

    for (let i = 0; i < this.PiecesArr.length - 1; i++) {
      const otherPieceRect = this.PiecesArr[i].pieceElm.getBoundingClientRect();

      if (
        currentPieceRect.bottom >= otherPieceRect.top &&
        currentPieceRect.top <= otherPieceRect.bottom &&
        currentPieceRect.right >= otherPieceRect.left &&
        currentPieceRect.left <= otherPieceRect.right
      ) {
        return true;
      }
    }

    return false;
  }
}

class Piece {
  constructor() {
    this.height = 10;
    this.width = 10;
    this.positionX = 50;
    this.positionY = 100 - this.height;
    this.pieceElm = null;
    this.createPiece();
  }

  createPiece() {
    const gridElm = document.querySelector("#grid");
    this.pieceElm = document.createElement("div");
    this.pieceElm.classList = "tetromino";
    this.pieceElm.style.width = this.width + "%";
    this.pieceElm.style.height = this.height + "%";
    this.pieceElm.style.left = this.positionX + "%";
    this.pieceElm.style.bottom = this.positionY + "%";
    gridElm.appendChild(this.pieceElm);
  }

  moveLeft() {
    let currentPosition = parseFloat(this.pieceElm.style.left);
    if (currentPosition > 0) {
      this.pieceElm.style.left = currentPosition - 10 + "%";
    }
  }

  moveRight() {
    let currentPosition = parseFloat(this.pieceElm.style.left);
    if (currentPosition < 90) {
      this.pieceElm.style.left = currentPosition + 10 + "%";
    }
  }

  moveDown() {
    this.positionY -= 5;
    this.pieceElm.style.bottom = this.positionY + "%";
  }

  isAtBottom() {
    return this.positionY <= 0;
  }
}

const game = new Game();
game.start();
