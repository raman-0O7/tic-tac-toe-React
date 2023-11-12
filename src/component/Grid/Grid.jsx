import { useState } from "react";
import Card from "../card/card";
import isWinner from "../../helper/CheckWinner";
import "./Grid.css"
function Grid({numberOfCards}) {
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn, setTurn] = useState(true);
    const [winner, setWinner]  = useState(null);
    function play(idx) {
        if(!winner) {
            if(board[idx]=="") {
                board[idx] = (turn)? "O" : "X";
                setTurn((!turn));
            }
            const win = isWinner(board, (turn)? "O" : "X");
            if(win) {
                setWinner(win);
            }
            setBoard([...board]);    
        }

    }
    function reset() {
        setTurn(true);
        setWinner(null);
        setBoard(Array(numberOfCards).fill(""));
    }
    return (
        <div className="grid-wrapper">
            {
                winner && (
                    <>                   
                        <h1 className="turn-highlight">Winner is : {winner}</h1>
                        <button onClick={reset}>Reset game</button>
                    </>
                )
            }
            <h1 className="turn-highlight">Current Turn: {turn? "O": "X"}</h1>
            <div className="Grid">
                {board.map((el ,idx)=> <Card key={idx} onPlay={play} player={el} index={idx}/>)}
            </div>
        </div>
    )
}

export default Grid;