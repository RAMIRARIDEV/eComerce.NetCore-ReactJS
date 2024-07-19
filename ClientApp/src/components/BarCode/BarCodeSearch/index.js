import { BarcodeScanner } from 'react-barcode-scanner';
import {  Input, Col, Label, Row, FormGroup } from "reactstrap";
import {useContext} from 'react'
import SaleContext from "./../../../context/Sale"

const BarCodeSearch = () => {

   const { onReadCodeBar } = useContext(SaleContext)
  
    return (
      <Row>
          <Col sm={12}>
              <FormGroup>
                  <Col sm={12}>
                      <Input onChange={onReadCodeBar} type="text" minLength={13}  placeholder='Lector Código' autoFocus={true}>
                          <BarcodeScanner />
                      </Input>
                  </Col>
              </FormGroup>
          </Col>
      </Row>
  )
}

export default BarCodeSearch;