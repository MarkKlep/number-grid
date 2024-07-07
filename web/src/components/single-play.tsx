import React, { useState } from 'react'
import { GamePanel } from '../components/game-panel';
import { TimerMode } from '../modes/timer-mode/timer-mode';
import { DoNotTouch } from '../modes/do-not-touch-mode/do-not-touch-mode';

const gameModes: readonly string[] = ['timer', 'don`t touch'];

export const SinglePlay = () => {
    const [selectedGameMode, setSelectedGameMode] = useState<string>('');
    const [gridSize, setGridSize] = useState(2);
    const [startNewGame, setStartNewGame] = useState<boolean>(false);

    const renderGameMode = () => {
        if(!startNewGame) return null;

        switch (selectedGameMode) {
            case gameModes[0]:
                return <TimerMode gridSize={gridSize} />;
            case gameModes[1]:
                return <DoNotTouch gridSize={gridSize} />;
            default:
                return null;
        }
    }

    return (
        <div>

            <GamePanel 
                gridSize={gridSize} 
                selectedGameMode={selectedGameMode}
                startNewGame={startNewGame}
                setGridSize={setGridSize} 
                setStartNewGame={setStartNewGame}
                setSelectedGameMode={setSelectedGameMode} 
                gameModes={gameModes} 
            />

            {
                renderGameMode()
            }

        </div>
    )
}
