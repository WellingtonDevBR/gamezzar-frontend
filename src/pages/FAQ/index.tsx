import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Container,
  Text,
} from "@chakra-ui/react";

export function FAQ() {
  return (
    <Container maxW="container.md" p="6" mt="20" mb="400">
      <Heading mb="6">Frequently Asked Questions</Heading>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Text as="b" fontSize={22}>
                What is Gamezzar?
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} fontSize={18}>
            Gamezzar is a pioneering platform for trading video games. We
            support a multitude of platforms and offer games from diverse
            genres. Whether you're a fan of classic games like Mario, or prefer
            immersive experiences like God of War, Gamezzar has something for
            everyone.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" Text as="b" fontSize={22}>
              Which platforms are supported?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} fontSize={18}>
            Gamezzar supports a wide range of gaming platforms including
            PlayStation, Xbox, Nintendo, PC and more. We believe in catering to
            the varied tastes of our gaming community.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" Text as="b" fontSize={22}>
              How does the trading system work?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} fontSize={18}>
            The trading system at Gamezzar is designed to be secure, reliable,
            and easy to use. Simply list the games you have for trade, find a
            game you want, and initiate a trade. Once the trade is accepted and
            both parties agree, the games will be exchanged.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" Text as="b" fontSize={22}>
              What is the process to list a game for trade?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} fontSize={18}>
            To list a game for trade, log into your Gamezzar account, go to your
            inventory, and click "Trade". Then, fill in the game details,
            including platform, region, and category. Make sure your description
            is accurate to ensure a smooth trade.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" Text as="b" fontSize={22}>
              How can I contact support?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} fontSize={18}>
            You can contact our support team by navigating to the Contact page
            on our website and filling out the form provided. Alternatively, you
            can email us directly at support@gamezzar.com. We strive to respond
            to all inquiries as soon as possible.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
}
