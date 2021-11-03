import React, { lazy, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import CustomDataTable from "./../../components/CustomDataTable";
import data from "./test";

import { firestore as db } from './../../config/firebase'
import { collection, doc, getDocs, onSnapshot } from '@firebase/firestore';
import { Icon, Switch } from '@mui/material';
import { DeleteForever, Visibility, Edit } from '@mui/icons-material';
import ReactCountryFlag from "react-country-flag"


import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu, cibEx } from '@coreui/icons'
import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CNavLink,
    CWidgetStatsB,
} from '@coreui/react'

const Vendors = () => {

    const history = useHistory();
    // Create the states of the component
    const [vendors, setVendors] = useState([]);
    let [totalVendors, setTotalVendors] = useState(0);
    let [pendingVendors, setPendingVendors] = useState({
        percentage: 0,
        value: 0
    });
    let [approvedVendors, setApprovedVendors] = useState({
        percentage: 0,
        value: 0
    });

    // Get firebase Firestore reference
    const collectionRef = collection(db, 'businesses');

    // Structure the data that is coming from firebase
    const getStructuredData = (rawData) => rawData.map((doc) => {

        pendingVendors.value += doc.data().businessStatus?.toLowerCase() == 'pending' ? 1 : 0;
        approvedVendors.value += doc.data().businessStatus?.toLowerCase() == 'approved' ? 1 : 0;

        return {
            id: doc.id,
            id: 1,
            name: (<>
                <CAvatar size="md" src={doc.data().businessLogo} status={'success'} />
                <span style={{ marginLeft: 7 }}>{doc.data().businessName}</span>
            </>
            ),
            location: (<div className="p-1">
                <div>
                    <ReactCountryFlag
                        className="emojiFlag"
                        countryCode={doc.data().businessLocation?.isoCode}
                        style={{
                            fontSize: '1em',
                            lineHeight: '1em',
                        }}
                        aria-label="United States"
                    />{' '}
                    {doc.data().businessLocation?.country}
                </div>
                <div className="small text-medium-emphasis">
                    <span>{doc.data().businessLocation?.adminArea}</span><br />
                    <span>{doc.data().businessLocation?.locality}</span> ,
                    <span>{doc.data().businessLocation?.name}</span>
                </div>
            </div>),
            status: doc.data().businessStatus,
            approve: (<Switch defaultChecked={doc.data().businessStatus?.toLowerCase() == 'approved'} color="success" />),
            actions: (
                <>
                    <CButtonGroup>
                        <CButton onClick={() => history.push(`/supervisors/${doc.id}`)} color="primary"><Visibility /></CButton>
                        <CButton color="warning"><Edit /></CButton>
                        <CButton color="danger"><DeleteForever /></CButton>
                    </CButtonGroup>
                </>
            )
        };
    });

    useEffect(() => {
        onSnapshot(collectionRef, (snapshot) => {
            console.log(snapshot.docs.map((doc) => ({ ...doc.data() })));
            let _data = getStructuredData(snapshot.docs);
            totalVendors = snapshot.size;
            pendingVendors.percentage = ((pendingVendors.value / totalVendors) * 100).toFixed(2);
            approvedVendors.percentage = ((approvedVendors.value / totalVendors) * 100).toFixed(2);;

            setPendingVendors(pendingVendors);
            setApprovedVendors(approvedVendors);
            setTotalVendors(totalVendors);
            setVendors(_data);
        });
    }, [])


    const columns = [
        {
            name: "Name",
            grow: 2,
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "Location",
            grow: 2,
            selector: (row) => row.location,
            sortable: true,
            // center: true,
        },
        {
            name: "Status",
            grow: 1,
            selector: (row) => row.status,
            sortable: true,
            // center: true,
        },
        {
            name: "Approved",
            grow: 1,
            selector: (row) => row.approve,
            sortable: true,
            // center: true,
        },
        // {
        //     cell: () =>  <CButton >Action</CButton>,
        //     name: 'Status',
        //     ignoreRowClick: true,
        //     allowOverflow: true,
        //     button: true,
        // },
        {
            cell: () => <CButton >Action</CButton>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    return (
        <>
            {/* <CRow>
                <CCol>
                    <CButton onClick={() => history.push('/vendors/create')} color="warning">Add New Vendor</CButton>
                </CCol>
            </CRow>
            <br /> */}
            <CRow>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'warning', value: 40 }}
                        text={`${pendingVendors.percentage}% vendors Pending`}
                        title="New Requests"
                        value={pendingVendors.value}
                    />
                </CCol>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'success', value: 60 }}
                        text={`${approvedVendors.percentage}% vendors Approved`}
                        title="Approved Vendors"
                        value={approvedVendors.value}
                    />
                </CCol>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'info', value: 100 }}
                        text="Note: Excluding rejected"
                        title="Total Vendors"
                        value={totalVendors}
                    />
                </CCol>
            </CRow>
            <CustomDataTable
                title="List of Vendors"
                actions={
                    <CButton
                        size="sm"
                        shape="rounded-0"
                        onClick={() => history.push('/vendors/create')}
                        color="warning"
                    >
                        Export
                    </CButton>
                }
                columns={columns}
                data={vendors}
                onChangePage={(page, totalRows) => {
                    console.log(page, totalRows);
                }}
                onChangeRowsPerPage={(currentRowsPerPage) => {
                    console.log('onChangeRowsPerPage running');
                    console.log(currentRowsPerPage);
                }}
            />
        </>
    );
}

export default Vendors
