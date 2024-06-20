import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type GamePanelProps = {
    gridSize: number,
    setGridSize: (gridSize: number) => void,
    handleStartNewGame: () => void
}

export const GamePanel: FC<GamePanelProps> = (props) => {

    const { gridSize, setGridSize, handleStartNewGame } = props;

    const handleSetMapSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGridSize(parseInt(event.target.value));
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <label>
                        Map Size:
                        <input type="number" name="mapSize" onChange={handleSetMapSize} value={gridSize} />
                    </label>
                </Col>
                <Col>
                    <Button variant="primary" onClick={handleStartNewGame}>Start</Button>
                </Col>
            </Row>
        </Container>
    )
}
