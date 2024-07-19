import { Card, CardBody, CardHeader, Col, Row, FormGroup, Label, Input, } from "reactstrap";
import "./css/Venta.css"
import SearchProduct from "./../components/Product/SearchProduct"
import ProductListSale from "./../components/Sale/ProductListSale"
import TotalSale from './../components/Sale/TotalSale'
import CompleteSaleButton from "./../components/Sale/CompleteSaleButton"
import BarCode from "./../components/BarCode/BarCodeSearch/index"
import SectionTitle from './Shared/SectionTitle'
import SaleProvider from "./../context/Sale/Provider";
import ProductProvider from "./../context/Product/Provider";


const Sale = () => {

    return (
        <ProductProvider>
            <SaleProvider>
                <Row>
                    <Col sm={8}>
                        {<Row className="mb-2">
                            <Col sm={12}>
                                <Card>
                                    <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>
                                        Lector Código
                                    </CardHeader>
                                    <CardBody>
                                        <BarCode/>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        }
                        <Row>
                            <Col sm={12}>
                                <Card>
                                    <SectionTitle text={"Productos"} />
                                    <CardBody>
                                        <SearchProduct />
                                        <ProductListSale />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    <Col sm={4}>
                        <Row className="mb-2">
                            <Col sm={12}>
                                <Card>
                                    <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>
                                        Detalle
                                    </CardHeader>
                                    <CardBody>
                                        <TotalSale />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Card>
                                    <CardBody>
                                        <CompleteSaleButton />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </SaleProvider>
        </ProductProvider>

    )
}




export default Sale;