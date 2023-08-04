import {
  Box,
  Input,
  Textarea,
  Button,
  Text,
  Select,
  VStack,
  Heading,
  Flex,
  Image
} from "@chakra-ui/react";
import { useEffect } from "react";
import Logo from "../../assets/smallLogo.svg";

export function Contact() {
  useEffect(() => {
    document.title = "Contact | Gamezzar";
  }, []);

  return (
    <Flex
      direction={["column", "row"]}
      justify="center"
      alignItems="center"
      p="6"
    >
      <Box flex="1" display="flex" justifyContent="center" alignItems="center">
        <Image src={Logo} alt="Logo" />
      </Box>

      <Box flex="1" px={["0", "6"]} py={["6", "0"]}>
        <VStack spacing="6" alignItems="start">
          <Heading as="h1" size="lg">
            Get in Touch
          </Heading>
          <Text>
            We would love to hear from you. Whether you have a question about 
            features, trials, pricing, or anything else, our team is ready 
            to answer all your questions. Fill out the form below and we'll 
            be in touch as soon as possible.
          </Text>
          <Input placeholder="Full Name" id="full-name" />

          <Input placeholder="Email Address" type="email" id="email" />

          <Select bg="teal" fontWeight="bold" placeholder="Subject" id="subject">
            <option style={{ backgroundColor: "teal" }} value="support">
              Technical Support
            </option>
            <option style={{ backgroundColor: "teal" }} value="sales">
              Questions about our Trading System
            </option>
            <option style={{ backgroundColor: "teal" }} value="general">
              General Inquiry
            </option>
          </Select>

          <Textarea placeholder="Your Message" id="message" />

          <Button type="submit" colorScheme="teal" size="lg" isFullWidth>
            Send Message
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
