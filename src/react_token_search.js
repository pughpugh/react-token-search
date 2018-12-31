import React from 'react';
import SearchToken from './react_token_search/search_token';

const styles = {
  wrapper: {
    MozAppearance: 'textfield',
    WebkitAppearance: 'textfield',
    backgroundColor: '#FFF',
    border: '1px solid darkgray',
    boxShadow: '1px 1px 1px 0 lightgray inset',
    marginTop: 5,
    padding: '2px 3px'
  },
  textInput: {
    border: 'none',
    outlineWidth: 0
  }
};

class ReactTokenSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      focusedToken: undefined,
      tokens: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.tokens != this.state.tokens &&
       typeof(this.props.onSearchChange) == 'function') {
      this.props.onSearchChange(this.state.tokens, this.tokensAsString());
    }
  }

  tokensAsString() {
    return this.state.tokens.map(token => token.label).join(' ');
  }

  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  handleKeyDown(event) {
    const token = event.target.value;

    if(event.key == 'Enter' && token.length > 0) {
      this.addToken(token);
    }
    else if(['Backspace', 'Delete'].includes(event.key) && token.length == 0) {
      this.removeToken(this.state.tokens.length - 1);
    }
  }

  handleTokenFocus(tokenIndex) {
    this.setState({ focusedToken: tokenIndex });
  }

  handleTokenBlur() {
    this.setState({ focusedToken: undefined });
  }

  handleTokenKeyDown(e, tokenIndex) {
    if(['Backspace', 'Delete'].includes(event.key)) {
      e.target.blur();
      this.removeToken(tokenIndex);
    }
  }

  addToken(token) {
    this.setState(prevState => {
      const tokens = prevState.tokens.concat({
        label: token
      });

      return { tokens: tokens, inputValue: '' };
    });
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
        <span>
          { this.state.tokens.map((token, index) =>
            <SearchToken {...token}
                         selected={this.state.focusedToken == index}
                         onKeyDown={(e) => this.handleTokenKeyDown(e, index) }
                         onFocus={() => this.handleTokenFocus(index)}
                         onBlur={this.handleTokenBlur.bind(this)}
                         key={index} />
          )}
        </span>
        <input type='text'
               value={this.state.inputValue}
               onKeyDown={this.handleKeyDown.bind(this)}
               onChange={this.handleChange.bind(this)}
               style={styles.textInput} />
      </span>
    );
  }
}

export default ReactTokenSearch;
