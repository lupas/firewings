type DocumentReference = firebase.firestore.DocumentReference
type CollectionReference = firebase.firestore.CollectionReference
type DocumentSnapshot = firebase.firestore.DocumentSnapshot
type QuerySnapshot = firebase.firestore.QuerySnapshot
type WriteBatch = firebase.firestore.WriteBatch
type Firestore = firebase.firestore.Firestore

/********************************************************************************************/
/** Takes a query and a payload *************************************************************/
/** Removes the properties id and path from the copy of a object  and set() it to firebase  */
/********************************************************************************************/

export const setToFirestore = async function(
  ref: DocumentReference,
  payload: any,
  batch?: WriteBatch
): Promise<any> {
  let clone = Object.assign({}, payload)
  if (clone.id) delete clone.id
  if (clone.path) delete clone.path

  try {
    if (batch == undefined) {
      await ref.set(clone)
    } else {
      batch.set(ref, payload)
    }
    clone.id = ref.id
    clone.path = ref.path
    return clone
  } catch (e) {
    return Promise.reject(e)
  }
}

/***************************************************/
/** Takes a query and a payload ********************/
/** Returns the payload with the properties id and path */
/**************************************************/

export const addToFirestore = async function(
  ref: CollectionReference,
  payload: any
) {
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

export const queryFirestore = async function(
  query: DocumentReference,
  asObject = false
): Promise<any> {
  try {
    const snapshot = await query.get()
    return unwrapFirestoreDoc(snapshot, asObject)
  } catch (e) {
    return Promise.reject(e)
  }
}

/***************************************************/
/** Takes a Snapshot and returns the queried item */
/** adding _id and _path to the queried document  */
/**************************************************/
export const unwrapFirestoreDoc = function(
  snapshot: DocumentSnapshot | QuerySnapshot,
  asObject = false
): any {
  //If it is a multi-document query
  if ((snapshot as QuerySnapshot).docs) {
    return _unwrapQuerySnapshot(snapshot as QuerySnapshot, asObject)
  }
  //If it is a single-document query
  // returns a single item
  else {
    return _unwrapDocumentSnapshot(snapshot as DocumentSnapshot)
  }
}

function _unwrapQuerySnapshot(snapshot: QuerySnapshot, asObject: boolean) {
  if (asObject) {
    // returns a Object with all items
    let items = {}
    for (const doc of snapshot.docs) {
      let item = doc.data()
      item.id = doc.id
      item.path = doc.ref.path
      items[item.id] = item
    }
    return items ? items : {}
  } else {
    // returns an array of items
    let items = []
    for (const doc of snapshot.docs) {
      let item = doc.data()
      item.id = doc.id
      item.path = doc.ref.path
      items.push(item)
    }
    return items ? items : []
  }
}

function _unwrapDocumentSnapshot(snapshot: DocumentSnapshot) {
  let item = snapshot.data()
  if (item) {
    item.id = snapshot.id
    item.path = snapshot.ref.path
  }
  return item
}

/***************************************************************************************/
/** Gets a document, copies it to a document with the new id and deletes the old one****/
/** WARNING: Do this at your own risk, only do this if you are sure what you are doing */
/***************************************************************************************/

export const changeDocId = async function(
  docRef: DocumentReference,
  newKey: string
): Promise<any> {
  try {
    // First get the document
    const doc = await queryFirestore(docRef)
    // Then save it under the new id
    const newRef = docRef.parent.doc(newKey)
    const newDoc = await setToFirestore(newRef, doc)
    // Then delete the old document and return the new document
    await docRef.delete()
    return newDoc
  } catch (e) {
    return Promise.reject(e)
  }
}

/***************************************************************************************/
/** Deletes an entire collection in batches.
/** WARNING: Do this at your own risk, only do this if you are sure what you are doing */
/***************************************************************************************/

export const deleteEntireCollection = async function(
  fireStore: Firestore,
  collectionRef: CollectionReference,
  batchSize = 400
): Promise<void> {
  let query = collectionRef.orderBy('__name__').limit(batchSize)

  return new Promise((resolve, reject) => {
    _deleteQueryBatch(fireStore, query, batchSize, resolve, reject)
  })
}

function _deleteQueryBatch(
  fireStore: Firestore,
  query: firebase.firestore.Query,
  batchSize: number,
  resolve: any,
  reject: any
) {
  query
    .get()
    .then(snapshot => {
      // When there are no documents left, we are done
      if (snapshot.size == 0) {
        return 0
      }

      // Delete documents in a batch
      var batch = fireStore.batch()
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref)
      })

      return batch.commit().then(() => {
        return snapshot.size
      })
    })
    .then((numDeleted: number) => {
      if (numDeleted === 0) {
        resolve()
        return
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        _deleteQueryBatch(fireStore, query, batchSize, resolve, reject)
      })
    })
    .catch(reject)
}
