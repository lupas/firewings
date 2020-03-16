"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/********************************************************************************************/
/** Takes a query and a payload *************************************************************/
/** Removes the properties id and path from the copy of a object  and set() it to firebase  */
/********************************************************************************************/

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ref, payload) {
    var batch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var clone;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            clone = Object.assign({}, payload);

            if (clone.id) delete clone.id;
            if (clone.path) delete clone.path;

            _context.prev = 3;

            if (!(batch == null)) {
              _context.next = 9;
              break;
            }

            _context.next = 7;
            return ref.set(clone);

          case 7:
            _context.next = 10;
            break;

          case 9:
            batch.set(ref, payload);

          case 10:
            clone.id = ref.id;
            clone.path = ref.path;
            return _context.abrupt("return", clone);

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", Promise.reject(_context.t0));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 15]]);
  }));

  return function (_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();