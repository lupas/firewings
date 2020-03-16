import unwrapFirestoreDoc from './unwrapFirestoreDoc'

/***************************************************/
/** Takes ref and queries it ********************/
/** Returning the JS document as a Javascript Obj */
/**************************************************/

export default async function(query, asObject = false) {
  try {
    const snapshot = await query.get()
    return unwrapFirestoreDoc(snapshot, asObject)
  } catch (e) {
    return Promise.reject(e)
  }
}
