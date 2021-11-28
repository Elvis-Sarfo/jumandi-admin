import React, { lazy, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder } from '../../store/actions/orders.action';
import CustomDataTable from "./../../components/CustomDataTable"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


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
    const MySwal = withReactContent(Swal)
    const history = useHistory();
    const dispatch = useDispatch();

    const orders = useSelector((state) => getStructuredData(state.orders.data));
    const dataSummary = useSelector((state) => state.orders.summary);

    const pendingOrders = dataSummary?.pendingOrders;
    const completedOrders = dataSummary?.completedOrders;
    const newOrders = dataSummary?.newOrders;
    const rejectedOrders = dataSummary?.rejectedOrders;
    const acceptedOrders = dataSummary?.acceptedOrders;
    const cancelledOrders = dataSummary?.cancelledOrders;
    const totalOrders = dataSummary?.totalOrders;

    // Structure the data
    function getStructuredData(data) {
        return Object.keys(data).map((key) => {
            const order = data[key];
            return {
                id: order.orderId,
                orderId: order.orderId,
                user: (<div className="p-1">
                    <div>
                        <ReactCountryFlag
                            className="emojiFlag"
                            countryCode={order.deliverTo?.isoCode}
                            style={{
                                fontSize: '1em',
                                lineHeight: '1em',
                            }}
                            aria-label={order.deliverTo?.isoCode} />{' '}
                        {order.buyer?.userName}
                    </div>
                    <div className="pt-1 pb-1">
                        {order.buyer?.userPhone}
                    </div>
                    <div className="small text-medium-emphasis">
                        <span>{order.deliverTo?.locality}</span> {', '}
                        <span>{order.deliverTo?.name}</span>
                    </div>
                </div>),
                vendor: order.orderState?.status.toLowerCase() !== 'new' ?  (<div className="p-1">
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
                </div>) : 'Waiting for Acceptance',
                status: order.orderState?.status.toUpperCase(),
                time: moment.unix(order.createdAt).format("Do MMM YYYY @ h:m a"),
                quantity: `${order.orderQuantity}kg`,
                paymentMethod: order.paymentMethod,
                action: (
                    <>
                        <CButtonGroup>
                            <CButton onClick={() => history.push(`/orders/${order.id}`)} color="primary"><Visibility /></CButton>
                            <CButton onClick={async (e) => {
                                e.preventDefault();
                                const alertResponse = await MySwal.fire({
                                    title: 'Are you sure you?',
                                    text: "You won't be able to revert this!",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    reverseButtons: true,
                                    confirmButtonColor: '#d33',
                                    cancelButtonColor: '#f9b115',
                                    confirmButtonText: 'Yes, delete it!',
                                    cancelButtonText: 'No, cancel',
                                })
                                if (alertResponse.isConfirmed) {
                                    dispatch(deleteOrder(order.id, order.orderId));
                                }
                            }} color="danger"><DeleteForever /></CButton>
                        </CButtonGroup>
                    </>
                ),
            };
        });
    }

    const columns = [
        {
            name: "ID",
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
            {orders.length > 0 ? <>
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
            </> : <p className='text-center text-muted mt-5 mb-5' >No Payent Request Made</p>}
        </>

    )
}

export default Orders
