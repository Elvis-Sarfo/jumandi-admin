import React from 'react'
import { collection, addDoc, getDoc, serverTimestamp, doc, getDocs, onSnapshot, updateDoc } from '@firebase/firestore';
import Toast from '../../components/Toast';

const collectionName = 'pricing';

export const getPrices = () => {
  return (dispatch, getState, { firestore }) => {
    const collectionRef = collection(firestore, collectionName);
    onSnapshot(collectionRef, (snapshot) => {
      let prices = snapshot.docs;
      dispatch({ type: 'GET_PRICES', prices })
    });
  };
}

export const updatePrice = (data, priceId) => {
  return async (dispatch, getState, { firestore }) => {
    const docRef = doc(firestore, collectionName, priceId);
    updateDoc(docRef, data).then(() => {
      dispatch({ type: 'UPDATE_UI', toast: (<Toast color='green' title='Task' message='Price has been update successfully' />) });
  }).catch((e) => {
      dispatch({ type: 'UPDATE_UI', toast: (<Toast color='danger' title='Something Ocurred' message='Price update was unsuccessful' />) });
  });
  }
}


