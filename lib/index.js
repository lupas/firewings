"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unwrapFirestoreDoc = exports.queryFirestore = exports.addToFirestore = exports.setToFirestore = void 0;

/***************************************************/

/** Takes a query and a payload ********************/

/** Removes the properties id and path from the copy of a object  and set() it to firebase  */

/**************************************************/
const setToFirestore = async function setToFirestore(query, payload) {
  let clone = Object.assign({}, payload);
  if (clone.id) delete clone.id;
  if (clone.path) delete clone.path;

  try {
    const ref = await query.set(clone);
  } catch (e) {
    return Promise.reject(e);
  }
};
/***************************************************/

/** Takes a query and a payload ********************/

/** Returns the payload with the properties id and path */

/**************************************************/


exports.setToFirestore = setToFirestore;

const addToFirestore = async function addToFirestore(query, payload) {
  console.log("HIEEER", query, payload);

  try {
    const ref = await query.add(payload);
    console.log("1");
    payload.id = ref.id;
    payload.path = ref.path;
    console.log("2");
    return payload;
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
  try {
    const snapshot = await query.get();
    return unwrapFirestoreDoc(snapshot);
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
  //If it is a multi-document query
  // returns am array of items
  if (snapshot.docs) {
    let items = [];

    for (const doc of snapshot.docs) {
      let item = doc.data();
      item.id = doc.id;
      item.path = doc.ref.path;
      items.push(item);
    }

    if (!items) {
      return [];
    }

    return items;
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

exports.unwrapFirestoreDoc = unwrapFirestoreDoc;