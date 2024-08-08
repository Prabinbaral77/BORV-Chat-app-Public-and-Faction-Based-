import Message from '../models/message.model.js';  // Adjust the path as necessary

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('connection-success-msg', async ({socketId}) => {
      try {
        const findMsg= await Message.findOne({senderSocketId: socketId});
        const msg = ` ${socketId} Joinned Public chat.`
        if(!findMsg) {
        io.emit("receive-public-message", {messageInfo:msg, senderSocketId: socketId, type:"Event"})
          const message = new Message({
            senderSocketId: socketId,
            messageInfo:  ` ${socketId} Joinned Public chat.`,
            type: 'Event',  // 'message' or 'event'
            messageCategory: "Public"
          });
          await message.save();
          console.log('Message saved:');
        }else {
          console.log("Already saved.");
          
        }
      } catch (error) {
        console.error('Error saving message:');
      }
    });

    socket.on("Join-room", async({roomName, socketId, MessgageType}) => {
      try {
        console.log(`${socketId} joinned  to room ${roomName}`);
        socket.join(roomName);
          const message = new Message({
            senderSocketId: socketId,
            messageInfo: `${socketId} Joinned the ${roomName}`,
            type: MessgageType,  // 'message' or 'event'
            messageCategory: roomName
          });
          await message.save();
          console.log('Message saved');
        } catch (error) {
          console.error('Error saving message:', error);
        }
    })


    // socket.on('public-chat-msg', (data) => {
    // })
    
    socket.on('faction-msg',  async({factionMessage, selectedFaction, socketId, MessgageType}) => {
      try {
        io.to(selectedFaction).emit("receive-faction-message", {messageInfo: factionMessage, senderSocketId : socketId, type:MessgageType})
        const message = await new Message({
          senderSocketId: socketId,
          messageInfo: factionMessage,
          type: MessgageType,  // 'message' or 'event'
          messageCategory: selectedFaction
        });
        await message.save();
        console.log('Message saved:', message);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    })
    
    socket.on('public-chat-msg', async ({publicMessage, socketId, MessgageType}) => {
      try {
        io.emit("receive-public-message", {messageInfo:publicMessage, senderSocketId: socketId, type:MessgageType})
        const message = new Message({
          senderSocketId: socket.id,
          messageInfo: publicMessage,
          type: MessgageType,  // 'message' or 'event'
          messageCategory: "Public"
        });
        await message.save();
        console.log('Message saved:');
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    socket.on('disconnect', async() => {
      console.log('Client disconnected:', socket.id);
      try {
        const msg = ` ${socket.id} leave chat.`
        if(!findMsg) {
        io.emit("receive-public-message", {messageInfo:msg, senderSocketId: socket.id, type:"Event"})
          const message = new Message({
            senderSocketId: socketId.id,
            messageInfo:  msg,
            type: 'Event',  // 'message' or 'event'
            messageCategory: "Public"
          });
          await message.save();
          console.log('Message saved:');
        }else {
          console.log("Already saved.");
          
        }
      } catch (error) {
        console.error('Error saving message:');
      }
    });
  });
};


export default setupSocket;