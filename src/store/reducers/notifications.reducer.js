import React from 'react'

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
  topNavTitile: 'Title'
}

const notificationsReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

export default notificationsReducer