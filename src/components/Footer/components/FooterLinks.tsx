import { Box, Text, VStack, Link, useBreakpointValue } from "@chakra-ui/react";

export function FooterLinks({ title, links }) {
  const direction = useBreakpointValue({ base: "column", md: "row" });
  return (
    <VStack
      direction={direction}
      spacing={direction === "column" ? "1" : "4"}
      align={direction === "column" ? "center" : "start"}
    >
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        {title}
      </Text>
      {links.map((link, index) => (
        <Link href="#" key={index}>
          {link}
        </Link>
      ))}
    </VStack>
  );
}
