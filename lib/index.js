"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeDocId = exports.unwrapFirestoreDoc = exports.queryFirestore = exports.addToFirestore = exports.setToFirestore = void 0;

/********************************************************************************************/

/** Takes a query and a payload *************************************************************/

/** Removes the properties id and path from the copy of a object  and set() it to firebase  */

/********************************************************************************************/
const setToFirestore = async function setToFirestore(ref, payload) {
  let batch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  let clone = Object.assign({}, payload);
  if (clone.id) delete clone.id;
  if (clone.path) delete clone.path;

  try {
    if (batch == null) {
      await ref.set(clone);
    } else {
      batch.set(ref, payload);
    }

    clone.id = ref.id;
    clone.path = ref.path;
    return clone;
  } catch (e) {
    return Promise.reject(e);
  }
};
/***************************************************/

/** Takes a query and a payload ********************/

/** Returns the payload with the properties id and path */

/**************************************************/


exports.setToFirestore = setToFirestore;

const addToFirestore = async function addToFirestore(ref, payload) {
  let clone = Object.assign({}, payload);

  try {
    const docRef = await ref.add(clone);
    clone.id = docRef.id;
    clone.path = docRef.path;
    return clone;
  } catch (e) {
    return Promise.reject(e);
  }
};
/***************************************************/

/** Takes ref and queries it ********************/

/** Returning the JS document as a Javascript Obj */

/**************************************************/


exports.addToFirestore = addToFirestore;

const queryFirestore = async function queryFirestore(query) {
  let asObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  try {
    const snapshot = await query.get();
    return unwrapFirestoreDoc(snapshot, asObject);
  } catch (e) {
    return Promise.reject(e);
  }
};
/***************************************************/

/** Takes a Snapshot and returns the queried item */

/** adding _id and _path to the queried document  */

/**************************************************/


exports.queryFirestore = queryFirestore;

const unwrapFirestoreDoc = function unwrapFirestoreDoc(snapshot) {
  let asObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

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
    } else {
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
  } //If it is a single-document query
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


exports.unwrapFirestoreDoc = unwrapFirestoreDoc;

const changeDocId = async function changeDocId(docRef, newKey) {
  try {
    // First get the document
    const doc = await queryFirestore(docRef); // Then save it under the new id

    const newRef = docRef.parent.doc(newKey);
    const newDoc = await setToFirestore(newRef, doc); // Then delete the old document and return the new document

    await docRef.delete();
    return newDoc;
  } catch (e) {
    return Promise.reject(e);
  }
};

exports.changeDocId = changeDocId;