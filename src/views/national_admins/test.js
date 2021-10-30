import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  CAvatar,
} from '@coreui/react'
import Switch from '@mui/material/Switch';

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
    name: (<>
      <CAvatar size="md" src={avatar1} status={'success'} />
      <span style={{ marginLeft: 7 }}>Kanta Elvis</span>
    </>
    ),
    location: (<div  className="p-1">
      <CIcon size="xl" icon={cifNg} title={'Nigeria'} />
      <div>Nigeria</div>
    </div>),
    status: 'Approved',
    enable: (<Switch defaultChecked color="success" />)
  },
  {
    id: 2,
    name: (<>
      <CAvatar size="md" src={avatar2} status={'success'} />
      <span style={{ marginLeft: 7 }}>Fuse Koda</span>
    </>
    ),
    location: (<div  className="p-1">
      <CIcon size="xl" icon={cifNg} title={'Nigeria'} />
      <div>Nigeria</div>
    </div>),
    status: 'Pending',
    enable: (<Switch  color="success" />)
  },
  {
    id: 3,
    name: (<>
      <CAvatar size="md" src={avatar3} status={'success'} />
      <span style={{ marginLeft: 7 }}>Jude Boss</span>
    </>
    ),
    location: (<div  className="p-1">
      <CIcon size="xl" icon={cifGh} title={'Ghana'} />
      <div>Ghana</div>
    </div>),
    status: 'Approved',
    enable: (<Switch defaultChecked color="success" />)
  },
  {
    id: 4,
    name: (<>
      <CAvatar size="md" src={avatar4} status={'success'} />
      <span style={{ marginLeft: 7 }}>John Doe</span>
    </>
    ),
    location: (<div  className="p-1">
      <CIcon size="xl" icon={cifTg} title={'Togo'} />
      <div>Togo</div>
    </div>),
    status: 'Approved',
    enable: (<Switch defaultChecked color="success" />)
  },
  {
    id: 5,
    name: (<>
      <CAvatar size="md" src={avatar5} status={'success'} />
      <span style={{ marginLeft: 7 }}>Jane Doe</span>
    </>
    ),
    location: (<div  className="p-1">
      <CIcon size="xl" icon={cifNg} title={'Nigeria'} />
      <div>Nigeria</div>
    </div>),
    status: 'Pending',
    enable: (<Switch  color="success" />)
  },
];