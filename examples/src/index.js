import React from 'react';
import { render } from 'react-dom';
import SearchInput from '../../src/react_token_search';

const styles = {
  wrapper: {
    fontFamily: 'sans-serif'
  },
  label: {
    marginRight: 6,
    marginTop: 8,
    verticalAlign: 'top',
    display: 'inline-block',
    fontSize: 14
  }
}

const autocompleteTerms = [
  {
    attribute: 'general_colour',
    alias: 'colour',
    type: 'string',
    values: ['red', 'blue', 'green', 'yellow', 'pink', 'black']
  },
  {
    attribute: 'quantity',
    type: 'integer'
  },
  {
    attribute: 'size',
    type: 'string',
    values: ['small', 'medium', 'large']
  }
]

const App = () => {
  const handleSearchChange = (tokens, search) => {
    console.log(search);
    console.log(tokens);
  }

  return (
    <div style={styles.wrapper}>
      <label style={styles.label}>Search</label>
      <SearchInput onSearchChange={handleSearchChange.bind(this)}
                   autocompleteTerms={autocompleteTerms} />
    </div>
  )
};

render(<App />, document.getElementById("parappa"));
