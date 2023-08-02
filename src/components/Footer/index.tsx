import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { FooterLogo } from "./components/FooterLogo";
import { FooterLinks } from "./components/FooterLinks";

export function Footer() {
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
      <Box
        w="full"
        maxW="1000px"
        display="flex"
        direction="column"
        gap="4"
        mb="4"
      >
        <FooterLogo />
        <FooterLinks
          title="My Account"
          links={[
            "Authors",
            "Collection",
            "Author Profile",
            "Create Collection",
          ]}
        />
        <FooterLinks
          title="Resource"
          links={[
            "Authors",
            "Collection",
            "Author Profile",
            "Create Collection",
          ]}
        />
        <FooterLinks
          title="Company"
          links={["About Us", "Contact Us", "Our Blog", "Discover"]}
        />
        <Box as="section" display="flex" direction="column" gap="7">
          <h3>Subscribe Us</h3>
          <Flex direction={{ base: "column", md: "row" }}>
            <Input
              type="email"
              placeholder="Enter your email"
              mr={{ base: "0", md: "2" }}
              mb={{ base: "2", md: "0" }}
            />
            <Button colorScheme="teal">Send</Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
