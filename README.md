# 🔥 Firewings 🔥

<p align="center"><img align="center" height="250px" src="https://github.com/lupas/firewings/blob/master/misc/logo/firewings_logo.png?raw=true"/></p>

<p align="center">
  <a href="https://www.npmjs.com/package/firewings"><img src="https://badgen.net/npm/dm/firewings" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/firewings"><img src="https://badgen.net/npm/v/firewings" alt="Version"></a>
  <a href="https://www.npmjs.com/package/firewings"><img src="https://badgen.net/npm/license/firewings" alt="License"></a>
 </p>
</p>

> Give Firebase wings! - Useful helper-functions for Firebase's JS SDK.

## Requirements

Make sure you have Firebase installed in your project and Firestore initiated.

```json
"dependencies": {
  "firebase": "latest"
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
// and so on
```

# Included Functions

## Firestore

### queryFirestore()
```js
queryFirestore()
```

This function gets you an item, an array of items or an object of items from a Firebase query without you having to care about loops or getting the data from the snapshot. You'll just get the objects right away.

In addition you get the documents `id` and `path` for every object, too.

See the details [here](/functions/firestore/).

### unwrapFirestoreDoc()
```js
unwrapFirestoreDoc()
```

This function unwraps a Firestore snapshot of a single- or multiple-document query and returns the item(s)' data as objects. Either as an array of objects, object of objects or as a single object.

Additionally, it adds the documents `id` and `path` to every item.

See the details [here](/functions/firestore/).

### addToFirestore()
```js
addToFirestore()
```

This function takes a reference and an object as payload and adds it to Firestore. It returns the added object including its Firebase `id` and `path`.

See the details [here](/functions/firestore/).

### setToFirestore()
```js
setToFirestore()
```

This function takes a query and an object as payload and sets (updates or creates) the document in Firestore. Befrore that, the properties `id` and `path` will be removed from the object, so it won't be written to Firestore.

See the details [here](/functions/firestore/).

### changeDocId()
```js
changeDocId()
```

This function changes the id of an existing document to a new id. It does this by creating a new document with the new key, and then deleting the old document

See the details [here](/functions/firestore/).

# Support on Beerpay
Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/lupas/firewings/badge.svg?style=beer-square)](https://beerpay.io/lupas/firewings)  [![Beerpay](https://beerpay.io/lupas/firewings/make-wish.svg?style=flat-square)](https://beerpay.io/lupas/firewings?focus=wish)