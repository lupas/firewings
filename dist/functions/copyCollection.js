"use strict";
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
const queryFirestore_1 = require("./queryFirestore");
const deleteEntireCollection_1 = require("./deleteEntireCollection");
/***************************************************************************************/
/** Copies a collection to a new path, leaves the old Collection as is. ****************/
/** Does the same for each subcollection (only depth of 1) mentionedn in 3. argument ***/
/** WARNING: Do this at your own risk, only do this if you are sure what you are doing */
/***************************************************************************************/
function default_1(sourceCollectionRef, targetCollectionRef, subCollections = [], fireStore = null, deleteOld = false) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Copy Main Collection
            const documents = yield _copySingleCollection(sourceCollectionRef, targetCollectionRef);
            // If subcollections should be copied too, copy them.
            if (subCollections.length > 0) {
                const promises = [];
                const deletePromises = [];
                for (const subCollection of subCollections) {
                    for (const document of documents) {
                        const subCollectionSourceRef = sourceCollectionRef
                            .doc(document.id)
                            .collection(subCollection);
                        const subCollectionTargetRef = targetCollectionRef
                            .doc(document.id)
                            .collection(subCollection);
                        const promise = _copySingleCollection(subCollectionSourceRef, subCollectionTargetRef);
                        promises.push(promise);
                        if (deleteOld === true) {
                            const deletePromise = deleteEntireCollection_1.default(fireStore, subCollectionSourceRef);
                            deletePromises.push(deletePromise);
                        }
                    }
                }
                // Copy all documents of this subselection
                yield Promise.all([promises]);
                // Delete the old subselections
                yield Promise.all([deletePromises]);
            }
            if (deleteOld === true) {
                // Delete old main collection
                yield deleteEntireCollection_1.default(fireStore, sourceCollectionRef);
            }
        }
        catch (e) {
            Promise.reject(e);
        }
    });
}
exports.default = default_1;
const _copySingleCollection = function (sourceCollectionRef, targetCollectionRef) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const documents = yield queryFirestore_1.default(sourceCollectionRef);
            const promises = [];
            for (const document of documents) {
                const targetRef = targetCollectionRef.doc(document.id);
                const promise = targetRef.set(document);
                promises.push(promise);
            }
            yield Promise.all([promises]);
            return documents;
        }
        catch (e) {
            return Promise.reject(e);
        }
    });
};
//# sourceMappingURL=copyCollection.js.map