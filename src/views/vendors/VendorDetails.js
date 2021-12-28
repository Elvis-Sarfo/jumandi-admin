import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import { updateVendorStatus } from '../../store/actions/vendors.action';
import { useParams, useHistory } from 'react-router-dom'
import { ArrowBack, DeleteForever } from '@mui/icons-material';
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

const VendorDatails = () => {

  // Get the route parameters
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const vendor = useSelector((state) => state.vendors.data[id]);

  console.log(vendor);


  return (
    <div>
      <CCard>
        <CCardBody>
          <CContainer>
            <CRow>
              <CCol md="1" className="py-3">
                <CButton onClick={() => history.goBack()} color="warning"><ArrowBack /></CButton>
              </CCol>
              <CCol style={{ textAlign: 'right' }} className="py-3 text-grey">
                <h4> {vendor?.businessName}</h4>
              </CCol>
            </CRow>
          </CContainer>

          <CContainer>
            <CRow>
              <CCol md="3" className="py-3">
                <h6 style={{ color: '#8a93a2' }}>Basic Information</h6>
              </CCol>
              <CCol md="4" className="py-3">
                <div>
                  {
                    vendor?.businessLogo != undefined && vendor?.businessLogo ?
                      <CAvatar style={{ width: "6rem", height: "6rem" }} size="xl" src={vendor?.businessLogo} /> :
                      <CAvatar size="xl" color="primary"> {vendor?.businessName[0].toUpperCase()} </CAvatar>
                  }
                </div>

                <p style={{ fontSize: '18px', marginTop: 10 }}>{vendor?.businessName.toUpperCase()}</p>

              </CCol>
              <CCol md="5" className="py-3">

                <h6 className='text-muted'>Client Phone</h6>
                {/* <p>{vendor?.businessContacts.phone1} | {vendor?.businessContacts.phone2}</p> */}
                <h6 className='text-muted'>Client Email</h6>
                {/* <p>{vendor?.vendorEmail}</p> */}

              </CCol>
            </CRow>
            <hr></hr>

            <CRow>
              <CCol md="6" className="py-0">
                Vendor Status
                <Switch
                  onChange={(e) => {
                    e.preventDefault();
                    const status = vendor.businessStatus?.toLowerCase() == 'approved' ? 'pending' : 'approved';
                    dispatch(updateVendorStatus(status, vendor.id));
                  }}
                  checked={vendor?.businessStatus?.toLowerCase()
                    == 'approved'}
                  color="success"
                />
              </CCol>
              <CCol md="6" style={{ textAlign: 'right' }} className="py-0">
                <CButton className='text-white' color="danger"><DeleteForever /> Delete</CButton>
              </CCol>
            </CRow>



          </CContainer>

        </CCardBody>
      </CCard>
    </div>
  )
}

export default VendorDatails




