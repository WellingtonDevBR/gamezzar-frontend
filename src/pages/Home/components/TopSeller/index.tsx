import {
  Box,
  Grid,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";

interface IUser {
  user_id: string;
  user_name: string;
  avatar: string;
}

interface TopSellersProps {
  users: IUser[];
}

export function TopSellers({ users }: TopSellersProps) {
  const displayedUsers = users.slice(0, 10);

  const columns = useBreakpointValue({
    base: 2,
    sm: 3,
    md: 5,
    lg: 7,
    xl: 10,
  });

  const truncate = (input: string) =>
    input.length > 8 ? `${input.substring(0, 8)}...` : input;

  return (
    <>
      <Heading as="h1" size="lg" mb={5}>
        Top Sellers
      </Heading>
      <Box maxW="container.xl" mx="auto">
        <Grid
          templateColumns={`repeat(${columns}, 1fr)`}
          gap={4}
          align="center"
          justify="center"
        >
          {displayedUsers.map((user: IUser) => (
            <LinkBox rounded="md" key={user.user_id}>
              <Image
                borderRadius="full"
                minH="80px"
                minW="80px"
                maxW="80px"
                maxH="80px"
                src={`${import.meta.env.VITE_S3_URL}/avatar/${user.avatar}`}
                alt={user.user_name}
                mb="1rem"
                objectFit="cover"
              />
              <Tooltip label={user.user_name} placement="top" hasArrow>
                <LinkOverlay href={`/profile/${user.user_name}`}>
                  <Text fontSize="xl" isTruncated>
                    {truncate(user.user_name)}
                  </Text>
                </LinkOverlay>
              </Tooltip>
            </LinkBox>
          ))}
        </Grid>
      </Box>
    </>
  );
}
