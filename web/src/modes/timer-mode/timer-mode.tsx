import React, { useState, useEffect, FC } from 'react'
import { matrixNumbersGenerator } from '../../utilities/matrix-processing';
import { GridRenderer } from './grid-renderer';
import gridNumberClickSound from '../../assets/grid-number-click.mp3';
import { GridCell } from '../../types/timer-mode';

type TimerModeProps = {
    gridSize: number,
}

export const TimerMode: FC<TimerModeProps> = (props) => {
    const { gridSize } = props;
    const [gridCells, setGridCells] = useState<GridCell[][]>([]);
    const [timer, setTimer] = useState<number>(0);

    const generateGrid = () => {
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

    const handlePlayerClick = (rowIndex: number, cellIndex: number) => {
        const audio = new Audio(gridNumberClickSound);
        audio.play();

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

    useEffect(() => {
        generateGrid();

        const intervalID = setInterval(() => {
            setTimer(timer => timer + 1);
        }, 1000);

        return () => {
            clearInterval(intervalID);
        }
    }, []);

    return (
        <div>
            <div className="timer">
                {timer}
            </div>
            {
                gridCells.length > 0 && (
                    <GridRenderer 
                        gridCells={gridCells} 
                        handlePlayerClick={handlePlayerClick} 
                    />
                )
            }
        </div>
    );
}
