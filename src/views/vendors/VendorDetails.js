import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react';

import { useParams, useHistory } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material';
import moment from 'moment'
import { firestore as db } from './../../config/firebase'
import { collection, doc, getDocs, onSnapshot } from '@firebase/firestore';
import {
    CForm,
    CButton,
    CFormLabel,
    CInputGroup,
    CInputGroupText,
    CFormInput,
    CFormCheck,
    CFormSelect,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow,
} from '@coreui/react'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const VendorDetails = () => {
    // Get the route parameters
    const { id } = useParams();
    const history = useHistory();

    // Create the states of the component
    const [data, setData] = useState({});

    // Get firebase Firestore reference
    const docRef = doc(db, 'businesses', id)

    useEffect(() => {
        onSnapshot(docRef, (snapshot) => {
            console.log(snapshot.data());
            setData(snapshot.data());
        });
    }, [])

    const center = {
        lat: 59.95,
        lng: 30.33
    };
    const zoom = 11;
    return (
        <CCard>
            <CCardBody>
                <CContainer>
                    <CRow>
                        <CCol md="1" className="py-3">
                            <CButton onClick={() => history.goBack()} color="warning"><ArrowBack /></CButton>
                        </CCol>
                        <CCol className="py-3">
                            <h3>Vendor Details</h3>
                        </CCol>
                    </CRow>
                </CContainer>

                <CContainer>
                    <CRow>
                        <CCol md="2" className="py-3">
                            <h6 style={{ color: '#8a93a2' }}>Basic Info</h6>
                        </CCol>
                        <CCol md="5" className="py-3">
                            {/* <h5>Vendor Id</h5>
                            <p>Name of the User</p> */}

                            {/* <h5>Status</h5>
                            <p>{data.enabled?'ENABLED':'NOT ENABLED'}</p> */}

                            <h5>First Name</h5>
                            <p>{data.firstname}</p>

                            <h5>Last Name</h5>
                            <p>{data.lastname}</p>

                            <h5>Place Of Residence</h5>
                            <p>{data.placeOfResidence}</p>
                        </CCol>
                        <CCol md="5" className="py-3">
                            <h5>Date Of Birth</h5>
                            <p>{moment.unix(data.dateOfBirth).format("MM/DD/YYYY")}</p>

                            <h5>Gender</h5>
                            <p>{data.gender?.toString().toUpperCase()}</p>

                            <h5>Phone</h5>
                            <p>{data.phone}</p>

                            <h5>Email</h5>
                            <p>{data.email}</p>

                            {/* <h5>Specialization</h5>
                            <p></p> */}
                        </CCol>
                    </CRow>
                </CContainer>

                <CContainer>
                    <CRow>
                        <CCol style={{ color: '#8a93a2' }} md="2" className="py-3">
                            <h6 >Location</h6>
                            <p style={{ fontSize: '13px' }}>Last known location</p>
                        </CCol>
                        <CCol md="10" className="py-3">
                            <div style={{ height: '400px', width: '100%' }}>
                                <GoogleMapReact
                                    defaultCenter={center}
                                    defaultZoom={zoom}
                                >
                                    <AnyReactComponent
                                        lat={59.955413}
                                        lng={30.337844}
                                        text="My Marker"
                                    />
                                </GoogleMapReact>
                            </div>
                        </CCol>
                    </CRow>

                </CContainer>

            </CCardBody>
        </CCard>
    )
}

export default VendorDetails
