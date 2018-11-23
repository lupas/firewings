/***************************************************/
/** Takes ref and queries it ********************/
/** Returning the JS document as a Javascript Obj */
/**************************************************/
export declare const queryFirestore: (query: any) => Promise<any>;
/***************************************************/
/** Takes a Snapshot and returns the queried item */
/** adding _id and _path to the queried document  */
/**************************************************/
export declare const unwrapFirestoreDoc: (snapshot: any) => any;
