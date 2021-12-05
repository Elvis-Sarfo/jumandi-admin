import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilBabyCarriage,
  cilSettings,
  cilMoney,
  cilContact,
  cilChartLine,
  cilChatBubble,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Live Chats',
  //   to: '/chat',
  //   icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  {
    component: CNavItem,
    name: 'Sales',
    to: '/sales',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Payments',
    to: '/payments',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    badge: {
      color: 'danger',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Orders',
    to: '/orders',
    icon: <CIcon icon={cilBabyCarriage} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Settings',
    to: '/setting',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'General Settings',
        to: '/settings/all',
      },
      {
        component: CNavItem,
        name: 'Global Price',
        to: '/settings/price',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'National Admins',
    to: '/national-admins',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'National Admins',
        to: '/national-admins/all',
      },
      {
        component: CNavItem,
        name: 'Create Admin',
        to: '/national-admins/create',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Vendors',
    to: '/vendors',
    icon: <CIcon icon={cilBabyCarriage} customClassName="nav-icon" />,
    badge: {
      color: 'success',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilBabyCarriage} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavGroup,
  //   name: 'Vendors',
  //   to: '/vendors',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'List Vendors',
  //       to: '/vendors/all',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Add Vendor',
  //       to: '/vendors/create',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Users',
  //   to: '/users',
  //   icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'List Users',
  //       to: '/users/all',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Create User',
  //       to: '/users/create',
  //     },
  //   ],
  // },
]

export default _nav
