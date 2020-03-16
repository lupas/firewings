'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _unwrapFirestoreDoc = require('./unwrapFirestoreDoc');

var _unwrapFirestoreDoc2 = _interopRequireDefault(_unwrapFirestoreDoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/***************************************************/
/** Takes ref and queries it ********************/
/** Returning the JS document as a Javascript Obj */
/**************************************************/

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query) {
    var asObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var snapshot;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return query.get();

          case 3:
            snapshot = _context.sent;
            return _context.abrupt('return', (0, _unwrapFirestoreDoc2.default)(snapshot, asObject));

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', Promise.reject(_context.t0));

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  }));

  return function (_x2) {
    return _ref.apply(this, arguments);
  };
}();