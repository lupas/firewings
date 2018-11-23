var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value)
            }).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
/***************************************************/
/** Takes ref and queries it ********************/
/** Returning the JS document as a Javascript Obj */
/**************************************************/
export const queryFirestore = query =>
  __awaiter(this, void 0, void 0, function*() {
    let snapshot
    try {
      snapshot = yield query.get()
    } catch (e) {
      return Promise.reject(e)
    }
    return unwrapFirestoreDoc(snapshot)
  })
/***************************************************/
/** Takes a Snapshot and returns the queried item */
/** adding _id and _path to the queried document  */
/**************************************************/
export const unwrapFirestoreDoc = snapshot => {
  //If it is a multi-document query
  // returns am array of items
  if (snapshot.docs) {
    let items = []
    for (const doc of snapshot.docs) {
      let item = doc.data()
      item.id = doc.id
      item.path = doc.ref.path
      items.push(item)
    }
    if (!items) {
      return []
    }
    return items
  }
  //If it is a single-document query
  // returns a single item
  if (!snapshot.docs) {
    let item = snapshot.data()
    if (item) {
      item.id = snapshot.id
      item.path = snapshot.ref.path
    }
    return item
  }
}
