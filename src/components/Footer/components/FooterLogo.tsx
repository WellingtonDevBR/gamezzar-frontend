import { Box, VStack, Link, HStack, Image } from "@chakra-ui/react";
import { LOGO_COLOR, LOGO_SIZE, SOCIAL_LINKS } from "./constants";
import logo from "../../../assets/logo.svg";

export function FooterLogo() {
  return (
    <Box w="200px" d="flex" flexDir="column" mb={6}>
      <VStack boxSize="10rem" spacing={4}>
        <Image src={logo} alt="Gamezzar Logo" />
        <HStack spacing={2} justifyContent="center" alignItems="center">
          {SOCIAL_LINKS.map(({ Component, href }, index) => (
            <Link key={index} href={href} bg="#343444" p={2} borderRadius="md">
              <Component size={LOGO_SIZE} color={LOGO_COLOR} />
            </Link>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
}
