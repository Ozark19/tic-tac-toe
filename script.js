let turn = true;

const gameboard = {
    start: function () {
        let start = document.getElementById('start');
        let mark = document.getElementsByClassName('tile');
        let status = document.getElementById('status');

        start.addEventListener('click', function () {
            for (let i = 0; i < mark.length; i++) {
                mark[i].innerHTML = "";
                mark[i].classList.remove('played');
                status.style.color = "white";
                players.playerOneScore = [];
                players.playerTwoScore = [];
                if (turn === true) {
                    status.innerHTML = players.name()[0] + "'s turn";
                } else if (turn === false) {
                    status.innerHTML = players.name()[1] + "'s turn";
                    playerTurn = 1;
                }
            }
            gameboard.playTurn();
        });
    },
    playTurn: function () {
        let mark = document.getElementsByClassName('tile');
        let status = document.getElementById('status');

        for (let i = 0; i < mark.length; i++) {
            mark[i].addEventListener('click', function () {
                let id = this.id;

                if (turn === true && mark[i].innerHTML === "") {
                    status.innerHTML = players.name()[1] + "'s turn";
                    mark[i].innerHTML = "X";
                    players.playerOneScore.push(id);
                    gameboard.winner();
                    gameboard.turn();
                } else if (turn === false && mark[i].innerHTML === "") {
                    status.innerHTML = players.name()[0] + "'s turn";
                    mark[i].innerHTML = "O";
                    players.playerTwoScore.push(id);
                    gameboard.winner();
                    gameboard.turn();
                }
            });
        }
    },
    turn: function () {
        if (turn === true) {
            turn = false
        } else if (turn === false) {
            turn = true
        }
        return turn;
    },
    winner: function () {
        let p1Score = players.playerOneScore;
        let p2Score = players.playerTwoScore;
        let winMessage = document.getElementById('status');

        if (((p1Score.includes('g0')) && (p1Score.includes('g1')) && (p1Score.includes('g2'))) ||
            ((p1Score.includes('g3')) && (p1Score.includes('g4')) && (p1Score.includes('g5'))) ||
            ((p1Score.includes('g6')) && (p1Score.includes('g7')) && (p1Score.includes('g8'))) ||
            ((p1Score.includes('g0')) && (p1Score.includes('g3')) && (p1Score.includes('g6'))) ||
            ((p1Score.includes('g1')) && (p1Score.includes('g4')) && (p1Score.includes('g7'))) ||
            ((p1Score.includes('g2')) && (p1Score.includes('g5')) && (p1Score.includes('g8'))) ||
            ((p1Score.includes('g0')) && (p1Score.includes('g4')) && (p1Score.includes('g8'))) ||
            ((p1Score.includes('g2')) && (p1Score.includes('g4')) && (p1Score.includes('g6')))) {

            winMessage.innerHTML = players.name()[0] + " wins!";
            document.getElementById('status').style.color = "red";
            gameboard.gameOver();

        } else if (((p1Score.includes('g0')) && (p1Score.includes('g1')) && (p1Score.includes('g2'))) ||
            ((p2Score.includes('g3')) && (p2Score.includes('g4')) && (p2Score.includes('g5'))) ||
            ((p2Score.includes('g6')) && (p2Score.includes('g7')) && (p2Score.includes('g8'))) ||
            ((p2Score.includes('g0')) && (p2Score.includes('g3')) && (p2Score.includes('g6'))) ||
            ((p2Score.includes('g1')) && (p2Score.includes('g4')) && (p2Score.includes('g7'))) ||
            ((p2Score.includes('g2')) && (p2Score.includes('g5')) && (p2Score.includes('g8'))) ||
            ((p2Score.includes('g0')) && (p2Score.includes('g4')) && (p2Score.includes('g8'))) ||
            ((p2Score.includes('g2')) && (p2Score.includes('g4')) && (p2Score.includes('g6')))) {

            winMessage.innerHTML = players.name()[1] + " wins!";
            document.getElementById('status').style.color = "red";
            gameboard.gameOver();

        } else if ((players.playerOneScore.length === 5 && players.playerTwoScore.length === 4) ||
            (players.playerOneScore.length === 4 && players.playerTwoScore.length === 5)) {
            winMessage.innerHTML = "Draw";
            document.getElementById('status').style.color = "red";
        }
    },
    gameOver: function () {
        let mark = document.getElementsByClassName('tile');

        for (let i = 0; i < mark.length; i++) {
            if (mark[i].innerHTML === "") {
                mark[i].classList.add('played');
            }
        }
    }
}

const players = {
    playerOneScore: [],
    playerTwoScore: [],
    name: function () {
        let playerOne = document.getElementById('player1').value;
        let playerTwo = document.getElementById('player2').value;

        if (playerOne === "") {
            playerOne = "Player 1";
        }
        if (playerTwo === "") {
            playerTwo = "Player 2";
        }
        return [playerOne, playerTwo];
    }
}

gameboard.start();
