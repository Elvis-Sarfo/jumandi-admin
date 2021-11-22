import React from 'react'
import data from "./test";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomDataTable from "./../../components/CustomDataTable";
import { Icon, Switch } from '@mui/material';
import { DeleteForever, Visibility, Edit } from '@mui/icons-material';
import { updateUserStatus } from '../../store/actions/users.action';


import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCol,
    CRow,
    CWidgetStatsB,
} from '@coreui/react'

const Users = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    // Create the states of the component

    const users = useSelector((state) => getStructuredData(state.users.data));
    const dataSummary = useSelector((state) => state.users.summary);

    const totalUsers = dataSummary?.totalUsers;
    const disabledUsers = dataSummary?.disabledUsers;
    const enabledUsers = dataSummary?.enabledUsers;

    // Structure the data that is coming from firebase
    function getStructuredData(rawData) {
        return rawData.map((user) => {
            return {
                id: user.id,
                name: (<>
                    <CAvatar size="md" src={user.userImage} />
                    <span style={{ marginLeft: 7 }}>{user.userName}</span>
                </>
                ),
                email: user.userEmail,
                phone: user.userPhone,
                status: (
                    <Switch
                        onChange= {(e) => {
                            e.preventDefault();
                            dispatch(updateUserStatus(!user.enabled, user.id));
                        }}
                        checked={user.enabled}
                        color="success"
                    />
                ),
                actions: (
                    <>
                        <CButtonGroup>
                            <CButton onClick={() => history.push(`/supervisors/${user.id}`)} color="primary"><Visibility /></CButton>
                            {/* <CButton color="warning"><Edit/></CButton> */}
                            <CButton color="danger"><DeleteForever /></CButton>
                        </CButtonGroup>
                    </>
                )
            };
        });
    }

    const columns = [
        {
            name: "Name",
            grow: 1,
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "Email",
            grow: 1,
            selector: (row) => row.email,
            sortable: true,
            // center: true,
        },
        {
            name: "Phone",
            grow: 1,
            selector: (row) => row.phone,
            sortable: true,
            // center: true,
        },
        {
            name: "Status",
            grow: 1,
            selector: (row) => row.status,
            sortable: true,
            // center: true,
        },
        {
            name: 'Actions',
            ignoreRowClick: true,
            selector: (row) => row.actions,
            allowOverflow: true,
            grow: 1,
            center: true,
        },
    ];

    return (
        <>
            <CRow>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'warning', value:parseFloat(disabledUsers?.percentage)}}
                        text={`${disabledUsers?.percentage}% vendors Pending`}
                        title="New Requests"
                        value={<b>{disabledUsers?.value}</b>}
                    />
                </CCol>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'success', value: parseFloat(enabledUsers?.percentage)}}
                        text={`${enabledUsers?.percentage}% vendors Approved`}
                        title="Approved Users"
                        value={<b>{enabledUsers?.value}</b>}
                    />
                </CCol>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'info', value: 100 }}
                        text="Note: Excluding rejected"
                        title="Total Users"
                        value={<b>{totalUsers}</b>}
                    />
                </CCol>
            </CRow>
            <CustomDataTable
                title="All Users"
                actions={[
                    <CButton
                        size="sm"
                        shape="rounded-0"
                        onClick={() => history.push('/national-admins/create')}
                        color="warning"
                    >
                        Export
                    </CButton>
                ]
                }
                columns={columns}
                data={users}
                onChangePage={(page, totalRows) => {
                    console.log(page, totalRows);
                }}
                onChangeRowsPerPage={(currentRowsPerPage) => {
                    console.log('onChangeRowsPerPage running');
                    console.log(currentRowsPerPage);
                }}
            />
        </>
    )
}

export default Users
