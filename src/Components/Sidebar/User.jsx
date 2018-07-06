import * as React from 'react';
import {connect} from "react-redux";

class User extends React.Component {

  render() {
    return (
      <div className='user' onClick={() => this.props.addEmail(this.props.user.geometry.coordinates)}>
        <div className='userAvatar' style={{backgroundColor: `${this.props.user.properties && this.props.user.properties.color}`}}>
          <img src={this.props.user.properties && this.props.user.properties.avatar} />
        </div>
        <div className='userInfo'>
          <div className='userName'>{this.props.user.properties && this.props.user.properties.userName}</div>
          <div className='userEmail'>{this.props.user.properties && this.props.user.properties.email}</div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    addEmail: (coordinates) => dispatch({type: 'ADD_COORDINATES', payload: {coordinates}})
  })
)(User)