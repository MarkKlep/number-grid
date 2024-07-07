import React, { FC, useState, useEffect } from 'react';
import { Box, Stack, MenuItem, TextField, Button, InputAdornment, Divider } from '@mui/material';
import "../styles/game-panel.scss";
import { set } from 'react-hook-form';

type GamePanelProps = {
    gridSize: number,
    gameModes: readonly string[],
    startNewGame: boolean,
    selectedGameMode: string,
    setStartNewGame: (startNewGame: boolean) => void,
    setSelectedGameMode: (gameMode: string) => void,
    setGridSize: (gridSize: number) => void,
}

export const GamePanel: FC<GamePanelProps> = (props) => {

    const { gridSize, setGridSize, selectedGameMode, setSelectedGameMode, gameModes, startNewGame, setStartNewGame } = props;

    const [selectFieldError, setSelectFieldError] = useState<boolean>(false);

    const handleStartNewGame = () => {
        setStartNewGame(!startNewGame);

        if(!selectedGameMode) {
            setSelectFieldError(true);
        }
    }

    useEffect(() => {
        if(selectedGameMode) {
            setSelectFieldError(false);
        }
    }, [selectedGameMode])

    const handleSetMapSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const gridSize = parseInt(event.target.value);

        if(gridSize < 0 || gridSize> 15) return;

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
        <Box padding={2} sx={{ width: "100%", background: '#f0f0f0', borderRadius: 1, boxShadow: 1 }} >
            <Stack 
                height={100}
                direction="row" 
                spacing={5} 
                alignItems={'center'}
                divider={
                    <Divider
                        orientation="vertical"
                        sx={{ height: '80%', background: '#f5f5f5'}}
                    />
                }    
            >
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
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">{`${gridSize * gridSize} cells`}</InputAdornment>
                                    }}
                                />
                            )
                        })()
                    }

                    <TextField
                        variant='outlined'
                        select
                        label="Game Mode"
                        helperText={selectedGameMode ? "" : "Please select a game mode"}
                        sx={{ width: '200px'}}
                        value={selectedGameMode}
                        onChange={handleSelectGameMode}
                        error={selectFieldError}
                    >
                        {gameModes.map((gameMode, index) => (
                            <MenuItem key={index} value={gameMode}>
                                {gameMode}
                            </MenuItem>
                        ))}
                    </TextField>

                <Button 
                    sx={{ width: '120px', height: '56px'}}
                    onClick={handleStartNewGame} 
                    variant={startNewGame ? "outlined" : "contained"}
                    color={startNewGame ? 'error' : 'primary'}
                >
                    {startNewGame ? 'Quit' : 'Start'}
                </Button>
            </Stack>
        </Box>
    )
}
