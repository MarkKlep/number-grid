import React, { useState } from 'react'
import { matrixNumbersGenerator } from '../utilities/matrix-processing';
import { GridRenderer } from './grid-renderer';
import { GamePanel } from './game-panel';

const alertMessages: readonly string[] = [
    'Grid size must be greater than 1'
];

export const SinglePlay = () => {
    const [gridSize, setGridSize] = useState(2);
    const [matrixNumbers, setMatrixNumbers] = useState<number[][]>([]);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    const handleStartNewGame = () => {
        if(gridSize < 2) {
            setAlertMessage(alertMessages[0]);
            return;
        }

        setAlertMessage(null);

        const matrix = matrixNumbersGenerator(gridSize);
        setMatrixNumbers(matrix);
    }

    return (
        <div>

            <GamePanel gridSize={gridSize} setGridSize={setGridSize} handleStartNewGame={handleStartNewGame} />

            {
                (matrixNumbers.length > 0 && alertMessage === null) ? (
                <GridRenderer matrixNumbers={matrixNumbers} />
                ) : (
                    <div>
                        {alertMessage}
                    </div>
                )
            }

        </div>
    )
}
