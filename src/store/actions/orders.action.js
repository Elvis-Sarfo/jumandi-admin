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

export const updateOrderStatus = (approvalStatus, orderId) => {
  return async (dispatch, getState, { firestore }) => {
    const docRef = doc(firestore, collectionName, orderId);
    await updateDoc(docRef, {
      enabled: approvalStatus
    });
    dispatch({ type: 'UPDATE_UI', toast: (<Toast color='green' title='Task Complete' message='Order Status has been updated' />) });
  }
}

