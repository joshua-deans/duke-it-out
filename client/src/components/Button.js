import React from 'react';
import propTypes from 'prop-types';

import '../containers/ChatRoom.css';

const Button = (props) => {
  const btnClass = props.btnClass;
  const text = props.text;
  const onClick = props.onClick;

  return (
    <button className={btnClass} onClick={props.onSelectTeam}>{text}</button>
  )
;}

Button.propTypes = {
  btnClass: propTypes.string,
  text: propTypes.string.isRequired,
  onClick: propTypes.func
}

Button.defaultProps = {
  btnClass: 'btn btn-primary',
  onClick: () => {},
}

export default Button;