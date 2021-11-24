import React, { useState } from 'react'
import data from "./test";
import { useHistory } from 'react-router-dom';
import CustomDataTable from "./../../components/CustomDataTable";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { DeleteForever, Visibility, Edit } from '@mui/icons-material';
import ReactCountryFlag from "react-country-flag"
import { cilBell, cilEnvelopeOpen, cilList, cilMenu, cibEx } from '@coreui/icons'
import {
  CButton,
  CCol,
  CRow,
  CBadge,
  CButtonGroup,
  CAvatar
} from '@coreui/react'
function WithdrawalRequests() {
  const history = useHistory();
  const dispatch = useDispatch();

  const withdrawalRequests = useSelector((state) => getStructuredData(state.withdrawalRequests.data));
  const dataSummary = useSelector((state) => state.withdrawalRequests.summary);

  const newWithdrawalRequests = dataSummary?.newWithdrawalRequests;
  const paidWithdrawalRequests = dataSummary?.paidWithdrawalRequests;
  const cancelledWithdrawalRequests = dataSummary?.cancelledWithdrawalRequests;
  const totalWithdrawalRequests = dataSummary?.totalWithdrawalRequests;

  // Structure the data that is coming from firebase
  function getStructuredData(data) {
    return data.map((withdrawalRequest) => {
      return {
        id: withdrawalRequest.id,
        vendorId: withdrawalRequest.businessId,
        vendor: (<div className="p-1">
          <CAvatar size="md" src={'vendor.pictureURL'} />
          <span style={{ marginLeft: 7 }}>{'Test business'}</span>
          <div className="pt-1 pb-1">
            {'+23354587845'}
          </div>
            <div className="small text-medium-emphasis">
              <ReactCountryFlag
                className="emojiFlag"
                countryCode={'GH'}
                style={{
                  fontSize: '1em',
                  lineHeight: '1em',
                }}
                aria-label="Ghana" />{' '}
              <span>{'Ghana'}</span>
            </div>
        </div>),
        amount: `${withdrawalRequest.currency} ${withdrawalRequest.amount}`,
        bankInfo: (<div className="p-1">
          <div className="pt-1 pb-1 small text-medium-emphasis">
            {withdrawalRequest.bankInfo?.bank} <br />
            {withdrawalRequest.bankInfo?.account_number} <br />
          </div>
        </div>),
        time: moment.unix(withdrawalRequest.createdAt).format("Do MMM YYYY @ h:m a"),
        status: withdrawalRequest.request_state.status === 'new' ?
          <CBadge color="warning" shape="rounded-pill">
            {withdrawalRequest.request_state.status}
          </CBadge> :
          withdrawalRequest.request_state.status === 'paid' ?
            <CBadge color="success" shape="rounded-pill">
              {withdrawalRequest.request_state.status}
            </CBadge> :
            <CBadge color="danger" shape="rounded-pill">
              {withdrawalRequest.request_state.status}
            </CBadge>,
        actions: (
          <>
            <CButtonGroup>
              <CButton color="danger"><DeleteForever /></CButton>
            </CButtonGroup>
          </>
        )
      };
    });
  }


  const columns = [
    {
      name: "Directior",
      selector: (row) => row.vendor,
      sortable: true
    },
    {
      name: "Runtime",
      selector: (row) => row.bankInfo,
      sortable: true,
      right: true
    },
    {
      name: "Runtime",
      selector: (row) => row.amount,
      sortable: true,
      right: true
    },
    {
      name: "Runtime",
      selector: (row) => row.status,
      sortable: true,
      right: true
    },
    {
      name: "Runtime",
      selector: (row) => row.time,
      sortable: true,
      right: true
    },
    {
      name: "Action",
      selector: (row) => row.actions,
      sortable: true,
      right: true
    },
  ];
  return (
    <>
      <CRow>
        <CCol sm={6}>
          <div className="border-start border-start-4 border-start-info py-1 px-3">
            <div className="text-medium-emphasis small">New Kana</div>
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
        data={withdrawalRequests}
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

export default WithdrawalRequests
