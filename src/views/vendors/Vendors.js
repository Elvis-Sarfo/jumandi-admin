import React, { lazy, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomDataTable from "./../../components/CustomDataTable";
import { getVendors } from '../../store/actions/vendor.action'


import { firestore as db } from './../../config/firebase'
import { collection, doc, getDocs, onSnapshot } from '@firebase/firestore';
import { Icon, Switch } from '@mui/material';
import { DeleteForever, Visibility, Edit } from '@mui/icons-material';
import ReactCountryFlag from "react-country-flag"

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
    const topNavTitile = useSelector((state) => state.ui.topNavTitile);

    const vendors = useSelector((state) => getStructuredData(state.vendors.data) );
    const totalVendors = useSelector((state) => state.vendors.summary.totalVendors);
    const pendingVendors = useSelector((state) => state.vendors.summary.pendingVendors);
    const approvedVendors = useSelector((state) => state.vendors.summary.approvedVendors);
    const filter = useSelector((state) => state.vendors.filter);

    console.log(filter,totalVendors);
    // const [_vendors, setVendors] = useState([]);
    // let [totalVendors, setTotalVendors] = useState(0);
    // let [pendingVendors, setPendingVendors] = useState({
    //     percentage: 0,
    //     value: 0
    // });
    // let [approvedVendors, setApprovedVendors] = useState({
    //     percentage: 0,
    //     value: 0
    // });

    // // Get firebase Firestore reference
    // const collectionRef = collection(db, 'businesses');

    // Structure the data that is coming from firebase
    function getStructuredData(rawData) {
        return rawData.map((vendor) => {
            // pendingVendors.value += doc.data().businessStatus?.toLowerCase() == 'pending' ? 1 : 0;
            // approvedVendors.value += doc.data().businessStatus?.toLowerCase() == 'approved' ? 1 : 0;

            return {
                id: vendor.id,
                name: (<>
                    <CAvatar size="md" src={vendor.businessLogo} status={'success'} />
                    <span style={{ marginLeft: 7 }}>{vendor.businessName}</span>
                </>
                ),
                location: (<div className="p-1">
                    <div>
                        <ReactCountryFlag
                            className="emojiFlag"
                            countryCode={vendor.businessLocation?.isoCode}
                            style={{
                                fontSize: '1em',
                                lineHeight: '1em',
                            }}
                            aria-label="United States" />{' '}
                        {vendor.businessLocation?.country}
                    </div>
                    <div className="small text-medium-emphasis">
                        <span>{vendor.businessLocation?.adminArea}</span><br />
                        <span>{vendor.businessLocation?.locality}</span> ,
                        <span>{vendor.businessLocation?.name}</span>
                    </div>
                </div>),
                status: vendor.businessStatus,
                approve: (<Switch defaultChecked={vendor.businessStatus?.toLowerCase() == 'approved'} color="success" />),
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
    }

    // const vendors = getStructuredData(state.data);
    // const totalVendors = state.summary.totalVendors;
    // const pendingVendors = state.summary.pendingVendors;
    // const approvedVendors = state.summary.approvedVendors;

    // useEffect(() => {
    //     dispatch(getVendors());
    //     return 0;
    // },[]);


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
                        text={`${pendingVendors?.percentage}% vendors Pending`}
                        title="New Requests"
                        value={<b>{pendingVendors?.value}</b>}
                    />
                </CCol>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'success', value: 60 }}
                        text={`${approvedVendors?.percentage}% vendors Approved`}
                        title="Approved Vendors"
                        value={<b>{approvedVendors?.value}</b>}
                    />
                </CCol>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'info', value: 100 }}
                        text="Note: Excluding rejected"
                        title="Total Vendors"
                        value={<b>{totalVendors}</b>}
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
