import { Card, CardBody} from "reactstrap"
import SectionTitle from './Shared/SectionTitle'
import ProducList from "./../components/Product/ProductList";
import ProductProvider from "../context/Product/Provider";
import ModalProduct from "./../components/Product/ModalProduct";
import BtnShowModalProduct from "./../components/Product/BtnShowModalProduct";

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