import { Button, td ,Table } from "reactstrap";
import SaleContext from '../../../../context/Sale'
import {useContext} from "react"

const ProductListItem = ({ idProducto, descripcion, cantidad, precio, total }) => {

    const {onRemoveProduct} = useContext(SaleContext)

    return (
        <tr>

            
            <td>
            <Button color="danger" size="sm"
                onClick={() => onRemoveProduct(idProducto)}
            >
                <i className="fas fa-trash-alt"></i>
            </Button>
        </td>
        <td>{descripcion}</td>
        <td>{cantidad}</td>
        <td>{precio}</td>
        <td>{total}</td>
        </tr>

    );
}

export default ProductListItem;