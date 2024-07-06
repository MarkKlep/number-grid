import React from 'react'
import { Container, Grid, Box } from '@mui/material'
import "../../styles/grid.scss";
import { GridCellDoNotTouchMode } from '../../types/do-not-touch-mode';

type GridRendererProps = {
    gridCells: GridCellDoNotTouchMode[][],
    handlePlayerClick: (rowIndex: number, cellIndex: number) => void
}

export const GridRenderer = (props: GridRendererProps) => {
    const { gridCells, handlePlayerClick } = props;

    return (
        <Container className='nums-square'>
            {
                gridCells.map((row, rowIndex) => (
                    <Grid container key={rowIndex} className='row-square'>
                        {
                            row.map((cell, cellIndex) => {
                                const cellClasses = [
                                    'cell-square',
                                    cell.done ? 'done-cell-square' : '',
                                    cell.failed ? 'failed-cell-square' : ''
                                ].join(' ');

                                return (
                                    <Grid item xs key={cellIndex} className={cellClasses}>
                                        <Box className='cell-content' onClick={() => handlePlayerClick(rowIndex, cellIndex)}>
                                            <Box className='cell-value'>
                                                {
                                                    cell.failed ? 'X' : cell.dangerous ? 'BOMB' : cell.value
                                                }
                                            </Box>
                                        </Box>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                ))
            }
        </Container>
    )
}
