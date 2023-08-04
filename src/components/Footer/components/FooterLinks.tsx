import { Box, Text, VStack, Link, useBreakpointValue } from "@chakra-ui/react";

const dictioonaryOfLinks = [
  {
    "Our Blog": "/blog",
    "Contact Us": "/contact-us",
    FAQs: "/faq",
  },
];

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
        <Link
          key={index}
          href={dictioonaryOfLinks[0][link]}
          _hover={{ textDecoration: "none" }}
        >
          <Text fontSize="md" fontWeight="medium">
            {link}
          </Text>
        </Link>
      ))}
    </VStack>
  );
}
