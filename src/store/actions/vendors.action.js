import React from 'react'
import { collection, addDoc, getDoc, serverTimestamp, doc, getDocs, onSnapshot, updateDoc } from '@firebase/firestore';
import Toast from '../../components/Toast';

// Get firebase Firestore reference
// const collectionRef = collection(db, 'businesses');

export const getVendors = () => {
  return (dispatch, getState, { firestore }) => {
    const collectionRef = collection(firestore, 'businesses');
    onSnapshot(collectionRef, (snapshot) => {
      let vendors = snapshot.docs;
      dispatch({ type: 'GET_VENDORS', vendors })
    });
  };
}

export const updateVendorStatus = (approvalStatus, vendorId) => {
  return async (dispatch, getState, { firestore }) => {
    const docRef = doc(firestore, "businesses", vendorId);
    await updateDoc(docRef, {
      businessStatus: approvalStatus
    });
    dispatch({ type: 'UPDATE_UI', toast: (<Toast color='green' title='Task Complete' message='Vendor Status has been updated' />) });
  }
}

