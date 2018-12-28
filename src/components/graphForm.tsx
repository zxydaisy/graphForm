
import { Component } from 'react';
import * as React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import StepConnector from './stepConnector';
import { Stages } from './stages';
// import StepConnector from c

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

interface IProps {
  completed?: boolean
  propTypes?: any
  classes?: any;
}

const propTypes = {
  classes: PropTypes.object,
};

const defaultProps = {
  classes: {
    root: {},
  }
}

class HorizontalLinearStepper extends Component<IProps, any> {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = {
    activeStep: 0,
    skipped: new Set(),
    steps: ['', '',  'complete', ''],
  };

  isStepOptional = step => {
    return step === 1;
  };

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }

    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      // skipped values 
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  handleClick = (e, step) => {
    const { steps } = this.state;
    // 添加一个节点
    steps.splice(step, 0, "step");
    this.setState({ steps });
  }

  render() {
    const { classes } = this.props;
    const { steps } = this.state;
    const { activeStep } = this.state;

    // TODO 支持  connector 自定义
    const connector = (
      <StepConnector onClick={this.handleClick} />
    );
    // TODO 根据接口返回的状态，显示节点的执行情况

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} connector={connector} alternativeLabel>
          {steps.map((label, index) => {
            const props: any = {};
            const labelProps: any = {};
            if (this.isStepOptional(index)) {
              // labelProps.optional = <Typography variant="caption">Optional</Typography>;
            }
            if (this.isStepSkipped(index)) {
              props.completed = true;
            }

            // 没有执行的时候，新增按钮可以使用，开始执行的时候，新增按钮被禁止使用
            if (label === 'complete') {
              props.completed = true;

              return (
                <Step key={label} {...props}>
                <StepLabel {...labelProps}>
                 <Stages />
                </StepLabel>
              </Step>);
            }

            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>
                  <Stages />
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

export default withStyles(styles)(HorizontalLinearStepper);
