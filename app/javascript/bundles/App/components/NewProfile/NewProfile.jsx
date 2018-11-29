import React, { Component } from 'react';
import Form from './Form'
import axios from 'axios'

const token = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute('content');
const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN':     token
      }

const image_headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN':     token,
            'content-type':     'multipart/form-data'
  }

  const style = {
  padding: '5px',
  background: 'linear-gradient(45deg, #B2FF59 30%, #8BC34A 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
};

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      profiles: [],
      activities: [],
      image: ''
    }
  }
  async componentDidMount() {
    let {data: activities} = await axios.get('/activities.json?find=activities')
    let something = await axios.get('/profiles.json')
    this.setState({activities})
    }

  createProfile = (profile) => {
    profile.user_id = this.props.user.id;
    console.log(`The profile before the PostReq in createProfile:\n ${profile}`)
    axios.post('/profiles.json', profile,
    {headers: image_headers})
    .then((response) => {
      console.log(`The profile after the PostReq in createProfile:\n ${profile}`)
      let { profiles } = this.state;
      profiles.push(response.data);
      this.setState({ profiles })
      // Turbolinks.visit('/events')
    })
  }
  render() {
    const { classes } = this.state
    return (
      <div style={style}>
        <Form createProfile={this.createProfile} activities={this.state.activities} />
      </div>
    )
  }
}

export default Profile
