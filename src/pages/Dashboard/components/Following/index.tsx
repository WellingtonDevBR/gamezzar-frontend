import {
  Box,
  Image,
  VStack,
  Text,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { getAxiosInstance } from "../../../../services/axios";
import { FollowUserModal } from "../../../Profile/components/FollowModal";

export function Following({ followees, token, setFollowees }) {
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [unfollowUser, setUnfollowUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);

  async function handleFollowUser(followeeUserName) {
    if (!token) {
      onOpen();
      return;
    }
    setUnfollowUser(followeeUserName);
    setIsFollowModalOpen(true);
  }

  return (
    <Box p={5} w="80%">
      <Text fontSize="2xl" mb={5}>
        Following
      </Text>
      <VStack spacing={0} align="start">
        {followees.map((user) => {
          return (
            <Box key={user.followee.user_name} width="100%">
              <Flex
                bg="blackAlpha.800"
                boxShadow="md"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                align="center"
                w="100%"
                mt={4}
              >
                <Image
                  src={`${import.meta.env.VITE_S3_URL}/avatar/${
                    user.followee.avatar
                  }`}
                  alt="avatar"
                  boxSize="80px"
                  mr={4}
                />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold">{user.followee.first_name}</Text>
                  <Text color="gray.500">
                    {user.followee.address?.address
                      ? user.followee.address?.address
                      : "Address not set"}
                  </Text>
                </VStack>
                <Button
                  ml="auto"
                  colorScheme="red"
                  onClick={() => handleFollowUser(user.followee.user_name)}
                >
                  Unfollow
                </Button>
              </Flex>
              <FollowUserModal
                axios={axios}
                followeeUserName={unfollowUser}
                token={token}
                isOpen={isFollowModalOpen}
                isUserBeingFollowed={true}
                onClose={() => {
                  setIsFollowModalOpen(false);
                  setUnfollowUser(null);
                }}
                followees={followees}
                setFollowees={setFollowees}
              />
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}
