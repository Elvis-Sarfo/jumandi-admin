import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import { updateUserStatus } from '../../store/actions/users.action';
import { useParams, useHistory } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material';
import moment from 'moment'
import { firestore as db } from '../../config/firebase'
import { collection, doc, onSnapshot } from '@firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import Marker from '../../components/map/Marker'
import ReactCountryFlag from "react-country-flag"
import { Icon, Switch } from '@mui/material'
import {
  CAvatar,
  CButton,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormCheck,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
  CBadge,
} from '@coreui/react'

const OrderDatails = () => {

  // Get the route parameters
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.users.data[id]);

  console.log(user);

  // Create the states of the component
  // const [data, setData] = useState({});

  // // Get firebase Firestore reference
  // const docRef = doc(db, 'users', id);

  // useEffect(() => {
  //   onSnapshot(docRef, (snapshot) => {
  //     setData(snapshot.data());
  //   });
  // }, [])

  // const center = {
  //   lat: user.deliverTo?.lat ? user.deliverTo?.lat : 6.7005598,
  //   lng: user.deliverTo?.lng ? user.deliverTo?.lng :-1.676842
  // };
  // const zoom = 12;

  return (
    <div>
      <CCard>
        <CCardBody>
          <CContainer>
            <CRow>
              <CCol md="1" className="py-3">
                <CButton onClick={() => history.goBack()} color="warning"><ArrowBack /></CButton>
              </CCol>
              <CCol style={{ textAlign: 'right' }} className="py-3">
                <h3>User #{user?.id}</h3>
              </CCol>
            </CRow>
          </CContainer>

          <CContainer style={{ marginBottom: 0, borderBottom: '1px solid #c4c9d0', }}>
            <CRow>
              {/* <CCol md="2" className="py-3">
                <h6 style={{ color: '#8a93a2' }}>Client Information</h6>
              </CCol> */}
              <CCol md="6" className="py-3">
                <div>
                  {
                  user?.userImage != undefined && user?.userImage ?
                    <CAvatar size="xl" src={user?.userImage} /> :
                    <CAvatar size="xl" color="primary"> {user?.userName[0].toUpperCase()} </CAvatar>
                }
                </div>

                <Switch
                  onChange={(e) => {
                    e.preventDefault();
                    dispatch(updateUserStatus(!user?.enabled, user?.id));
                  }}
                  checked={user?.enabled ? true : false}
                  color="success"
                />

                <p style={{ fontSize: '18px', marginTop: 10 }}>{user?.userName.toUpperCase()}</p>

              </CCol>
              <CCol md="6" className="py-3">

                <h6 className='text-muted'>Client Phone</h6>
                <p>{user?.userPhone}</p>

                <h6 className='text-muted'>Client Email</h6>
                <p>{user?.userEmail}</p>

              </CCol>
            </CRow>
          </CContainer>

        </CCardBody>
      </CCard>
    </div>
  )
}

export default OrderDatails
