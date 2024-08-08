import {useEffect, useMemo, useRef, useState} from 'react'
import {io} from "socket.io-client"
import userImage from "../src/assets/user.png"
import "./app.css"
import { fetchFactionsMessages, fetchPublicMessages } from './api/message'

function App() {
    const socket = useMemo(() =>  io("http://localhost:3000") , [ ])
  const factions = ["Faction 1", "Faction 2", "Faction 3", "Faction 4"];
  const [selectedFaction, setSelectedFaction] = useState(factions[0]);
  const dummy = useRef();
  const [socketId, setSocketId] = useState("");
  const [publicMessage, setPublicMessage] = useState([])
  const [publicMessages, setPublicMessages] = useState([])
  const [factionMessage, setFactionMessage] = useState([])
  const [factionMessages, setFactionMessages] = useState([])






  const handleFactionChange = (event) => {
    let MessgageType = "Event";
    let roomName = event.target.value;
    socket.emit("Join-room", {roomName, socketId, MessgageType})
    setSelectedFaction(roomName);
  };
  
  const handleSendPublicMessage = (e) => {
    e.preventDefault();
    let MessgageType = "Messages";
    socket.emit("public-chat-msg", {publicMessage, socketId, MessgageType})
    setPublicMessage('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFactionSendMessage = (e) => {
    e.preventDefault();
    let MessgageType = "Messages";
    socket.emit("faction-msg", { factionMessage, selectedFaction, socketId, MessgageType})
    setFactionMessage('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    const getPublicMessages = async () => {
      const messages = await fetchPublicMessages();
      setPublicMessages(messages);
    };

    const getFactionMessages = async () => {
      const messages = await fetchFactionsMessages(selectedFaction);
      setFactionMessages(messages)

      
    };

    getPublicMessages();
    getFactionMessages()
  }, [selectedFaction]);

  
  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      socket.emit("connection-success-msg", {socketId : socket.id})
        console.log("new socket user connected", socket.id);
      })
      
      socket.on("receive-public-message", (data) => {
        setPublicMessages((msg) => [...msg, data])
      })

      socket.on("receive-faction-message", (data) => {
        setFactionMessages((msg) => [...msg,data])
      })
      
  }, [])
  return (
  
    <div className='containner'>
      <div className='profile-wrapper'>
        <img src={userImage} alt="" />
        <div>
          <p>Soket Id: {socketId}</p>
          <select value={selectedFaction} onChange={handleFactionChange}>
            {factions.map((faction, index) => (
              <option key={index} value={faction}>
                {faction}
              </option>
            ))}
      </select>
      <p>Selected Faction: {selectedFaction}</p>
        </div>
      </div>
      <div>
        <h4 className='chat-title'>Battle of Ruby vally chat</h4>
        <div className='chat-wrapper'>
          {/* Public Chat */}
          <div className='public-chat-wrapper'>
          <p className='chat-name'>Public chat</p>
          <div className='chat-section'>
          {publicMessages.map(({messageInfo, senderSocketId, type}, i) => (
          <div key={i} >
          {type === "Event" ?  (
            <p className='event-info'>{messageInfo}</p>
          ): (
            <div className='msg-list' >
              <img src={userImage} alt="User Image" className='chat-userImage' />
              {socketId === senderSocketId ? (
                  <div className='msg-section-own'>
              <p className='userName'>{senderSocketId}</p>
                <p className='user-msg'> {messageInfo} </p>
            </div>
                ): (
            <div className='msg-section-other'>
              <p className='userName'>{senderSocketId}</p>
                <p className='user-msg'> {messageInfo} </p>
            </div>
                )} 
            </div>
          )}
          
        </div>
        ))}
        <span ref={dummy}></span>
          </div>
          <div className='msg-send-section'>
          <div className="input-container">
        <form onSubmit={handleSendPublicMessage}>
        <input
          type="text"
          value={publicMessage}
          onChange={(e) => setPublicMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type='submit' className="send-button">
          Send
        </button>
        </form>
      </div>
          </div>
          </div>

          {/* Faction chat */}

          <div className='public-chat-wrapper'>
          <p className='chat-name'>{selectedFaction} chat</p>
          <div className='chat-section'>
          {factionMessages.map(({messageInfo, senderSocketId, type}, i) => (
          <div key={i} >
            {type === "Event" ?  (
              <p className='event-info'>{messageInfo}</p>
            ): (
              <div className='msg-list' >
                <img src={userImage} alt="User Image" className='chat-userImage' />
                {socketId === senderSocketId ? (
                  <div className='msg-section-own'>
              <p className='userName'>{senderSocketId}</p>
                <p className='user-msg'> {messageInfo} </p>
            </div>
                ): (
            <div className='msg-section-other'>
              <p className='userName'>{senderSocketId}</p>
                <p className='user-msg'> {messageInfo} </p>
            </div>
                )} 
              </div>
            )}
            
          </div>
        ))}
        <span ref={dummy}></span>
          </div>
          <div className='msg-send-section'>
          <div className="input-container">
         <form onSubmit={handleFactionSendMessage}>
        <input
          type="text"
          value={factionMessage}
          onChange={(e) => setFactionMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type='submit' className="send-button">
          Send
        </button>
        </form>
      </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App