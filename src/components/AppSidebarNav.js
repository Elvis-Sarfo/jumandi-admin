import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'

export const AppSidebarNav = ({ items }) => {
  const dispatch = useDispatch()
  const topNavTitile = useSelector((state) => state.ui.topNavTitile)
  const newWithdrawalRequests = useSelector((state) => state.withdrawalRequests.summary.newWithdrawalRequests.value);
  const pendingVendors = useSelector((state) => state.vendors.summary.pendingVendors.value);
  const location = useLocation()

  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component;
    // set the visibility of the badges
    let _badge;
    if (name === 'Payments' && newWithdrawalRequests) {
      _badge = badge;
    }
    if (name === 'Vendors' && pendingVendors) {
      _badge = badge;
    }
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
          component: NavLink,
          activeClassName: 'active',
        })}
        onClick={(e) => {
          dispatch({ type: 'set', topNavTitile: name });
        }}
        key={index}
        {...rest}
      >
        {navLink(name, icon, _badge)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
