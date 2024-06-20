import React, { useState, useEffect } from 'react'
import { matrixNumbersGenerator } from '../utilities/matrix-processing';

type GridRendererProps = {
    matrixNumbers: number[][],
}

export const GridRenderer = (props: GridRendererProps) => {

    const { matrixNumbers } = props;

    return (
        <table>
            <tbody>
                {
                    matrixNumbers.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
                                {
                                    row.map((cell, cellIndex) => {
                                        return (
                                            <td key={cellIndex}>
                                                {cell}
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
