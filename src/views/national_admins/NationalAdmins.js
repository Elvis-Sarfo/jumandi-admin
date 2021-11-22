import React from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomDataTable from "./../../components/CustomDataTable";
import { Icon, Switch } from '@mui/material';
import { DeleteForever, Visibility, Edit } from '@mui/icons-material';
import ReactCountryFlag from "react-country-flag";
import { updateNationalAdminStatus } from '../../store/actions/nationalAdmins.action';

import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCol,
    CRow,
    CWidgetStatsB,
} from '@coreui/react'

const NationalAdmins = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const nationalAdmins = useSelector((state) => getStructuredData(state.nationalAdmins.data));
    const dataSummary = useSelector((state) => state.nationalAdmins.summary);

    const totalNationalAdmins = dataSummary?.totalNationalAdmins;
    const disabledNationalAdmins = dataSummary?.disabledNationalAdmins;
    const enabledNationalAdmins = dataSummary?.enabledNationalAdmins;


    // Structure the data that is coming from firebase
    function getStructuredData(rawData) {
        return rawData.map((nationalAdmin) => {
            return {
                id: nationalAdmin.id,
                name: (<>
                    {nationalAdmin.pictureURL && <CAvatar size="md" src={nationalAdmin.pictureURL} />}
                    <span style={{ marginLeft: 7 }}>{`
                        ${nationalAdmin.firstname}
                         ${nationalAdmin.othername}
                         ${nationalAdmin.lastname}
                    `}</span>
                </>
                ),
                contact: (<div className="p-1">
                    <div className="small text-medium-emphasis">
                        <span>{nationalAdmin.email}</span><br />
                        <span>{nationalAdmin.phoneNumber}</span>
                    </div>
                </div>),
                country: (<div className="p-1">
                    {nationalAdmin.countryCode && <ReactCountryFlag
                        className="emojiFlag"
                        countryCode={nationalAdmin.countryCode}
                        style={{
                            fontSize: '1em',
                            lineHeight: '1em',
                        }}
                        aria-label="United States" />}{' '}
                    {nationalAdmin.country}
                </div>),
                status: (
                    <Switch
                        onChange={(e) => {
                            e.preventDefault();
                            dispatch(updateNationalAdminStatus(!nationalAdmin.enabled, nationalAdmin.id));
                        }}
                        checked={nationalAdmin.enabled}
                        color="success"
                    />
                ),
                actions: (
                    <>
                        <CButtonGroup>
                            <CButton onClick={() => history.push(`/supervisors/${nationalAdmin.id}`)} color="primary"><Visibility /></CButton>
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
            name: "ID",
            grow: 1,
            selector: (row) => row.id,
            sortable: true
        },
        {
            name: "Name",
            grow: 2,
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "Country",
            grow: 1,
            selector: (row) => row.country,
            sortable: true
        },
        {
            name: "Contact",
            grow: 1,
            selector: (row) => row.contact,
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
                <CCol>
                    <CButton onClick={() => history.push('/national-admins/create')} color="warning">Add New Admin</CButton>
                </CCol>
            </CRow>
            <br />
            <CRow>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'warning', value: parseFloat(disabledNationalAdmins?.percentage) }}
                        text={`${disabledNationalAdmins?.percentage}% Admins Disabled`}
                        title="Disabled Admins"
                        value={<b>{disabledNationalAdmins?.value}</b>}
                    />
                </CCol>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'success', value: parseFloat(enabledNationalAdmins?.percentage) }}
                        text={`${enabledNationalAdmins?.percentage}% Admins Enabled`}
                        title="Enabled Admins"
                        value={<b>{enabledNationalAdmins?.value}</b>}
                    />
                </CCol>
                <CCol xs={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ color: 'info', value: 100 }}
                        text="All registered Admins"
                        title="Total Admins"
                        value={<b>{totalNationalAdmins}</b>}
                    />
                </CCol>
            </CRow>
            <CustomDataTable
                title="List of Admins"
                actions={
                    <CButton
                        size="sm"
                        shape="rounded-0"
                        onClick={() => history.push('/vendors/create')}
                        color="warning"
                    >
                        Export
                    </CButton>
                }
                columns={columns}
                data={nationalAdmins}
                onChangePage={(page, totalRows) => {
                    console.log(page, totalRows);
                }}
                onChangeRowsPerPage={(currentRowsPerPage) => {
                    console.log('onChangeRowsPerPage running');
                    console.log(currentRowsPerPage);
                }}
            />
        </>
    );
}

export default NationalAdmins
