import React, { lazy, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomDataTable from "../../components/CustomDataTable";
import CIcon from '@coreui/icons-react'
import { cilArrowTop, cilOptions, cilMenu, cibEx } from '@coreui/icons'
import { ChartWidget, MatDataTable } from './../../components'

import { firestore as db } from './../../config/firebase'
import { collection, doc, getDocs, onSnapshot } from '@firebase/firestore';
import { Icon, Switch } from '@mui/material';
import { DeleteForever, Visibility, Edit } from '@mui/icons-material';
import ReactCountryFlag from "react-country-flag"

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
    CAvatar,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'

const Sales = () => {
    const history = useHistory();
    const sales = useSelector((state) => getStructuredData(state.sales.data));
    const dataSummary = useSelector((state) => state.sales.summary);

    const totalNetSales = dataSummary?.totalNetSales;
    const totalGrandSales = dataSummary?.totalGrandSales;
    const totalRevenue = dataSummary?.totalRevenue;
    const totalNumOfSales = dataSummary?.totalNumOfSales;

    // Structure the data
    function getStructuredData(data) {
        return Object.keys(data).map((key) => {
            const sale = data[key];
            return {
                id: sale.id,
                vendor: (<>
                    <CAvatar size="md" src={sale.vendor?.logo} />
                    <span style={{ marginLeft: 7 }}>{sale.vendor?.name}</span>
                </>
                ),
                country: (<div className="p-1">
                    <div>
                        <ReactCountryFlag
                            svg
                            countryCode={sale.vendor?.location?.isoCode}
                            style={{
                                fontSize: '1em',
                                lineHeight: '1em',
                            }}
                        />{' '}
                        {sale.vendor?.location?.country}
                    </div>
                </div>),
                numOfOrders: sale.numOfOrders,
                netTotal: sale.netTotal,
                grandTotal: sale.grandTotal,
                revenue: sale.revenue
            };
        });
    }

    const columns = [
        {
            grow: 3,
            name: "Sale",
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
            right: true
        },
        {
            name: "Grand Total",
            selector: (row) => row.grandTotal,
            sortable: true,
            right: true,
            grow: 2,
        },
        {
            name: "Net Total",
            selector: (row) => row.netTotal,
            sortable: true,
            right: true,
            grow: 2,
        },
        {
            name: "Revenue",
            selector: (row) => row.revenue,
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
                        text="Completed Sales"
                        title="STATUS"
                        value="Completed"
                    />
                </CCol>
                <CCol sm={6} lg={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        // color="danger"
                        progress={{ color: 'primary', value: 100 }}
                        text="Total Number of Orders"
                        title="Orders"
                        value={`${totalNumOfSales}`}
                    />
                </CCol>
                <CCol sm={6} lg={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        // color="primary"
                        progress={{ color: 'info', value: 100 }}
                        text="Total Net of Sales"
                        title="NET TOTALS"
                        value={`$ ${totalNetSales.value}`}
                    />
                </CCol>
                <CCol sm={6} lg={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        // color="info"
                        progress={{ color: 'danger', value: 100 }}
                        text="Grand Totals of Sales"
                        title="GRAND TOTALS"
                        value={`$ ${totalGrandSales.value}`}
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
                data={sales}
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
