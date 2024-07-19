import ProductProvider from "../context/Product/Provider";
import { Card, CardBody} from "reactstrap"
import SectionTitle from './Shared/SectionTitle'
import ProducList from "./../components/Product/ProductList";
import SearchProduct from "./../components/Product/SearchProduct"
//import SaleProvider from "./../context/Sale/Provider";


const CargaStock = () => {

    return (
        <>
            <ProductProvider>
                <Card>
                    <SectionTitle text={"Carga de Stock"} />
                    <CardBody>
                        <SearchProduct/>
                        <hr></hr>
                        <ProducList />
                    </CardBody>
                </Card>
            </ProductProvider>
        </>
    );
}

export default CargaStock;