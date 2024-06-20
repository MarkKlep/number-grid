import React from 'react'
import { Button } from 'react-bootstrap';

type GamePanelProps = {
    gridSize: number,
    setGridSize: (gridSize: number) => void,
    handleStartNewGame: () => void
}

export const GamePanel = (props: GamePanelProps) => {

    const { gridSize, setGridSize, handleStartNewGame } = props;

    return (
        <div className="game-panel" >
            <div className="input-group" >
                <label>
                    Map Size:
                    <input type="number" name="mapSize" onChange={(event) => setGridSize(parseInt(event.target.value))} value={gridSize} />
                </label>
            </div>

            <div>
                <Button onClick={handleStartNewGame}>Start</Button>
            </div>
        </div>
    )
}
