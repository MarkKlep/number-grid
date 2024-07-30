import { useState, FC } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import { formatTime } from '../../utilities/time-formater';

type ModalWindowProps = {
    timer: number;
    wrongClicks: number;
};

export const ModalWindow: FC<ModalWindowProps> = (props) => {
    const { timer, wrongClicks } = props;

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    return (
        <Dialog open={show} onClose={handleClose}>
            <DialogTitle>Game is over</DialogTitle>
            <DialogContent>
                <Typography>
                    Woohoo, your time is {formatTime(timer)} sec.
                </Typography>
                <Typography>Wrong clicks: {wrongClicks}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
