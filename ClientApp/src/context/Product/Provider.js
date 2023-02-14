import { useState, useEffect } from "react"
import ProductContext from "../Product"
import {Button } from "reactstrap"
import Swal from 'sweetalert2'

const ProductProvider = ({children}) => {

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
    const [categories, setCategories] = useState([]);
    const [viewModal, setViewModal] = useState(false);
    const [a_Busqueda, setA_Busqueda] = useState("")
    const [a_Products, setA_Products] = useState([])



    const cleanSearch = () => {
        setA_Busqueda("");
    }


       //evento cuando cambie el valor del texto de busqueda
       const onChange = (e, { newValue }) => {
        setA_Busqueda(newValue)
    }

    //funcion que nos permite borrar las sugerencias
    const onSuggestionsClearRequestedProduct = () => {
        setA_Products([])
    }

    //para obtener la lista de sugerencias
    const onSuggestionsFetchRequestedProduct = ({ value }) => {

        const api = fetch("api/venta/Productos/" + value)
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then((dataJson) => {
                setA_Products(dataJson)
            }).catch((error) => {
                console.log("No se pudo obtener datos, mayor detalle: ", error)
            })
    }

    const renderSuggestionProduct = (sugerencia) => (
        <span>
               {sugerencia.codigo + " - " + sugerencia.marca + " - " + sugerencia.descripcion}
        </span>
       )

    const inputPropsProduct = {
           placeholder: "Buscar producto",
           value: a_Busqueda,
           onChange
    }

    const getSuggestionValueProduct = (sugerencia) => {
        return sugerencia.codigo + " - " + sugerencia.marca + " - " + sugerencia.descripcion
    }

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    const getCategories = async () => {
        let response = await fetch("api/categoria/Lista");
        if (response.ok) {
            let data = await response.json()
            setCategories(data)
        }
    }

    const getProductsList = async () => {
        try{
            let response = await fetch("api/producto/Lista");

            if (response.ok) {
                let data = await response.json()
                setProductsList(data)
                setPending(false)
            }
        }catch(error){
            console.log(error)
        }
    }

    const openEditModal = (data) => {
        data? setProduct(data) : setProduct(modelProduct)
        setViewModal(true);
    }

    const closeModal = () => {
        setProduct(modelProduct)
        setViewModal(false);
    }

    const deleteProduct = async (id) => {

        Swal.fire({
            title: 'Esta seguro?',
            text: "Desea eliminar el producto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {

                const response = fetch("api/producto/Eliminar/" + id, { method: "DELETE" })
                    .then(response => {
                        if (response.ok) {

                            getProductsList();

                            Swal.fire(
                                'Eliminado!',
                                'El producto fue eliminado.',
                                'success'
                            )
                        }
                        else{
                            Swal.fire(
                                'Error al eliminar.',
                                'El producto no fue eliminado. Tiene ventas asociadas.',
                                'error'
                            )
                        }
                    })
            }
        })
    }

    useEffect(() => {
        getCategories();
        getProductsList();
    }, [])


    const customStyles = {
        headCells: {
            style: {
                fontSize: '13px',
                fontWeight: 800,
            },
        },
        headRow: {
            style: {
                backgroundColor: "#eee",
            }
        }
    };
    
    const columns = [
        {
            name: 'Codigo',
            selector: row => row.codigo,
            sortable: true,
        },
        {
            name: 'Marca',
            selector: row => row.marca,
            sortable: true,
        },
        {
            name: 'Descripcion',
            selector: row => row.descripcion,
            sortable: true,
        },
        {
            name: 'Categoria',
            selector: row => row.idCategoriaNavigation,
            sortable: true,
            cell: row => (row.idCategoriaNavigation.descripcion)
        },
        {
            name: 'Estado',
            selector: row => row.esActivo,
            sortable: true,
            cell: row => {
                let clase;
                clase = row.esActivo ? "badge badge-info p-2" : "badge badge-danger p-2"
                return (
                    <span className={clase}>{row.esActivo ? "Activo" : "No Activo"}</span>
                )
            }
        },
        {
            name: '',
            cell: row => (
                <>
                    <Button color="primary" size="sm" className="mr-2"
                         onClick={() => openEditModal(row)}
                    >
                        <i className="fas fa-pen-alt"></i>
                    </Button>

                    <Button color="danger" size="sm"
                         onClick={() => deleteProduct(row.idProducto)}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </>
            ),
        },
    ];

    const handleChange = (e) => {

        let value;

        if (e.target.name == "idCategoria") {
            value = e.target.value
        } else if (e.target.name == "esActivo") {
            value = (e.target.value == "true" ? true : false)
        } else {
            value = e.target.value;
        }

        setProduct({
            ...product,
            [e.target.name]: value
        })


    }

    const saveChanges = async () => {

        delete product.idCategoriaNavigation;

        let response;
        if (product.idProducto == 0) {
            response = await fetch("api/producto/Guardar", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(product)
            })

        } else {
            response = await fetch("api/producto/Editar", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(product)
            })
        }

        if (response.ok) {
            await getProductsList();
            setProduct(modelProduct)
            setViewModal(false);

            Swal.fire(
                'Ingresado con éxito!',
                'Se guardardo correctamente.',
                'success'
            )

        } else {

            Swal.fire(
                'Opp!',
                'No se pudo guardar.',
                'warning'
            )
        }

    }

    

    return (
        <ProductContext.Provider value={{
             productsList,
             pending,
             paginationComponentOptions,
             modelProduct,
             columns,
             customStyles,
             openEditModal,
             viewModal,
             handleChange,
             product,
             categories,
             saveChanges,
             closeModal,
             onSuggestionsFetchRequestedProduct,
             onSuggestionsClearRequestedProduct,
             renderSuggestionProduct,
             inputPropsProduct,
             getSuggestionValueProduct,
             a_Products,
             cleanSearch             
             }}>
            {children}
        </ProductContext.Provider>
    );
}

export default ProductProvider;