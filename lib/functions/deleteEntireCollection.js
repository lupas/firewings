'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fireStore, collectionRef) {
  var batchSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 400;

  var query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise(function (resolve, reject) {
    _deleteQueryBatch(fireStore, query, batchSize, resolve, reject);
  });
};

function _deleteQueryBatch(fireStore, query, batchSize, resolve, reject) {
  query.get().then(function (snapshot) {
    // When there are no documents left, we are done
    if (snapshot.size == 0) {
      return 0;
    }

    // Delete documents in a batch
    var batch = fireStore.batch();
    snapshot.docs.forEach(function (doc) {
      batch.delete(doc.ref);
    });

    return batch.commit().then(function () {
      return snapshot.size;
    });
  }).then(function (numDeleted) {
    if (numDeleted === 0) {
      resolve();
      return;
    }

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(function () {
      _deleteQueryBatch(fireStore, query, batchSize, resolve, reject);
    });
  }).catch(reject);
} /***************************************************************************************/
/** Deletes an entire collection in batches.
/** WARNING: Do this at your own risk, only do this if you are sure what you are doing */
/***************************************************************************************/