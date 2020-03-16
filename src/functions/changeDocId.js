import queryFirestore from './queryFirestore'
import setToFirestore from './queryFirestore'

/***************************************************************************************/
/** Gets a document, copies it to a document with the new id and deletes the old one****/
/** WARNING: Do this at your own risk, only do this if you are sure what you are doing */
/***************************************************************************************/

export default async function(docRef, newKey) {
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
