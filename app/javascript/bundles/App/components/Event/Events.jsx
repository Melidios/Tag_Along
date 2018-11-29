import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Map from './Map'
import NavBar from './NavBar'
import Paper from '@material-ui/core/Paper'
import logo from '../Images/logo.png'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';


const handleCreateEvent = () => {
  Turbolinks.visit('/events/new')
}

  const style = {
  padding: '5px',
  background: 'linear-gradient(45deg, #B2FF59 30%, #8BC34A 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
}
const styles = theme => ({
  root: {
    textAlign:'center',
  },
logoImg: {
  height: '120px',
  width: '200px',
},
 logoBox: {
   background: 'linear-gradient(45deg, #B2FF59 30%, #F1F8E9 90%)',
    boxShadow:'0 3px 5px 2px rgba(139, 195, 74, 1)',
    margin: 10,
    padding: 20,
 },
 cssRoot: {
   background: 'linear-gradient(45deg, #B2FF59 30%, #8BC34A 90%)',
   '&:hover': {
     background: '#33691E',
   },
   color: 'white',
   fontWeight: 'bold',
   marginTop: '10px',
 },
 btn: {
    justify: 'center',
    textAlign: 'center',
 }
})

class Events extends Component {
  constructor() {
    super()
    this.state = {
      events: [],
      locations: []
    }
  }
  componentDidMount() {
    axios.get('/events.json').then((response) => {
      this.setState({ events: response.data.features })
    })
  }


  handleEvent = (eventId) => {
    Turbolinks.visit(`/events/${eventId}`)
  }

  render(){
    const { classes } = this.props
    const { events } = this.state
    return(
      <div style={style}>
        <Paper style={{margin: 10, padding: 10}} >
          <NavBar/>
          <Paper className={classes.logoBox}>
          <div className={classes.root}>
            <img src={logo} className={classes.logoImg} />
          </div>
        </Paper>


          <Map events={events} activities={this.props.activities}
            />

          <Paper className={classes.btn}>
          <Button onClick={handleCreateEvent} className={classes.cssRoot}> Create New Event </Button>
       </Paper>
      </Paper>
      </div>

    )
  }
}
export default withStyles(styles)(Events)
