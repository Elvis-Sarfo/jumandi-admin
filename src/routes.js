import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Setting = React.lazy(() => import('./views/settings/Setting'))

const Chat = React.lazy(() => import('./views/chat/Chat'))

const GlobalPrice = React.lazy(() => import('./views/settings/GlobalPrice'))

const Payments = React.lazy(() => import('./views/payments/Payments'))

const Orders = React.lazy(() => import('./views/orders/Orders'))

const Sales = React.lazy(() => import('./views/sales/Sales'))

const NationalAdmins = React.lazy(() => import('./views/national_admins/NationalAdmins'))
const CreateNationalAdmin = React.lazy(() => import('./views/national_admins/CreateAdmin'))

const Vendors = React.lazy(() => import('./views/vendors/Vendors'))
const CreateVendor = React.lazy(() => import('./views/vendors/CreateVendor'))
const VendorDetails = React.lazy(() => import('./views/vendors/VendorDetails'))

const Users = React.lazy(() => import('./views/users/Users'))
const CreateUsers = React.lazy(() => import('./views/users/CreateUser'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/chat', name: 'Live Chat', component: Chat, exact: true  },

  { path: '/payments', name: 'Payments', component: Payments, exact: true },
  { path: '/payments/:id', name: 'Payments', component: Payments, exact: true  },


  { path: '/orders', name: 'Orders', component: Orders, exact: true  },
  { path: '/orders/:id', name: 'Order Details', component: Orders, exact: true },


  { path: '/sales', name: 'Sales', component: Sales, exact: true  },
  { path: '/sales/:id', name: 'Sale Details', component: Sales, exact: true },


  { path: '/settings/all', name: 'Settings', component: Setting, exact: true },
  { path: '/settings/price', name: 'Global Price', component: GlobalPrice, exact: true  },

  { path: '/national-admins', name: 'National Admins', component: NationalAdmins, exact: true },
  { path: '/national-admins/all', name: 'National Admins', component: NationalAdmins, exact: true },
  { path: '/national-admins/create', name: 'Create National Admins', component: CreateNationalAdmin, exact: true },
  { path: '/national-admins/:id', name: 'National Admins Details', component: CreateNationalAdmin, exact: true },

  { path: '/vendors', name: 'Vendors', component: Vendors, exact: true },
  { path: '/vendors/all', name: 'Vendors', component: Vendors, exact: true },
  { path: '/vendors/create', name: 'Create Vendors', component: CreateVendor, exact: true },
  { path: '/vendors/:id', name: 'Vendors Details', component: VendorDetails, exact: true },

  { path: '/users', name: 'Users', component: Users, exact: true },
  { path: '/users/all', name: 'Users', component: Users, exact: true },
  { path: '/users/create', name: 'Users', component: CreateUsers, exact: true  },
  { path: '/users/:id', name: 'User Details', component: CreateUsers, exact: true },

]

export default routes
