import React, { useState, useEffect, useRef, FC } from 'react'
import { matrixNumbersGenerator } from '../../utilities/matrix-processing';
import { GridRenderer } from './grid-renderer';
import { GridCell } from '../../types/timer-mode';
import { ModalWindow } from './modal-window';
import { Panel } from './panel';
import '../../styles/timer-mode-panel.scss';
import gridNumberClickSound from '../../assets/grid-number-click.mp3';
import gridNumberBadClickSound from '../../assets/grid-number-bad-click.mp3';

type TimerModeProps = {
    gridSize: number,
}

const generateGrid = (gridSize: number): GridCell[][] => {
    const numsMatrix = matrixNumbersGenerator(gridSize);

    const grid = numsMatrix.map((row, rowIndex) => {
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

    return grid;
}

export const TimerMode: FC<TimerModeProps> = (props) => {
    const { gridSize } = props;
    const [gridCells, setGridCells] = useState<GridCell[][]>(generateGrid(gridSize));
    const [timer, setTimer] = useState<number>(0);
    const [wrongClicks, setWrongClicks] = useState<number>(0);

    const intervalID = useRef<any>(null);

    const gameIsOver = () => {
        return gridCells.flat().every(cell => cell.done || cell.failed);
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

            setWrongClicks(wrongClicks + 1);
            return true;
        }

        return false;
    }

    const handlePlayerClick = (rowIndex: number, cellIndex: number) => {
        if(gridCells[rowIndex][cellIndex].failed) return;
        if(ascOrderWrongClick(rowIndex, cellIndex)) {
            const audio = new Audio(gridNumberBadClickSound);
            audio.play();

            return;
        }

        const audio = new Audio(gridNumberClickSound);
        audio.play();

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

    const handleNewGame = () => {
        setGridCells(generateGrid(gridSize));
        setTimer(0);
        setWrongClicks(0);

        clearInterval(intervalID.current);

        intervalID.current = setInterval(() => {
            setTimer(timer => timer + 1);
        }, 1000);
    }

    useEffect(() => {
        intervalID.current = setInterval(() => {
            setTimer(timer => timer + 10);
        }, 10);

        return () => {
            clearInterval(intervalID.current);
        }
    }, []);

    useEffect(() => {
        if(gameIsOver()) {
            clearInterval(intervalID.current);
        }

    }, [gridCells]);

    return (
        <div>
            <Panel timer={timer} wrongClicks={wrongClicks} handleNewGame={handleNewGame} />

            {
                gridCells.length > 0 && (
                    <GridRenderer 
                        gridCells={gridCells} 
                        handlePlayerClick={handlePlayerClick} 
                    />
                )
            }

            {
                gameIsOver() && (
                    <ModalWindow timer={timer} wrongClicks={wrongClicks} />
                )
            }
        </div>
    );
}
