import { Avatar, Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

const UserListItem = ({ user, handdleFuncion }) => {
  return (
    <Box
      onClick={handdleFuncion}
      cursor="pointer"
      display="flex"
      alignItems="center"
      background="#E8E8E8"
      _hover={{ background: "#38b2AC", color: "white" }}
      width="100%"
      paddingX={3}
      paddingY={2}
      marginBottom={2}
      borderRadius="lg"
    >
      <Avatar
        src={user.pic}
        alt={user.name}
        marginRight={2}
        size="sm"
        cursor="pointer"
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>email: </b> {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
