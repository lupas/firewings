'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queryFirestore = require('./queryFirestore');

var _queryFirestore2 = _interopRequireDefault(_queryFirestore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/***************************************************************************************/
/** Copies a collection to a new path, leaves the old Collection as is. ****************/
/** Does the same for each subcollection (only depth of 1) mentionedn in 3. argument ***/
/** WARNING: Do this at your own risk, only do this if you are sure what you are doing */
/***************************************************************************************/

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sourceCollectionRef, targetCollectionRef) {
    var subCollections = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var documents, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, document, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, subCollection, subCollectionSourceRef, subCollectionTargetRef;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _copySingleCollection(sourceCollectionRef, targetCollectionRef);

          case 3:
            documents = _context.sent;

            if (!(subCollections.length > 0)) {
              _context.next = 57;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 8;
            _iterator = documents[Symbol.iterator]();

          case 10:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 43;
              break;
            }

            document = _step.value;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 15;
            _iterator2 = subCollections[Symbol.iterator]();

          case 17:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 26;
              break;
            }

            subCollection = _step2.value;
            subCollectionSourceRef = sourceCollectionRef.doc(document.id).collection(subCollection);
            subCollectionTargetRef = targetCollectionRef.doc(document.id).collection(subCollection);
            _context.next = 23;
            return _copySingleCollection(subCollectionSourceRef, subCollectionTargetRef);

          case 23:
            _iteratorNormalCompletion2 = true;
            _context.next = 17;
            break;

          case 26:
            _context.next = 32;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context['catch'](15);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 32:
            _context.prev = 32;
            _context.prev = 33;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 35:
            _context.prev = 35;

            if (!_didIteratorError2) {
              _context.next = 38;
              break;
            }

            throw _iteratorError2;

          case 38:
            return _context.finish(35);

          case 39:
            return _context.finish(32);

          case 40:
            _iteratorNormalCompletion = true;
            _context.next = 10;
            break;

          case 43:
            _context.next = 49;
            break;

          case 45:
            _context.prev = 45;
            _context.t1 = _context['catch'](8);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 49:
            _context.prev = 49;
            _context.prev = 50;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 52:
            _context.prev = 52;

            if (!_didIteratorError) {
              _context.next = 55;
              break;
            }

            throw _iteratorError;

          case 55:
            return _context.finish(52);

          case 56:
            return _context.finish(49);

          case 57:
            _context.next = 62;
            break;

          case 59:
            _context.prev = 59;
            _context.t2 = _context['catch'](0);
            return _context.abrupt('return', Promise.reject(_context.t2));

          case 62:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 59], [8, 45, 49, 57], [15, 28, 32, 40], [33,, 35, 39], [50,, 52, 56]]);
  }));

  return function (_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _copySingleCollection = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(sourceCollectionRef, targetCollectionRef) {
    var documents, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, document, targetRef;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _queryFirestore2.default)(sourceCollectionRef);

          case 3:
            documents = _context2.sent;
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context2.prev = 7;
            _iterator3 = documents[Symbol.iterator]();

          case 9:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context2.next = 17;
              break;
            }

            document = _step3.value;
            targetRef = targetCollectionRef.doc(document.id);
            _context2.next = 14;
            return targetRef.set(document);

          case 14:
            _iteratorNormalCompletion3 = true;
            _context2.next = 9;
            break;

          case 17:
            _context2.next = 23;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2['catch'](7);
            _didIteratorError3 = true;
            _iteratorError3 = _context2.t0;

          case 23:
            _context2.prev = 23;
            _context2.prev = 24;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 26:
            _context2.prev = 26;

            if (!_didIteratorError3) {
              _context2.next = 29;
              break;
            }

            throw _iteratorError3;

          case 29:
            return _context2.finish(26);

          case 30:
            return _context2.finish(23);

          case 31:
            return _context2.abrupt('return', documents);

          case 34:
            _context2.prev = 34;
            _context2.t1 = _context2['catch'](0);
            return _context2.abrupt('return', Promise.reject(_context2.t1));

          case 37:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 34], [7, 19, 23, 31], [24,, 26, 30]]);
  }));

  return function _copySingleCollection(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();