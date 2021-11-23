import React from 'react'
import { collection, addDoc, getDoc, serverTimestamp, doc, getDocs, onSnapshot, updateDoc } from '@firebase/firestore';
import Toast from '../../components/Toast';

const collectionName = 'orders';

export const getOrders = () => {
  return (dispatch, getState, { firestore }) => {
    const collectionRef = collection(firestore, collectionName);
    onSnapshot(collectionRef, (snapshot) => {
      let orders = snapshot.docs;
      dispatch({ type: 'GET_ORDERS', orders })
    });
  };
}

export const deleteOrder = (id,orderId) => {
  return async (dispatch, getState, { firestore }) => {
    const docRef = doc(firestore, collectionName, id);
    await updateDoc(docRef, {
      orderState: {
        changeAt: Date.now(),
        reason:['Deleted by the Admin'],
        status: 'deleted'
      }
    });
    dispatch({ type: 'UPDATE_UI', toast: (<Toast color='green' title='Task Complete' message={`Order ${orderId} has been deleted`} />) });
  }
}

