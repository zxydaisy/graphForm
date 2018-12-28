
import * as React from "react";
import Stepper from '@material-ui/core/Stepper';
import Step from './step';
import StepLabel from '@material-ui/core/StepLabel';
import StageCard from './stageCard';
import StepConnector from './stepConnector';
// import { useState } from 'react';

export class Stages  extends React.Component {

  state = { stages: ['', ''] };

  handleClick = () => {
    const { stages } = this.state;
    stages.push('');
    this.setState({ stages });
  }

  remove = (index) => {

  }

  render() {
    const { stages } = this.state;

    return (<div>
      <Stepper orientation="vertical" connector={<StepConnector onClick={this.handleClick} orientation="vertical"/>}>
      {
        stages.map((stage, index) => {
          return (<Step key={index}>
           <StepLabel>{stage}</StepLabel>
            <StageCard delete={() => this.remove(index)}/>;
          </Step>);
        })
      }
    </Stepper>
    </div>);
  }
};
