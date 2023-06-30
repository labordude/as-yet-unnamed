import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import AddGame from "../games/add-game-form";

export default function AddGameModal({isOpen, onOpen, onClose, addNewGame}) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        size="xl"
        closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Game</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <AddGame onClose={onClose} addNewGame={addNewGame} />
          </ModalBody>
          <ModalFooter>
            {/* <Button onClick={onClose}>Cancel</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
