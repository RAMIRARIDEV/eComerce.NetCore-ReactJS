import { Card, CardBody} from "reactstrap"
import SectionTitle from './Shared/SectionTitle'
import ProducList from "./Product/components/ProductList";
import ProductProvider from "../context/Product/Provider";
import ModalProduct from "./Product/components/ModalProduct";
import BtnShowModalProduct from "./Product/components/BtnShowModalProduct";

const Producto = () => {

    return (
        <>
            <ProductProvider>
                <Card>
                    <SectionTitle text={"Lista de productos"} />
                    <CardBody>
                        <BtnShowModalProduct/>
                        <hr></hr>
                        <ProducList />
                    </CardBody>
                </Card>
                <ModalProduct/>
            </ProductProvider>
        </>
    )
}

export default Producto;