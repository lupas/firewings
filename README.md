# 🔥 Firewings 🔥

<p align="center"><img align="center" height="250px" src="https://github.com/lupas/firewings/blob/master/misc/logo/firewings_logo.png?raw=true"/></p>

> Give Firebase wings! - Useful helper-functions for Firebase's JS SDK.

## Requirements

Make sure you have Firebase installed in your project and Firestore initiated.

```json
"dependencies": {
  "firebase": "^5.5.9"
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
```

# Included Functions

## queryFirestore()

This function gets you an (array of) item(s) from Firestore document without caring about loops or accessing the data() fron the snapshot. Just get the objects right away.

And in addition you get the documents `id` and `path` for on every object, too.

**TRADITIONAL WAY**:

```js
/** 1. Define ref/query */
const query = db.collection('cities')

/** 2. Get Snapshot */
let snapshot
try {
  snapshot = await queryFirestore(query)
} catch (e) {
  //error handling
}

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
const query = db.collection('cities')
try {
  const cities = await queryFirestore(query)
} catch (e) {
  //error handling
}
```

```js
// For multi-doc queries:
const query = db.collection('cities').doc('cityId')
let city
try {
  city = await queryFirestore(query)
} catch (e) {
  //error handling
}
```

## unwrapFirestoreDoc()

This function unwraps a Firestore snapshot of a single- or multiple-document query and returns the items' data as objects. Either as an array of objects or as a single object.

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

### Disclaimer

These are just some quick functions I personally used in different Firebase projects to save some repeating lines of code. Since I used that in every project, I decided to build a node module out of it to easily manage it. I might not do much more here but also might change things drastically. I will probably keep it up to date, but cannot guarantee anything. So use it at your own risk :-)
