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
  }



  render() {
    return (
      <div>
        <div id="messageList">
          <MessageList messages={this.state.messages}/>
        </div>
        <div id="chatBar">
          <ChatBar currentUser={this.state.currentUser} handleNewMessage={this.handleNewMessage} handleNewUser={this.handleNewUser} />
        </div>
      </div>
    );
  }

  handleNewMessage = (e) => {
    e.preventDefault()
      const newMessage = {id: 3, username: this.state.currentUser.name, content: e.target.text.value};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
      e.target.text.value = ''
  }
  handleNewUser = (e) => {
    e.preventDefault()
    if(!e.target.value) {
      this.state.currentUser = 'Anonymous'
    } else {
      this.state.currentUser.name = e.target.value

    }

  };
}
export default App;


