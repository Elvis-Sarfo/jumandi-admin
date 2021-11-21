import React from 'react'

const initialState = {}

const ordersReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'CREATE_FARM':
      return { ...state, ...rest }
    default:
      return state
  }
}

export default ordersReducer