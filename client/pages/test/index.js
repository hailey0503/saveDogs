import React, { useState } from 'react';

function test() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chat-popup ${isOpen ? 'open' : ''}`}>
      <div className="chat-header">
        <h2>Facebook Messenger</h2>
        <button className="close-btn" onClick={toggleChat}>
          &#10005;
        </button>
      </div>
      <div className="chat-body">
        <p>Welcome to the chat!</p>
        <p>Start typing your message...</p>
      </div>
      <div className="chat-footer">
        <input type="text" placeholder="Type your message..." />
        <button className="send-btn">Send</button>
      </div>

      <button className="open-btn" onClick={toggleChat}>
        Open Chat
      </button>

      <style jsx>{`
        .chat-popup {
          position: fixed;
          right: 20px;
          bottom: 20px;
          width: 350px;
          max-height: 500px;
          background-color: #f5f5f5;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          display: none;
        }

        .chat-popup.open {
          display: block;
        }

        .chat-header {
          background-color: #4267b2;
          color: #fff;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .close-btn {
          background-color: transparent;
          color: #fff;
          border: none;
          font-size: 16px;
          cursor: pointer;
        }

        .chat-body {
          padding: 20px;
          height: 350px;
          overflow-y: scroll;
        }

        .chat-footer {
          display: flex;
          align-items: center;
          padding: 10px;
        }

        .chat-footer input[type='text'] {
          flex: 1;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .send-btn {
          background-color: #4267b2;
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-left: 10px;
        }

        .open-btn {
          position: fixed;
          right: 20px;
          bottom: 20px;
          padding: 10px 20px;
          font-size: 16px;
          background-color: #4267b2;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
};
export default test
