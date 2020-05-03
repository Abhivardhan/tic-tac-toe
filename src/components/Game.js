import React from 'react'
import Board from './Board'

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            isPlayerXTurn: true,
            stepNumber: 0,
            history: [
                {squares: Array(9).fill(null)}
            ]
        };
    }

    calculateWinner = (squares) => {
        const possibilities = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ]
      
        for(let i = 0; i < possibilities.length; i++) {
          const [a, b, c] = possibilities[i]
          if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a]
          }
        }
      
        return null;
    }

    handleClick = (squareIndex) => {
        let history = this.state.history;
        let currentStateOfBoard = history[history.length - 1];
        let squares = currentStateOfBoard.squares;

        let isWinner = this.calculateWinner(squares);

        if(isWinner || squares[squareIndex]) return;

        squares[squareIndex] = this.state.isPlayerXTurn ? 'X' : 'O';

        this.setState({
            history: history.concat({
                squares
            }),
            isPlayerXTurn: !this.state.isPlayerXTurn,
            stepNumber: history.length
        });
    }

    render() {
        let history = this.state.history;
        let currentStateOfBoard = history[this.state.stepNumber];
        let status;
        let winner = this.calculateWinner(currentStateOfBoard.squares);

        console.log(this.state.stepNumber);
        if(winner) {
            status  = `Winner is ${winner}`
        } else if(this.state.stepNumber === 9) {
            status = "Game Tie";
        } else {
            status = `Next player is ${this.state.isPlayerXTurn ? 'X' : 'O'}`;
        }

        return(
            <div className = "game">
                <div className = "game-board">
                    <Board clickAction = {(index) => this.handleClick(index)} squares = {currentStateOfBoard.squares}/>
                </div>
                <div className = "game-info">
                    {status}
                </div>
            </div>
        )
    }
}

