import React from 'react'
import PropTypes from 'prop-types'
import {
  CToastHeader,
  CToastBody,
  CToast,
} from '@coreui/react'

const Toast = ({autohide = true, visible = true, message, title}) => {
  return (
    <div>
      <CToast title="CoreUI for React.js" color="light" autohide={autohide} visible={visible}>
        <CToastHeader closeButton>
          <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill="#f9b115"></rect>
          </svg>
          <strong className="me-auto">{title}</strong>
          {/* <small>7 min ago</small> */}
        </CToastHeader>
        <CToastBody>{message}</CToastBody>
      </CToast>
    </div>
  )
}


Toast.defaultProps = {
  color: 'steelblue',
  autohide: true,
  visible: true,
  title: ''
}

Toast.propTypes = {
  autohide: PropTypes.bool,
  visible: PropTypes.bool,
  message: PropTypes.string.isRequired,
  title: PropTypes.string
}

export default Toast
