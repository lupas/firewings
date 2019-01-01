# 🔥 Firewings 🔥

<p align="center"><img align="center" height="250px" src="https://github.com/lupas/firewings/blob/master/misc/logo/firewings_logo.png?raw=true"/></p>

> Give Firebase wings! - Useful helper-functions for Firebase's JS SDK.

## Requirements

Make sure you have Firebase installed in your project and Firestore initiated.

```json
"dependencies": {
  "firebase": "^5.7.2"
}
```

## Install

```bash
npm i firewings
```

## Setup

Add the below code to wherever you want to use the functions.

```js
import { queryFirestore } from 'firewings'
//or
import { unwrapFirestoreDoc } from 'firewings'
//or
import { addToFirestore } from 'firewings'
//or
import { setToFirestore } from 'firewings'
//or
import { changeDocId } from 'firewings'
```

# Included Functions

## queryFirestore()

This function gets you an item or an array of items from a Firebase query without you having to care about loops or getting the data from the snapshot. You'll just get the objects right away.

And in addition you get the documents `id` and `path` for on every object, too.

**TRADITIONAL WAY**:

```js
/** 1. Define ref/query */
const query = db.collection('cities')

/** 2. Get Snapshot */
const snapshot = await queryFirestore(query)

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

## unwrapFirestoreDoc()

This function unwraps a Firestore snapshot of a single- or multiple-document query and returns the item(s)' data as objects. Either as an array of objects or as a single object.

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
/** For single-doc queries */
const city = unwrapFirestoreDoc(snapshot)
```

```js
/** For multi-doc queries */
const cities = unwrapFirestoreDoc(snapshot)
```

## addToFirestore()

This function takes a reference and an object as payload and adds it to Firestore. It returns the to added object including its Firebase `id` and `path`.

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

## changeDocId()

This function changes the id of an existing document to a new id. It does this by creating a new document wwith the new key, and then deleting the old document.

> WARNING: Only do this, if you are sure what you are doing. The old document will be deleted, so any references might be invalid. Also make sure you have no onDelete() actions that you don't want to get triggered.

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

### Disclaimer

These are just some quick functions I personally used in different Firebase projects to save some repeating lines of code. Since I used that in every project, I decided to build a node module out of it to easily manage it.
