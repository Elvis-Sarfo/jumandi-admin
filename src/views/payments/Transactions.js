import React, { useState } from 'react'
import data from "./test";
import { useHistory } from 'react-router-dom';
import CustomDataTable from "../../components/CustomDataTable";
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { cilBell, cilEnvelopeOpen, cilList, cilMenu, cibEx } from '@coreui/icons'
import {
  CTabs,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CWidgetStatsB,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane
} from '@coreui/react'
const Transactions = () => {
  const history = useHistory();
  // const payments = useSelector((state) => getStructuredData(state.payments.data));
  const payments = useSelector((state) => state.payments.data);
  const dataSummary = useSelector((state) => state.withdrawalRequests.summary);

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
      {
        payments.length > 0 && <>
          <CRow>
            <CCol sm={6}>
              <div className="border-start border-start-4 border-start-info py-1 px-3">
                <div className="text-medium-emphasis small">New Clients</div>
                <div className="fs-5 fw-semibold">9,123</div>
              </div>
            </CCol>
            <CCol sm={6}>
              <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                <div className="text-medium-emphasis small">Recurring Clients</div>
                <div className="fs-5 fw-semibold">22,643</div>
              </div>
            </CCol>
          </CRow>
          <hr className="mt-0" />
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
      }

      { payments.length === 0 && <> <p className='text-center text-muted mt-5 mb-5' >No Payents Made</p></>}

    </>


  )
}

export default Transactions
