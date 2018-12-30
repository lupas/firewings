/***************************************************/
/** Takes a query and a payload ********************/
/** Removes the properties id and path from the copy of a object  and set() it to firebase  */
/**************************************************/

export const setToFirestore = async function(ref, payload) {
  let clone = Object.assign({}, payload)
  if (clone.id) delete clone.id
  if (clone.path) delete clone.path

  try {
    await ref.set(clone)
  } catch (e) {
    return Promise.reject(e)
  }
}

/***************************************************/
/** Takes a query and a payload ********************/
/** Returns the payload with the properties id and path */
/**************************************************/

export const addToFirestore = async function(ref, payload) {
  let clone = Object.assign({}, payload)
  try {
    const docRef = await ref.add(clone)
    clone.id = docRef.id
    clone.path = docRef.path
    return clone
  } catch (e) {
    return Promise.reject(e)
  }
}

/***************************************************/
/** Takes ref and queries it ********************/
/** Returning the JS document as a Javascript Obj */
/**************************************************/

export const queryFirestore = async function(query) {
  try {
    const snapshot = await query.get()
    return unwrapFirestoreDoc(snapshot)
  } catch (e) {
    return Promise.reject(e)
  }
}

/***************************************************/
/** Takes a Snapshot and returns the queried item */
/** adding _id and _path to the queried document  */
/**************************************************/
export const unwrapFirestoreDoc = function(snapshot) {
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
