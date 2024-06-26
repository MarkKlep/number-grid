import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import "../../styles/grid.scss";
import { GridCellDoNotTouchMode } from '../../types/do-not-touch-mode';

type GridRendererProps = {
    gridCells: GridCellDoNotTouchMode[][],
    handlePlayerClick: (rowIndex: number, cellIndex: number) => void
}

export const GridRenderer = (props: GridRendererProps) => {
    const { gridCells, handlePlayerClick } = props;

    return (
        <Container className='nums-square' >
            {
                gridCells.map((row, rowIndex) => {
                     return (
                        <Row key={rowIndex} className='row-square' >
                            {
                                row.map((cell, cellIndex) => {
                                    const cellClasses = [
                                        'cell-square',
                                        cell.done ? 'done-cell-square' : '',
                                        cell.failed ? 'failed-cell-square' : ''
                                    ].join(' ');

                                    return (
                                            !cell.dangerous ? (
                                            <Col key={cellIndex} className={cellClasses} >
                                                <div className='cell-content' onClick={() => handlePlayerClick(rowIndex, cellIndex)} >
                                                    <div className='cell-value'>
                                                        {
                                                            cell.failed ? 'X' : cell.value
                                                        }
                                                    </div>
                                                </div>
                                            </Col>
                                            ) : (
                                            <Col key={cellIndex} className={cellClasses} >
                                                <div className='cell-content' >
                                                    <div className='cell-value'>
                                                        {
                                                            'BOMB'
                                                        }
                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                    )
                                })
                            }
                        </Row>
                    )
                })
            }
        </Container>
    )
}
