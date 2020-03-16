'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queryFirestore = require('./queryFirestore');

var _queryFirestore2 = _interopRequireDefault(_queryFirestore);

var _deleteEntireCollection = require('./deleteEntireCollection');

var _deleteEntireCollection2 = _interopRequireDefault(_deleteEntireCollection);

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
    var fireStore = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var deleteOld = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    var documents, promises, deletePromises, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, subCollection, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, document, subCollectionSourceRef, subCollectionTargetRef, promise, deletePromise;

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
              _context.next = 54;
              break;
            }

            promises = [];
            deletePromises = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 10;
            _iterator = subCollections[Symbol.iterator]();

          case 12:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 36;
              break;
            }

            subCollection = _step.value;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 17;

            for (_iterator2 = documents[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              document = _step2.value;
              subCollectionSourceRef = sourceCollectionRef.doc(document.id).collection(subCollection);
              subCollectionTargetRef = targetCollectionRef.doc(document.id).collection(subCollection);
              promise = _copySingleCollection(subCollectionSourceRef, subCollectionTargetRef);

              promises.push(promise);
              if (deleteOld === true) {
                deletePromise = (0, _deleteEntireCollection2.default)(fireStore, subCollectionSourceRef);

                deletePromises.push(deletePromise);
              }
            }
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context['catch'](17);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 25:
            _context.prev = 25;
            _context.prev = 26;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 28:
            _context.prev = 28;

            if (!_didIteratorError2) {
              _context.next = 31;
              break;
            }

            throw _iteratorError2;

          case 31:
            return _context.finish(28);

          case 32:
            return _context.finish(25);

          case 33:
            _iteratorNormalCompletion = true;
            _context.next = 12;
            break;

          case 36:
            _context.next = 42;
            break;

          case 38:
            _context.prev = 38;
            _context.t1 = _context['catch'](10);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 42:
            _context.prev = 42;
            _context.prev = 43;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 45:
            _context.prev = 45;

            if (!_didIteratorError) {
              _context.next = 48;
              break;
            }

            throw _iteratorError;

          case 48:
            return _context.finish(45);

          case 49:
            return _context.finish(42);

          case 50:
            _context.next = 52;
            return Promise.all([promises]);

          case 52:
            _context.next = 54;
            return Promise.all([deletePromises]);

          case 54:
            if (!(deleteOld === true)) {
              _context.next = 57;
              break;
            }

            _context.next = 57;
            return (0, _deleteEntireCollection2.default)(fireStore, sourceCollectionRef);

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
    }, _callee, this, [[0, 59], [10, 38, 42, 50], [17, 21, 25, 33], [26,, 28, 32], [43,, 45, 49]]);
  }));

  return function (_x4, _x5) {
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

  return function _copySingleCollection(_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();