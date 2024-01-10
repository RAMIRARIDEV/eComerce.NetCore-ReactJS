import { useContext } from "react";
import productContext from "../../../../context/Product";
import { Button} from "reactstrap"

const BtnShowModalProduct = () => {

    const {openEditModal} = useContext(productContext)

    return <Button color="success" size="sm" onClick={openEditModal}>Nuevo Producto</Button>

}

export default BtnShowModalProduct;