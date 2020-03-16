'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _addToFirestore = require('./functions/addToFirestore');

Object.defineProperty(exports, 'addToFirestore', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_addToFirestore).default;
  }
});

var _changeDocId = require('./functions/changeDocId');

Object.defineProperty(exports, 'changeDocId', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_changeDocId).default;
  }
});

var _copyCollection = require('./functions/copyCollection');

Object.defineProperty(exports, 'copyCollection', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_copyCollection).default;
  }
});

var _deleteEntireCollection = require('./functions/deleteEntireCollection');

Object.defineProperty(exports, 'deleteEntireCollection', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_deleteEntireCollection).default;
  }
});

var _queryFirestore = require('./functions/queryFirestore');

Object.defineProperty(exports, 'queryFirestore', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_queryFirestore).default;
  }
});

var _setToFirestore = require('./functions/setToFirestore');

Object.defineProperty(exports, 'setToFirestore', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_setToFirestore).default;
  }
});

var _unwrapFirestoreDoc = require('./functions/unwrapFirestoreDoc');

Object.defineProperty(exports, 'unwrapFirestoreDoc', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_unwrapFirestoreDoc).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }