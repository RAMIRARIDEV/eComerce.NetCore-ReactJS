import { useState, useEffect } from "react"
import StockContext from "../Stock"
import Swal from 'sweetalert2'


const StockProvider = ({children}) => {
    const modelProduct = {
        idProducto :0,
        codigo :"",
        marca :"",
        descripcion :"",
        idCategoria :0,
        stock :0,
        precio: 0,
        esActivo: true
    }
    const [product, setProduct] = useState(modelProduct);
    const [pending, setPending] = useState(true);
    const [productsList, setProductsList] = useState([]);
    const [viewModal, setViewModal] = useState(false);
    const [a_Search, setA_Search] = useState("")

    const sugestionSelectedProduct = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {

        Swal.fire({
            title: suggestion.marca + " - " + suggestion.descripcion,
            text: "Ingrese la cantidad",
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Volver',
            showLoaderOnConfirm: true,
            preConfirm: (inputValue) => {


                if (isNaN(parseFloat(inputValue))) {
                    Swal.showValidationMessage(
                        "Debe ingresar un valor númerico"
                    )
                } else {

                    let item = {
                        idProducto: suggestion.idProducto,
                        descripcion: suggestion.marca + " " + suggestion.descripcion,
                        cantidad: parseInt(inputValue),
                        precio: suggestion.precioCompra,
                        total: suggestion.precioCompra * parseFloat(inputValue)
                    }
                    let arrayProductos = []
                    arrayProductos.push(...productsList)
                    arrayProductos.push(item)
                    setProductsList((last) => [...last, item])
                }


            },
            allowOutsideClick: () => !Swal.isLoading()

        }).then((result) => {
            if (result.isConfirmed) {
                setA_Search("")
            } else {
                setA_Search("")
            }
        })
    }


    return(
        <StockContext.Provider value={{
            sugestionSelectedProduct
        }}>
            {children}
        </StockContext.Provider>
        

    );
}

export default StockProvider;