import React, { FC } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { formatTime } from '../../utilities/time-formater';

type PanelProps = {
    timer: number,
    wrongClicks: number,
    handleNewGame: () => void
}

export const Panel: FC<PanelProps> = (props) => {
    const { timer, wrongClicks, handleNewGame } = props;

    return (
        <Container className='timer-mode-panel'>
            <Row>
                <Col>
                    <Badge bg="warning" text="dark" className="timer-badge">
                        Timer: {formatTime(timer)} sec.
                    </Badge>
                </Col>
                <Col>
                    <Badge bg="danger" className="timer-badge">
                        Oops... {wrongClicks} clicks
                    </Badge>
                </Col>
                <Col>
                    <Button 
                        variant="primary" 
                        className="start-button"
                        style={{ fontWeight: 'bold' }}
                        onClick={handleNewGame}    
                    >
                        Start New Game
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
