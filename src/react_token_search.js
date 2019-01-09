import React from 'react';
import SearchToken from './react_token_search/search_token';
import AutocompleteMenu from './react_token_search/autocomplete_menu';

const styles = {
  wrapper: {
    display: 'inline-block',
    minWidth: 175,
    maxWidth: 600
  },
  search: {
    MozAppearance: 'textfield',
    WebkitAppearance: 'textfield',
    backgroundColor: '#FFF',
    border: '1px solid darkgray',
    boxShadow: '1px 1px 1px 0 lightgray inset',
    marginTop: 5,
    padding: '3px 0 0 0',
    width: '100%'
  },
  textInput: {
    border: 'none',
    outlineWidth: 0,
    width: 'auto',
    margin: 0,
    padding: 4,
    boxShadow: 'none',
    height: 'initial',
    lineHeight: 'initial',
    width: 175
  }
};

class ReactTokenSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      focusedToken: undefined,
      tokens: [],
      autocompleteTerms: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.tokens != this.state.tokens &&
       typeof(this.props.onSearchChange) == 'function') {
      this.props.onSearchChange(this.state.tokens, this.tokensAsString());
    }
  }

  tokensAsString() {
    return this.state.tokens.map(token => token.attribute).join(' ');
  }

  filterAutocompleteTerms() {
    this.setState(prevState => {
      if(prevState.inputValue.length > 0) {
        const filtered = this.props.autocompleteTerms.filter((term) => {
          const termName = term.alias || term.attribute
          return termName.toLowerCase().includes(prevState.inputValue.toLowerCase())
        });

        return { autocompleteTerms: filtered };
      } else {
        return { autocompleteTerms: [] };
      }
    });
  }

  handleChange(event) {
    event.persist()

    this.setState(() => {
      return { inputValue: event.target.value }
    }, this.filterAutocompleteTerms)
  }

  handleKeyDown(event) {
    const token = event.target.value;

    if(event.key == 'Enter' && token.length > 0) {
      this.addToken({ attribute: token });
    }
    else if(['Backspace', 'Delete'].includes(event.key) && token.length == 0) {
      this.removeToken(this.state.tokens.length - 1);
    }
    else if(event.key == 'Down') {
      this.selectNextAutocompleteTerm()
    }
  }

  handleTokenFocus(tokenIndex) {
    this.setState({ focusedToken: tokenIndex });
  }

  handleTokenBlur() {
    this.setState({ focusedToken: undefined });
  }

  handleTokenKeyDown(e) {
    if(['Backspace', 'Delete'].includes(e.key)) {
      e.target.blur();
      this.removeToken(this.state.focusedToken);
    }
  }

  handleAutocompleteTermSelect(e, term) {
    this.addToken(term);
  }

  selectNextAutocompleteTerm() {

  }

  addToken(token) {
    this.setState(prevState => {
      const tokens = prevState.tokens.concat(token);

      return { tokens: tokens, inputValue: '' };
    }, this.filterAutocompleteTerms);
  }

  removeToken(tokenIndex) {
    this.setState(prevState => {
      const tokens = prevState.tokens.filter((_, i) => i !== tokenIndex);

      return { tokens: tokens };
    });
  }

  render() {
    return (
      <span style={styles.wrapper}>
        <div style={styles.search}>
          { this.state.tokens.map((token, index) =>
            <SearchToken {...token}
                         selected={this.state.focusedToken == index}
                         onKeyDown={this.handleTokenKeyDown.bind(this) }
                         onFocus={() => this.handleTokenFocus(index)}
                         onBlur={this.handleTokenBlur.bind(this)}
                         key={index} />
          )}
          <input type='text'
                 value={this.state.inputValue}
                 onKeyDown={this.handleKeyDown.bind(this)}
                 onChange={this.handleChange.bind(this)}
                 style={styles.textInput} />
        </div>
        { this.state.autocompleteTerms &&
          <AutocompleteMenu terms={this.state.autocompleteTerms}
                            onTermSelect={this.handleAutocompleteTermSelect.bind(this)}/>
        }
      </span>
    );
  }
}

export default ReactTokenSearch;
