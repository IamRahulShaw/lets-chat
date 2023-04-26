import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { ChatState } from "../../context/chatprovider";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      padding={3}
      borderRadius="lg"
      borderWidth="1px"
      bg="white"
      width={{ base: "100%", md: "68%" }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
