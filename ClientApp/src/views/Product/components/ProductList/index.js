import DataTable from "react-data-table-component";
import { useContext, useEffect } from 'react';
import ProductContext from "../../../../context/Product";

const ProducList = () => {

    const {columns, productsList, pending,  paginationComponentOptions, customStyles } = useContext(ProductContext)


    return (
        <DataTable
        columns={columns}
        data={productsList}
        progressPending={pending}
        paginationComponentOptions={paginationComponentOptions}
        customStyles={ customStyles}
        />
    );

}

export default ProducList;