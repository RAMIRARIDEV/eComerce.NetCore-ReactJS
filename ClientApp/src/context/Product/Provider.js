import { useState, useEffect } from "react"
import ProductContext from "./../../context/Product"
import {Button } from "reactstrap"
import Swal from 'sweetalert2'

const ProductProvider = ({children}) => {

    const modelProduct = {
        id : undefined,
        codigo :0,
        codigoBarra :"",
        marca :"",
        descripcion :"",
        idCategoria :"",
        stock :0,
        precioCompra: 0,
        precioVenta: 0,
        esActivo: true,
        idTipoProducto: ""
    }
    const [product, setProduct] = useState(modelProduct);
    const [pending, setPending] = useState(true);
    const [productsList, setProductsList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [viewModal, setViewModal] = useState(false);
    const [search, setSearch] = useState("")
    const [a_Products, setA_Products] = useState([])
    const [stockList, setStockList] = useState([])



    const cleanSearch = () => {
        setSearch("");
    }


       //evento cuando cambie el valor del texto de busqueda
       const onChange = (e, { newValue }) => {
        setSearch(newValue)
    }

    //funcion que nos permite borrar las sugerencias
    const onSuggestionsClearRequestedProduct = () => {
        setA_Products([])
    }

    //para obtener la lista de sugerencias
    const onSuggestionsFetchRequestedProduct = ({ value }) => {
        console.log(value);
        const api = fetch("http://localhost:5145/api/products/getbydescription/{description}?description=" + value)
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
           value: search,
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
        let response = await fetch("http://localhost:5145/api/categories/getall");
        if (response.ok) {
            let data = await response.json()
            setCategories(data.data)
        }
    }

    const getProductsList = async () => {
        try {

            let response = await fetch("http://localhost:5145/api/products/getall");

            if (response.ok) {
                let data = await response.json()
                if (data.isSuccess) {
                    console.log(data.data);
                    setProductsList(data.data)
                    setPending(false)
                }
            }
        }catch(error){
            console.log(error)
        }
    }

    const openEditModal = (data) => {
        data.id != undefined? setProduct(data) : setProduct(modelProduct)
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
                console.log(id)
                const response = fetch("http://localhost:5145/api/products/delete", {
                     method: "DELETE",
                     headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(id)
                })
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
                                'El producto no fue eliminado.',
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
    
    const columnsProduct = [
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
            selector: row => row.idCategoriaNavigation.descripcion,
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
                         onClick={() => deleteProduct(row.id)}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </>
            ),
        },
    ];

    const columnsStock = [
        {
            name: 'Codigo',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Descripcion',
            selector: row => row.descripcion,
            sortable: true,
        },
        {
            name: 'Cantidad',
            selector: row => row.cantidad,
            sortable: true,
        },
        {
            name: 'Eliminar',
            cell: row => (
                <>

                    <Button color="danger" size="sm"
                         onClick={() => deleteProduct(row.id)}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </>
            ),
        },
    ] 

    const handleChange = (e) => {

        let value;
        console.log(e.target);
        if (e.target.name == "idCategoria") {
            value = e.target.value;
        } else if (e.target.name == "esActivo") {
            value = (e.target.value == "true" ? true : false);
        } else if (e.target.name == "idTipoProducto") {
            value = e.target.value;
        } else if (e.target.name == "precioVenta") {
            value = Number(e.target.value);
        } else if (e.target.name == "stock") {
            value = Number(e.target.value);
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
        console.log(product);
        if (product.id == undefined) {
            response = await fetch("http://localhost:5145/api/products/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(product)
            })

        } else {
            response = await fetch("http://localhost:5145/api/products/update", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(product)
            })
        }
        console.log(response);

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

    const sugestionSelectedStock = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {

        Swal.fire({
            title: suggestion.marca + " - " + suggestion.descripcion,
            text: "Ingrese la cantidad de Stock",
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
                        id: suggestion.id,
                        descripcion: suggestion.marca + " " + suggestion.descripcion,
                        cantidad: parseInt(inputValue),
                        precio: suggestion.precioCompra,
                        total: suggestion.precioCompra * parseFloat(inputValue)
                    }
                    setStockList((last) => [...last, item])
                    console.log(stockList)
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                setSearch("")
            } else {
                setSearch("")
            }
        })
    }



    return (
        <ProductContext.Provider value={{
             productsList,
             stockList,
             pending,
             paginationComponentOptions,
             modelProduct,
             columnsProduct,
             columnsStock,
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
             cleanSearch,
             search,
             sugestionSelectedStock      
             }}>
            {children}
        </ProductContext.Provider>
    );
}

export default ProductProvider;