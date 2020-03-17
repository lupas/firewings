/***************************************************/
/** Takes a Snapshot and returns the queried item */
/** adding _id and _path to the queried document  */
/**************************************************/

export default function (snapshot, asObject = false) {
  //If it is a multi-document query

  if (snapshot.docs) {
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
