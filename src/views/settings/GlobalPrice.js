import React, { useState, useEffect, useRef } from 'react'
import GoogleMapReact from 'google-map-react';
import { useDispatch } from 'react-redux'


import { useParams, useHistory } from 'react-router-dom'
import { collection, updateDoc, getDoc, serverTimestamp, doc, onSnapshot } from '@firebase/firestore';
import { ArrowBack } from '@mui/icons-material';
import moment from 'moment'
import { firestore as db } from '../../config/firebase'
import Marker from './../../components/map/Marker'
import Toast from './../../components/Toast'
import ReactCountryFlag from "react-country-flag"
import {
    CModalTitle,
    CButton,
    CModalBody,
    CModalFooter,
    CForm,
    CFormInput,
    CModal,
    CFormSelect,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow,
    CModalHeader,
    CFormLabel,
} from '@coreui/react'

const GlobalPrice = () => {

    // Get the route parameters
    const history = useHistory();
    const dispatch = useDispatch()

    const collectionRef = collection(db, 'pricing');

    // Create the states of the component
    const [data, setData] = useState({});
    const [showModal, setShowModal] = useState(false);


    const getStructuredData = (rawData) => {
        let dataStructure = {};
        rawData.forEach(doc => {
            dataStructure[doc.id] = {
                id: doc.id,
                countryCode: doc.data().countryCode,
                gasPrice: doc.data().gasPrice,
                deliveryFee: doc.data().deliveryFee,
                currency: doc.data().currency,
                country: doc.data().country,
            }
        });
        return dataStructure;
    }

    useEffect(() => {
        onSnapshot(collectionRef, (snapshot) => {
            let _data = getStructuredData(snapshot.docs);
            console.log(_data);
            setData(_data);
        });
    }, []);


    const updatePrice = (id, data) => {
        // Get firebase Firestore reference
        const docRef = doc(db, 'pricing', id);
        console.log(data);
        updateDoc(docRef, data).then(() => {
            dispatch({ type: 'set', toast: (<Toast title='Task' message='Price has been update successfully' />) });
        }).catch((e) => {
            dispatch({ type: 'set', toast: (<Toast color='danger' title='Task' message='Price has been update successfully' />) });
        });
    }

    return (
        <div>
            <CModal visible={showModal} onClose={() => setShowModal(false)}>
                <CModalHeader onClose={() => setShowModal(false)}>
                    <CModalTitle>Add Price</CModalTitle>
                </CModalHeader>
                <CForm>
                    <CModalBody>

                        <div className="mb-3">
                            <CFormLabel className="mb-1" htmlFor="country">Country</CFormLabel>
                            <CFormSelect className="mb-3" aria-label="Small select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </CFormSelect>

                            <CFormLabel className="mb-1" htmlFor="currency">Currency</CFormLabel>
                            <CFormInput className="mb-3" id="currency" />

                            <CFormLabel className="mb-1" htmlFor="gasPrice">Gas Price</CFormLabel>
                            <CFormInput className="mb-3" id="gasPrice" />

                            <CFormLabel className="mb-1" htmlFor="deleveryFee">Delivery Fee</CFormLabel>
                            <CFormInput className="mb-3" id="deleveryFee" />
                        </div>

                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </CButton>
                        <CButton color="primary">Save changes</CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
            <CRow>
                <CCol>
                    <CButton onClick={() => setShowModal(!showModal)} color="warning">Add New Price</CButton>
                </CCol>
            </CRow>
            <br />
            <CCard>
                <CCardBody>
                    <CContainer>
                        <CRow>
                            <CCol className="py-3">
                                <h3>Global Price Setting</h3>
                            </CCol>
                        </CRow>
                    </CContainer>

                    {Object.keys(data).map((key) => (
                        buildPriceItem(key, data, setData, updatePrice)
                    ))}
                </CCardBody>
            </CCard>
        </div>
    )
}

function buildPriceItem(key, data, setData, updatePrice) {
    return <CContainer key={key} style={{ marginBottom: 0, borderBottom: '1px solid #c4c9d0', }}>
        <CRow>
            <CCol md="2" className="py-3">
                <ReactCountryFlag
                    className="emojiFlag"
                    countryCode={data[key].countryCode}
                    style={{
                        fontSize: '2em',
                        lineHeight: '1em',
                    }}
                    aria-label="Ghana" />
                <h5 style={{ color: '#8a93a2' }}>{data[key].country}</h5>
            </CCol>
            <CCol md="6" className="py-3">
                <CRow>
                    <CCol md="3" className="m-0 p-0">
                        <h6 className='text-muted'>Currency</h6>
                        <p>{data[key].currency}</p>
                    </CCol>
                    <CCol md="9" className="m-0 p-0">
                        <div style={{ width: '70%' }}>
                            <h6 className='text-muted mb-1'>Gas Price/ Kilogram</h6>
                            <CFormInput type='number' onChange={(e) => {
                                data[key].gasPrice = parseFloat(e.target.value);
                                // setData(data)
                            }}
                                className='mb-1'
                                defaultValue={data[key].gasPrice} />
                            <h6 className='text-muted mb-1'>Delivery Price/ Kilometer</h6>
                            <CFormInput onChange={(e) => {
                                data[key].deliveryFee = parseFloat(e.target.value);
                                // setData(data)
                            }}
                                className='mb-2'
                                defaultValue={data[key].deliveryFee} />
                            <CButton onClick={(e => {
                                setData({ ...data });
                                updatePrice(key, { ...data[key] });
                            })}
                                type="button"
                                color="primary">
                                Save
                            </CButton>
                        </div>
                    </CCol>
                </CRow>
            </CCol>
            <CCol md="4" className="py-3">
                <h6 className='text-muted'>Sumuary</h6>
                <p>{data[key].currency} {data[key].gasPrice} per Kilogram</p>
                <p>{data[key].currency} {data[key].deliveryFee} per Kilometer</p>
            </CCol>
        </CRow>
    </CContainer>;
}

export default GlobalPrice



