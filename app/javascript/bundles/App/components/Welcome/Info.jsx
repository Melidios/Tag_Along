import React, { Component } from 'react'
import greeting from '../Images/greeting.svg';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import sport from '../Images/sport.svg';
import logo from '../Images/logo.png'

const handleSignUp = () => {
  Turbolinks.visit('/users/sign_up')
}
const handleSkip = () => {
  Turbolinks.visit('/events')
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  box: {
    textAlign: 'center',
  },
  p1:{
      fontFamily: 'Roboto',
      textAlign: 'center',
      color:'#33691E',
      fontWeight:'bold',
  },
  p:{
    textAlign: 'center',
    fontFamily: 'Roboto',
    color:'#33691E',
    fontWeight:'bold',
    height: '70px',
    width: '320px',
    justify:'center',
  },
  button: {
    direction: 'row',
    justify: 'space-around',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: 380,
    maxHeight: 190,
  },
  logo: {
    height: 70,
    width: 320,
    textAlign: 'center',
    background: 'linear-gradient(45deg, #B2FF59 30%, #8BC34A 90%)',
    padding: theme.spacing.unit,
    color: 'white',
    fontWeight: 'bold',
  },
  logoImg: {
    height: '80px',
    width: '160px',

  },
  cssRoot: {
    background: 'linear-gradient(45deg, #B2FF59 30%, #8BC34A 90%)',
    '&:hover': {
      background: '#33691E',
    },
    color: 'white',
    fontWeight: 'bold',
    width: 100,
  },
  smBt: {
    background: 'linear-gradient(45deg, #CCFF90 30%, #B2FF59 90%)',
    '&:hover': {
      background: '#33691E',
    },
      width: 100,
      color: 'white',
      fontWeight: 'bold',
  }
});

class Info extends Component {
  state = {
  direction: 'column',
  justify: 'space-between',
  alignItems: 'center',
  }
  back = e => {
    e.preventDefault();
    this.props.prevStep()
  }

  render(){
    const { classes } = this.props;
    const { alignItems, direction, justify } = this.state;

    return(
      <Grid container className={classes.root} spacing={24}  alignItems={alignItems} direction={direction}
              justify={justify}>
        <Grid item sm={12}>
            <Paper className={classes.logo}> <img src={logo} className={classes.logoImg} /></Paper>
        </Grid>
        <Grid item sm={12}>
           <div style={{ paddingTop: 50 }}>
               <img src={sport} className={classes.img} />
           </div>
      </Grid>
      <Grid item sm={12}>

          <p className={classes.p}>We believe in using technology to get people moving, doesn’t matter your sport or activity there’s always someone to tag alone with!</p>
          <p className={classes.p1}>Join Us!</p>
      </Grid>
      <Grid item xs container direction="row" justify="space-around" spacing={16} style={{ paddingTop: 60 }}>
         <Grid item sm={12} className={classes.box} >
           <Button className={classes.smBt} onClick={handleSignUp}>Skip</Button>
          </Grid>
          <Grid item sm={12} className={classes.box} >
           <Button onClick={handleSignUp} className={classes.cssRoot}>Sign up</Button>
          </Grid>
      </Grid>
    </Grid>
   )
  }
}

export default withStyles(styles)(Info)
