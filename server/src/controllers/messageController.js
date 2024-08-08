import Message from '../models/message.model.js';

export const getAllMessages = async (req, res) => {
  try {
      const {category} = req.query
      console.log("============Getting all message info==============", category)
    // const messages = await Message.find({messageCategory: category});
    // const messages = await Message.find({ messageCategory }).select('socketId message type').exec();
    const messages = await Message.find({ messageCategory:category  })
    .select('senderSocketId messageInfo type')
    .lean()
    .exec();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const createMessage = async (req, res) => {
//   const { socketId, message, type } = req.body;
//   const newMessage = new Message({
//     socketId,
//     message,
//     type,
//   });

//   try {
//     const savedMessage = await newMessage.save();
//     res.status(201).json(savedMessage);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
