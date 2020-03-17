"use strict";
/***************************************************************************************/
/** Deletes an entire collection in batches.
/** WARNING: Do this at your own risk, only do this if you are sure what you are doing */
/***************************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(fireStore, collectionRef, batchSize = 400) {
    let query = collectionRef.orderBy('__name__').limit(batchSize);
    return new Promise((resolve, reject) => {
        _deleteQueryBatch(fireStore, query, batchSize, resolve, reject);
    });
}
exports.default = default_1;
function _deleteQueryBatch(fireStore, query, batchSize, resolve, reject) {
    query
        .get()
        .then(snapshot => {
        // When there are no documents left, we are done
        if (snapshot.size == 0) {
            return 0;
        }
        // Delete documents in a batch
        var batch = fireStore.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        return batch.commit().then(() => {
            return snapshot.size;
        });
    })
        .then(numDeleted => {
        if (numDeleted === 0) {
            resolve();
            return;
        }
        // Recurse on the next process tick, to avoid
        // exploding the stack.
        process.nextTick(() => {
            _deleteQueryBatch(fireStore, query, batchSize, resolve, reject);
        });
    })
        .catch(reject);
}
//# sourceMappingURL=deleteEntireCollection.js.map