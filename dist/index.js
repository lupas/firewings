"use strict";
/********************************************************************************************/
/** Takes a query and a payload *************************************************************/
/** Removes the properties id and path from the copy of a object  and set() it to firebase  */
/********************************************************************************************/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToFirestore = function (ref, payload, batch = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let clone = Object.assign({}, payload);
        if (clone.id)
            delete clone.id;
        if (clone.path)
            delete clone.path;
        try {
            if (batch == null) {
                yield ref.set(clone);
            }
            else {
                batch.set(ref, payload);
            }
            clone.id = ref.id;
            clone.path = ref.path;
            return clone;
        }
        catch (e) {
            return Promise.reject(e);
        }
    });
};
/***************************************************/
/** Takes a query and a payload ********************/
/** Returns the payload with the properties id and path */
/**************************************************/
exports.addToFirestore = function (ref, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        let clone = Object.assign({}, payload);
        try {
            const docRef = yield ref.add(clone);
            clone.id = docRef.id;
            clone.path = docRef.path;
            return clone;
        }
        catch (e) {
            return Promise.reject(e);
        }
    });
};
/***************************************************/
/** Takes ref and queries it ********************/
/** Returning the JS document as a Javascript Obj */
/**************************************************/
exports.queryFirestore = function (query, asObject = false) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const snapshot = yield query.get();
            return exports.unwrapFirestoreDoc(snapshot, asObject);
        }
        catch (e) {
            return Promise.reject(e);
        }
    });
};
/***************************************************/
/** Takes a Snapshot and returns the queried item */
/** adding _id and _path to the queried document  */
/**************************************************/
exports.unwrapFirestoreDoc = function (snapshot, asObject = false) {
    //If it is a multi-document query
    if (snapshot.docs) {
        if (asObject) {
            // returns a Object with all items
            let items = {};
            for (const doc of snapshot.docs) {
                let item = doc.data();
                item.id = doc.id;
                item.path = doc.ref.path;
                items[item.id] = item;
            }
            return items ? items : {};
        }
        else {
            // returns an array of items
            let items = [];
            for (const doc of snapshot.docs) {
                let item = doc.data();
                item.id = doc.id;
                item.path = doc.ref.path;
                items.push(item);
            }
            return items ? items : [];
        }
    }
    //If it is a single-document query
    // returns a single item
    if (!snapshot.docs) {
        let item = snapshot.data();
        if (item) {
            item.id = snapshot.id;
            item.path = snapshot.ref.path;
        }
        return item;
    }
};
/***************************************************************************************/
/** Gets a document, copies it to a document with the new id and deletes the old one****/
/** WARNING: Do this at your own risk, only do this if you are sure what you are doing */
/***************************************************************************************/
exports.changeDocId = function (docRef, newKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // First get the document
            const doc = yield exports.queryFirestore(docRef);
            // Then save it under the new id
            const newRef = docRef.parent.doc(newKey);
            const newDoc = yield exports.setToFirestore(newRef, doc);
            // Then delete the old document and return the new document
            yield docRef.delete();
            return newDoc;
        }
        catch (e) {
            return Promise.reject(e);
        }
    });
};
/***************************************************************************************/
/** Deletes an entire collection in batches.
/** WARNING: Do this at your own risk, only do this if you are sure what you are doing */
/***************************************************************************************/
exports.deleteEntireCollection = function (fireStore, collectionRef, batchSize = 400) {
    let query = collectionRef.orderBy('__name__').limit(batchSize);
    return new Promise((resolve, reject) => {
        _deleteQueryBatch(fireStore, query, batchSize, resolve, reject);
    });
};
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
//# sourceMappingURL=index.js.map