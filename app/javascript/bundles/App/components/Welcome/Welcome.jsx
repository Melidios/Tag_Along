import React, { Component } from 'react'
import greeting from '../Images/greeting.svg';
import Info from './Info'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import logo from '../Images/logo.png'


const handleSignUp = () => {
  Turbolinks.visit('/users/sign_in')
}
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  box: {
    textAlign: 'center',
  },
  header:{
      fontFamily: 'Roboto',
  },
  p:{
    fontFamily: 'Roboto',
    color:'#33691E',
    fontWeight:'bold',
    height: '70px',
    width: '320px',
    justify:'center',
  },
  logoImg: {
    height: '80px',
    width: '160px',

  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: 380,
    maxHeight: 190,
  },
  link: {
    variant: 'outlined',
    fontWeight: 'lighter',
  },
  logo: {
    height: 70,
    width: 320,
    textAlign: 'center',
    background: 'linear-gradient(45deg, #B2FF59 30%, #8BC34A 90%)',
    padding: theme.spacing.unit,
  },
  cssRoot: {
    background: 'linear-gradient(45deg, #B2FF59 30%, #8BC34A 90%)',
    '&:hover': {
      background: '#33691E',
    },
    color: 'white',
    fontWeight: 'bold',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});


class Welcome extends Component {
  state = {
  direction: 'column',
  justify: 'space-between',
  alignItems: 'center',
};

  continue = e => {
    e.preventDefault();
    this.props.nextStep()
  }
  render(){
    const { classes } = this.props;
    const { alignItems, direction, justify } = this.state;

    return(

    <Grid container className={classes.root} spacing={24}  alignItems={alignItems} direction={direction}
            justify={justify}>
      <Grid item sm={12}>
       <Paper className={classes.logo}>

             <img src={logo} className={classes.logoImg} />

       </Paper>
      </Grid>
      <Grid item sm={12}>
      <div style={{ paddingTop: 50 }}>
          <img src={greeting} className={classes.img} />
      </div>
    </Grid>
    <Grid item xs={12} className={classes.box} >
      <h1>Welcome To Tag Along!</h1>
        <p>An app design to connect you with others with the same hobbies inside you community!</p>
        <p> We believe in using technology to get people moving, doesn’t matter your sport or activity there’s always someone to tag alone with!!</p>
    </Grid>
     <Grid item xs style={{ paddingTop: 40 }}>
       <Button className={classes.cssRoot} onClick={this.continue}>Get started</Button>
     </Grid>
     <Grid item xs style={{ paddingTop: 20 }}>
      <Button onClick={handleSignUp} className={classes.link}>Have an account? Log in</Button>
     </Grid>

    </Grid>
  )
  }
}

export default withStyles(styles)(Welcome);
