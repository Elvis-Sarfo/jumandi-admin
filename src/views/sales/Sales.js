import React from 'react'
import data from "./test";
import { useHistory } from 'react-router-dom';
import DataTable from "react-data-table-component";
import CustomDataTable from "../../components/CustomDataTable";
import CIcon from '@coreui/icons-react'
import { cilArrowTop, cilOptions, cilMenu, cibEx } from '@coreui/icons'
import { ChartWidget, MatDataTable } from './../../components'
import {
    CButton,
    CCol,
    CRow,
    CWidgetStatsB,
    CWidgetStatsA,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'

const Sales = () => {
    const history = useHistory();

    const columns = [
        {
            grow: 2,
            name: "Vendor",
            selector: (row) => row.vendor,
            sortable: true
        },
        {
            name: "Country",
            selector: (row) => row.country,
            center: true

        },
        {
            name: "Orders",
            selector: (row) => row.numOfOrders,
            sortable: true,
            center: true
        },
        {
            name: "Net Total",
            selector: (row) => row.netTotal,
            sortable: true,
            right: true,
            grow: 2,
        },
        {
            name: "Grand Total",
            selector: (row) => row.grandTotal,
            sortable: true,
            right: true,
            grow: 2,
        }
    ];
    return (
        <>
            <CRow>
                <CCol sm={6} lg={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        // color="success"
                        progress={{ color: 'success', value: 100 }}
                        text="All Approved Vendors"
                        title="STATUS"
                        value="Approved"
                    />
                </CCol>
                <CCol sm={6} lg={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        // color="danger"
                        progress={{ color: 'primary', value: 100 }}
                        text="Number of Vendors"
                        title="NUMBER"
                        value="5"
                    />
                </CCol>
                <CCol sm={6} lg={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        // color="primary"
                        progress={{ color: 'info', value: 100 }}
                        text="Net Totals of Sales"
                        title="NET TOTALS"
                        value="$ 89.9"
                    />
                </CCol>
                <CCol sm={6} lg={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        // color="info"
                        progress={{ color: 'danger', value: 100 }}
                        text="Grand Totals of Sales"
                        title="GRAND TOTALS"
                        value="$ 100.9"
                    />
                </CCol>
            </CRow>
            <CustomDataTable
                title="All Sales"
                actions={
                    <CButton
                        size="sm"
                        shape="rounded-0"
                        onClick={() => history.push('/national-admins/create')}
                        color="warning"
                    >
                        Export
                    </CButton>}
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
            <br />
        </>
    )
}

export default Sales
