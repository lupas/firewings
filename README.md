# 🔥 Firewings 🔥

<p align="center"><img align="center" height="250px" src="https://firewings.netlify.com/firewings_logo.png"/></p>

<p align="center">
  <a href="https://www.npmjs.com/package/firewings"><img src="https://badgen.net/npm/dm/firewings" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/firewings"><img src="https://badgen.net/npm/v/firewings" alt="Version"></a>
  <a href="https://www.npmjs.com/package/firewings"><img src="https://badgen.net/npm/license/firewings" alt="License"></a>
 </p>
</p>

> Give Firebase wings! - Useful helper-functions for Firebase's JS SDK.

📖 [**Read Full Documentation**](https://firewings.netlify.app/)

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
// and so on
```

# Included Functions

See all details to our helper functions [here](https://firewings.netlify.app/functions/firestore/).

## Firestore

| Name        | Descripton           |
| ------------- |:-------------:|
| [queryFirestore()](https://firewings.netlify.app/functions/firestore/#queryfirestore) | see docs |
| [unwrapFirestoreDoc()](https://firewings.netlify.app/functions/firestore/#unwrapfirestoredoc) | see docs |
| [addToFirestore()](https://firewings.netlify.app/functions/firestore/#addtofirestore) | see docs |
| [setToFirestore()](https://firewings.netlify.app/functions/firestore/#settofirestore)  | see docs |
| [changeDocId()](https://firewings.netlify.app/functions/firestore/#changdocid) | see docs |
| [deleteEntireCollection()](https://firewings.netlify.app/functions/firestore/#deleteentirecollection) | see docs |
| [copyCollection()](https://firewings.netlify.app/functions/firestore/#copycollection) | see docs |
