import React from "react";

const styles = {
  backgroundColor: 'blue',
  color: '#FFF',
  fontWeight: 'bold',
  padding: '2px 6px',
  display: 'border-box',
  marginRight: 4,
  borderRadius: 3,
  fontSize: 12,
  font: 'sans-serif'
}

function SearchToken(props) {
  return (
    <span style={styles}>
      {props.label}
    </span>
  );
}

export default SearchToken;
