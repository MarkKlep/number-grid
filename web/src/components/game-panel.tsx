import React, { FC } from 'react';
import { Stack, InputLabel, MenuItem, FormControl, Select, TextField, Button } from '@mui/material';
import "../styles/game-panel.scss";

type GamePanelProps = {
    gridSize: number,
    gameModes: readonly string[],
    startNewGame: boolean,
    selectedGameMode: string,
    setStartNewGame: (startNewGame: boolean) => void,
    setSelectedGameMode: (gameMode: string) => void,
    setGridSize: (gridSize: number) => void,
    handleStartNewGame: () => void
}

export const GamePanel: FC<GamePanelProps> = (props) => {

    const { gridSize, setGridSize, selectedGameMode, handleStartNewGame, setSelectedGameMode, gameModes, startNewGame, setStartNewGame } = props;

    const handleSetMapSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const gridSize = parseInt(event.target.value);

        if(gridSize < 0) return;

        setGridSize(gridSize);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
    }

    const handleSelectGameMode = (event: any) => {
        const gameMode = event.target.value as string;
        setSelectedGameMode(gameMode);
        setStartNewGame(false);
    }

    const toggleErrStateGridSizeField = (gridSize: number) => {
        return gridSize < 2 || gridSize > 10;
    }

    return (
        <Stack direction="row" spacing={2} className="game-panel-container">
            <FormControl variant="outlined">
                {
                    (() => {
                        const isError = toggleErrStateGridSizeField(gridSize);

                        return (
                            <TextField
                                sx={{ width: '200px' }}
                                variant="filled"
                                type="number"
                                onChange={handleSetMapSize}
                                onKeyDown={handleKeyDown}
                                value={gridSize}
                                label="Grid Size"
                                defaultValue={2}
                                error={isError}
                                helperText={isError ? "Grid size must be between 2 and 10" : ""}
                            />
                        )
                    })()
                }
            </FormControl>

            <FormControl variant="outlined">
                <TextField
                    variant='outlined'
                    select
                    label="Game Mode"
                    helperText={selectedGameMode ? "" : "Please select a game mode"}
                    sx={{ width: '200px'}}
                    value={selectedGameMode}
                    onChange={handleSelectGameMode}
                >
                    {gameModes.map((gameMode, index) => (
                        <MenuItem key={index} value={gameMode}>
                            {gameMode}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>

            <Button 
                sx={{ width: '120px', height: '56px'}}
                onClick={handleStartNewGame} 
                variant={startNewGame ? "outlined" : "contained"}
                color={startNewGame ? 'error' : 'primary'}
            >
                {startNewGame ? 'Quit' : 'Start'}
            </Button>
        </Stack>
    )
}
