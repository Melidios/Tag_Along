import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import classNames from 'classnames';
import green from '@material-ui/core/colors/green';



const styles = theme => ({
  root: {
    display: 'flex',
  },
  radio: {
    color: green[600],
  },
  label: {
    '&$checked': {
      color: green[500],
    },
  },
  name: {
      color: green[800],
},
  checked: {},
  formControl: {
    margin: theme.spacing.unit,
  },

});

class GenderChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
  }

  handleChange = (event) => {
    this.props.handleGenderChange(event)

      console.log(`Event in handleChange is:\n ${event.target.value}`)

  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>

        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel className={classNames(classes.checked, classes.name)} component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="notification"
            name="genderChoice"
            value={ this.props.gender }
          >
            <FormControlLabel
              value="female"
              control={<Radio className={classNames(classes.radio, classes.checked, classes.label)} />}
              label="Female"
              onChange={ this.handleChange }
            />
            <FormControlLabel
              value="male"
              control={<Radio className={classNames(classes.radio, classes.checked, classes.label)} />}
              label="Male"
              onChange={ this.handleChange }
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}


export default withStyles(styles)(GenderChoice);
