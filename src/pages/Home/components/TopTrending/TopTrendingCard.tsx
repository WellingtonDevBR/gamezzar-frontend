import { Box, Image, Heading } from "@chakra-ui/react";
import { ICardData } from "./utils";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox: any = motion(Box);

export interface TrendingCardProps {
  item: ICardData;
}

export const TrendingCard: React.FC<TrendingCardProps> = ({ item }) => (
  <Box>
    <Link to={`/game/${item.gameId}`}>
      <Box
        bgColor="#1c1c2b"
        p={4}
        borderRadius="md"
        width="185px"
        height="240px"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        <MotionBox
          d="flex"
          justifyContent="center"
          boxSize="190px"
          alignItems="center"
          fontSize="sm"
          whileHover={{ scale: 1.05 }} // Add scale effect on hover
        >
          <Image
            src={item.imageUrl}
            alt="avatar"
            borderRadius="md"
            objectPosition="center"
            width="160px"
            height="180px"
            objectFit="cover"
          />
        </MotionBox>
        <Box
          mt={2}
          fontSize="xs"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading size="sm" isTruncated>
            {item.title}
          </Heading>
        </Box>
      </Box>
    </Link>
  </Box>
);
