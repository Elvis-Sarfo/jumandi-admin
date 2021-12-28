import React, { lazy, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomDataTable from "./../../components/CustomDataTable";
import { updateVendorStatus } from '../../store/actions/vendors.action'


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
    const dispatch = useDispatch();

    // Create the states of the component

    const vendors = useSelector((state) => getStructuredData(state.vendors.data));
    const dataSummary = useSelector((state) => state.vendors.summary);

    const totalVendors = dataSummary?.totalVendors;
    const pendingVendors = dataSummary?.pendingVendors;
    const approvedVendors = dataSummary?.approvedVendors;

    // Structure the data that is coming from firebase
    function getStructuredData(data) {
        return Object.keys(data).map((key) => {
            const vendor = data[key];
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
                            svg
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
                approve: (
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
                ),
                actions: (
                    <>
                        <CButtonGroup>
                            <CButton onClick={() => history.push(`/vendors/${vendor.id}`)} color="primary"><Visibility /></CButton>
                            {/* <CButton color="warning"><Edit/></CButton> */}
                            <CButton color="danger"><DeleteForever /></CButton>
                        </CButtonGroup>
                    </>
                )
            };
        });
    }

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
        {
            name: 'Actions',
            ignoreRowClick: true,
            selector: (row) => row.actions,
            allowOverflow: true,
            grow: 1,
            center: true,
        },
    ];

    return (
        <>
            <CRow>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'warning', value: parseFloat(pendingVendors?.percentage) }}
                        text={`${pendingVendors?.percentage}% vendors Pending`}
                        title="New Requests"
                        value={<b>{pendingVendors?.value}</b>}
                    />
                </CCol>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'success', value: parseFloat(approvedVendors?.percentage) }}
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
