import React, { lazy } from 'react'

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
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { useSelector } from 'react-redux'
import Widgets from './Widgets'
import ReactCountryFlag from 'react-country-flag'
import moment from 'moment'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilPeople,
  cilCloudDownload,
  cilUser,
  cilUserX,
  cilXCircle
} from '@coreui/icons'

import avatar1 from './../../assets/images/avatars/1.jpg'
import avatar2 from './../../assets/images/avatars/2.jpg'
import avatar3 from './../../assets/images/avatars/3.jpg'
import avatar4 from './../../assets/images/avatars/4.jpg'
import avatar5 from './../../assets/images/avatars/5.jpg'
import avatar6 from './../../assets/images/avatars/6.jpg'

// const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
// const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
  // Sales Data Summary
  const salesSummary = useSelector((state) => state.sales.summary);
  const totalNetSales = salesSummary?.totalNetSales;
  const totalGrandSales = salesSummary?.totalGrandSales;
  const totalRevenue = salesSummary?.totalRevenue;
  const totalNumOfSales = salesSummary?.totalNumOfSales;
  const salesPerYear = salesSummary?.salesPerYear;

  // Orders Data Summary
  const ordersSummary = useSelector((state) => state.orders.summary);
  const pendingOrders = ordersSummary?.pendingOrders;
  const completedOrders = ordersSummary?.completedOrders;
  const newOrders = ordersSummary?.newOrders;
  const rejectedOrders = ordersSummary?.rejectedOrders;
  const acceptedOrders = ordersSummary?.acceptedOrders;
  const cancelledOrders = ordersSummary?.cancelledOrders;
  const totalOrders = ordersSummary?.totalOrders;
  const ordersPerYear = ordersSummary?.ordersPerYear;

  // Vendors Data Summary
  const vendorsSummary = useSelector((state) => state.vendors.summary);
  const totalVendors = vendorsSummary?.totalVendors;
  const pendingVendors = vendorsSummary?.pendingVendors;
  const approvedVendors = vendorsSummary?.approvedVendors;

  // Users Data Summary
  const usersSummary = useSelector((state) => state.users.summary);
  const totalUsers = usersSummary?.totalUsers;
  const disabledUsers = usersSummary?.disabledUsers;
  const enabledUsers = usersSummary?.enabledUsers;

  console.log(usersSummary);

  // withdrawalRequests
  const wr = useSelector((state) => state.withdrawalRequests.data);

  const salesChartSummary = [
    { title: 'Total Orders', value: totalOrders, percent: totalOrders ? 100 : 0, color: 'info' },
    { title: 'Completed Orders/Sales', value: totalNumOfSales, percent: completedOrders.percentage, color: 'success' },
    { title: 'Total Grand Sales', value: `$ ${totalGrandSales.value}`, percent: totalGrandSales.percentage, color: 'info' },
    { title: 'Total Net Sales', value: `$ ${totalNetSales.value}`, percent: totalNetSales.percentage, color: 'warning' },
    { title: 'Total Revenue', value: `$ ${totalRevenue.value}`, percent: totalRevenue.percentage, color: 'danger' },
  ]

  const progressUsers = [
    { title: 'Enabled Users', icon: cilPeople, percent: enabledUsers.percentage, value: enabledUsers.value, color: 'success' },
    { title: 'Disabled Users', icon: cilXCircle, percent: disabledUsers.percentage, value: disabledUsers.value, color: 'info' },
  ];

  const progressVendors = [
    { title: 'Approved Vendors', icon: cilUser, percent: approvedVendors.percentage, value: approvedVendors.value, color: 'primary' },
    { title: 'Unapproved Vendors', icon: cilUserX, percent: pendingVendors.percentage, value: pendingVendors.value, color: 'danger' },
  ];

  return (
    <>
      <Widgets />

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Sales Chart
              </h4>
              <div className="small text-medium-emphasis">
                {`${salesPerYear.months[0]} - ${salesPerYear.months[salesPerYear.months.length - 1]} ${new Date().getFullYear()}`}
              </div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: salesPerYear.months,
              datasets: [
                {
                  label: 'Sales',
                  backgroundColor: hexToRgba(getStyle('--cui-primary'), 10),
                  borderColor: getStyle('--cui-primary'),
                  pointHoverBackgroundColor: getStyle('--cui-primary'),
                  borderWidth: 2,
                  data: salesPerYear.sales,
                  fill: true,
                },
                {
                  label: 'Orders',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: ordersPerYear.orders,
                  fill: true,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.5,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {salesChartSummary.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value} ({item.percent}%)
                </strong>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Vendors {' & '} Users</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol style={{ borderRight: '1px solid #dee2e6' }} xs={12} md={6} xl={6}>

                  {progressVendors.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color={item.color} value={item.percent} />
                      </div>
                    </div>
                  ))}

                </CCol>

                <CCol xs={12} md={6} xl={6}>

                  {progressUsers.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color={item.color} value={item.percent} />
                      </div>
                    </div>
                  ))}

                </CCol>
              </CRow>

              <br />
              <h5 id="traffic" className="card-title mb-2">
                Recent Payment Request
              </h5>
              {wr.length > 0 ?
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell className="text-center">
                        <CIcon icon={cilPeople} />
                      </CTableHeaderCell>
                      <CTableHeaderCell>Vendors</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                      <CTableHeaderCell>Usage</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell>
                      <CTableHeaderCell>Activity</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {wr.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center">
                          <CAvatar size="md" src={'item.avatar.src'} status={'item.avatar.status'} />
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{'Test Business'}</div>
                          <div className="small text-medium-emphasis">
                            <span>{'0545454854'}</span>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <ReactCountryFlag
                            svg
                            countryCode='GH'
                            style={{
                              fontSize: '1em',
                              lineHeight: '1em',
                            }}
                            aria-label="Ghana" />
                        </CTableDataCell>
                        <CTableDataCell>
                          <strong>{`${item.currency} ${item.amount}`}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {
                            item.request_state.status === 'new' ?
                              <CBadge color="warning" shape="rounded-pill">
                                {item.request_state.status}
                              </CBadge> :
                              item.request_state.status === 'paid' ?
                                <CBadge color="success" shape="rounded-pill">
                                  {item.request_state.status}
                                </CBadge> :
                                <CBadge color="danger" shape="rounded-pill">
                                  {item.request_state.status}
                                </CBadge>
                          }
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="small text-medium-emphasis">
                            <strong>{moment.unix(item.createdAt).fromNow()}</strong>
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
                : <p className='text-center text-muted mt-5 mb-5' >No Payent Request Made</p>}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
