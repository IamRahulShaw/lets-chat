import React from "react";
import {
  Box,
  Container,
  Text,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../context/chatprovider";

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      history.push("/chats");
    }
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        width="100%"
        m="40px 0 15px 0px"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          align="center"
          fontSize="3xl"
          fontFamily="'Work Sans', sans-serif"
          fontWeight={300}
          color="blackAlpha.800"
        >
          Lets Chat
        </Text>
      </Box>
      <Box
        bg="White"
        width="100%"
        paddingTop={4}
        paddingRight={4}
        paddingBottom={0}
        paddingLeft={4}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded" colorScheme="cyan">
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
