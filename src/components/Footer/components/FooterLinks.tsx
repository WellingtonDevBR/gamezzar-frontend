import { Box, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const dictionaryOfLinks = {
  "Our Blog": "/blog",
  "Contact Us": "/contact-us",
  FAQs: "/faq",
  "My Collections": "/dashboard",
  "My Profile": "/dashboard",
  "New Game": "/user/request/new-game",
};

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
        <RouterLink key={index} to={dictionaryOfLinks[link]}>
          <Text fontSize="md" fontWeight="medium">
            {link}
          </Text>
        </RouterLink>
      ))}
    </VStack>
  );
}
