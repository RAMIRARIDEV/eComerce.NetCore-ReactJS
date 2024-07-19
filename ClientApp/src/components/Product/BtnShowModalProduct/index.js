import { useContext } from "react";
import ProductContext from "./../../../context/Product";
import { Button} from "reactstrap"

const BtnShowModalProduct = () => {

    const {openEditModal} = useContext(ProductContext)

    return <Button color="success" size="sm" onClick={openEditModal}>Nuevo Producto</Button>

}

export default BtnShowModalProduct;