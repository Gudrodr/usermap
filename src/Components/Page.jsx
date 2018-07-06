import * as React from 'react';
import Sidebar from "./Sidebar/Sidebar";
import MapContainer from './Map/MapContainer';
import './assets/styles.scss';

export default class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usersData: []
    }
  }

  fetchData() {
    fetch('http://localhost:3000/features')
      .then(response => response.json())
      .then(data => this.setState({usersData: data.features}))
      // .then(() => console.log(this.state.usersData))
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    // console.log(this.state.usersData)
    return (
      <div className='mainPage'>
        {/*<Sidebar features={this.state.usersData} />*/}
        {this.state.usersData.length > 0 && <MapContainer features={this.state.usersData} />}
      </div>
    )
  }
}