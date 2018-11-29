import React, { Component } from 'react';
import Form from './Form'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import { withStyles,  MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import classNames from 'classnames';

const token = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute('content');
const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN':     token
      }

      const style = {
      padding: '5px',
      background: 'linear-gradient(45deg, #B2FF59 30%, #8BC34A 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
    };

    const styles = theme => ({
      button: {
        margin: theme.spacing.unit,
      },
      root: {
        flexGrow: 1,
      },
      bigDiv: {
        direction: 'row',
        justify: 'space-between',
      },
      div: {
        display: 'grid',
        padding: '10px',
      },

      activeBt: {
        color: theme.palette.getContrastText(green[500]),
        borderColor: green[400],
        '&:hover': {
          backgroundColor: green[800],
          color:'white',
          borderColor: green[800]
        },
      },
      inActiveBt: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
          color:'white',
        },
        color: 'white'
      },})

class NewEvent extends Component {
  constructor() {
    super()
    this.state = {
      events: [],
      locations: [],
      activities: [],
      loc: '',
      activity_id: ''
    }
  }

  async componentDidMount() {
    let {data} = await axios.get('/activities.json?find=activities')
    let something = await axios.get('/events.json?events=events')
    // let locations = await axios.get('/locations.json')
    this.setState({activities: data})
    }


  fetchLocations = async (loc, activity) => {
    let { data } = await axios.get(`/activities.json?find=${loc}`)
    console.log(data)
    this.setState({ locations: data, activity_id: activity })
  }

  handleLoc = (event) => {
    let { loc } = this.state
    loc = event.target.value
    this.setState({ loc })
    console.log(loc)
  }

  testingParticipant = () => {
    let post = axios.post(`/events/7/user_events`, {}, {headers: headers}).then((res) => {
      console.log(res)
    })
    Turbolinks.visit('/events')
  }

    createEvent = (event_new) => {
      // console.log(event_new)
      // console.log("this is event?");
      axios.post('/events.json', {
        event: {
          event_date: event_new.event_date,
          start_time: event_new.start_time,
          quantity: event_new.quantity,
          notification: event_new.notification,
          description: event_new.description,
          title: event_new.title
        },
        location: {
          id: this.state.loc,
          activity_id: this.state.activity_id
        },
      },
      {headers: headers})
      .then((response) => {
        // console.log("THIS IS WHAT IS GETTING SENT UP")
        // console.log(event_new)
        let { events } = this.state;
        events.push(response.data);
        this.setState({ events })
      })
}
  render(){
    const { classes } = this.props;
    const { activities, locations } = this.state
    return(
      <div style = {style}>
        <Grid >
        <Paper >
        <Form activities={activities} locations={this.fetchLocations} createEvent={this.createEvent} />
        {locations.map((loc) => {
          return (
            <div className={classes.div}>
              <Button  className={ classes.inActiveBt } variant = "outlined"
                onClick={this.handleLoc} key={loc.id} value={loc.id}>{loc.name}, {loc.street}, {loc.city}, {loc.state}</Button>
            </div>
          )
        })}
        </Paper>
       </Grid>
      </div>
    )
  }
}
export default withStyles(styles)(NewEvent)
