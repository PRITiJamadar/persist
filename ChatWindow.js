import React, { useEffect, useState} from 'react';
import { ReactComponent as Logo } from './logo.svg';
import socket from './io';
import Draggable from 'react-draggable';
import { useDispatch,useSelector } from 'react-redux';
import { updateChatBody } from './chatSlice';
import { Resizable } from 'react-resizable';
import './ChatIcon.css';


function ChatWindow() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedName,setSelectedName]=useState('');
  const [message,setMessage] = useState('');
  const [chatMessages,setChatMessages]=useState([]);
  const dispatch=useDispatch();
  const chatbody=useSelector((state)=>state.chat.chatbody);
  
  useEffect(() => {
    const storedChatMessages = localStorage.getItem('chatMessages');
    if (storedChatMessages) {
      setChatMessages(JSON.parse(storedChatMessages));
    }
  
    const storedChatBody = localStorage.getItem('chatbody');
    if (storedChatBody) {
      dispatch(updateChatBody(storedChatBody));
    }
  
    socket.on('updateChatBody',(name)=>{
      dispatch(updateChatBody(`Hello ${name} how can i help you?`));
      localStorage.setItem('chatbody', `Hello ${name} how can i help you?`);
    });
  
    socket.on('send_message', (data) => {
      
      const updatedChatMessages = [...chatMessages, data];
      setChatMessages(updatedChatMessages);
      localStorage.setItem('chatMessages', JSON.stringify(updatedChatMessages));
    });
  
    return () => {
      socket.off('updateChatBody');
      socket.off('send_message');
    };
  }, [chatMessages, dispatch]);

  function handleSelectChange(event) {
    const name = event.target.value;
    socket.emit('selectedName', name);
    setSelectedName(name);
    localStorage.setItem('selectedName', name);
  }

 function handleMessageChange(event) {
  const message = event.target.value;
  setMessage(message);
}

function handleSendMessage() {
  if (message.trim() === '') return;

  const data = {
    name: selectedName,
    message: message,
  };
  socket.emit('send_message', data);

  const updatedChatMessages = [...chatMessages, data];
  setChatMessages(updatedChatMessages);
  localStorage.setItem('chatMessages', JSON.stringify(updatedChatMessages));

  setMessage('');
}

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  

  return (
    <>
    
    <select onChange={handleSelectChange}>
      <option value="" disabled selected>Select a name</option>
      <option value="pratik">pratik</option>
      <option value="chandni">chandni</option>
      <option value="shivangi">shivangi</option>
    </select>

    <div className="chat-icon-container">
      <div className="chat-icon" onClick={togglePopup}>
        <Logo />
      </div>
      
      {isOpen && (
        
        <Draggable>
        <div className="virtual-agent" id='bot'>
        <div className="chat-header">
            <div>
                <img className="hpe-chat-icon"></img>
                <h5>Care Concierge</h5>
            </div>
            <div>
                <h1 className="chat-minimize-icon" onClick={handleClose}></h1>
            </div>
        </div>
        <div className="chat-body" id="chat">
        {chatbody}<br></br>
        {chatMessages.map((msg, index) => (
                <div key={index}>
                  <strong>{msg.name}: </strong>
                  {msg.message}
                </div>
              ))}
        
        </div>
        <div className="chat-footer">
            <input type='text' name="message" placeholder="Message your Care Concierge..."  id="message" autoFocus value={message}
                onChange={handleMessageChange} />
           
            <button id="send" onClick={handleSendMessage}></button>
        </div>
</div>
</Draggable>
         
      )}
     
    </div>
    
    </>
    
    
  );

}

export default ChatWindow;