import React, { useState, FC } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { formatTime } from '../../utilities/time-formater';

type ModalWindowProps = {
    timer: number,
    wrongClicks: number
}

export const ModalWindow: FC<ModalWindowProps> = (props) => {
    const { timer, wrongClicks } = props;

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Game is over</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you`re time is {formatTime(timer)}sec.</Modal.Body>
          <Modal.Body>Wrong clicks: {wrongClicks}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
