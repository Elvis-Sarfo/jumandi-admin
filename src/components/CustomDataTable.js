import React, { lazy, useState } from 'react'
import DataTable from "react-data-table-component";

const CustomDataTable = (props) => {
    //  Internally, customStyles will deep merges your customStyles with the default styling.
    const customStyles = {
        rows: {
            style: {
                fontSize: '15px',// override the row height
            },
        },
        headCells: {
            style: {
                fontSize: '17px',
                color: '#f9b115',
                backgroundColor: '#0e1726f2',
            },
        },
        header: {
            style: {
                fontSize: '22px',
                color: '#f9b115',
                backgroundColor: '#000015',
            },
        },
    };

    return (
        <DataTable
            pagination
            striped={true}
            highlightOnHover={true}
            noDataComponent={''}
            customStyles={customStyles}
            {...props}
        />

    );
}

export default CustomDataTable