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
function default_1(ref, payload, batch = null) {
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
}
exports.default = default_1;
//# sourceMappingURL=setToFirestore.js.map