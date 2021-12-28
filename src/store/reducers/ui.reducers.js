import React from 'react'

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
  topNavTitile: 'Admin Console'
}

const uiReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'UPDATE_UI':
      return { ...state, ...rest }
    default:
      return state
  }
}

export default uiReducer