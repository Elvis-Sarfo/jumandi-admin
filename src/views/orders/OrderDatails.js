import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react';

import { useParams, useHistory } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material';
import moment from 'moment'
import { firestore as db } from '../../config/firebase'
import { collection, doc, onSnapshot } from '@firebase/firestore';
import Marker from './../../components/map/Marker'
import ReactCountryFlag from "react-country-flag"
import {
  CAvatar,
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
  CBadge,
} from '@coreui/react'

const OrderDatails = () => {

  // Get the route parameters
  const { id } = useParams();
  const history = useHistory();

  // Create the states of the component
  const [data, setData] = useState({});

  // Get firebase Firestore reference
  const docRef = doc(db, 'orders', id);

  useEffect(() => {
    onSnapshot(docRef, (snapshot) => {
      setData(snapshot.data());
    });
  }, [])

  const center = {
    lat: data.deliverTo?.lat ? data.deliverTo?.lat : 6.7005598,
    lng: data.deliverTo?.lng ? data.deliverTo?.lng :-1.676842
  };
  const zoom = 12;

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
                <h3>Order #{data.orderId}</h3>
              </CCol>
            </CRow>
          </CContainer>

          <CContainer style={{ marginBottom: 0, borderBottom: '1px solid #c4c9d0', }}>
            <CRow>
              <CCol md="2" className="py-3">
                <h6 style={{ color: '#8a93a2' }}>Order Information</h6>
              </CCol>
              <CCol md="5" className="py-3">
                <h6 className='text-muted'>Order Id</h6>
                <p>{data.orderId}</p>

                <h6 className='text-muted'>Order Date</h6>
                <p>{moment.unix(data.createdAt).format("MM/DD/YYYY h:m a")}</p>

                <h6 className='text-muted'>Order Status</h6>
                <p> <CBadge color="secondary"> {data.orderState?.status.toUpperCase()} </CBadge></p>
                {
                  data.orderState?.status.toUpperCase() == 'CANCELLED' ||
                    data.orderState?.status.toUpperCase() == 'REJECTED' ?
                    <p>{data.orderState?.reason}</p> : null
                }

                <h6 className='text-muted'>Deleivery Distance</h6>
                <p>{data.deliveryDistance}</p>
              </CCol>
              <CCol md="5" className="py-3">
                <h6 className='text-muted'>Order Quantity</h6>
                <p>{data.orderQuantity}</p>

                <h6 className='text-muted'>Order Price</h6>
                <p>USD {data.orderPrice}</p>

                <h6 className='text-muted'>Delivery Fee</h6>
                <p>{data.deliveryFee}</p>

                <h6 className='text-muted'>Payment Method</h6>
                <p>{data.paymentMethod}</p>

              </CCol>
            </CRow>
          </CContainer>

          <CContainer style={{ marginBottom: 0, borderBottom: '1px solid #c4c9d0', }}>
            <CRow>
              <CCol md="2" className="py-3">
                <h6 style={{ color: '#8a93a2' }}>Payment Information</h6>
              </CCol>
              {(data.paymentDetails && Object.keys(data.paymentDetails).length !== 0) ? (<>
                <CCol md="5" className="py-3">
                  <h6 className='text-muted'>Amount</h6>
                  <p>{data.paymentDetails?.amount}</p>

                  <h6 className='text-muted'>Transaction ID</h6>
                  <p>{data.paymentDetails?.transactionId}</p>

                  <h6 className='text-muted'>Reference</h6>
                  <p> <CBadge color="secondary"> {data.paymentDetails?.reference} </CBadge></p>

                  <h6 className='text-muted'>Time</h6>
                  <p>{moment.unix(data.paymentDetails?.at).format("MM/DD/YYYY h:m a")}</p>
                </CCol>
                <CCol md="5" className="py-3">
                  <h6 className='text-muted'>Pay Type</h6>
                  <p>{data.paymentDetails?.payType}</p>

                  <h6 className='text-muted'>Bank</h6>
                  <p>USD {data.paymentDetails?.name}</p>

                  <h6 className='text-muted'>Account Name</h6>
                  <p>{data.paymentDetails?.accountName}</p>

                  <h6 className='text-muted'>Number</h6>
                  <p>{data.paymentDetails?.number}</p>
                </CCol>
              </>) : (<CCol md="10" className="py-3">
                <p style={{ color: '#8a93a2' }}>Awaitng Payment</p>
              </CCol>)}


            </CRow>
          </CContainer>

          <CContainer style={{ marginBottom: 0, borderBottom: '1px solid #c4c9d0', }}>
            <CRow>
              <CCol md="2" className="py-3">
                <h6 style={{ color: '#8a93a2' }}>Vendor Information</h6>
              </CCol>
              {data.orderState?.status.toLowerCase() !== 'new' ? (<>
                <CCol md="5" className="py-3">

                  {
                    data.station?.businessLogo ?
                      <CAvatar size="xl" src={data.station?.businessLogo} /> :
                      <CAvatar size="xl" color="primary"> {data.station?.businessName[0].toUpperCase()} </CAvatar>
                  }

                  <p style={{ fontSize: '18px', marginTop: 10 }}>
                    {data.station?.businessName.toUpperCase()}
                  </p>

                  <h6 className='text-muted'>Business Phone</h6>
                  <p>{data.station?.businessContacts?.phone1}</p>

                </CCol>
                <CCol md="5" className="py-3">

                  <h6 className='text-muted'>Business Email</h6>
                  <p>{data.station?.businessEmail}</p>

                  <h6 className='text-muted'>Business Location</h6>
                  <p className='mb-0'>
                    <ReactCountryFlag
                      svg
                      countryCode={data.station?.businessLocation?.isoCode}
                      style={{
                        fontSize: '1em',
                        lineHeight: '1em',
                      }}
                      aria-label="United States"
                    />{' '}
                    {data.station?.businessLocation?.country}
                  </p>
                  <p className='mb-0'>{data.station?.businessLocation?.locality}</p>
                  <p className='mb-0'>{data.station?.businessLocation?.name}</p>

                </CCol>
              </>) : (<CCol md="10" className="py-3">
                <p style={{ color: '#8a93a2' }}>Awaitng Vendor Acceptance</p>
              </CCol>)}

            </CRow>
          </CContainer>

          <CContainer style={{ marginBottom: 0, borderBottom: '1px solid #c4c9d0', }}>
            <CRow>
              <CCol md="2" className="py-3">
                <h6 style={{ color: '#8a93a2' }}>Client Information</h6>
              </CCol>
              <CCol md="5" className="py-3">

                {
                  data.buyer?.userImage != undefined && data.buyer?.userImage ?
                    <CAvatar size="xl" src={data.buyer?.userImage} /> :
                    <CAvatar size="xl" color="primary"> {data.buyer?.userName[0].toUpperCase()} </CAvatar>
                }

                <p style={{ fontSize: '18px', marginTop: 10 }}>{data.buyer?.userName.toUpperCase()}</p>

              </CCol>
              <CCol md="5" className="py-3">

                <h6 className='text-muted'>Client Phone</h6>
                <p>{data.buyer?.userPhone}</p>

                <h6 className='text-muted'>Client Email</h6>
                <p>{data.buyer?.userEmail}</p>

              </CCol>
            </CRow>
          </CContainer>

          <CContainer style={{ marginBottom: 0 }}>
            <CRow>
              <CCol style={{ color: '#8a93a2' }} md="2" className="py-3">
                <h6 >Location</h6>
                <p style={{ fontSize: '13px' }}>Order Location</p>
              </CCol>
              <CCol md="10" className="py-3">
                <div style={{ height: '400px', width: '100%' }}>
                  <GoogleMapReact
                    defaultCenter={{...center, }}
                    defaultZoom={zoom}
                  >
                    {
                      data.deliverTo?.lat &&
                      <Marker
                        lat={data.deliverTo?.lat}
                        lng={data.deliverTo?.lng}
                        text="My Marker"
                        color='red'
                      />
                    }
                    {
                      data.station?.businessLocation?.lat && <Marker
                        lat={data.station?.businessLocation?.lat}
                        lng={data.station?.businessLocation?.lng}
                        text="My Marker"
                        color='yellow'
                      />
                    }

                  </GoogleMapReact>
                </div>
              </CCol>
            </CRow>

          </CContainer>

        </CCardBody>
      </CCard>
    </div>
  )
}

export default OrderDatails
