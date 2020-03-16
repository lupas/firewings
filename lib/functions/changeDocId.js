'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queryFirestore = require('./queryFirestore');

var _queryFirestore2 = _interopRequireDefault(_queryFirestore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/***************************************************************************************/
/** Gets a document, copies it to a document with the new id and deletes the old one****/
/** WARNING: Do this at your own risk, only do this if you are sure what you are doing */
/***************************************************************************************/

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(docRef, newKey) {
    var doc, newRef, newDoc;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _queryFirestore2.default)(docRef);

          case 3:
            doc = _context.sent;

            // Then save it under the new id
            newRef = docRef.parent.doc(newKey);
            _context.next = 7;
            return (0, _queryFirestore2.default)(newRef, doc);

          case 7:
            newDoc = _context.sent;
            _context.next = 10;
            return docRef.delete();

          case 10:
            return _context.abrupt('return', newDoc);

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', Promise.reject(_context.t0));

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 13]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();