import React, { useState, useEffect, useRef, FC } from 'react';
import { matrixWithDangerousCells } from '../../utilities/matrix-processing';
import { GridRenderer } from './grid-renderer';
import { GridCellDoNotTouchMode } from '../../types/do-not-touch-mode';
import { ModalWindow } from './modal-window';
import { Panel } from './panel';
import gridNumberClickSound from '../../assets/grid-number-click.mp3';

type DoNotTouchProps = {
    gridSize: number
}

export const DoNotTouch: FC<DoNotTouchProps> = (props) => {
    const { gridSize } = props;
    const [gridCells, setGridCells] = useState<GridCellDoNotTouchMode[][]>(matrixWithDangerousCells(gridSize));
    const [wrongClicks, setWrongClicks] = useState<number>(0);
    const [deadClick, setDeadClick] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(0);

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
        const audio = new Audio(gridNumberClickSound);
        audio.play();

        const clickedCell = gridCells[rowIndex][cellIndex];

        if(clickedCell.dangerous) setDeadClick(true);
        if(deadClick) return;
        if(clickedCell.failed) return;
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

    const handleNewGame = () => {
        setGridCells(matrixWithDangerousCells(gridSize));
        setTimer(0);
        setWrongClicks(0);
        setDeadClick(false);
    }

    useEffect(() => {
        if(gameIsOver() || deadClick) {
            clearInterval(intervalID.current);

            return;
        }

        intervalID.current = setInterval(() => {
            setTimer(timer + 10);
        }, 10);

        return () => {
            clearInterval(intervalID.current);
        }
    }, [timer, deadClick]);

    return (
        <div>
            <Panel timer={timer} wrongClicks={wrongClicks} handleNewGame={handleNewGame} />

            {
                gridCells.length > 0 && (
                    <GridRenderer gridCells={gridCells} handlePlayerClick={handlePlayerClick} />
                )
            }

            {
                (gameIsOver() || deadClick) && (
                    <ModalWindow deadClick={deadClick} wrongClicks={wrongClicks} timer={timer} />
                )
            }

        </div>
    );
}
