import { GridCellDoNotTouchMode } from '../types/do-not-touch-mode';

export function matrixNumbersGenerator(squareSideLength: number): number[][] {
    const numsMatrix = [];

    for (let i = 0; i < squareSideLength; i++) {
        const row = [];
        for (let j = 0; j < squareSideLength; j++) {
            row.push(Math.floor(Math.random() * 100));
        }
        numsMatrix.push(row);
    }

    return numsMatrix;
}

function shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function matrixWithDangerousCells(
    squareSideLength: number
): GridCellDoNotTouchMode[][] {
    const numsMatrix = matrixNumbersGenerator(squareSideLength);

    const totalCells = squareSideLength * squareSideLength;
    const indices = Array.from({ length: totalCells }, (_, index) => index);

    const shuffledIndices = shuffleArray(indices);

    const dangerousCellsCount = Math.floor(totalCells / 5);
    const dangerousIndices = new Set(
        shuffledIndices.slice(0, dangerousCellsCount)
    );

    const grid = numsMatrix.map((row, rowIndex) => {
        return row.map((cell, cellIndex) => {
            const flatIndex = rowIndex * squareSideLength + cellIndex;
            return {
                value: cell,
                rowIndex,
                cellIndex,
                done: false,
                failed: false,
                dangerous: dangerousIndices.has(flatIndex),
            };
        });
    });

    return grid;
}
