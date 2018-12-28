import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import StepButton from '@material-ui/core/StepButton';

export const styles: any = theme => ({
  buttonBox: {
    position: 'relative',
    left: '-50%',
    marginTop: '-50%',
    background: '#fff',
  },
  /* Styles applied to the root element. */
  root: {
    flex: '1 1 auto',
    position: 'relative'
  },
  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {},
  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    margin: 'auto', // center
    padding: '0', // 垂直线直接连接起来
  },
  /* Styles applied to the root element if `alternativeLabel={true}`. */
  alternativeLabel: {
    position: 'absolute',
    top: 8 + 4,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)',
  },
  /* Styles applied to the root element if `active={true}`. */
  active: {},
  /* Styles applied to the root element if `completed={true}`. */
  completed: {},
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the line element. */
  line: {
    display: 'block',
    borderColor: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600],
  },
  /* Styles applied to the root element if `orientation="horizontal"`. */
  lineHorizontal: {
    borderTopStyle: 'solid',
    borderTopWidth: 1,
  },
  /* Styles applied to the root element if `orientation="vertical"`. */
  lineVertical: {
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    minHeight: 100,
  },
});

function StepConnector(props) {
  const {
    active,
    alternativeLabel,
    classes,
    className: classNameProp,
    completed,
    disabled,
    index,
    orientation,
    children,
    onClick,
    ...other
  } = props;

  return (
    <div
      className={classNames(
        classes.root,
        classes[orientation],
        {
          [classes.alternativeLabel]: alternativeLabel,
          [classes.active]: active,
          [classes.completed]: completed,
          [classes.disabled]: disabled,
        },
        classNameProp,
      )}
      {...other}
    >
      <div className="plus" style={
        orientation === 'horizontal' ?
        {
          position: 'absolute',
          left: '50%' // 添加新增按钮
         }
         :
         {
          position: 'absolute',
          top: '50%'
         }
        }>
      <div className={classes.buttonBox}>
        <IconButton
          aria-label="Add an node"
          onClick={(e) => onClick(e, index)}
         >
          <AddIcon/>
        </IconButton>
      </div>
      </div>
      <span
        className={classNames(classes.line, {
          [classes.lineHorizontal]: orientation === 'horizontal',
          [classes.lineVertical]: orientation === 'vertical',
        })}
      />
    </div>
  );
}

StepConnector.propTypes = {
  /**
   * @ignore
   */
  active: PropTypes.bool,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  completed: PropTypes.bool,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  index: PropTypes.number,
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

StepConnector.defaultProps = {
  alternativeLabel: false,
  orientation: 'horizontal',
};

export default withStyles(styles, { name: 'MuiStepConnector' })(StepConnector);