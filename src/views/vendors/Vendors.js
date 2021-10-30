import React, { lazy, useState } from 'react'
import { useHistory } from 'react-router-dom';
import CustomDataTable from "./../../components/CustomDataTable";
import data from "./test";
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

    const columns = [
        {
            name: "Name",
            grow:2,
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "Location",
            grow:2,
            selector: (row) => row.location,
            sortable: true,
            // center: true,
        },
        {
            name: "Status",
            grow:1,
            selector: (row) => row.status,
            sortable: true,
            // center: true,
        },
        {
            name: "Approved",
            grow:1,
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
            cell: () =>  <CButton >Action</CButton>,
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
                        text="40% vendors pending approval"
                        title="New Requests"
                        value="20"
                    />
                </CCol>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'success', value: 60 }}
                        text="60% vendors approved"
                        title="Approved Vendors"
                        value="30"
                    />
                </CCol>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'info', value: 100 }}
                        text="Note: Excluding rejected"
                        title="Total Vendors"
                        value="50"
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
                data={data}
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
