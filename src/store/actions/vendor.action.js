import React from 'react'
import { collection, addDoc, getDoc, serverTimestamp, doc, getDocs, onSnapshot } from '@firebase/firestore';


// Get firebase Firestore reference
// const collectionRef = collection(db, 'businesses');

export const getVendors = () => {
  return (dispatch, getState, { firestore }) => {
    const collectionRef = collection(firestore, 'businesses');
    onSnapshot(collectionRef, (snapshot) => {
      let vendors = snapshot.docs;
      console.log(snapshot.docs.map(doc => ( {id: doc.id, ...doc.data() })));
      dispatch({ type: 'GET_VENDORS', vendors })
    });
  };
}

// export const createVendor = (nationalAdmin) => {
//   return (dispatch, getState, { firestore, storage }) => {
//     // make async call to database
//     dispatch({ type: 'CREATE_VENDOR', nationalAdmin });
//   }
// }

