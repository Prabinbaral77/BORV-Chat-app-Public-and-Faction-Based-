import mongoose  from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
  senderSocketId: { type: String, required: true },
  messageInfo: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Messages', 'Event'], 
    required: true 
  },
  messageCategory: { type: String, required: true }, //Public or faction
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message