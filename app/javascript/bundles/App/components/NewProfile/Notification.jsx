import React from 'react';
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
    '&$checked': {
      color: green[700],
    }
  },
  label: {
    '&$checked': {
      color: green[700],
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

class Notification extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = event => {
    this.setState({ notification: event.target.value})
    if (this.props.notification) {
      this.props.handleNotificationChange(event.target.value)
    }
      if (value == "true") {
        this.setState({ notification: true})
        this.props.handleNotificationChange(this.state.notification)
      }
    };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel className={classNames(classes.checked, classes.name)}  component="legend">Notifications</FormLabel>
          <RadioGroup
            aria-label="notification"
            name="notifications"
            className={classNames(classes.radio, classes.checked, classes.label)}
            value={ this.props.notification }
          >
            <FormControlLabel
              value="true"
              control={<Radio className={classNames(classes.radio, classes.checked, classes.label)} />}
              label="Get by email"
              onChange={ this.handleChange }
              className={classNames(classes.radio, classes.checked, classes.label)}
            />
            <FormControlLabel
              value="false"
              control={<Radio className={classNames(classes.radio, classes.checked, classes.label)} />}
              label="Do Not Get"
              onChange={ this.handleChange }
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}


export default withStyles(styles)(Notification)
