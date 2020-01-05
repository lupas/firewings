/********************************************************************************************/
/** Takes a query and a payload *************************************************************/
/** Removes the properties id and path from the copy of a object  and set() it to firebase  */
/********************************************************************************************/
export declare const setToFirestore: (ref: any, payload: any, batch?: any) => Promise<any>;
/***************************************************/
/** Takes a query and a payload ********************/
/** Returns the payload with the properties id and path */
/**************************************************/
export declare const addToFirestore: (ref: any, payload: any) => Promise<any>;
/***************************************************/
/** Takes ref and queries it ********************/
/** Returning the JS document as a Javascript Obj */
/**************************************************/
export declare const queryFirestore: (query: any, asObject?: boolean) => Promise<any>;
/***************************************************/
/** Takes a Snapshot and returns the queried item */
/** adding _id and _path to the queried document  */
/**************************************************/
export declare const unwrapFirestoreDoc: (snapshot: any, asObject?: boolean) => any;
/***************************************************************************************/
/** Gets a document, copies it to a document with the new id and deletes the old one****/
/** WARNING: Do this at your own risk, only do this if you are sure what you are doing */
/***************************************************************************************/
export declare const changeDocId: (docRef: any, newKey: any) => Promise<any>;
/***************************************************************************************/
/** Deletes an entire collection in batches.
/** WARNING: Do this at your own risk, only do this if you are sure what you are doing */
/***************************************************************************************/
export declare const deleteEntireCollection: (fireStore: any, collectionRef: any, batchSize?: number) => Promise<void>;
