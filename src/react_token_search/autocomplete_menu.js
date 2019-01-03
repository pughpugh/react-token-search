import React from "react";

const styles = {
  wrapper: {
    backgroundColor: '#FFF',
    fontSize: 12,
    font: 'sans-serif',
    userSelect: 'none',
    position: 'relative',
    display: 'inline-block',
    borderLeft: '1px solid #CCC',
    borderRight: '1px solid #CCC',
    width: '100%',
    transition: 'all 0.3s ease',
    maxHeight: 400,
    boxSizing: 'border-box',
    overflowY: 'auto',
    overflowX: 'hidden'
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
      { props.terms.map(term => {
        return (
          <div style={styles.term}
               tabIndex={0}
               onClick={(e) => props.onTermSelect(e, term)}
               key={term.attribute}>
            {termTitle(term)}
          </div>
        )
      })}
    </div>
  );
}

export default AutocompleteMenu;
