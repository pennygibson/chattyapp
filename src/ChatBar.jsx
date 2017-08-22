import React, {Component} from 'react';



class ChatBar extends Component {
  render(){
    return (
      <footer className="chatbar">
        <form onChange={this.props.handleNewUser}>
          <input className="chatbar-username" placeholder="Your Name (Optional)" default="Anonymous" name="userName" />
        </form>
        <form onSubmit={this.props.handleNewMessage}>
          <input className="chatbar-message" name="text" placeholder="Type a message and hit ENTER" />
        </form>
      </footer>
    );
  }
}

export default ChatBar;



