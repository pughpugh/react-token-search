import React from 'react';
import { render } from 'react-dom';
import SearchInput from '../../src/react_token_search';

const styles = {
  label: {
    marginRight: 6
  }
}

const App = () => {
  const handleSearchChange = (tokens, search) => {
    console.log(search);
    console.log(tokens);
  }

  return (
    <div>
      <label style={styles.label}>Search</label>
      <SearchInput onSearchChange={handleSearchChange.bind(this)} />
    </div>
  )
};

render(<App />, document.getElementById("parappa"));
