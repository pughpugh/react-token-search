import React from "react";

const styles = {
  backgroundColor: '#46A7D6',
  color: '#FFF',
  fontWeight: 'bold',
  padding: '2px 6px',
  display: 'border-box',
  marginRight: 4,
  borderRadius: 3,
  fontSize: 12,
  userSelect: 'none',
  cursor: 'pointer'
}

function SearchToken(props) {
  const tokenStyles = () => {
    return props.selected ? {...styles,...{ backgroundColor: '#2C83AD' }} : styles
  }

  return (
    <span style={tokenStyles()}
          onKeyDown={props.onKeyDown}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          tabIndex={0}>
      {props.label}
    </span>
  );
}

export default SearchToken;
