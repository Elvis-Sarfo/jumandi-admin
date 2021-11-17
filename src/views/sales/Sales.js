import React, { lazy, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
    // Create the states of the component
    const [sales, setSales] = useState([]);
    let [totalSales, setTotalSales] = useState(0);
    let [pendingSales, setPendingSales] = useState({
        percentage: 0,
        value: 0
    });
    let [approvedSales, setApprovedSales] = useState({
        percentage: 0,
        value: 0
    });

    // Get firebase Firestore reference
    const collectionRef = collection(db, 'orders');

    // Structure the data that is coming from firebase
    const getStructuredData = (rawData) => {
        // There are two arrays used
        // This arrays are used to map the index and the data of a vendors sales

        // The first array (saleIndexes) stores the vendors IDs in order
        let saleIndexes = [];
        // The second array (_sales) store the data that maps to the id
        let _sales = [];

        // Loop over the data that is coming from the database
        rawData.forEach((doc) => {
            // Get the vendor's in a variable and save it in the variable
            let vendorId = doc.data().station?.businessId;
            let index = saleIndexes.indexOf(vendorId);


            // Calculate the summary data for te sales
            pendingSales.value += doc.data().businessStatus?.toLowerCase() == 'pending' ? 1 : 0;
            approvedSales.value += doc.data().businessStatus?.toLowerCase() == 'approved' ? 1 : 0;

            // First check if the order has been completed before
            // IF: the order has been complete then it means it is a sale and we can work on that
            if (doc.data().orderState?.status.toLowerCase() == 'completed') {
                // Check if the vendor id exists in the map.
                // IF: it exist you dont have to add it again,
                // Just update the data by incrementing numberOfOrders, netTotal, and grandTotal
                // ELSE: add a new data to the MAP[saleIndexes, _sales] with initial values
                if (saleIndexes.includes(vendorId)) {
                    _sales[index].numOfOrders += 1;
                    _sales[index].netTotal +=
                        Number((doc.data().orderPrice - (doc.data().orderPrice * 0.2)).toFixed(2));
                    _sales[index].grandTotal += Number((doc.data().orderPrice).toFixed(2));
                    _sales[index].revenue += Number((doc.data().orderPrice * 0.2).toFixed(2));

                    _sales[index].netTotal = Number(_sales[index].netTotal.toFixed(2));
                    _sales[index].grandTotal = Number(_sales[index].grandTotal.toFixed(2));
                    _sales[index].revenue = Number(_sales[index].revenue.toFixed(2));
                    // parseFloat(_sales[index].netTotal).toFixed(2);
                    // parseFloat(_sales[index].grandTotal).toFixed(2);
                    // parseFloat(_sales[index].revenue).toFixed(2);
                } else {
                    saleIndexes.push(vendorId);
                    _sales.push({
                        id: vendorId,
                        vendor: (<>
                            <CAvatar size="md" src={doc.data().station?.businessLogo} />
                            <span style={{ marginLeft: 7 }}>{doc.data().station?.businessName}</span>
                        </>
                        ),
                        country: (<div className="p-1">
                            <div>
                                <ReactCountryFlag
                                    className="emojiFlag"
                                    countryCode={doc.data().station?.businessLocation?.isoCode}
                                    style={{
                                        fontSize: '1em',
                                        lineHeight: '1em',
                                    }}
                                />{' '}
                                {doc.data().station?.businessLocation?.country}
                            </div>
                        </div>),
                        numOfOrders: 1,
                        netTotal: Number((doc.data().orderPrice - (doc.data().orderPrice * 0.2)).toFixed(2)),
                        grandTotal: Number((doc.data().orderPrice).toFixed(2)),
                        revenue: Number((doc.data().orderPrice * 0.2).toFixed(2))
                    })
                }
            }
        });
        // RETURN: sales array
        return _sales;
    };

    useEffect(() => {
        onSnapshot(collectionRef, (snapshot) => {
            console.log(snapshot.docs.map((doc) => ({ ...doc.data() })));
            const _data = getStructuredData(snapshot.docs);
            // totalSales = snapshot.size;
            // pendingSales.percentage = ((pendingSales.value / totalSales) * 100).toFixed(2);
            // approvedSales.percentage = ((approvedSales.value / totalSales) * 100).toFixed(2);;

            // setPendingSales(pendingSales);
            // setApprovedSales(approvedSales);
            // setTotalSales(totalSales);
            console.log(_data);
            setSales(_data);
        });
    }, []);

    const columns = [
        {
            grow: 2,
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
            center: true
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
                        text="All Approved Sales"
                        title="STATUS"
                        value="Completed"
                    />
                </CCol>
                <CCol sm={6} lg={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        // color="danger"
                        progress={{ color: 'primary', value: 100 }}
                        text="Number of Sales"
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
