"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
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
};

function AutocompleteMenu(props) {
  var termTitle = function termTitle(term) {
    return term.alias || term.attribute;
  };

  return _react.default.createElement("div", {
    style: styles.wrapper
  }, props.terms.map(function (term, index) {
    return _react.default.createElement("div", {
      style: styles.term,
      tabIndex: 0,
      onClick: function onClick(e) {
        return props.onTermSelect(e, term);
      },
      key: index
    }, termTitle(term));
  }));
}

var _default = AutocompleteMenu;
exports.default = _default;
module.exports = exports.default;