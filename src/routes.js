import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Setting = React.lazy(() => import('./views/settings/Setting'))
const Chat = React.lazy(() => import('./views/chat/Chat'))
const GlobalPrice = React.lazy(() => import('./views/settings/GlobalPrice'))
const Payments = React.lazy(() => import('./views/payments/Payments'))
const Orders = React.lazy(() => import('./views/orders/Orders'))
const NationalAdmins = React.lazy(() => import('./views/national_admins/NationalAdmins'))
const CreateNationalAdmin = React.lazy(() => import('./views/national_admins/CreateAdmin'))
const Vendors = React.lazy(() => import('./views/vendors/Vendors'))
const CreateVendor = React.lazy(() => import('./views/vendors/CreateVendor'))
const Users = React.lazy(() => import('./views/users/Users'))
const CreateUsers = React.lazy(() => import('./views/users/CreateUser'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/chat', name: 'Live Chat', component: Chat },
  { path: '/payments', name: 'Payments', component: Payments },
  { path: '/orders', name: 'Orders', component: Orders },
  { path: '/settings', name: 'Settings',  component: Setting, exact: true  },
  { path: '/settings/price', name: 'Global Price', component: GlobalPrice },
  { path: '/national-admins', name: 'National Admins', component: NationalAdmins, exact: true},
  { path: '/national-admins/create', name: 'Create National Admins', component: CreateNationalAdmin },
  { path: '/vendors', name: 'Vendors', component: Vendors, exact: true },
  { path: '/vendors/create', name: 'Create Vendors', component: CreateVendor, exact: true },
  { path: '/users', name: 'Users', component: Users, exact: true },
  { path: '/users/create', name: 'Users', component: CreateUsers },
]

export default routes
