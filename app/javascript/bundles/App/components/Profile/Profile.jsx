import React, { Component } from 'react';
import axios from 'axios'


class Profile extends Component {
  constructor() {
    super()
  }
  componentDidMount() {

  }
  render() {
    return (
      <div>HELLO
        <div> activities: {this.props.profile.first_name}</div>
        <div> </div>
        <img src={this.props.profile.image}/>
      </div>
    )
  }
}

export default Profile
