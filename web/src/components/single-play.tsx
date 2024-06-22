import React, { useState } from 'react'
import { matrixNumbersGenerator } from '../utilities/matrix-processing';
import { GridRenderer } from './grid-renderer';
import { GamePanel } from './game-panel';

const alertMessages: readonly string[] = [
    'Grid size must be greater than 1'
];

export type GridCell = {
    value: number,
    rowIndex: number,
    cellIndex: number,
    clicked: boolean
}

export const SinglePlay = () => {
    const [gridSize, setGridSize] = useState(2);
    const [gridCells, setGridCells] = useState<GridCell[][]>([]);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    const handleStartNewGame = () => {
        if(gridSize < 2) {
            setAlertMessage(alertMessages[0]);
            return;
        }

        setAlertMessage(null);

        const numsMatrix = matrixNumbersGenerator(gridSize);
        setGridCells(
            numsMatrix.map((row, rowIndex) => {
                return row.map((cell, cellIndex) => {
                    return {
                        value: cell,
                        rowIndex,
                        cellIndex,
                        clicked: false
                    }
                })
            })
        );
    }

    const handleGridUpdate = (rowIndex: number, cellIndex: number) => {

        setGridCells(
            gridCells.map((row, rIndex) => {
                return row.map((cell, cIndex) => {
                    if(rIndex === rowIndex && cIndex === cellIndex) {
                        return {
                            ...cell,
                            clicked: true
                        }
                    }
                    return cell;
                })
            })
        );
    }

    return (
        <div>

            <GamePanel gridSize={gridSize} setGridSize={setGridSize} handleStartNewGame={handleStartNewGame} />

            {
                (gridCells.length > 0 && alertMessage === null) ? (
                    <GridRenderer gridCells={gridCells} handleGridUpdate={handleGridUpdate} />
                ) : (
                    <div>
                        {alertMessage}
                    </div>
                )
            }

        </div>
    )
}
