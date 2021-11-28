import React from 'react'
import { collection, addDoc, getDoc, serverTimestamp, doc, getDocs, onSnapshot, updateDoc } from '@firebase/firestore';
import Toast from '../../components/Toast';

const collectionName = 'orders';

export const getSales = () => {
  return (dispatch, getState, { firestore }) => {
    const collectionRef = collection(firestore, collectionName);
    onSnapshot(collectionRef, (snapshot) => {
      let orders = snapshot.docs;
      dispatch({ type: 'GET_SALES', orders });
    });
  };
}

// export const deleteSale = (id,orderId) => {
//   return async (dispatch, getState, { firestore }) => {
//     const docRef = doc(firestore, collectionName, id);
//     await updateDoc(docRef, {
//       orderState: {
//         changeAt: Date.now(),
//         reason:['Deleted by the Admin'],
//         status: 'deleted'
//       }
//     });
//     dispatch({ type: 'UPDATE_UI', toast: (<Toast color='green' title='Task Complete' message={`Sale ${orderId} has been deleted`} />) });
//   }
// }

