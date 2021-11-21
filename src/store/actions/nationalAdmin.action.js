import React from 'react'
import { collection, addDoc, getDoc, serverTimestamp, doc, getDocs, onSnapshot } from '@firebase/firestore';
import { ref, uploadString, getDownloadURL, uploadBytesResumable, uploadBytes } from 'firebase/storage';
import { Icon, Switch } from '@mui/material';
import { DeleteForever, Visibility, Edit } from '@mui/icons-material';
import ReactCountryFlag from "react-country-flag"

import {
  CAvatar,
  CButton,
  CButtonGroup,
} from '@coreui/react'

// Get firebase Firestore reference
// const collectionRef = collection(db, 'businesses');

export const getNationalAdmins = () => {
  return (dispatch, getState, { firestore }) => {
    const collectionRef = collection(firestore, 'businesses');
    onSnapshot(collectionRef, (snapshot) => {
      let admins = snapshot.docs.map((doc) => ({ ...doc.data() }));
      console.log(admins);
      dispatch({ type: 'GET_NATIONAL_ADMIN', admins })
    });
  };
}

export const createNationalAdmin = (nationalAdmin) => {
  return (dispatch, getState, { firestore, storage }) => {
    // make async call to database
    dispatch({ type: 'CREATE_NATIONAL_ADMIN', nationalAdmin });
  }
}

  //   // Structure the data that is coming from firebase
  //   const getStructuredData = (rawData) => rawData.map((doc) => {

  //     pendingVendors.value += doc.data().businessStatus?.toLowerCase() == 'pending' ? 1 : 0;
  //     approvedVendors.value += doc.data().businessStatus?.toLowerCase() == 'approved' ? 1 : 0;

  //     return {
  //         id: doc.id,
  //         name: (<>
  //             <CAvatar size="md" src={doc.data().businessLogo} status={'success'} />
  //             <span style={{ marginLeft: 7 }}>{doc.data().businessName}</span>
  //         </>
  //         ),
  //         location: (<div className="p-1">
  //             <div>
  //                 <ReactCountryFlag
  //                     className="emojiFlag"
  //                     countryCode={doc.data().businessLocation?.isoCode}
  //                     style={{
  //                         fontSize: '1em',
  //                         lineHeight: '1em',
  //                     }}
  //                     aria-label="United States"
  //                 />{' '}
  //                 {doc.data().businessLocation?.country}
  //             </div>
  //             <div className="small text-medium-emphasis">
  //                 <span>{doc.data().businessLocation?.adminArea}</span><br />
  //                 <span>{doc.data().businessLocation?.locality}</span> ,
  //                 <span>{doc.data().businessLocation?.name}</span>
  //             </div>
  //         </div>),
  //         status: doc.data().businessStatus,
  //         approve: (<Switch defaultChecked={doc.data().businessStatus?.toLowerCase() == 'approved'} color="success" />),
  //         actions: (
  //             <>
  //                 <CButtonGroup>
  //                     <CButton onClick={() => history.push(`/supervisors/${doc.id}`)} color="primary"><Visibility /></CButton>
  //                     <CButton color="warning"><Edit /></CButton>
  //                     <CButton color="danger"><DeleteForever /></CButton>
  //                 </CButtonGroup>
  //             </>
  //         )
  //     };
  // });
