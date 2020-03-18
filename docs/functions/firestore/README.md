# Firestore

## queryFirestore()

This function gets you an item, an array of items or an object of items from a Firebase query without you having to care about loops or getting the data from the snapshot. You'll just get the objects right away.

In addition you get the documents `id` and `path` for every object, too.

**TRADITIONAL WAY**:

```js
/** 1.1 Define single-doc ref/query  */
const query = db.collection('cities').doc('cityId')

/** 1.2  Define multi-doc ref/query */
const query = db.collection('cities')

/** 2. Get Snapshot */
const snapshot = await query.get()

/** 3.1 Get data from Snapshot if single-doc query */
const city = snapshot.data()

/** 3.2 Get data from Snapshot if multiple-doc query */
let cities = []
for (const doc of snapshot.docs) {
  let city = doc.data()
  cities.push(city)
}
```

**WITH FIREWINGS**:

```js
// For single-doc queries:
const query = db.collection('cities').doc('cityId')
const city = await queryFirestore(query)
```

```js
// For multi-doc queries:
const query = db.collection('cities')
const cities = await queryFirestore(query)
```

Furthermore you can use the second argument to return the data of a multi-doc querie as an `object` instad of an `array`.

This will retun a array:

```js
// For multi-doc queries which retuns an array:
const query = db.collection('cities')
const cities = await queryFirestore(query)
// or
const cities = await queryFirestore(query, false)
```

```js
// const cities looks like
;[
  {
    id: 'A',
    path: 'cities/A'
  },
  {
    id: 'B',
    path: 'cities/B'
  },
  {
    id: 'C',
    path: 'cities/C'
  }
]
```

This will return an object:

```js
// For multi-doc queries which return an object:
const query = db.collection('cities')
const cities = await queryFirestore(query, true)
```

```js
// const cities looks like
{
  A: {
    id: "A",
    path: "cities/A"
  },
  B: {
    id: "B",
    path: "cities/B"
  },
  C: {
    id: "C",
    path: "cities/C"
  },
}
```

## unwrapFirestoreDoc()

This function unwraps a Firestore snapshot of a single- or multiple-document query and returns the item(s)' data as objects. Either as an array of objects, object of objects or as a single object.

Additionally, it adds the documents `id` and `path` to every item.

**TRADITIONAL WAY**:

```js
/** For single-doc queries */
const city = snapshot.data()
city.id = snapshot.id
city.path = snapshot.ref.path
```

```js
/** For multi-doc queries */
let cities = []
for (const doc of snapshot.docs) {
  let city = doc.data()
  item.id = doc.id
  item.path = doc.ref.path
  items.push(item)
}
```

**WITH FIREWINGS**:

```js
/** For single-doc queries returns an single object*/
const city = unwrapFirestoreDoc(snapshot)
```

```js
/** For multi-doc queries returns an array of objects*/
const cities = unwrapFirestoreDoc(snapshot)
```

```js
/** For multi-doc queries returns an object of objects*/
const cities = unwrapFirestoreDoc(snapshot, true)
```

For more information about returning objects read the chaperter **queryFirestore**.

## addToFirestore()

This function takes a reference and an object as payload and adds it to Firestore. It returns the added object including its Firebase `id` and `path`.

**TRADITIONAL WAY**:

```js
const ref = await ref.add(data)
data.id = ref.id
data.path = ref.path
return data
```

**WITH FIREWINGS**:

```js
return await addToFirestore(ref, data)
```

## setToFirestore()

This function takes a query and an object as payload and sets (updates or creates) the document in Firestore. Befrore that, the properties `id` and `path` will be removed from the object, so it won't be written to Firestore.

**TRADITIONAL WAY**:

```js
let clone = Object.assign({}, data)
let id = clone.id
delete clone.id
delete clone.path
await ref.doc(id).set(clone)
```

**WITH FIREWINGS**:

```js
await setToFirestore(ref.doc(id), data)
```

It's also possible to do batched writes.

```js
// Get a new write batch
let batch = db.batch()

// Set something
await setToFirestore(ref.doc(id), data, batch)

// Delete something
await batch.delete(ref.doc(id))

//  Set again something
await setToFirestore(ref2.doc(id), data, batch)

// Commit the batch
batch.commit().then(function() {
  // ...
})
```

## changeDocId() <Badge text="DANGEROUS" type="error"/>

This function changes the id of an existing document to a new id. It does this by creating a new document wwith the new key, and then deleting the old document.

::: danger
This functions might result in **data loss** or **high Firebase bills**.  

Only do this, if you are sure what you are doing and how many documents it will affect, taking into account EVERYTHING, e.g. possibly existing onDelete() Firebase Functions etc.
:::

**TRADITIONAL WAY**:

```js
// First get the document
const doc = await queryFirestore(docRef)
// Then save it under the new id
const newRef = docRef.parent.doc(newKey)
const newDoc = await setToFirestore(newRef, doc)
// Then delete the old document and return the new document
await docRef.delete()
```

**WITH FIREWINGS**:

```js
await changeDocId(ref, 'newId')
```

## deleteEntireCollection() <Badge text="DANGEROUS" type="error"/>

Deletes all documents in a collection (not including sub collections).

::: danger
This functions might result in **data loss** or **high Firebase bills**.  

Only do this, if you are sure what you are doing and how many documents it will affect, taking into account EVERYTHING, e.g. possibly existing onDelete() Firebase Functions etc.
:::

**TRADITIONAL WAY**:

```js
// Too much code :P
```

**WITH FIREWINGS**:

```js
await copyCollection(fireStore, collectionRef, batchSize = 400)

// Firestore = Firestore instance, needed for creating batches
```

## copyCollection() <Badge text="DANGEROUS" type="error"/>

Copies an entire collection to another path. Optionally, also copy it's sub-collections (but only 1 level deep). Also optionally deletes the old collection.

::: danger
This functions might result in **data loss** or **high Firebase bills**.  

Only do this, if you are sure what you are doing and how many documents it will affect, taking into account EVERYTHING, e.g. possibly existing onDelete() Firebase Functions etc.
:::

**TRADITIONAL WAY**:

```js
// Too much code :P
```

**WITH FIREWINGS**:

```js
await copyCollection(
  sourceCollectionRef,
  targetCollectionRef,
  subCollections = [], // Optional
  fireStore = null, // Optional, but a must if deleteOld = true
  deleteOld = false // Optional
  )

// Firestore = Firestore instance, needed for creating batches
```