"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _search_token = _interopRequireDefault(require("./react_token_search/search_token"));

var _autocomplete_menu = _interopRequireDefault(require("./react_token_search/autocomplete_menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
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
  textInput: _defineProperty({
    border: 'none',
    outlineWidth: 0,
    width: 'auto',
    margin: 0,
    padding: 4,
    boxShadow: 'none',
    height: 'initial',
    lineHeight: 'initial'
  }, "width", 175)
};

var ReactTokenSearch =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReactTokenSearch, _React$Component);

  function ReactTokenSearch(props) {
    var _this;

    _classCallCheck(this, ReactTokenSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactTokenSearch).call(this, props));
    _this.state = {
      inputValue: '',
      focusedToken: undefined,
      tokens: [],
      autocompleteTerms: []
    };
    return _this;
  }

  _createClass(ReactTokenSearch, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.tokens != this.state.tokens && typeof this.props.onSearchChange == 'function') {
        this.props.onSearchChange(this.state.tokens, this.tokensAsString());
      }
    }
  }, {
    key: "tokensAsString",
    value: function tokensAsString() {
      return this.state.tokens.map(function (token) {
        return token.attribute;
      }).join(' ');
    }
  }, {
    key: "filterAutocompleteTerms",
    value: function filterAutocompleteTerms() {
      var _this2 = this;

      this.setState(function (prevState) {
        if (prevState.inputValue.length > 0) {
          var filtered = _this2.props.autocompleteTerms.filter(function (term) {
            var termName = term.alias || term.attribute;
            return termName.toLowerCase().includes(prevState.inputValue.toLowerCase());
          });

          return {
            autocompleteTerms: filtered
          };
        } else {
          return {
            autocompleteTerms: []
          };
        }
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      event.persist();
      this.setState(function () {
        return {
          inputValue: event.target.value
        };
      }, this.filterAutocompleteTerms);
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      var token = event.target.value;

      if (event.key == 'Enter' && token.length > 0) {
        this.addToken({
          attribute: token
        });
      } else if (['Backspace', 'Delete'].includes(event.key) && token.length == 0) {
        this.removeToken(this.state.tokens.length - 1);
      } else if (event.key == 'Down') {
        this.selectNextAutocompleteTerm();
      }
    }
  }, {
    key: "handleTokenFocus",
    value: function handleTokenFocus(tokenIndex) {
      this.setState({
        focusedToken: tokenIndex
      });
    }
  }, {
    key: "handleTokenBlur",
    value: function handleTokenBlur() {
      this.setState({
        focusedToken: undefined
      });
    }
  }, {
    key: "handleTokenKeyDown",
    value: function handleTokenKeyDown(e) {
      if (['Backspace', 'Delete'].includes(e.key)) {
        e.target.blur();
        this.removeToken(this.state.focusedToken);
      }
    }
  }, {
    key: "handleAutocompleteTermSelect",
    value: function handleAutocompleteTermSelect(e, term) {
      this.addToken(term);
    }
  }, {
    key: "selectNextAutocompleteTerm",
    value: function selectNextAutocompleteTerm() {}
  }, {
    key: "addToken",
    value: function addToken(token) {
      this.setState(function (prevState) {
        var tokens = prevState.tokens.concat(token);
        return {
          tokens: tokens,
          inputValue: ''
        };
      }, this.filterAutocompleteTerms);
    }
  }, {
    key: "removeToken",
    value: function removeToken(tokenIndex) {
      this.setState(function (prevState) {
        var tokens = prevState.tokens.filter(function (_, i) {
          return i !== tokenIndex;
        });
        return {
          tokens: tokens
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react.default.createElement("span", {
        style: styles.wrapper
      }, _react.default.createElement("div", {
        style: styles.search
      }, this.state.tokens.map(function (token, index) {
        return _react.default.createElement(_search_token.default, _extends({}, token, {
          selected: _this3.state.focusedToken == index,
          onKeyDown: _this3.handleTokenKeyDown.bind(_this3),
          onFocus: function onFocus() {
            return _this3.handleTokenFocus(index);
          },
          onBlur: _this3.handleTokenBlur.bind(_this3),
          key: index
        }));
      }), _react.default.createElement("input", {
        type: "text",
        value: this.state.inputValue,
        onKeyDown: this.handleKeyDown.bind(this),
        onChange: this.handleChange.bind(this),
        style: styles.textInput
      })), this.state.autocompleteTerms && _react.default.createElement(_autocomplete_menu.default, {
        terms: this.state.autocompleteTerms,
        onTermSelect: this.handleAutocompleteTermSelect.bind(this)
      }));
    }
  }]);

  return ReactTokenSearch;
}(_react.default.Component);

var _default = ReactTokenSearch;
exports.default = _default;
module.exports = exports.default;