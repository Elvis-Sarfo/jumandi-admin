import React, { useRef, useEffect } from 'react'
import { CToaster } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './scss/style.scss'
import { getVendors } from './store/actions/vendors.action'
import { getUsers } from './store/actions/users.action'
import { getNationalAdmins } from './store/actions/nationalAdmins.action'
import { getPrices } from './store/actions/prices.action'


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const toaster = useRef();
  // Create the states of the component
  const dispatch = useDispatch();
  // const state = useSelector((state) => state.vendors);
  const toast = useSelector((state) => state.ui.toast);

  useEffect(() => {
    dispatch(getVendors());
    dispatch(getUsers());
    dispatch(getNationalAdmins());
    dispatch(getPrices());
    return 0;
  }, []);

  
  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
