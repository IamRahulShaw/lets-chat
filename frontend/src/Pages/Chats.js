import React, { useState } from "react";
import SideDrawer from "../components/Miscellaneous/SideDrawer";
import ChatList from "../components/Miscellaneous/ChatList";
import ChatBox from "../components/Miscellaneous/ChatBox";
import { Box } from "@chakra-ui/react";
import { ChatState } from "../context/chatprovider";

const Chats = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <ChatList fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chats;
