import React from "react";

const styles = {
  wrapper: {
    backgroundColor: '#FFF',
    fontSize: 12,
    font: 'sans-serif',
    userSelect: 'none',
    position: 'absolute',
    display: 'inline-block',
    borderLeft: '1px solid #CCC',
    borderRight: '1px solid #CCC',
    boxSizing: 'border-box',
    zIndex: 1000,
    boxShadow: 'rgba(0,0,0,0.25) 0px 5px 15px'
  },
  term: {
    padding: 6,
    borderBottom: '1px solid #CCC',
    display: 'border-box',
    boxSizing: 'border-box',
    cursor: 'pointer'
  }
}

function AutocompleteMenu(props) {
  const termTitle = term => {
    return term.alias || term.attribute
  }

  return (
    <div style={styles.wrapper}>
      { props.terms.map((term, index) => {
        return (
          <div style={styles.term}
               tabIndex={0}
               onClick={(e) => props.onTermSelect(e, term)}
               key={index}>
            {termTitle(term)}
          </div>
        )
      })}
    </div>
  );
}

export default AutocompleteMenu;
