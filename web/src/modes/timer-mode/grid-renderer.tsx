import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import "../../styles/grid.scss";
import { GridCell } from '../../types/timer-mode';

type GridRendererProps = {
    gridCells: GridCell[][],
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
                                                {cell.failed ? 'X' : cell.value}
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
    );
}
