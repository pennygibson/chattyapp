import React, {Component} from 'react';


// class ChatBar extends Component {
//   state = {userName: this.props.currentUser.name};
//   handleChange(event) {
//     this.setState({userName: event.target.value});
//   }

//   render(){
//     return (
//       <footer className="chatbar">
//         <form onSubmit={this.props.handleNewUser}>
//           <input className="chatbar-username" onChange={this.handleChange.bind(this)} value={this.state.userName} placeholder="Your Name (Optional)" default="Anonymous" name="userName" />
//         </form>
//         <form onSubmit={this.props.handleNewMessage}>
//           <input className="chatbar-message" name="text" placeholder="Type a message and hit ENTER" />
//         </form>
//       </footer>
//     );


let ChatBar = props =>
  <footer className="chatbar">
    <form onSubmit={props.handleNewUser}>
      <input
        className="chatbar-username"
        onChange={props.handleChange}
        value={props.userName}
        placeholder="Your Name (Optional)"
        default="Anonymous"
        name="userName"
      />
    </form>
    <form onSubmit={props.handleNewMessage}>
      <input className="chatbar-message" name="text" placeholder="Type a message and hit ENTER" />
    </form>
  </footer>

export default ChatBar;



