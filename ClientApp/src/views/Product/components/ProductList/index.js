import DataTable from "react-data-table-component";
import { useContext, useEffect, useState, useMemo } from 'react';
import ProductContext from "../../../../context/Product";
import { useLocation } from "react-router-dom";

const ProducList = () => {

    const {columnsProduct, columnsStock, productsList, stockList, pending,  paginationComponentOptions, customStyles } = useContext(ProductContext)
    // const [selectedList, setSelectedList] = useState(null);
    // const [columns, setColumns] = useState(null);

    let location = useLocation();

    const [state, setState] = useState({ selectedList: null, columns: null });

    useEffect(()=>{
            switch (location.pathname){
            case "/producto" : setState({ selectedList : productsList, columns : columnsProduct }); 
            break;
            case "/cargaStock" : setState({ selectedList: stockList, columns: columnsStock });
            break;
            default: setState({ selectedList: null, columns: null });
            break;
            }       
    }, [location.pathname, productsList, stockList, columnsProduct, columnsStock]);


    const memoizedTable = useMemo(() => {
        if (state.selectedList) {
          return (
            <DataTable
              columns={state.columns}
              data={state.selectedList}
              progressPending={pending}
              paginationComponentOptions={paginationComponentOptions}
              customStyles={customStyles}
            />
          );
        }
      }, [state.selectedList, state.columns, pending, paginationComponentOptions, customStyles]);
    
    return memoizedTable;
}

export default ProducList;