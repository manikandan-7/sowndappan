const chats = require("../models").chats;

const newChat = async (req, res) => {
  try {
    let { message, sender, reciever, time } = req.body;
    if (!message || !sender || !reciever || !time) return res.status(417).json({ success: false, message: "Need Sufficient Data t perform this action" });
    let response = await chats.create({ sender, reciever, time, message });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ err: "Some Error Occured. Please try again later" });
  }
};

const getAllChats = async (req, res) => {
  let { sender } = req.body;
  let data = await chats.findAll();
  let userChats = data.filter(i => i.sender === sender || i.reciever === sender);
  res.status(200).json(userChats);
};

module.exports = {
  newChat,
  getAllChats
};
