import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles,  MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import classNames from 'classnames';
import InputBase from '@material-ui/core/InputBase';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
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
  profile: {
    textAlign: 'center',
    paddingTop: '20px',
    paddingBottom: '10px'
  },
  profileBt: {
    background: '#8BC34A',
    '&:hover': {
      backgroundColor: green[700],
    },
    color: 'white',
    fontWeight: 'bold',
  },
  activeBt: {
    color: theme.palette.getContrastText(green[500]),
    borderColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
      color:'white',
      borderColor: green[700]
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
  },
cssLabel: {
   '&$cssFocused': {
     color: green[700],
   },
 },
 cssFocused: {},
 cssUnderline: {
   '&:after': {
     borderBottomColor: green[700],
   },
 },
 instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});



class Form extends Component {
  state = {
    event_new: {
      event_date: '',
      start_time: '',
      quantity: '',
      notification: '',
      description: '',
      title: '',
      activity_id: ''

    },
    activities: this.props.activities,
    labelWidth: 0,
  }

  handleDateChange = (event) => {
    let { event_new } = this.state;
    event_new.event_date = event.target.value;
    this.setState({ event_new});
  }

  handleStartTimeChange = (event) => {
    let { event_new } = this.state;
    event_new.start_time = event.target.value;
    this.setState({ event_new});
  }

  handleTitleChange = (event) => {
    let { event_new } = this.state;
    event_new.title = event.target.value;
    this.setState({ event_new });
  }

  handleDescriptionChange = (event) => {
    let { event_new } = this.state;
    event_new.description = event.target.value;
    this.setState({ event_new });
  }
  handleQuantityChange = (event) => {
    let { event_new } = this.state;
    event_new.quantity = event.target.value;
    this.setState({ event_new});
  }
  handleNotificationChange = (event) => {
    let { event_new } = this.state;
    event_new.notification = event.target.value;
    this.setState({ event_new});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let { event_new } = this.state;
    console.log(event_new)
    console.log("this is getting sent")
    this.props.createEvent(event_new)
    event_new = { event_date: '',
    start_time: '',
    end_time: '',
    quantity: '',
    description: '',
   }
    this.setState({ event_new })
  }


componentDidUpdate() {
}

handleLocation = (location, activity, activityId ) => {
  let { event_new } = this.state
  if ( event_new.activity_id != activity) {
    event_new.activity_id = activity
    this.setState({ event_new })
    let loc = location.toLowerCase()
    this.props.locations(loc, activity)

  }
}


  render() {
    const { classes } = this.props;
    const { event_new, activities } = this.state;
    return (
      <Paper style={{margin: 10, padding: 10}}>
        <form
          style={{display: 'flex', flexWrap: 'wrap'}}
          noValidate
          onSubmit={ this.handleSubmit }
        >
          <Grid container spacing={40}>
            <Grid item md={8} xs={12}>
              <TextField
                InputLabelProps={{
                     classes: {
                       root: classes.cssLabel,
                       focused: classes.cssFocused,
                     },
                   }}
                   InputProps={{
                     classes: {
                       focused: classes.cssFocused,
                       underline: classes.cssUnderline,
                     },
                   }}

                label="Title"
                id="event_title"
                value={event_new.event_title}
                onChange={this.handleTitleChange}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item md={8} xs={12}>
              <TextField
                label="Date"
                id="event_date"
                value={event_new.event_date}
                onChange={this.handleDateChange}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                label="Start Time"
                id="event_start_time"
                value={event_new.start_time}
                onChange={this.handleStartTimeChange}
                margin="normal"
                fullWidth
              />
            </Grid>
              <Grid item md={8} xs={12}>
                  <TextField
                    label="Quantity of people"
                    id="event_quantity"
                    value={event_new.quantity}
                    onChange={this.handleQuantityChange}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item md={8} xs={12}>
                  <TextField
                    label="Description"
                    id="event_end_time"
                    value={event_new.description}
                    onChange={this.handleDescriptionChange}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item md={8} xs={12} className={classes.bigDiv}>
                  {
                    this.props.activities.map((activity, index) => {
                      return (
                        <Grid item sm={8}>
                         <div key={index} className={classes.div}>
                          <Button
                            type="button"
                            key={index} onClick={ (e) => { this.handleLocation(activity.name, activity.id) } }
                            value={activity.id} key={`index`}
                            variant={ this.state.event_new.activity_id === activity.id ? "contained" : "outlined" }
                            className={ this.state.event_new.activity_id === activity.id ? classes.inActiveBt : classes.activeBt }
                            color="secondary"
                          >
                            {activity.name}
                          </Button>
                        </div>
                      </Grid>
                      )
                    })
                  }
                </Grid>

          <Grid item xs className={classes.profile}>
          <Button
            variant="contained"
            className={classes.profileBt}
            onClick={ this.handleSubmit }

          >
            Create Event
          </Button>
        </Grid>
      </Grid>
    </form>
  </Paper>
    )
  }
}

export default withStyles(styles)(Form);
