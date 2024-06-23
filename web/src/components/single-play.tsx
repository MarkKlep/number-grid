import React, { useState, useEffect } from 'react'
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
    done: boolean,
    failed: boolean,
}

export const SinglePlay = () => {
    const [gridSize, setGridSize] = useState(2);
    const [gridCells, setGridCells] = useState<GridCell[][]>([]);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    useEffect(() => {
        const isGameOver = gridCells.flat().every(cell => cell.done || cell.failed);

        if(isGameOver) {
            setAlertMessage('Congratulations! You have completed the game');
        }
    }, [gridCells]);

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
                        done: false,
                        failed: false,
                    }
                })
            })
        );
    }

    const ascOrderWrongClick = (rowIndex: number, cellIndex: number): boolean => {
        const clickedCell = gridCells[rowIndex][cellIndex];

        if(gridCells.flat().find(cell => cell.value < clickedCell.value && !cell.failed && !cell.done)) {
            setGridCells(
                gridCells.map((row, rowIndex) => {
                    return row.map((cell, cellIndex) => {
                        if(clickedCell.rowIndex === rowIndex && clickedCell.cellIndex === cellIndex) {
                            return {
                                ...cell,
                                failed: true
                            }
                        }
                        return cell;
                    })
                })
            );

            return true;
        }

        return false;
    }

    const handleGridUpdate = (rowIndex: number, cellIndex: number) => {
        if(gridCells[rowIndex][cellIndex].failed) return;
        if(ascOrderWrongClick(rowIndex, cellIndex)) return;

        setGridCells(
            gridCells.map((row, rIndex) => {
                return row.map((cell, cIndex) => {
                    if(rIndex === rowIndex && cIndex === cellIndex) {
                        return {
                            ...cell,
                            done: true
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
