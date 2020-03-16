"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/***************************************************/
/** Takes a query and a payload ********************/
/** Returns the payload with the properties id and path */
/**************************************************/

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ref, payload) {
    var clone, docRef;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            clone = Object.assign({}, payload);
            _context.prev = 1;
            _context.next = 4;
            return ref.add(clone);

          case 4:
            docRef = _context.sent;

            clone.id = docRef.id;
            clone.path = docRef.path;
            return _context.abrupt("return", clone);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", Promise.reject(_context.t0));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 10]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();