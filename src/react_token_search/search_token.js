import React from "react";

const styles = {
  backgroundColor: '#46A7D6',
  color: '#FFF',
  fontWeight: 'bold',
  padding: '2px 6px',
  boxSizing: 'border-box',
  display: 'inline-block',
  margin: '0 0 4px 5px',
  borderRadius: 3,
  fontSize: 12,
  userSelect: 'none',
  cursor: 'pointer'
}

function SearchToken(props) {
  const tokenStyles = () => {
    return props.selected ? {...styles,...{ backgroundColor: '#2C83AD' }} : styles
  }

  const tokenLabel = () => {
    return props.alias || props.attribute
  }

  return (
    <span style={tokenStyles()}
          onKeyDown={props.onKeyDown}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          tabIndex={0}>
      {tokenLabel()}
    </span>
  );
}

export default SearchToken;
