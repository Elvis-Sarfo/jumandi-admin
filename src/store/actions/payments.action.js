import React from 'react'
import { collection, addDoc, getDoc, serverTimestamp, doc, getDocs, onSnapshot, updateDoc } from '@firebase/firestore';
import Toast from '../../components/Toast';

const collectionName = 'payments';

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

/**
 * Create a new National Admin
 * @param  {Object} data
 */
 export const createNationalAdmin = (data) => {
  return async (dispatch, getState, { firestore, storage }) => {
    try {
      // get the collection schema
      const schemaRef = doc(firestore, 'DATABASE_SCHEMA', collectionName);
      const shema = await getDoc(schemaRef).data();
      // create a doc ref for the new admin
      const docRef = doc(firestore, collectionName, ++shema.counter);
      // add the data
      const nationalAdmin = await setDoc(docRef, data);
      // dispatch data
      dispatch({ type: 'CREATE_NATIONAL_ADMIN', nationalAdmin });
    } catch (error) {
      console.log(error);
      // dispatch({ type: 'UPDATE_NATIONAL_ADMIN', nationalAdmin });
    }
  }
}

