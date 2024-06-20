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
