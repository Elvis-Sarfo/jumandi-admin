import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, updateDoc, getDoc, serverTimestamp, setDoc } from '@firebase/firestore';
import { ref, uploadString, getDownloadURL, uploadBytesResumable, uploadBytes } from 'firebase/storage';
import { firestore, storage } from './../../config/firebase';
import Toast from './../../components/Toast'
import {
    CForm,
    CButton,
    CFormLabel,
    CInputGroup,
    CFormInput,
    CCard,
    CCardBody,
    CCol,
    CFormCheck,
    CFormSelect,
    CSpinner
} from '@coreui/react';
import ImagePicker from './../../components/imagepicker';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const CreateAdmin = ({ id, ...props }) => {
    const dispatch = useDispatch();
    const nationalAdmins = useSelector((state) => state.nationalAdmins)
    const defaultAdminState = {
        id: '',
        firstname: '',
        lastname: '',
        othername: '',
        enabled: false,
        gender: '',
        phoneNumber: '',
        altenatePhoneNumber: '',
        email: '',
        pictureURL: '',
        createdAt: '',
        location: null,
        country: '',
        countryCode: '',
    }

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [admin, setAdmin] = useState(defaultAdminState);

    const center = {
        lat: 59.95,
        lng: 30.33
    };
    const zoom = 11;

    const handleImageChange = (imagefile) =>{ console.log(imagefile); setImage(imagefile)} ;

    // handle form submit event
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // get the collection schema
            const schemaRef = doc(firestore, 'DATABASE_SCHEMA', 'national_admin');
            const shema = await getDoc(schemaRef);
            // create a doc ref for the new admin
            const counter = ++shema.data().counter;
            const docId = `JUMA${counter}`;
            const docRef = doc(firestore, 'national_admin', docId);
            // add the data
            admin.createdAt = serverTimestamp();
            admin.id = docId;
            await setDoc(docRef, admin);

            if (image) {
                // create the storage ref
                const storageRef = ref(storage, `national-admins/${docId}`)
                // upload the image file
                const storageSnap = await uploadBytes(storageRef, image, {
                    contentType: image.type,
                })
                // get download url
                const pictureURL = await getDownloadURL(storageSnap.ref);
                // update the pictureURL in the database
                await updateDoc(docRef, { pictureURL });
            }

            // update the collection counter
            await updateDoc(schemaRef, { counter });

            // TODO: signup to firebase auth with email and password
            setLoading(false);
            setAdmin(defaultAdminState);
            dispatch({
                type: 'UPDATE_UI',
                toast: (<Toast color='green'
                    title='Task Complete'
                    message='National Admin Added Successfully' />)
            });
        } catch (error) {
            console.log(error);
        }

    }

    const formSectionTitle = {
        color: '#c78e11',
        marginTop: 30,
        marginBottom: 0,
        borderBottom: '2px solid #21252940',
        paddingBottom: 5
    };

    return (
        <CCard>
            <CCardBody>
                <h3>National Admin Registration Form</h3>
                <CForm onSubmit={handleFormSubmit} className="row g-3">
                    <h5 style={formSectionTitle}>Basic Information</h5>
                    {/* {newFunction(handleImageChange, image)} */}
                    <ImagePicker onImageChanged={handleImageChange} />
                    <CCol md={4}>
                        <CFormLabel htmlFor="firstname">First Name*</CFormLabel>
                        <CFormInput type='text' value={admin.firstname} required id="firstname"
                            onChange={(e) => { setAdmin({ ...admin, firstname: e.target.value }) }} />
                    </CCol>
                    <CCol md={4}>
                        <CFormLabel htmlFor="lastname">Last Name*</CFormLabel>
                        <CFormInput type='text' value={admin.lastname} required id="lastname"
                            onChange={(e) => { setAdmin({ ...admin, lastname: e.target.value }) }} />
                    </CCol>
                    <CCol md={4}>
                        <CFormLabel htmlFor="othername">Other Names</CFormLabel>
                        <CFormInput type='text' value={admin.othername} id="othername"
                            onChange={(e) => { setAdmin({ ...admin, othername: e.target.value }) }} />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="gender">Gender</CFormLabel>
                        <CFormSelect id="gender"
                            onChange={(e) => { setAdmin({ ...admin, gender: e.target.value }) }}
                            aria-label="Select Gender">
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="enabled">Status<span className='danger'>*</span></CFormLabel>
                        <CFormCheck
                            onChange={(e) => { setAdmin({ ...admin, enabled: !admin.enabled }) }}
                            type="radio" name="enabled" id="enabled" label="Enable" checked={admin.enabled} />
                        <CFormCheck
                            onChange={(e) => { setAdmin({ ...admin, enabled: !admin.enabled }) }}
                            type="radio" name="enabled" id="disabled" label="Disable" checked={!admin.enabled} />
                    </CCol>
                    <h5 style={formSectionTitle}>Contact Information</h5>
                    <CCol md={6}>
                        <CFormLabel htmlFor="phoneNumber">Phone*</CFormLabel>
                        <CFormInput type='tel' value={admin.phoneNumber} required id="phoneNumber"
                            onChange={(e) => { setAdmin({ ...admin, phoneNumber: e.target.value }) }} />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="altenatePhoneNumber">Altenate Phone (Optional)</CFormLabel>
                        <CFormInput type='tel' value={admin.altenatePhoneNumber} id="altenatePhoneNumber"
                            onChange={(e) => { setAdmin({ ...admin, altenatePhoneNumber: e.target.value }) }} />
                    </CCol>
                    <CCol md={12}>
                        <CFormLabel htmlFor="email">Email</CFormLabel>
                        <CFormInput type='email' value={admin.email} required id="email"
                            onChange={(e) => { setAdmin({ ...admin, email: e.target.value }) }} />
                    </CCol>

                    <h5 style={formSectionTitle}>Location Information</h5>
                    <CCol md={12}>
                        <CFormLabel htmlFor="country">Country</CFormLabel>
                        <CFormSelect id="country"
                            onChange={(e) => {
                                setAdmin({
                                    ...admin,
                                    country: e.target.value,
                                    countryCode: e.target.value === 'Ghana'?'GH':'NG'
                                })
                            }}
                            aria-label="Select Gender">
                            <option value="">Select Country</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Ghana">Ghana</option>
                        </CFormSelect>
                    </CCol>
                    <p style={{ marginBottom: 0, }}>
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

                    <CCol className="mt-5" xs={12}>
                        <CButton disabled={loading} color="primary" size="lg" type="submit">
                            {loading && (<CSpinner component="span" size="sm" aria-hidden="true" />)}
                            {loading ? '   Loading...' : 'Submit'}
                        </CButton>
                    </CCol>
                </CForm>
            </CCardBody>
        </CCard>
    )
}

export default CreateAdmin