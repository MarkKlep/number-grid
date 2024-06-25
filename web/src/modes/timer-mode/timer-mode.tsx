import React, { useState, useEffect, useRef, FC } from 'react'
import { matrixNumbersGenerator } from '../../utilities/matrix-processing';
import { GridRenderer } from './grid-renderer';
import gridNumberClickSound from '../../assets/grid-number-click.mp3';
import { GridCell } from '../../types/timer-mode';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { ModalWindow } from './modal-window';
import '../../styles/timer-mode-panel.scss';

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
        intervalID.current = setInterval(() => {
            setTimer(timer => timer + 1);
        }, 1000);

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
            <Container className='timer-mode-panel'>
                <Row>
                    <Col>
                        <Badge bg="warning" text="dark" className="timer-badge">
                            Timer: {timer} sec.
                        </Badge>
                    </Col>
                </Row>
            </Container>

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
                    <ModalWindow timer={timer} />
                )
            }
        </div>
    );
}
