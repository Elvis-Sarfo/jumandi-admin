import { createStore } from 'redux'
import React from 'react'
const initialState = {
  sidebarShow: true,
  topNavTitile: '',
  toast:(<></>)
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
