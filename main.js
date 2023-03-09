class Game {
  constructor() {
    this.piece = null;
    this.piecesArr = [];
    this.gridElm = document.querySelector("#grid");
    this.removedLinesCount = document.querySelector("#lines-removed");
  }

  start() {
    this.createNewPiece();
    if (this.removedLinesCount / 10 < 1) {
      setInterval(() => {
        if (!this.piece || this.piece.isAtBottom()) {
          this.piecesArr.push(this.piece);
          this.checkCompletedLines();
          if (this.piecesArr.some((piece) => piece.positionY >= 90)) {
            window.location.href = "./LetsRetry.html";
          } else {
            this.createNewPiece();
          }
        } else {
          if (
            !this.collidesWithOtherPieces(
              this.piece.positionX,
              this.piece.positionY - 10
            )
          ) {
            this.piece.moveDown();
          } else {
            this.piecesArr.push(this.piece);
            this.checkCompletedLines();
            if (this.piecesArr.some((piece) => piece.positionY >= 90)) {
              window.location.href = "./LetsRetry.html";
            } else {
              this.createNewPiece();
            }
          }
        }
      }, 400);
    } else if (
      this.removedLinesCount / 10 > 1 &&
      this.removedLinesCount / 10 < 2
    ) {
      setInterval(() => {
        if (!this.piece || this.piece.isAtBottom()) {
          this.piecesArr.push(this.piece);
          this.checkCompletedLines();
          if (this.piecesArr.some((piece) => piece.positionY >= 90)) {
            window.location.href = "./LetsRetry.html";
          } else {
            this.createNewPiece();
          }
        } else {
          if (
            !this.collidesWithOtherPieces(
              this.piece.positionX,
              this.piece.positionY - 10
            )
          ) {
            this.piece.moveDown();
          } else {
            this.piecesArr.push(this.piece);
            this.checkCompletedLines();
            if (this.piecesArr.some((piece) => piece.positionY >= 90)) {
              window.location.href = "./LetsRetry.html";
            } else {
              this.createNewPiece();
            }
          }
        }
      }, 50);
    } else {
      setInterval(() => {
        if (!this.piece || this.piece.isAtBottom()) {
          this.piecesArr.push(this.piece);
          this.checkCompletedLines();
          if (this.piecesArr.some((piece) => piece.positionY >= 90)) {
            window.location.href = "./LetsRetry.html";
          } else {
            this.createNewPiece();
          }
        } else {
          if (
            !this.collidesWithOtherPieces(
              this.piece.positionX,
              this.piece.positionY - 10
            )
          ) {
            this.piece.moveDown();
          } else {
            this.piecesArr.push(this.piece);
            this.checkCompletedLines();
            if (this.piecesArr.some((piece) => piece.positionY >= 90)) {
              window.location.href = "./LetsRetry.html";
            } else {
              this.createNewPiece();
            }
          }
        }
      }, 100);
    }

    document.addEventListener("keydown", (event) => {
      if (this.piece) {
        if (event.key === "ArrowLeft") {
          this.piece.moveLeft();
        } else if (event.key === "ArrowRight") {
          this.piece.moveRight();
        } else if (event.key === "ArrowDown") {
          if (
            !this.collidesWithOtherPieces(
              this.piece.positionX,
              this.piece.positionY - 10
            )
          ) {
            this.piece.moveDown();
          }
        }
      }
    });
  }
  collidesWithOtherPieces(newPositionX, newPositionY) {
    for (let i = 0; i < this.piecesArr.length; i++) {
      const otherPiece = this.piecesArr[i];
      if (
        newPositionX < otherPiece.positionX + otherPiece.width &&
        newPositionX + this.piece.width > otherPiece.positionX &&
        newPositionY < otherPiece.positionY + otherPiece.height &&
        newPositionY + this.piece.height > otherPiece.positionY
      ) {
        return true;
      } else if (
        this.piece.positionY === otherPiece.positionY &&
        newPositionX === otherPiece.positionX
      ) {
        return true;
      }
    }
    return false;
  }

  createNewPiece() {
    this.piece = new Piece();
  }

  checkCompletedLines() {
    for (let y = 0; y <= 100; y += 10) {
      let cells = [];
      for (let i = 0; i < this.piecesArr.length; i++) {
        const piece = this.piecesArr[i];
        if (piece.positionY === y) {
          cells.push(piece.pieceElm);
        }
      }
      if (cells.length === 10) {
        this.removeLine(y);
        y -= 10;
      }
    }
  }

  removeLine(y) {
    let linesRemoved = 0;
    for (let i = 0; i < this.piecesArr.length; i++) {
      const piece = this.piecesArr[i];
      if (piece.positionY === y) {
        this.gridElm.removeChild(piece.pieceElm);
        this.piecesArr.splice(i, 1);
        i--;
        linesRemoved++;
      } else if (piece.positionY > y) {
        piece.positionY -= 10;
        piece.pieceElm.style.bottom = piece.positionY + "%";
      }
    }
    this.removedLinesCount += linesRemoved;
    document.getElementById("lines-removed").textContent =
      this.removedLinesCount / 10;
  }
}

class Piece {
  constructor() {
    this.height = 10;
    this.width = 10;
    this.positionX = 40;
    this.positionY = 100 - this.height;
    this.pieceElm = null;
    this.createPiece();
  }

  createPiece() {
    const gridElm = document.querySelector("#grid");
    this.pieceElm = document.createElement("div");
    this.pieceElm.classList = "tetromino cube";
    this.pieceElm.style.width = this.width + "%";
    this.pieceElm.style.height = this.height + "%";
    this.pieceElm.style.left = this.positionX + "%";
    this.pieceElm.style.bottom = this.positionY + "%";
    gridElm.appendChild(this.pieceElm);
  }

  moveLeft() {
    let currentPosition = parseFloat(this.pieceElm.style.left);
    if (currentPosition > 0) {
      if (!this.collidesWithOtherPieces(currentPosition - 10, this.positionY)) {
        this.pieceElm.style.left = currentPosition - 10 + "%";
        this.positionX = currentPosition - 10;
      }
    }
  }

  moveRight() {
    let currentPosition = parseFloat(this.pieceElm.style.left);
    if (currentPosition < 90) {
      if (!this.collidesWithOtherPieces(currentPosition + 10, this.positionY)) {
        this.pieceElm.style.left = currentPosition + 10 + "%";
        this.positionX = currentPosition + 10;
      }
    }
  }

  moveDown() {
    let newPositionY = this.positionY - 10;
    if (newPositionY < 0) {
      newPositionY = 0;
    }

    this.positionY = newPositionY;
    this.pieceElm.style.bottom = this.positionY + "%";
  }

  isAtBottom() {
    return this.positionY <= 0;
  }

  collidesWithOtherPieces(newPositionX, newPositionY) {
    for (let i = 0; i < game.piecesArr.length; i++) {
      const otherPiece = game.piecesArr[i];
      if (
        newPositionX < otherPiece.positionX + otherPiece.width &&
        newPositionX + this.width > otherPiece.positionX &&
        newPositionY < otherPiece.positionY + otherPiece.height &&
        newPositionY + this.height > otherPiece.positionY
      ) {
        return true;
      }
    }
    return false;
  }
}

const game = new Game();
game.start();
