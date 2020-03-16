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

    var documents, promises, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, document, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, subCollection, subCollectionSourceRef, subCollectionTargetRef, promise;

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
              _context.next = 51;
              break;
            }

            promises = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 9;
            _iterator = documents[Symbol.iterator]();

          case 11:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 35;
              break;
            }

            document = _step.value;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 16;

            for (_iterator2 = subCollections[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              subCollection = _step2.value;
              subCollectionSourceRef = sourceCollectionRef.doc(document.id).collection(subCollection);
              subCollectionTargetRef = targetCollectionRef.doc(document.id).collection(subCollection);
              promise = _copySingleCollection(subCollectionSourceRef, subCollectionTargetRef);

              promises.push(promise);
            }
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context['catch'](16);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 24:
            _context.prev = 24;
            _context.prev = 25;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 27:
            _context.prev = 27;

            if (!_didIteratorError2) {
              _context.next = 30;
              break;
            }

            throw _iteratorError2;

          case 30:
            return _context.finish(27);

          case 31:
            return _context.finish(24);

          case 32:
            _iteratorNormalCompletion = true;
            _context.next = 11;
            break;

          case 35:
            _context.next = 41;
            break;

          case 37:
            _context.prev = 37;
            _context.t1 = _context['catch'](9);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 41:
            _context.prev = 41;
            _context.prev = 42;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 44:
            _context.prev = 44;

            if (!_didIteratorError) {
              _context.next = 47;
              break;
            }

            throw _iteratorError;

          case 47:
            return _context.finish(44);

          case 48:
            return _context.finish(41);

          case 49:
            _context.next = 51;
            return Promise.all([promises]);

          case 51:
            _context.next = 56;
            break;

          case 53:
            _context.prev = 53;
            _context.t2 = _context['catch'](0);
            return _context.abrupt('return', Promise.reject(_context.t2));

          case 56:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 53], [9, 37, 41, 49], [16, 20, 24, 32], [25,, 27, 31], [42,, 44, 48]]);
  }));

  return function (_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _copySingleCollection = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(sourceCollectionRef, targetCollectionRef) {
    var documents, promises, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, document, targetRef, promise;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _queryFirestore2.default)(sourceCollectionRef);

          case 3:
            documents = _context2.sent;
            promises = [];
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context2.prev = 8;

            for (_iterator3 = documents[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              document = _step3.value;
              targetRef = targetCollectionRef.doc(document.id);
              promise = targetRef.set(document);

              promises.push(promise);
            }
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2['catch'](8);
            _didIteratorError3 = true;
            _iteratorError3 = _context2.t0;

          case 16:
            _context2.prev = 16;
            _context2.prev = 17;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 19:
            _context2.prev = 19;

            if (!_didIteratorError3) {
              _context2.next = 22;
              break;
            }

            throw _iteratorError3;

          case 22:
            return _context2.finish(19);

          case 23:
            return _context2.finish(16);

          case 24:
            _context2.next = 26;
            return Promise.all([promises]);

          case 26:
            return _context2.abrupt('return', documents);

          case 29:
            _context2.prev = 29;
            _context2.t1 = _context2['catch'](0);
            return _context2.abrupt('return', Promise.reject(_context2.t1));

          case 32:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 29], [8, 12, 16, 24], [17,, 19, 23]]);
  }));

  return function _copySingleCollection(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();