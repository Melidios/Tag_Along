import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const handleBack = () => {
  Turbolinks.visit('/events')
}

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

    };

      const styles = theme => ({
        root: {
          flexGrow: 1,
        },
      cssRoot: {
        background: 'linear-gradient(45deg, #B2FF59 30%, #8BC34A 90%)',
        '&:hover': {
          background: '#33691E',
        },
        color: 'white',
        fontWeight: 'bold',
      },
      box: {
        fontFamily: 'Roboto',
        textAlign: 'center',
      },
    })


class Event extends Component {

  constructor() {
    super()
  }

  componentDidMount() {
    console.log(this.props.user)
    console.log(this.props.event.id)
    console.log(this.props.activity)
    console.log(this.props.participants)
    console.log(this.props.profile)
  }

  joinEvent = () => {
    let post = axios.post(`/events/${this.props.event.id}/user_events`, {}, {headers: headers}).then((res) => {
      location.reload()
    })
  }

  componentDidUpdate() {}

  render() {
    const { classes } = this.props;
    const { user, event, activity, participants, profile } = this.props
    return (
      <div>
        <Paper style={style} >
        <Grid container className={classes.root} spacing={24} >
         <Grid item xs={12} className={classes.box} >
        <Paper>
        <h3>Host: </h3> {profile.first_name}, {profile.last_name}
        </Paper>
         </Grid>
         <Grid item xs={12} className={classes.box}>
        <Paper>
          <h3>Activity: </h3>{activity.name}
      </Paper>
      </Grid>
      <Grid item xs={12} className={classes.box}>
        <Paper>
          <h3>Description: </h3> {event.description}
      </Paper>
      </Grid>
      <Grid item xs={12} className={classes.box} >
        <Paper>

        <h3> Participants: </h3>
          {
            participants.map((participant) => {
              return (
                <div>{participant.first_name}</div>
              )
            })

           }
         </Paper>
         </Grid>
         <Grid item xs={12} className={classes.box} >
           <Paper>
          <Button onClick={this.joinEvent}>Tag Along</Button>
          <Button onClick={handleBack}>Back</Button>
          </Paper>
          </Grid>
        </Grid>
      </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Event);
