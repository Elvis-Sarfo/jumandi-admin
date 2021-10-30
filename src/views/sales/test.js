import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  CAvatar,
  CBadge,
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
  CTableFoot,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

import {
  cibCcAmex,
  cibCcApplePay,
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
  cifTg,
  cifGh,
  cifNg,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from './../../assets/images/avatars/1.jpg'
import avatar2 from './../../assets/images/avatars/2.jpg'
import avatar3 from './../../assets/images/avatars/3.jpg'
import avatar4 from './../../assets/images/avatars/4.jpg'
import avatar5 from './../../assets/images/avatars/5.jpg'
import avatar6 from './../../assets/images/avatars/6.jpg'

export default [
    {
      id: 1,
      vendor: (<>
        <CAvatar size="md" src={avatar1} status={'success'} />
        <span style={{marginLeft:7}}>Jumandi Gas</span>
      </>
      ),
      country: (<CIcon size="xl" icon={cifNg} title={'Nigeria'} />),
      numOfOrders: 54,
      netTotal: (
        <span style={{color:"#0d6efd"}}>
          <>$ {10012.00}</>
        </span>
      ),
      grandTotal: (
        <span style={{color:"#dc3545"}} >
          $ {12000.50}
        </span>
      ),
    },
    {
      id: 2,
      vendor: (<>
        <CAvatar size="md" src={avatar1} status={'success'} />
        <span style={{marginLeft:7}}>Kanta Gas</span>
      </>
      ),
      country: (<CIcon size="xl" icon={cifGh} title={'Ghana'} />),
      numOfOrders: 54,
      netTotal: (
        <span style={{color:"#0d6efd"}}>
          <>$ {10012.00}</>
        </span>
      ),
      grandTotal: (
        <span style={{color:"#dc3545"}} >
          $ {12000.50}
        </span>
      ),
    },
    {
      id: 3,
      vendor: (<>
        <CAvatar size="md" src={avatar1} status={'success'} />
        <span style={{marginLeft:7}}>Shell</span>
      </>
      ),
      country: (<CIcon size="xl" icon={cifNg} title={'Nigeria'} />),
      numOfOrders: 54,
      netTotal: (
        <span style={{color:"#0d6efd"}}>
          <>$ {10012.00}</>
        </span>
      ),
      grandTotal: (
        <span style={{color:"#dc3545"}} >
          $ {12000.50}
        </span>
      ),
    },
    {
      id: 4,
      vendor: (<>
        <CAvatar size="md" src={avatar1} status={'success'} />
        <span style={{marginLeft:7}}>Pacific Oil</span>
      </>
      ),
      country: (<CIcon size="xl" icon={cifNg} title={'Nigeria'} />),
      numOfOrders: 54,
      netTotal: (
        <span style={{color:"#0d6efd"}}>
          <>$ {10012.00}</>
        </span>
      ),
      grandTotal: (
        <span style={{color:"#dc3545"}} >
          $ {12000.50}
        </span>
      ),
    },
    {
      id: 5,
      vendor: (<>
        <CAvatar size="md" src={avatar1} status={'success'} />
        <span style={{marginLeft:7}}>KB Gas</span>
      </>
      ),
      country: (<CIcon size="xl" icon={cifGh} title={'Ghana'} />),
      numOfOrders: 54,
      netTotal: (
        <span style={{color:"#0d6efd"}}>
          <>$ {10012.00}</>
        </span>
      ),
      grandTotal: (
        <span style={{color:"#dc3545"}} >
          $ {12000.50}
        </span>
      ),
    },
  ];
