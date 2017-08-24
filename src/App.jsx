import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import Nav from './Nav.jsx'

class App extends Component {
  constructor(props){
    super(props);
    //state is data in our application that can change
    this.state = {
      numberOfUsers: 0,
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []

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
          let message = {
            content: `${newUser.oldName} changed their user name to ${newUser.currentUser.name}`,
            username: newUser.currentUser.name
          };
          let newmessages = this.state.messages.concat(message);
          console.log(newmessages)
          this.setState({messages: newmessages})
          break;
        case "UserCountUpdate":
          this.setState({numberOfUsers: parsedData.count});
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
    let oldUserName = this.state.currentUser.name;
    const newNotification = {
      currentUser: {
        name: e.target.userName.value
      },
      oldName: oldUserName
    }
    this.setState(newNotification);
    newNotification.type = 'incomingNotification'
    this.socket.send(JSON.stringify(newNotification))
  };

  render() {
    return (
      <div>
         <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="userCount">
            <Nav
              numberOfUsersProp={this.state.numberOfUsers}/>
          </div>
        </nav>

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


