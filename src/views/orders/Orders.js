import React, { lazy, useState, useEffect } from 'react'
import data from "./test";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomDataTable from "./../../components/CustomDataTable";

import { firestore as db } from './../../config/firebase'
import { collection, doc, getDocs, onSnapshot } from '@firebase/firestore';

import { DeleteForever, Visibility, Edit } from '@mui/icons-material';
import ReactCountryFlag from "react-country-flag"
import moment from 'moment'

import {
    CButton,
    CButtonGroup,
    CCol,
    CRow,
    CWidgetStatsB,
} from '@coreui/react'

const Orders = () => {
    const history = useHistory();
    // const dispatch = useDispatch();

    const orders = useSelector((state) => getStructuredData(state.orders.filteredData));
    const dataSummary = useSelector((state) => state.orders.summary);

    const pendingOrders = dataSummary?.pendingOrders;
    const completedOrders = dataSummary?.completedOrders;
    const newOrders = dataSummary?.newOrders;
    const rejectedOrders = dataSummary?.rejectedOrders;
    const acceptedOrders = dataSummary?.acceptedOrders;
    const cancelledOrders = dataSummary?.cancelledOrders;
    const totalOrders = dataSummary?.totalOrders;




    // Create the states of the component
    // const [orders, setOrders] = useState([]);
    // let [totalOrders, setTotalOrders] = useState(0);
    // let [newOrders, setNewOrders] = useState({
    //     percentage: 0,
    //     value: 0
    // });
    // let [pendingOrders, setPendingOrders] = useState({
    //     percentage: 0,
    //     value: 0
    // });
    // let [completedOrders, setCompletedOrders] = useState({
    //     percentage: 0,
    //     value: 0
    // });

    // Get firebase Firestore reference
    // const collectionRef = collection(db, 'orders');

    // Structure the data that is coming from firebase
    function getStructuredData(rawData) {
        return rawData.map((order) => {
            // pendingOrders.value += doc.data().orderState?.status.toLowerCase() == 'pending' ? 1 : 0;
            // completedOrders.value += doc.data().orderState?.status.toLowerCase() == 'completed' ? 1 : 0;
            // newOrders.value += doc.data().orderState?.status.toLowerCase() == 'new' ? 1 : 0;

            return {
                id: order.orderId,
                orderId: order.orderId,
                user: (<div className="p-1">
                    <div>
                        <ReactCountryFlag
                            className="emojiFlag"
                            countryCode={order.buyer?.userLocation?.isoCode}
                            style={{
                                fontSize: '1em',
                                lineHeight: '1em',
                            }}
                            aria-label="United States" />{' '}
                        {order.buyer?.userName}
                    </div>
                    <div className="pt-1 pb-1">
                        {order.buyer?.userContacts?.tel}
                    </div>
                    <div className="small text-medium-emphasis">
                        <span>{order.buyer?.userLocation?.locality}</span> {', '}
                        <span>{order.buyer?.userLocation?.name}</span>
                    </div>
                </div>),
                vendor: (<div className="p-1">
                    <div>
                        <ReactCountryFlag
                            className="emojiFlag"
                            countryCode={order.station?.businessLocation?.isoCode}
                            style={{
                                fontSize: '1em',
                                lineHeight: '1em',
                            }}
                            aria-label="United States" />{' '}
                        {order.station?.businessName}
                    </div>
                    <div className="pt-1 pb-1">
                        {order.station?.businessContacts?.phone1}
                    </div>
                    <div className="small text-medium-emphasis">
                        <span>{order.station?.businessLocation?.locality}</span> {', '}
                        <span>{order.station?.businessLocation?.name}</span>
                    </div>
                </div>),
                status: order.orderState?.status.toUpperCase(),
                time: moment.unix(order.createdAt).format("Do MMM YYYY @ h:m a"),
                quantity: `${order.orderQuantity}kg`,
                paymentMethod: order.paymentMethod,
                action: (
                    <>
                        <CButtonGroup>
                            <CButton onClick={() => history.push(`/orders/${doc.id}`)} color="primary"><Visibility /></CButton>
                            <CButton color="warning"><Edit /></CButton>
                            <CButton color="danger"><DeleteForever /></CButton>
                        </CButtonGroup>
                    </>
                ),
            };
        });
    }

    // useEffect(() => {
    //     onSnapshot(collectionRef, (snapshot) => {
    //         console.log(snapshot.docs.map((doc) => ({ ...doc.data() })));
    //         let _data = getStructuredData(snapshot.docs);
    //         totalOrders = snapshot.size;
    //         pendingOrders.percentage = ((pendingOrders.value / totalOrders) * 100).toFixed(2);
    //         completedOrders.percentage = ((completedOrders.value / totalOrders) * 100).toFixed(2);

    //         setPendingOrders(pendingOrders);
    //         setCompletedOrders(completedOrders);
    //         setTotalOrders(totalOrders);
    //         setNewOrders(newOrders);
    //         setOrders(_data);
    //     });
    // }, []);

    const columns = [
        {
            name: "Order ID",
            selector: (row) => row.id,
            sortable: true,
            grow: 1,
        },
        {
            name: "User",
            selector: (row) => row.user,
            sortable: true,
            grow: 2
        },
        {
            name: "Vendor",
            selector: (row) => row.vendor,
            sortable: true,
            grow: 2
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
            grow: 1,
            center: true
        },
        {
            name: "Qty",
            selector: (row) => row.quantity,
            sortable: true,
            grow: 1,
            center: true
        },
        {
            name: "Time",
            selector: (row) => row.time,
            grow: 1,
            sortable: true,
        },
        {
            name: "Actions",
            selector: (row) => row.action,
            center: true,
            allowOverflow: true,
            grow: 2
        }
    ];

    return (
        <>
            <CRow>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'warning', value: 40 }}
                        text="orders pending acceptance"
                        title="New Orders"
                        value={newOrders.value}
                    />
                </CCol>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'info', value: 60 }}
                        text="orders pending acceptance"
                        title="Pending Orders"
                        value={pendingOrders.value}
                    />
                </CCol>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'success', value: 100 }}
                        text="Note: Excluding rejected"
                        title="Completed Orders"
                        value={completedOrders.value}
                    />
                </CCol>
            </CRow>
            <CustomDataTable
                title="All Orders"
                actions={
                    <CButton
                        size="sm"
                        shape="rounded-0"
                        onClick={() => history.push('/national-admins/create')}
                        color="warning"
                    >
                        Export
                    </CButton>
                }
                columns={columns}
                data={orders}
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

export default Orders
