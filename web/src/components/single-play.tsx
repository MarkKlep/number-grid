import React, { useState } from 'react'
import { GamePanel } from '../components/game-panel';
import { TimerMode } from '../modes/timer-mode/timer-mode';

const gameModes: readonly string[] = ['timer', 'don`t touch'];

export const SinglePlay = () => {
    const [selectedGameMode, setSelectedGameMode] = useState<string>('');
    const [gridSize, setGridSize] = useState(2);
    const [startNewGame, setStartNewGame] = useState<boolean>(false);

    const handleStartNewGame = () => {
        setStartNewGame(!startNewGame);
    }

    return (
        <div>

            <GamePanel 
                gridSize={gridSize} 
                startNewGame={startNewGame}
                setGridSize={setGridSize} 
                handleStartNewGame={handleStartNewGame} 
                setSelectedGameMode={setSelectedGameMode} 
                gameModes={gameModes} 
            />

            {
                (selectedGameMode === gameModes[0] && startNewGame) && (
                    <TimerMode gridSize={gridSize} />
                )
            }

        </div>
    )
}
