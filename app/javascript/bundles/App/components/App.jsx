import React, { Component } from 'react'
import { render } from 'react-dom';
import Welcome from './Welcome/Welcome.jsx'
import Info from './Welcome/Info.jsx'
import 'typeface-roboto';



class App extends Component {
 state = { step: 1 }
 nextStep = () => {
   const { step } = this.state;
  this.setState({
     step: step + 1
   });
 }

 prevStep = () => {
   const { step } = this.state;
  this.setState({
    step: step - 1
  });
 }

 infoOrWelcome = () => {
  switch( this.state.step ){
    case 1:
     return (<Welcome nextStep = {this.nextStep}/>);
     break;
    case 2:
     return (<Info prevStep = {this.prevStep} />);
     break;
   }
 }

render(){
  return(
       <div>
         { this.infoOrWelcome() }
       </div>
  )
 }
}
export default App
