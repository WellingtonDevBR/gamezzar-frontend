import {
  Box,
  Flex,
  Text,
  Link,
  Input,
  Button,
  useBreakpointValue,
  VStack,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { FooterLogo } from "./components/FooterLogo";
import { FooterLinks } from "./components/FooterLinks";

export function Footer() {
  const direction = useBreakpointValue({ base: "column", md: "row" });

  return (
    <Flex
      as="footer"
      direction="column"
      justify="center"
      align="center"
      wrap="wrap"
      p="60px 0"
      bg="#0d0d11"
      color="white"
      minHeight="20vh"
    >
      <Stack
        direction={direction}
        spacing={8}
        align={direction === "column" ? "center" : "stretch"}
        justify="space-between"
        w="full"
        maxW="1000"
        px={0}
      >
        <Box w={["100%", "200px"]}>
          <FooterLogo />
        </Box>

        <FooterLinks
          title="My Account"
          links={["My Collections", "My Profile", "New Game"]}
        />

        <FooterLinks
          title="Company"
          links={["Contact Us", "Our Blog", "FAQs"]}
        />

        <Box as="section">
          <Text mb={2} fontSize="lg" fontWeight="bold">
            Subscribe Us
          </Text>
          <HStack spacing={2}>
            <Input type="email" placeholder="Enter your email" />
            <Button colorScheme="teal">Send</Button>
          </HStack>
        </Box>
      </Stack>
    </Flex>
  );
}
