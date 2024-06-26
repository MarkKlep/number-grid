import React, { useState, useEffect, FC } from 'react';
import { matrixWithDangerousCells } from '../../utilities/matrix-processing';
import { GridRenderer } from './grid-renderer';
import { GridCellDoNotTouchMode } from '../../types/do-not-touch-mode';

type DoNotTouchProps = {
    gridSize: number
}

export const DoNotTouch: FC<DoNotTouchProps> = (props) => {
    const { gridSize } = props;
    const [gridCells, setGridCells] = useState<GridCellDoNotTouchMode[][]>(matrixWithDangerousCells(gridSize));
    const [wrongClicks, setWrongClicks] = useState<number>(0);
    const [deadClick, setDeadClick] = useState<boolean>(false);

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
        // const audio = new Audio(gridNumberClickSound);
        // audio.play();

        const clickedCell = gridCells[rowIndex][cellIndex];

        if(clickedCell.dangerous) setDeadClick(true);
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

    return (
        <div>
            {
                gridCells.length > 0 && (
                    <GridRenderer gridCells={gridCells} handlePlayerClick={handlePlayerClick} />
                )
            }

            {
                (gameIsOver() || deadClick) && (
                    <h1>Game Over</h1>
                )
            }

        </div>
    );
}
