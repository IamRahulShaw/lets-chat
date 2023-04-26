import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogics";
import { ChatState } from "../../context/chatprovider";
import { Avatar, Tooltip } from "@chakra-ui/react";
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";

const ScrollableChat = ({ messages, isTyping }) => {
  const { user } = ChatState();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((currentMessage, index) => {
          return (
            <div style={{ display: "flex" }} key={currentMessage._id}>
              {isSameSender(messages, currentMessage, index, user._id) ||
              isLastMessage(messages, index, user._id) ? (
                <Tooltip
                  label={currentMessage.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    marginTop={"7px"}
                    marginRight={1}
                    size="sm"
                    cursor="pointer"
                    name={currentMessage.sender.name}
                    src={currentMessage.sender.pic}
                  />
                </Tooltip>
              ) : (
                <></>
              )}
              <span
                style={{
                  backgroundColor: `${
                    currentMessage.sender._id === user._id
                      ? "#bee3f8"
                      : "#b9f5d0"
                  }`,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                  marginLeft: isSameSenderMargin(
                    messages,
                    currentMessage,
                    index,
                    user._id
                  ),
                  marginTop: isSameUser(messages, currentMessage, index)
                    ? 3
                    : 10,
                }}
              >
                {currentMessage.content}
              </span>
            </div>
          );
        })}
      {isTyping ? (
        <div>
          <Lottie
            options={defaultOptions}
            width={70}
            style={{ marginBottom: 0, marginLeft: 0, marginTop: 0 }}
            isStopped={isTyping}
          />
        </div>
      ) : (
        <></>
      )}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
