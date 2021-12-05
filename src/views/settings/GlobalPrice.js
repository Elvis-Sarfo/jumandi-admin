import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePrice } from '../../store/actions/prices.action';
import { collection, setDoc , updateDoc, getDoc, serverTimestamp, doc, onSnapshot } from '@firebase/firestore';
import moment from 'moment'
import { firestore} from '../../config/firebase'
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
    CSpinner
} from '@coreui/react'

const GlobalPrice = () => {

    // Get the route parameters
    const dispatch = useDispatch();
    const prices = useSelector((state) => state.prices.data);

    const collectionRef = collection(firestore, 'pricing');
    const initPriceState = {
        id: '',
        countryCode: '',
        gasPrice: '',
        deliveryFee: '',
        currency: '',
        country: '',
        createdAt: '',
        updatedAt: ''
    };

    // Create the states of the component
    const [price, setPrice] = useState(initPriceState);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // const getStructuredData = (prices) => {
    //     let dataStructure = {};
    //     prices.forEach(doc => {
    //         dataStructure[doc.id] = {
    //             id: doc.id,
    //             countryCode: doc.data().countryCode,
    //             gasPrice: doc.data().gasPrice,
    //             deliveryFee: doc.data().deliveryFee,
    //             currency: doc.data().currency,
    //             country: doc.data().country,
    //         }
    //     });
    //     return dataStructure;
    // }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // get the collection schema
            console.log(price.id);
            const priceRef = doc(firestore, 'pricing', price.id);
            // get price data with curent priceId
            const _priceQuery = await getDoc(priceRef);
            console.log(_priceQuery.data());
            // thro an error is price exists
            if (_priceQuery.exists()) throw('Price already Exist')
            // update price data
            price.createdAt = price.updatedAt = serverTimestamp();
            // save price data
            await setDoc(priceRef, price);

            setLoading(false);
            setPrice(initPriceState);
            setShowModal(false);
            dispatch({
                type: 'UPDATE_UI',
                toast: (<Toast color='green'
                    title='Task Complete'
                    message='Price Added Successfully' />)
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
            dispatch({
                type: 'UPDATE_UI',
                toast: (<Toast color='green'
                    title='Task Complete'
                    message={error.toString()}/>)
            });
        }
    }


    const updatePrice = (id, data) => {
        // Get firebase Firestore reference
        const docRef = doc(firestore, 'pricing', id);
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
                <CForm onSubmit={handleFormSubmit}>
                    <CModalBody>
                        <div className="mb-3">
                            <CFormLabel className="mb-1" htmlFor="country">Country</CFormLabel>
                            <CFormSelect id="country" className="mb-3" aria-label="Small select example"
                                onChange={(e) => {
                                    setPrice({
                                        ...price,
                                        id: e.target.value.toLowerCase(),
                                        country: e.target.value,
                                        countryCode: e.target.value === 'Ghana' ? 'GH' : 'NG'
                                    })
                                }} >
                                <option>Select Country</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Nigeria">Nigeria</option>
                            </CFormSelect>

                            <CFormLabel className="mb-1" htmlFor="currency">Currency</CFormLabel>
                            <CFormInput
                            value={price.currency}
                            onChange={(e) => { setPrice({ ...price, currency: e.target.value }) }} className="mb-3" id="currency" />

                            <CFormLabel className="mb-1" htmlFor="gasPrice">Gas Price</CFormLabel>
                            <CFormInput
                            value={price.gasPrice}
                            onChange={(e) => { setPrice({ ...price, gasPrice: e.target.value }) }} className="mb-3" id="gasPrice" />

                            <CFormLabel className="mb-1" htmlFor="deleveryFee">Delivery Fee</CFormLabel>
                            <CFormInput
                            value={price.deliveryFee}
                             onChange={(e) => { setPrice({ ...price, deliveryFee: e.target.value }) }}className="mb-3" id="deleveryFee" />
                        </div>

                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </CButton>
                        <CButton disabled={loading} color="primary" size="lg" type="submit">
                            {loading && (<CSpinner component="span" size="sm" aria-hidden="true" />)}
                            {loading ? '   Loading...' : 'Submit'}
                        </CButton>
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
                                <h3>Global Prices</h3>
                            </CCol>
                        </CRow>
                    </CContainer>

                    {prices.map((price) => (
                        buildPriceItem(price, dispatch)
                    ))}
                </CCardBody>
            </CCard>
        </div>
    )
}

function buildPriceItem(price,dispatch) {
    return <CContainer key={price.id} style={{ marginBottom: 0, borderBottom: '1px solid #c4c9d0', }}>
        <CRow>
            <CCol md="2" className="py-3">
                <ReactCountryFlag
                    svg
                    countryCode={price.countryCode}
                    style={{
                        fontSize: '2em',
                        lineHeight: '1em',
                    }}
                    aria-label="Ghana" />
                <h5 style={{ color: '#8a93a2' }}>{price.country}</h5>
            </CCol>
            <CCol md="6" className="py-3">
                <CRow>
                    <CCol md="3" className="m-0 p-0">
                        <h6 className='text-muted'>Currency</h6>
                        <p>{price.currency}</p>
                    </CCol>
                    <CCol md="9" className="m-0 p-0">
                        <div style={{ width: '70%' }}>
                            <h6 className='text-muted mb-1'>Gas Price/ Kilogram</h6>
                            <CFormInput type='number' onChange={(e) => {
                                price.gasPrice = parseFloat(e.target.value);
                                // setPrice(data)
                            }}
                                className='mb-1'
                                defaultValue={price.gasPrice} />
                            <h6 className='text-muted mb-1'>Delivery Price/ Kilometer</h6>
                            <CFormInput onChange={(e) => {
                                price.deliveryFee = parseFloat(e.target.value);
                                // setPrice(data)
                            }}
                                className='mb-2'
                                defaultValue={price.deliveryFee} />
                            <CButton onClick={(e => {
                                dispatch(updatePrice(price, price.id));
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
                <p>{price.currency} {price.gasPrice} per Kilogram</p>
                <p>{price.currency} {price.deliveryFee} per Kilometer</p>
            </CCol>
        </CRow>
    </CContainer>;
}

export default GlobalPrice



