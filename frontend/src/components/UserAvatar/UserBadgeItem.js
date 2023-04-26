import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      paddingX={2}
      paddingY={1}
      borderRadius="lg"
      margin="1px 5px 5px 1px"
      variant="solid"
      bg="purple.500"
      color="white"
      fontSize={12}
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      <CloseIcon size="sm" padding="2px" margin="0px 0px 2px 2px" />
    </Box>
  );
};

export default UserBadgeItem;
