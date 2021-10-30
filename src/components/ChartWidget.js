import React from 'react'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'
import { cilArrowTop, cilOptions, cilMenu, cilArrowBottom } from '@coreui/icons'
import { getStyle } from '@coreui/utils'
import {
    CWidgetStatsA,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'

const ChartWidget = ({ color, value, title }) => {
    return (
        <CWidgetStatsA
            className="mb-4"
            color= {color}
            value= {value}
            title={title}
            action={
                <CDropdown alignment="end">
                    <CDropdownToggle color="transparent" caret={false} className="p-0">
                        <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                    </CDropdownToggle>
                    <CDropdownMenu>
                        <CDropdownItem>Action</CDropdownItem>
                        <CDropdownItem>Another action</CDropdownItem>
                        <CDropdownItem>Something else here...</CDropdownItem>
                        <CDropdownItem disabled>Disabled action</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            }
            // chart={
            //     <CChartLine
            //         className="mt-3 mx-3"
            //         style={{ height: '70px' }}
            //         data={{
            //             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            //             datasets: [
            //                 {
            //                     label: 'My First dataset',
            //                     backgroundColor: 'white',
            //                     borderColor: 'rgba(255,255,255,.55)',
            //                     pointBackgroundColor: getStyle('--cui-primary'),
            //                     data: [65, 59, 84, 84, 51, 55, 40],
            //                 },
            //             ],
            //         }}
            //         options={{
            //             plugins: {
            //                 legend: {
            //                     display: true,
            //                 },
            //             },
            //             maintainAspectRatio: true,
            //             scales: {
            //                 x: {
            //                     grid: {
            //                         display: false,
            //                         drawBorder: false,
            //                     },
            //                     ticks: {
            //                         display: false,
            //                     },
            //                 },
            //                 y: {
            //                     min: 30,
            //                     max: 89,
            //                     display: false,
            //                     grid: {
            //                         display: false,
            //                     },
            //                     ticks: {
            //                         display: false,
            //                     },
            //                 },
            //             },
            //             elements: {
            //                 line: {
            //                     borderWidth: 1,
            //                     tension: 0.4,
            //                 },
            //                 point: {
            //                     radius: 4,
            //                     hitRadius: 10,
            //                     hoverRadius: 4,
            //                 },
            //             },
            //         }}
            //     />
            // }
        />
    )
}

ChartWidget.defaultProps = {
    color: 'primary',
    value: (
        <>
            0.00{' '}
            {/* <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom} />)
            </span> */}
        </>
    ),
    title: 'Title'
}

ChartWidget.propTypes = {
    color: PropTypes.string,
}

export default ChartWidget
