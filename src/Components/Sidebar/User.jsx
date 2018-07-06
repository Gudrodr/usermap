import * as React from 'react';

export default class User extends React.Component {

  render() {
    return (
      <div className='user'>
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