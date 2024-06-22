import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import "../styles/grid.scss";
import { GridCell } from './single-play';

type GridRendererProps = {
    gridCells: GridCell[][],
    handleGridUpdate: (rowIndex: number, cellIndex: number) => void
}

export const GridRenderer = (props: GridRendererProps) => {
    const { gridCells, handleGridUpdate } = props;

    return (
        <Container className='nums-square' >
            {
                gridCells.map((row, rowIndex) => {
                     return (
                        <Row key={rowIndex} className='row-square' >
                            {
                                row.map((cell, cellIndex) => {
                                    return (
                                        <Col key={cellIndex} className={cell.clicked ? 'clicked-cell-square' : 'cell-square'} >
                                            <div className={'cell-content'} onClick={() => handleGridUpdate(rowIndex, cellIndex)} >
                                                <div className="cell-value">
                                                    {cell.value}
                                                </div>
                                            </div>
                                        </Col>
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
