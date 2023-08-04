import { HStack } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

interface AuthenticationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthenticationModal({
  isOpen,
  onClose,
}: AuthenticationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="blackAlpha.800">
        <ModalHeader>Authentication Required</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          To access this feature, user authentication is required.
        </ModalBody>

        <ModalFooter spacing="20px">
          <HStack>
            <NavLink to="/login">
              <Button
                bg="#5142FC"
                color="#fff"
                _hover={{ filter: "brightness(0.9)" }}
              >
                Login
              </Button>
            </NavLink>
            <NavLink to="/signup">
              <Button colorScheme="whiteAlpha.400" _hover={{ bg: "red" }}>
                Signup
              </Button>
            </NavLink>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
