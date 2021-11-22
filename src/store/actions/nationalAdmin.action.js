import React from 'react'
import { collection, setDoc, getDoc, serverTimestamp, doc, updateDoc, onSnapshot } from '@firebase/firestore';
import { ref, uploadString, getDownloadURL, uploadBytesResumable, uploadBytes } from 'firebase/storage';
import Toast from '../../components/Toast';
import {
  CAvatar,
  CButton,
  CButtonGroup,
} from '@coreui/react'

const collectionName = 'national_admin';

// Get firebase Firestore reference
// const collectionRef = collection(db, 'businesses');

export const getNationalAdmins = () => {
  return (dispatch, getState, { firestore }) => {
    const collectionRef = collection(firestore, collectionName);
    onSnapshot(collectionRef, (snapshot) => {
      let nationalAdmins = snapshot.docs;
      dispatch({ type: 'GET_NATIONAL_ADMINS', nationalAdmins })
    });
  };
}

export const updateNationalAdminStatus = (approvalStatus, id) => {
  return async (dispatch, getState, { firestore }) => {
    const docRef = doc(firestore, collectionName, id);
    await updateDoc(docRef, {
      enabled: approvalStatus
    });
    dispatch({
      type: 'UPDATE_UI',
      toast: (
        <Toast color='green'
          title='Task Complete'
          message='National Admin Status has been updated' />
      )
    });
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