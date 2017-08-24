import React, {Component} from 'react';


let ChatBar = props =>
  <footer className="chatbar">
    <form className="name" onSubmit={props.handleNewUser}>
      <input
        className="chatbar-username"
        onChange={props.handleChange}
        value={props.userName}
        placeholder="Your Name (Optional)"
        default="Anonymous"
        name="userName"
      />
    </form>
    <form className="userMessage" onSubmit={props.handleNewMessage}>
      <input className="chatbar-message" name="text" placeholder="Type a message and hit ENTER" />
    </form>
  </footer>

export default ChatBar;



