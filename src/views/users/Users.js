import React from 'react'
import data from "./test";
import { useHistory } from 'react-router-dom';
import CustomDataTable from "./../../components/CustomDataTable";
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
    CRow,
    CWidgetStatsB,
} from '@coreui/react'

const Users = () => {
    const history = useHistory();

    const columns = [
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true
        },
        {
            name: "Directior",
            selector: (row) => row.director,
            sortable: true
        },
        {
            name: "Runtime (m)",
            selector: (row) => row.runtime,
            sortable: true,
            right: true
        }
    ];
    return (
        <>
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
                title="All Orders"
                actions={[
                    <CButton
                        size="sm"
                        shape="rounded-0"
                        onClick={() => history.push('/national-admins/create')}
                        color="warning"
                    >
                        Export
                    </CButton>
                ]
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
    )
}

export default Users
