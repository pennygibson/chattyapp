import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props){
    super(props);
    //state is data in our application that can change
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }
  componentDidMount(){
    this.socket = new WebSocket('ws://localhost:3001')
    console.log("connected to chatty_server")

    this.socket.onmessage = receivedMessage => {
      const parsedData = JSON.parse(receivedMessage.data)
      switch(parsedData.type) {
        case "incomingMessage":
          const newMessage = parsedData
          console.log(newMessage)
          let messages = this.state.messages.concat(newMessage)
          this.setState({messages: messages})
          break;
        case "incomingNotification":
          const newUser = parsedData
          let message = `newUser.currentUser.name changes their name`;
          let newmessages = this.state.messages.concat(message);
          this.setState({messages: newmessages})
          break;
      }
    }
  }


  handleNewMessage = (e) => {
    e.preventDefault()

    const newMessage = {
      type: 'incomingMessage',
      username: this.state.currentUser.name || 'Anonymous',
      content: e.target.text.value
    };

    this.socket.send(JSON.stringify(newMessage))
    e.target.text.value = ''
  }

  handleNewUser = (e) => {
    e.preventDefault()
    console.log('I am here')

    // if(!e.target.userName.value) {
      // const newNotification = {currentUser: {name: "Anonymous"}}
    // } else {
    const newNotification = {currentUser: {name: e.target.userName.value}}
    this.setState(newNotification);
    newNotification.type = 'incomingNotification'
    this.socket.send(JSON.stringify(newNotification))
  };

  render() {
    return (
      <div>
        <div id="messageList">
          <MessageList messages={this.state.messages}/>
        </div>
        <div id="chatBar">
          <ChatBar
            currentUser={this.state.currentUser}
            handleNewMessage={this.handleNewMessage}
            handleNewUser={this.handleNewUser}
          />
        </div>
      </div>
    );
  }
}
export default App;


