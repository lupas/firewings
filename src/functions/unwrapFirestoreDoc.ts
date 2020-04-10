/***************************************************/
/** Takes a Snapshot and returns the queried item */
/** adding _id and _path to the queried document  */
/**************************************************/
export default function (snapshot, serialize = null) {
  /** If it is a multi-document query */
  // returns an array of items
  if (snapshot.docs) {
    let items = []
    for (const doc of snapshot.docs) {
      const item = _serializeItem(doc, serialize)
      items.push(item)
    }
    return items ? items : []
  }

  /** If it is a single-document query **/
  // returns a single item
  if (!snapshot.docs) {
    return _serializeItem(snapshot, serialize)
  }
}

function _serializeItem(doc, serialize) {
  if (!doc.exists) return null

  if (serialize) {
    return serialize(doc)
  }

  let item = doc.data()

  if (serialize === false) {
    // do nothing
  } else {
    item.id = doc.id
    item.path = doc.ref.path
  }
  return item
}