import React, {Component} from 'react';




class Nav extends Component {

  render(){
    return (
      <div className="userCount">
    <p className="userCountText"> {this.props.numberOfUsersProp} users online  </p>
    </div>

    );
  }
}

export default Nav;