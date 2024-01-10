import { useContext } from "react";
import SaleContext from "../../../../context/Sale"
import { Button} from "reactstrap";

const SaleSubmit = () => {

    const { onCompleteSale } = useContext(SaleContext)

    return(
        <Button color="success" block onClick={onCompleteSale} >
        <i className="fas fa-money-check"></i> Terminar Venta</Button>
    );

}

export default SaleSubmit;