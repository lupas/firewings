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
const queryFirestore_2 = require("./queryFirestore");
/***************************************************************************************/
/** Gets a document, copies it to a document with the new id and deletes the old one****/
/** WARNING: Do this at your own risk, only do this if you are sure what you are doing */
/***************************************************************************************/
function default_1(docRef, newKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // First get the document
            const doc = yield queryFirestore_1.default(docRef);
            // Then save it under the new id
            const newRef = docRef.parent.doc(newKey);
            const newDoc = yield queryFirestore_2.default(newRef, doc);
            // Then delete the old document and return the new document
            yield docRef.delete();
            return newDoc;
        }
        catch (e) {
            return Promise.reject(e);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=changeDocId.js.map