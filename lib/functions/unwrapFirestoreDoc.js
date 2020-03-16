"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (snapshot) {
  var asObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  //If it is a multi-document query

  if (snapshot.docs) {
    if (asObject) {
      // returns a Object with all items
      var items = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = snapshot.docs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var doc = _step.value;

          var item = doc.data();
          item.id = doc.id;
          item.path = doc.ref.path;
          items[item.id] = item;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return items ? items : {};
    } else {
      // returns an array of items
      var _items = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = snapshot.docs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _doc = _step2.value;

          var _item = _doc.data();
          _item.id = _doc.id;
          _item.path = _doc.ref.path;
          _items.push(_item);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return _items ? _items : [];
    }
  }

  //If it is a single-document query
  // returns a single item
  if (!snapshot.docs) {
    var _item2 = snapshot.data();
    if (_item2) {
      _item2.id = snapshot.id;
      _item2.path = snapshot.ref.path;
    }
    return _item2;
  }
};