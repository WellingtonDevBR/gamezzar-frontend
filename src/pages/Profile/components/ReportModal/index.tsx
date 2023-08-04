import {
  Select,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

export function ReportUserModal({ isOpen, onClose }) {
  const [isReported, setIsReported] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");

  function handleReport() {
    console.log("Reporting user for:", selectedReason);
    setIsReported(true);
    onClose();
  }

  function handleReasonChange(e) {
    setSelectedReason(e.target.value);
  }

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent bg="blackAlpha.800">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Report User
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to report this user?
            <Select
              color="white"
              placeholder="Select a reason"
              onChange={handleReasonChange}
              mt={3}
            >
              <option style={{ color: "black" }} value="fraudulentListing">
                Fraudulent listing
              </option>
              <option style={{ color: "black" }} value="harassment">
                Harassment
              </option>
              <option style={{ color: "black" }} value="spam">
                Spam
              </option>
              <option style={{ color: "black" }} value="fakeAccount">
                Fake account
              </option>
              <option style={{ color: "black" }} value="illegalContent">
                Illegal content
              </option>
              <option style={{ color: "black" }} value="scamAttempt">
                Scam attempt
              </option>
              <option style={{ color: "black" }} value="falseAdvertising">
                False advertising
              </option>
              <option style={{ color: "black" }} value="privacyViolation">
                Privacy violation
              </option>
              <option style={{ color: "black" }} value="offensiveLanguage">
                Offensive language or hate speech
              </option>
            </Select>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="red" onClick={handleReport} ml={3}>
              Report
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
