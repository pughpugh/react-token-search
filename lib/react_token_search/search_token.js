"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
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
};

function SearchToken(props) {
  var tokenStyles = function tokenStyles() {
    return props.selected ? _objectSpread({}, styles, {
      backgroundColor: '#2C83AD'
    }) : styles;
  };

  var tokenLabel = function tokenLabel() {
    return props.alias || props.attribute;
  };

  return _react.default.createElement("span", {
    style: tokenStyles(),
    onKeyDown: props.onKeyDown,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    tabIndex: 0
  }, tokenLabel());
}

var _default = SearchToken;
exports.default = _default;
module.exports = exports.default;