import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import '../styles/panel.scss';

type GamePanelProps = {
    gridSize: number,
    gameModes: readonly string[],
    startNewGame: boolean,
    setSelectedGameMode: (gameMode: string) => void,
    setGridSize: (gridSize: number) => void,
    handleStartNewGame: () => void
}

export const GamePanel: FC<GamePanelProps> = (props) => {

    const { gridSize, setGridSize, handleStartNewGame, setSelectedGameMode, gameModes, startNewGame } = props;

    const handleSetMapSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const gridSize = parseInt(event.target.value);

        if (gridSize < 2) {
            alert('Grid size must be greater than 1');
            return;
        }
        else if (gridSize > 10) {
            alert('Grid size must be less than 10');
            return;
        }

        setGridSize(gridSize);
    }

    const handleSelectGameMode = (eventKey: string | null) => {
        if (eventKey) {
            setSelectedGameMode(eventKey);
        }
    }

    return (
        <Container fluid className="game-panel-container">
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-grid-size">
                            Grid Size:
                        </InputGroup.Text>
                        <Form.Control
                            type="number" name="mapSize" onChange={handleSetMapSize} value={gridSize}
                            aria-label="Grid Size"
                            aria-describedby="inputGroup-grid-size"
                        />
                    </InputGroup>
                </Col>
                <Col>
                    <DropdownButton id="dropdown-basic-button" title="Select Game Mode" onSelect={handleSelectGameMode} className="dropdown-button">
                        {gameModes.map((gameMode, index) => {
                            return <Dropdown.Item key={index} eventKey={gameMode}>{gameMode}</Dropdown.Item>
                        })}
                    </DropdownButton>
                </Col>
                <Col>
                    <Button 
                        variant={startNewGame ? 'danger' : 'success'}
                        onClick={handleStartNewGame} 
                        className="start-button">
                        {
                            startNewGame ? 'Quite' : 'Start'
                        }
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}
