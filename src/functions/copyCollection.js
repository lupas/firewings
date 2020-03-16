import queryFirestore from './queryFirestore'

/***************************************************************************************/
/** Copies a collection to a new path, leaves the old Collection as is. ****************/
/** Does the same for each subcollection (only depth of 1) mentionedn in 3. argument ***/
/** WARNING: Do this at your own risk, only do this if you are sure what you are doing */
/***************************************************************************************/

export default async function(
  sourceCollectionRef,
  targetCollectionRef,
  subCollections = []
) {
  try {
    // Copy Main Collection
    const documents = await _copySingleCollection(
      sourceCollectionRef,
      targetCollectionRef
    )
    // If subcollections should be copied too, copy them.
    if (subCollections.length > 0) {
      for (const document of documents) {
        for (const subCollection of subCollections) {
          const subCollectionSourceRef = sourceCollectionRef
            .doc(document.id)
            .collection(subCollection)
          const subCollectionTargetRef = targetCollectionRef
            .doc(document.id)
            .collection(subCollection)
          await _copySingleCollection(
            subCollectionSourceRef,
            subCollectionTargetRef
          )
        }
      }
    }
  } catch (e) {
    return Promise.reject(e)
  }
}

const _copySingleCollection = async function(
  sourceCollectionRef,
  targetCollectionRef
) {
  try {
    const documents = await queryFirestore(sourceCollectionRef)
    for (const document of documents) {
      const targetRef = targetCollectionRef.doc(document.id)
      await targetRef.set(document)
    }
    return documents
  } catch (e) {
    return Promise.reject(e)
  }
}
