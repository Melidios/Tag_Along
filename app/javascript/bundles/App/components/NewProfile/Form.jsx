import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
// import { Button, Label, Collapse, CardBody, Card } from 'reactstrap';
import { withStyles,  MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import GenderChoice from './GenderChoice'
import Button from '@material-ui/core/Button'
import classNames from 'classnames';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import Notification from './Notification'


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
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
  input: {
  display: 'none',
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
  constructor(props) {
    super(props)
    this.state = {
      profile: {
        first_name: '',
        last_name: '',
        gender: '',
        notification: false,
        image: '',
        activity_id: []
      },
      activities: [],
      name: '',
      image: ''
    }
  }

  handleFirstNameChange = (event) => {
    let { profile } = this.state;
    profile.first_name = event.target.value;
    this.setState({ profile });
  }

  handleLastNameChange = (event) => {
    let { profile } = this.state;
    profile.last_name = event.target.value;
    this.setState({ profile });
  }

  handleGenderChange = (event) => {
    let { profile } = this.state;
    profile.gender = event.target.value;
    this.setState({ profile });
    console.log(`handleGenderChange in FORM says:\n ${ profile.gender }`)
  }

  handleNotificationChange = (event) => {
    console.log(`Inside handleNotificationChange event: ${event}`)
    let { profile } = this.state;
    profile.notification = event
    this.setState({ profile });
  }

  handleImageChange = event => {
    let { profile } = this.state
    const image = event.target.files[0]
    profile.image = image
    this.setState({ profile })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let { profile, activities, image } = this.state;
    const formData = new FormData()
    formData.append('profile[first_name]', profile.first_name)
    formData.append('profile[last_name]', profile.last_name)
    formData.append('profile[gender]', profile.gender)
    formData.append('profile[notification]', profile.notification)
    formData.append('profile[image]', profile.image)
    formData.append('profile[activity_id]', profile.activity_id)
    this.props.createProfile(formData)
    // AW it is not a good idea to set state more than once in a function vv
    profile = { first_name: '', last_name: '', gender: '', notification: '', activity_id: [] }
    this.setState({ profile })
    Turbolinks.visit('/events')
  }

  handleChange = (activityId) => {
    let { profile, activities } = this.state
    console.log(`U are in handleChange ${activityId}`);
    if(!profile.activity_id.includes(activityId)){
      profile.activity_id.push(activityId)
    }else{
      profile.activity_id = profile.activity_id.filter(id => id !== activityId)
    }
    this.setState({profile})
   }

  render() {
    const { classes } = this.props;
    const { profile } = this.state;
    return (
    <div>
      <Paper style={{margin: 10, padding: 10}}>
        <form
          style={{display: 'flex', flexWrap: 'wrap'}}
          noValidate
          onSubmit={ this.handleSubmit }
        >
          <Grid container spacing={40}>
            <Grid item md={8} xs={12} >
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
                label="First Name"
                id="profile_first_name"
                value={profile.first_name}
                onChange={this.handleFirstNameChange}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item md={4} xs={12}>
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
                label="Last Name"
                id="profile_last_name"
                value={profile.last_name}
                onChange={this.handleLastNameChange}
                margin="normal"
                fullWidth
              />
            </Grid>
              <Grid item md={8} xs={12} >
              <GenderChoice handleGenderChange={this.handleGenderChange} gender={this.state.profile.gender}/>
              </Grid>
              <Grid item md={8} xs={12}>
                <Notification handleNotificationChange={this.handleNotificationChange} notification={this.state.profile.notification} />
              </Grid>
              <Grid item md={8} xs={12}>
                <div style={{display:'inline-flex', }}>
                  <Typography className={classes.instructions}>
                   Profile picture
                  </Typography>
                  <input
                       className={classes.input}
                       id="outlined-button-file"
                       multiple
                       name='image' type='file' onChange={this.handleImageChange}
                     />
                 <label htmlFor="outlined-button-file">
                   <Button variant="outlined" component="span" className={classes.button}>
                     Upload
                   </Button>
                  </label>
                  </div>
                </Grid>
                 <Grid item md={8} xs={12} className={classes.bigDiv}>

                  {
                    this.props.activities.map((activity, index) => {
                      return (
                        <Grid item sm={8}>
                        <div key={index} className={classes.div}>
                          <Button
                            type="button"
                            key={index} onClick={ (e) => { this.handleChange(activity.id) } }
                            value={activity.id}
                            variant={ this.state.profile.activity_id.includes(activity.id) ? "contained" : "outlined" }
                            className={ classNames(this.state.profile.activity_id.includes(activity.id) ? (classes.inActiveBt) : (classes.activeBt)) }
                            color="default"
                          >
                            {activity.name}
                          </Button>
                         </div>
                        </Grid>
                      )
                    })
                  }
                </Grid>
          </Grid>
          <Grid item xs className={classes.profile}>
          <Button
            variant="contained"
            className={classes.profileBt}
            onClick={ this.handleSubmit }
          >
            Create Profile
          </Button>
        </Grid>
        </form>
      </Paper>
    </div>
    )
  }
}

export default withStyles(styles)(Form);
