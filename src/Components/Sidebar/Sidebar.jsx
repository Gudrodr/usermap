import * as React from 'react';
import User from "./User";
import './assets/styles.scss';

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className='sidebar'>
        {this.props.features && this.props.features.map(item => <User key={item.id} user={item}/>)}
      </div>
    )
  }
}