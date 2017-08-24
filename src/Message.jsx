import React, {Component} from 'react';


class Message extends Component {
  render(){
    let usernameStyles = ['message-username'];
    if (this.props.message.username === 'Anonymous') {
      usernameStyles.push('message-username-anon');
    }
    if (this.props.message.type === 'incomingMessage') {
    return (
      <div className="message">
        <span className={usernameStyles.join(' ')}>{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
      )
    }
    else {
      return (
        <div className="message system">
          <span>{this.props.message.content}</span>
        </div>
      )
    }
  }
  usernameStyles = () => {
    if (this.props.message.username === 'Anonymous') {
      return ['message-username', 'message-username-anon'].join(' ')
    } else {
      return ['message-username'].join(' ')
    }
  }
}

export default Message;
