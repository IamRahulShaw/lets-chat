const getSender = (loggedUser, users) => {
  return users.filter((user) => user._id !== loggedUser._id)[0].name;
};

const getSenderFull = (loggedUser, users) => {
  return users.filter((user) => user._id !== loggedUser._id)[0];
};

const isSameSender = (messages, currentMessage, index, userId) => {
  return (
    index < messages.length - 1 && // if not the last message
    (messages[index + 1].sender._id !== currentMessage.sender._id || // if the next message is not from the same sender
      messages[index + 1].sender._id === undefined) && // If the next message is undefined
    currentMessage.sender._id !== userId // If the current message is not from the logged user
  );
};

const isLastMessage = (messages, index, userId) => {
  return (
    index === messages.length - 1 && // If the current message is the last message
    messages[messages.length - 1].sender._id !== userId && // If the current message is not from the logged user
    messages[messages.length - 1].sender._id // If the current message is not undefined
  );
};

const isSameSenderMargin = (messages, currentMessage, index, userId) => {
  if (
    index < messages.length - 1 &&
    messages[index + 1].sender._id === currentMessage.sender._id &&
    messages[index].sender._id !== userId
  ) {
    return 33;
  } else if (
    (index < messages.length - 1 &&
      messages[index + 1].sender._id !== currentMessage.sender._id &&
      messages[index].sender._id !== userId) ||
    (index === messages.length - 1 && messages[index].sender._id !== userId)
  ) {
    return 0;
  } else {
    return "auto";
  }
};

const isSameUser = (messages, currentMessage, index) => {
  return (
    index > 0 && messages[index - 1].sender._id === currentMessage.sender._id
  );
};

export {
  getSender,
  getSenderFull,
  isSameSender,
  isLastMessage,
  isSameSenderMargin,
  isSameUser,
};
