import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import NewReviewForm from '../../components/NewReviewForm'

export default function AddReviewModal({ game_loader, isOpen, onOpen, onClose, handleNewReview }) {
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        size="xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent style={{ backgroundColor: "#334139" }}>
          <ModalHeader style={{fontSize:"30px", fontWeight:"bold"}}>Add Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <NewReviewForm game_loader={game_loader} onClose={onClose} handleNewReview={handleNewReview} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
)
}

