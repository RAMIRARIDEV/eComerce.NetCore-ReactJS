import { useState, useContext } from "react"
import ProductContext from "../Product"
import Swal from 'sweetalert2'
import { UserContext } from '../UserProvider';

const ProductProvider = ({children}) => {


    
    return (
        <ProductContext.Provider>
            {children}
        </ProductContext.Provider>
    );
}

export default ProductProvider;