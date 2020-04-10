import unwrapFirestoreDoc from './unwrapFirestoreDoc'

/***************************************************/
/** Takes ref and queries it **********************/
/** Returning the JS document as a Javascript Obj */
/**************************************************/

export default async function (query, serialize = null) {
  try {
    const snapshot = await query.get()
    return unwrapFirestoreDoc(snapshot, serialize)
  } catch (e) {
    return Promise.reject(e)
  }
}
