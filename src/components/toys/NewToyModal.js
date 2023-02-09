import { Modal } from 'react-bootstrap'
import { createToy } from '../../api/toys'

const NewToyModal = (props) => {
    const { user, pet, show, handleClose, msgAlert, triggerRefresh } = props

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <p>new toy modal</p>
            </Modal.Body>
        </Modal>
    )
}

export default NewToyModal