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
  import AddGame from '../games/add-game-form'

export default function AddGameModal({ isOpen, onOpen, onClose }) {
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
          <ModalContent style={{backgroundColor:"#334139"}}>
            <ModalHeader style={{fontSize:"30px", fontWeight:"bold", marginLeft:"180px"}}>Add Game</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <AddGame onClose={onClose}/>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
  )
}



