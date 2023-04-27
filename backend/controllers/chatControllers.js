const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(401);
    throw new Error("UserId is required");
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: userId } } },
      { users: { $elemMatch: { $eq: req.user._id } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "-password",
  });

  if (isChat.length > 0) {
    res.status(200).send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [userId, req.user._id],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(fullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const allChats = asyncHandler(async (req, res) => {
  try {
    let chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 });
    chats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "-password",
    });
    res.status(200).send(chats);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.users) {
    res.status(400);
    throw new Error("Group name and users are required");
  }
  let users = JSON.parse(req.body.users);
  users.push(req.user._id);
  let groupData = {
    chatName: req.body.name,
    isGroupChat: true,
    users: users,
    groupAdmin: req.user._id,
  };
  try {
    const createdChat = await Chat.create(groupData);
    let fullChat = await Chat.findOne({ _id: createdChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage");
    fullChat = await User.populate(fullChat, {
      path: "latestMessage.sender",
      select: "-password",
    });
    res.status(200).send(fullChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;
  if (!chatId || !chatName) {
    res.status(400);
    throw new Error("ChatId and chatName are required");
  }
  try {
    let updatedGroup = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage");
    updatedGroup = await User.populate(updatedGroup, {
      path: "latestMessage.sender",
      select: "-password",
    });
    res.status(200).send(updatedGroup);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  if (!chatId || !userId) {
    res.status(400);
    throw new Error("ChatId and userId are required");
  }
  try {
    let updatedGroup = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage");
    updatedGroup = await User.populate(updatedGroup, {
      path: "latestMessage.sender",
      select: "-password",
    });
    res.status(200).send(updatedGroup);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  if (!chatId || !userId) {
    res.status(400);
    throw new Error("ChatId and userId are required");
  }
  try {
    let updatedGroup = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage");
    updatedGroup = await User.populate(updatedGroup, {
      path: "latestMessage.sender",
      select: "-password",
    });
    res.status(200).send(updatedGroup);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  accessChat,
  allChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
};
