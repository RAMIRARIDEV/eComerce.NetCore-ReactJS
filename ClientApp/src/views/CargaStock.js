import ProductProvider from "../context/Product/Provider";
import { Card, CardBody} from "reactstrap"
import SectionTitle from './Shared/SectionTitle'
import ProducList from "./Product/components/ProductList";
import SearchProduct from "./Product/components/SearchProduct"

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
                {/* <ModalProduct/> */}
            </ProductProvider>
        </>
    );
}

export default CargaStock;