import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import noData from '../assets/no-data.png'

const DeleteConfirmation = ({ show, onClose, onConfirm, itemName }) => {
  return (
    <Modal show={show} onHide={onClose}   centered>
      <Modal.Header closeButton />
      <div className='text-center'>
        <Modal.Body>
          <img src={noData} alt="No Data" />
        </Modal.Body>
        <Modal.Body className='pb-0'>
          <h5 style={{ color: "#494949" }} className='pb-2 font-bold'>
            Delete This Category?
          </h5>
        </Modal.Body>
        <Modal.Body className='pt-0'>
          are you sure you want to delete <strong>{itemName}</strong>? if you are sure just click on delete it
        </Modal.Body>
      </div>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button  variant="btn btn-outline-danger "  onClick={onConfirm}>
          Delete this item
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmation