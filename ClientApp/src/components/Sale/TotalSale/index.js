
import { useContext } from "react";
import { Col, Row, Table, InputGroup ,InputGroupText, Input, option} from "reactstrap";
import SaleContext from "../../../../context/Sale"


const TotalSale = () => {

    const {getTotal, getIGV, getSubTotal, getDocumentType, setDocumentType} = useContext(SaleContext)
    const modelo = {
        nombre: "",
        correo: "",
        idRolNavigation: {
            idRol: 0,
            descripcion: ""
        }
    }
    return (
        <>
            <Row className="mb-2">
                <Col sm={12}>
                    <InputGroup size="sm" >
                        <InputGroupText>Tipo:</InputGroupText>
                        <Input type="select" value={getDocumentType()} onChange={(e) => setDocumentType(e.target.value)}>
                            <option value="Boleta">Boleta</option>
                            <option value="Factura">Factura</option>
                        </Input>
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm={12}>
                    <InputGroup size="sm" >
                        <InputGroupText>Sub Total:</InputGroupText>
                        <Input disabled value={getSubTotal()} />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm={12}>
                    <InputGroup size="sm" >
                        <InputGroupText>IVA (21%):</InputGroupText>
                        <Input disabled value={getIGV()} />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <InputGroup size="sm" >
                        <InputGroupText>Total:</InputGroupText>
                        <Input disabled value={getTotal()} />
                    </InputGroup>
                </Col>
            </Row>
        </>
    );

}

export default TotalSale;