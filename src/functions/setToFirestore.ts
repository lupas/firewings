/********************************************************************************************/
/** Takes a query and a payload *************************************************************/
/** Removes the properties id and path from the copy of a object  and set() it to firebase  */
/********************************************************************************************/

export default async function (ref, payload, batch = null) {
  let clone = Object.assign({}, payload)
  if (clone.id) delete clone.id
  if (clone.path) delete clone.path

  try {
    if (batch == null) {
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
