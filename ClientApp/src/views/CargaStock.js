import ProductProvider from "../context/Product/Provider";
import { Card, CardBody} from "reactstrap"
import SectionTitle from './Shared/SectionTitle'
import ProducList from "./Product/components/ProductList";
import SearchProduct from "./Product/components/SearchProduct"
import SaleProvider from "../context/Sale/Provider";
import { useState } from "react";
import StockProvider from "../context/Stock/Provider";
const CargaStock = () => {

    return (
        <>
            <ProductProvider>
                <SaleProvider>
                    <StockProvider>
                <Card>
                    <SectionTitle text={"Carga de Stock"} />
                    <CardBody>
                        <SearchProduct isStock={true}/>
                        <hr></hr>
                        <ProducList />
                    </CardBody>
                </Card>
                {/* <ModalProduct/> */}
                </StockProvider>
                </SaleProvider>
            </ProductProvider>
        </>
    );
}

export default CargaStock;