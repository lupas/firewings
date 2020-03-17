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
const unwrapFirestoreDoc_1 = require("./unwrapFirestoreDoc");
/***************************************************/
/** Takes ref and queries it ********************/
/** Returning the JS document as a Javascript Obj */
/**************************************************/
function default_1(query, asObject = false) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const snapshot = yield query.get();
            return unwrapFirestoreDoc_1.default(snapshot, asObject);
        }
        catch (e) {
            return Promise.reject(e);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=queryFirestore.js.map