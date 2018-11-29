import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  btn: {
      background: 'linear-gradient(45deg, #CCFF90 30%, #B2FF59 90%)',
      '&:hover': {
        background: '#33691E',
      },
        width: 100,
        color: 'white',
        fontWeight: 'bold',
    },

})

class Popup extends Component {

  render() {
  const { classes } = this.props;
    return (
      <div>
        <Paper className>
        <p>Title:{this.props.events.properties.event_type}</p>
        <Button className={classes.btn}>Tag Along</Button>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Popup);
