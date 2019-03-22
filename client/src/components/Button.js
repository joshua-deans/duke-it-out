import React from 'react';
import propTypes from 'prop-types';

import '../containers/ChatRoom.css';

const Button = (props) => {
  const btnClass = props.btnClass;
  const text = props.text;
  const onClick = props.onClick;

  return (
    <button className="btn btn-success btn-block align-text-bottom mx-auto mb-1 rounded-0" onClick={() => {props.onSelectTeam(props.team)}}>{text}</button>
  )
;}

Button.propTypes = {
  team: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  onClick: propTypes.func
}

Button.defaultProps = {
  onClick: () => {},
}

export default Button;