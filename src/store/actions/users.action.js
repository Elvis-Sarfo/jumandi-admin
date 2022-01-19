import React from 'react'
import { collection, addDoc, getDoc, serverTimestamp, doc, getDocs, onSnapshot, updateDoc } from '@firebase/firestore';
import Toast from '../../components/Toast';

export const getUsers = () => {
  return (dispatch, getState, { firestore }) => {
    const collectionRef = collection(firestore, 'users');
    onSnapshot(collectionRef, (snapshot) => {
      let users = snapshot.docs;
      dispatch({ type: 'GET_USERS', users })
    });
  };
}

export const updateUserStatus = (approvalStatus, userId) => {
  return async (dispatch, getState, { firestore }) => {
    const docRef = doc(firestore, "users", userId);
    await updateDoc(docRef, {
      enabled: approvalStatus
    });
    dispatch({ type: 'UPDATE_UI', toast: (<Toast color='green' title='Task Complete' message='User Status has been updated' />) });
  }
}

