import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import "./css/Venta.css"
import SearchProduct from "./Product/components/SearchProduct"
import ProductListSale from "./Sale/components/ProductListSale"
import TotalSale from './Sale/components/TotalSale'
import CompleteSaleButton from "../views/Sale/components/CompleteSaleButton"
import SectionTitle from '../views/Shared/SectionTitle'
import SaleProvider from "../context/Sale/Provider";
import ProductProvider from "../context/Product/Provider";


const Sale = () => {

    return (
        <ProductProvider>
            <SaleProvider>
            <Row>
                <Col sm={8}>

                    {/* <Row className="mb-2">
                    <Col sm={12}>
                        <Card>
                            <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>
                                Cliente
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Label>Nro Documento</Label>
                                            <Input bsSize="sm" value={documentoCliente} onChange={ (e) => setDocumentoCliente(e.target.value)} />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Label>Nombre</Label>
                                            <Input bsSize="sm" value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row> */}
                    <Row>
                        <Col sm={12}>
                            <Card>
                                <SectionTitle text={"Productos"}/>
                                <CardBody>
                                     <SearchProduct/>
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
                                    <CompleteSaleButton/>
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