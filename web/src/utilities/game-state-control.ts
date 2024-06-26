export function gameIsOver(gridCells: any) {
    return gridCells.flat().every((cell: any) => cell.done || cell.failed);
}