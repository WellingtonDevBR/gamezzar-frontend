import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

export function FollowUserModal({
  isOpen,
  onClose,
  axios,
  followeeUserName,
  token,
  isUserBeingFollowed,
  setIsUserBeingFollowed,
  followees,
  setFollowees,
}: any) {
  function handleFollow() {
    onClose(); // Close the modal immediately when this function is called

    if (isUserBeingFollowed) {
      if (followees.length > 0) {
        setFollowees(
          followees.filter(
            (currentFollowee) =>
              currentFollowee.followee.user_name !== followeeUserName
          )
        );
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .delete("/api/user/unfollow", {
          data: {
            username: followeeUserName,
          },
        })
        .then(() => {
          setIsUserBeingFollowed(false);
        })
        .catch((error) => {
          console.error("Failed to unfollow user: ", error);
        });

      return;
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .post("/api/user/follow", {
          username: followeeUserName,
        })
        .then(() => {
          setIsUserBeingFollowed(true);
        })
        .catch((error) => {
          console.error("Failed to follow user: ", error);
        });
    }
  }

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent bg="blackAlpha.800">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {isUserBeingFollowed ? "Unfollow User" : "Follow User"}
          </AlertDialogHeader>
          <AlertDialogBody>
            {isUserBeingFollowed
              ? "Are you sure you want to unfollow this user?"
              : "Are you sure you want to follow this user?"}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>Cancel</Button>
            {isUserBeingFollowed ? (
              <Button colorScheme="orange" onClick={handleFollow} ml={3}>
                Yes
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={handleFollow} ml={3}>
                Follow
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
