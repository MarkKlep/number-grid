import { FC } from 'react';
import { Container, Grid, Box, Badge, Button } from '@mui/material';
import { formatTime } from '../../utilities/time-formater';

type PanelProps = {
    timer: number;
    wrongClicks: number;
    handleNewGame: () => void;
};

export const Panel: FC<PanelProps> = (props) => {
    const { timer, wrongClicks, handleNewGame } = props;

    return (
        <Container className="timer-mode-panel">
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                    <Box display="flex" justifyContent="center">
                        <Badge
                            badgeContent={`Timer: ${formatTime(timer)} sec.`}
                            color="warning"
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box display="flex" justifyContent="center">
                        <Badge
                            badgeContent={`Oops... ${wrongClicks} clicks`}
                            color="error"
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box display="flex" justifyContent="center">
                        <Button
                            variant="contained"
                            color="primary"
                            className="start-button"
                            style={{ fontWeight: 'bold' }}
                            onClick={handleNewGame}
                        >
                            Start New Game
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};
