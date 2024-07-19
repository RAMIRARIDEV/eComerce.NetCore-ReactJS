import { useState, useContext, useEffect } from "react"
import SaleContext from "../Sale"
import Swal from 'sweetalert2'
import { UserContext } from '../UserProvider';

const SaleProvider = ({children}) => {
    const { user } = useContext(UserContext)

    const [sale, setSale] = useState([])
    const [a_Busqueda, setA_Busqueda] = useState("")
    const [a_ProductsSale, setA_ProductsSale] = useState([])
    const [codigoBarra, setCodigoBarra] = useState(null)
    const [documentType,setDocumentType] = useState("Boleta")
    // const [clientDocument,setClientDocument] = useState("")
    // const [clientName,setClientName] = useState("")

    const [total, setTotal] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [igv, setIgv] = useState(0)

        //evento cuando cambie el valor del texto de busqueda
    const onChange = (e, { newValue }) => {
        setA_Busqueda(newValue)
    }
    const inputPropsSale = {
        placeholder: "Buscar producto",
        value: a_Busqueda,
        onChange
    }
    
    const getDocumentType =() => documentType
    const getTotal = () => total
    const getSubTotal = () => subTotal
    const getIGV = () => igv
    const getSale = () => sale
    const getProducts = () => a_ProductsSale
    const getCodigoBarra = () => codigoBarra
    

    useEffect(()=>{
        if(codigoBarra != null){

            const api = fetch("http://localhost:5145/api/products/GetByCodeBar/{CodeBar}?CodeBar=" + codigoBarra)
                .then((response) => {
                    return response.ok ? response.json() : Promise.reject(response);
                })
                .then((dataJson) => {
                    let producto = {
                        idProducto: dataJson.data.id,
                        descripcion: dataJson.data.descripcion,
                        cantidad: parseInt(1),
                        precio: dataJson.data.precioVenta,
                        total: dataJson.data.precioVenta * parseFloat(1)
                    }
                    let arrayProductos = []
                    arrayProductos.push(...sale)

                    let existent = arrayProductos.findIndex((product) => {
                        return product.idProducto === producto.idProducto
                    })

                    if (existent != -1){
                        arrayProductos[existent].cantidad += producto.cantidad
                        arrayProductos[existent].total = arrayProductos[existent].precio * arrayProductos[existent].cantidad
                        setSale((anterior) => [...anterior])
                    }
                    else{
                        arrayProductos.push(producto)
                        setSale((anterior) => [...anterior, producto])
                    }
                   
                    calcularTotal(arrayProductos)
                    setCodigoBarra(null)
                }).catch((error) => {
                    console.log("No se pudo obtener datos, mayor detalle: ", error)
                })
        }
    },[codigoBarra])

    const onReadCodeBar = (e) => {
        if (e.target.value.length == 13){
            setCodigoBarra(e.target.value)
            e.target.value = null
        }
    }
    const sugestionSelectedSale = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        
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
                        
                        let producto = {
                            idProducto: suggestion.id,
                            descripcion: suggestion.marca + " " + suggestion.descripcion,
                            cantidad: parseInt(inputValue),
                            precio: suggestion.precioVenta,
                            total: suggestion.precioVenta * parseFloat(inputValue)
                        }
                        
                        let arrayProductos = []
                        arrayProductos.push(...sale)
                        
                        let existent = arrayProductos.findIndex((product) => {
                            return product.idProducto === producto.idProducto
                        })
                        if (existent != -1){
                        arrayProductos[existent].cantidad += producto.cantidad
                        arrayProductos[existent].total = arrayProductos[existent].precio * arrayProductos[existent].cantidad
                        setSale((anterior) => [...anterior])
                    }
                    else{
                        arrayProductos.push(producto)
                        setSale((anterior) => [...anterior, producto])
                    }
                    calcularTotal(arrayProductos)
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
            
        }).then((result) => {
            if (result.isConfirmed) {
                setA_Busqueda("")
            } else {
                setA_Busqueda("")
            }
        })
    }

    const onRemoveProduct = (id) =>{
        let productList = sale.filter(p => p.idProducto != id)
        setSale(productList)
        calcularTotal(productList)
    }
    
    const calcularTotal = (arrayProductos) => {
        let t = 0;
        let st = 0;
        let imp = 0;

        if (arrayProductos.length > 0) {

            arrayProductos.forEach((p) => {
                t = p.total + t
            })

            st = t / (1.21)
            imp = t - st
        }

        setSubTotal(st.toFixed(2))
        setIgv(imp.toFixed(2))
        setTotal(t.toFixed(2))
    }

    //funcion que nos permite borrar las sugerencias
    const onSuggestionsClearRequestedSale = () => {
        setA_ProductsSale([])
    }

    //para obtener la lista de sugerencias
    const onSuggestionsFetchRequestedSale = ({ value }) => {

        const api = fetch("http://localhost:5145/api/products/getbydescription/{description}?description=" + value)
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then((dataJson) => {
                setA_ProductsSale(dataJson.data)
            }).catch((error) => {
                console.log("No se pudo obtener datos, mayor detalle: ", error)
            })
    }

    const onClean = () => {
        setDocumentType("Boleta")
        setSale([])
        setTotal(0)
        setSubTotal(0)
        setIgv(0)
    }
  
    const onCompleteSale = () => {

        if (sale?.length < 1) {
            Swal.fire(
                'Opps!',
                'No existen productos',
                'error'
            )
            return
        }

        let item = {
            // documentoCliente: clientDocument,
            // nombreCliente: clientName,
            // tipoDocumento: documentType,
            // idUsuario: JSON.parse(user).idUsuario,
            subTotal: parseFloat(subTotal),
            igv: parseFloat(igv),
            total:parseFloat(total),
            listaProductos: sale
        }

        const api = fetch("api/venta/Registrar", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(item)
        })
        .then((response) => {
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then((dataJson) => {
            onClean();
            var data = dataJson;
            Swal.fire(
                'Venta Creada!',
                'Numero de venta : ' + data.numeroDocumento,
                'success'
            )

        }).catch((error) => {
            Swal.fire(
                'Opps!',
                'No se pudo crear la venta',
                'error'
            )
            console.log("No se pudo enviar la venta ", error)
        })

    }

    return (
        <SaleContext.Provider value={{
         onRemoveProduct, 
         getSale,
         sugestionSelectedSale,
         calcularTotal,
         onSuggestionsClearRequestedSale,
         onSuggestionsFetchRequestedSale,
         inputPropsSale,
         getProducts,
         getCodigoBarra,
         getTotal,
         getIGV,
         getSubTotal,
         getDocumentType,
         setDocumentType,
         onClean,
         onCompleteSale,
         onReadCodeBar,
         a_ProductsSale
         }}>
            {children}
        </SaleContext.Provider>
        )
}

export default SaleProvider;
