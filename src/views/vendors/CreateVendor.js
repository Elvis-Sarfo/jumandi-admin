import React from 'react'
import GoogleMapReact from 'google-map-react';
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
    CCol
} from '@coreui/react'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const CreateVendor = () => {
    
    const center = {
        lat: 59.95,
        lng: 30.33
    };
    const zoom = 11;
    return (
        <CCard>
            <CCardBody>
                <h3>Vendor Registration Form</h3>
                <CForm className="row g-3">
                    <h5 style={{
                        color: '#c78e11',
                        marginTop: 30,
                        marginBottom: 0,
                        borderBottom: '2px solid #21252940',
                        paddingBottom: 5
                    }}>
                        Business Information
                    </h5>
                    <CCol xs={6}>
                        <CFormLabel htmlFor="inputAddress">Business Name</CFormLabel>
                        <CFormInput id="inputAddress" placeholder="Jumandi Gas" />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="inputEmail4">Business Email</CFormLabel>
                        <CFormInput type="email" id="inputEmail4" placeholder="example@jumandigas.com" />
                    </CCol>
                    <h5 style={{
                        color: '#c78e11',
                        marginTop: 30,
                        marginBottom: 0,
                        borderBottom: '2px solid #21252940',
                        paddingBottom: 5
                    }}>
                        Contact Information
                    </h5>
                    <CCol xs={6}>
                        <CFormLabel htmlFor="inputAddress">Phone One*</CFormLabel>
                        <CFormInput id="inputAddress" placeholder="Jumandi Gas" />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="inputEmail4">Phone Two</CFormLabel>
                        <CFormInput id="inputEmail4" placeholder="example@jumandigas.com" />
                    </CCol>
                    <CCol md={12}>
                        <CFormLabel htmlFor="inputCity">Additional Contacts(Separate with comma(;))</CFormLabel>
                        <CFormInput id="inputCity" />
                    </CCol>
                    <h5 style={{
                        color: '#c78e11',
                        marginTop: 30,
                        marginBottom: 0,
                        borderBottom: '2px solid #21252940',
                        paddingBottom: 5
                    }}>
                        Location Information
                    </h5>
                    <p style={{ marginTop: 0, marginBottom: 0, }}>
                        Choose the location of the business from the map or search by the Lal and Long
                    </p>
                    <CCol xs={12}>
                        <CInputGroup>
                            <CFormInput placeholder="Latitude" aria-label="Recipient's username with two button addons" />
                            <CFormInput placeholder="Longitude" aria-label="Recipient's username with two button addons" />
                            <CButton type="button" color="primary" >Search Location</CButton>
                        </CInputGroup>
                    </CCol>
                    <div style={{ height: '300px', width: '100%' }}>
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

                    <h5 style={{
                        color: '#c78e11',
                        marginTop: 30,
                        marginBottom: 0,
                        borderBottom: '2px solid #21252940',
                        paddingBottom: 5
                    }}>
                        Legal Files
                    </h5>

                    <CCol md={12}>
                        <CFormLabel htmlFor="inputCity">Business License</CFormLabel>
                        <CFormInput type="file" id="inputCity" />
                    </CCol>

                    <CCol className="mt-5" xs={12}>
                        <CButton color="primary" size="lg" type="submit">Submit</CButton>
                    </CCol>
                </CForm>
            </CCardBody>
        </CCard>
    )
}

export default CreateVendor
