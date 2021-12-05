import React from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CWidgetStatsA,
  CRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CTableRow,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

import {
  cilArrowTop,
  cilOptions,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import { useSelector } from 'react-redux'


function DashboardWidChart({data = [78, 81, 80, 45, 34, 12, 40]}) {
  return (<CChartLine className="mt-3" style={{
    height: '70px'
  }} data={{
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: data,
      fill: true
    }]
  }} options={{
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    elements: {
      line: {
        borderWidth: 2,
        tension: 0.4
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  }} />);
}


const Widgets = () => {
    // Orders Data Summary
    const completedOrders = useSelector((state) => state.orders.summary.completedOrders);
  
    // Vendors Data Summary
    const totalVendors = useSelector((state) => state.vendors.summary.totalVendors);
  
    // Users Data Summary
    const totalUsers = useSelector((state) => state.users.summary.totalUsers);
      
    // Users Data Summary
    const totalNationalAdmins = useSelector((state) => state.nationalAdmins.summary.totalNationalAdmins);

  return (
    <CRow>
      <CCol md={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="success"
          value={
            <>
            {completedOrders.value}
          </>
          }
          title="Completed Orders"
          chart={
            <DashboardWidChart/>
          }
        />
      </CCol>
      <CCol md={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            <>
            {totalNationalAdmins}
          </>
          }
          title="National Admins"
          chart={
            <DashboardWidChart data={[60, 71, 50, 35, 34, 82, 60]}/>
          }
        />
      </CCol>
      <CCol md={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
            {totalVendors}
          </>
          }
          title="Vendors"
          chart={
            <DashboardWidChart data={[40, 34, 80, 27, 81, 12, 40]}/>
          }
        />
      </CCol>
      <CCol md={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={
            <>
            {totalUsers}
          </>
          }
          title="Users"
          chart={
            <DashboardWidChart data={[60, 81, 12, 45, 34, 80, 40]}/>
          }
        />
      </CCol>
    </CRow>
  )
}

export default Widgets
