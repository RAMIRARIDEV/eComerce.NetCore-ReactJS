import { useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, ModalFooter, Row, Col } from "reactstrap"
import ProductContext from "../../../../context/Product";


const ModalProduct = () => {

    const { product, viewModal, handleChange, categories, saveChanges, closeModal } = useContext(ProductContext)

    return (
        <Modal isOpen={viewModal}>
            <ModalHeader>
                Detalle Producto
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <Label>Codigo</Label>
                            <Input bsSize="sm" name="codigo" onChange={handleChange} value={product.codigo} />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <Label>Marca</Label>
                            <Input bsSize="sm" name="marca" onChange={handleChange} value={product.marca} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <Label>Descripcion</Label>
                            <Input bsSize="sm" name="descripcion" onChange={handleChange} value={product.descripcion} />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <Label>Categoria</Label>
                            <Input bsSize="sm" type={"select"} name="idCategoria" onChange={handleChange} value={product.idCategoria} >
                                <option value={0}>Seleccionar</option>
                                {
                                    categories.map((item) => {
                                        if (item.esActivo)
                                            return (<option key={item.idCategoria} value={item.idCategoria}>{item.descripcion}</option>)
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <Label>Stock</Label>
                            <Input bsSize="sm" name="stock" onChange={handleChange} value={product.stock} type="number" />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <Label>Precio</Label>
                            <Input bsSize="sm" name="precio" onChange={handleChange} value={product.precio} type="number" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm="6" >
                        <FormGroup>
                            <Label>Estado</Label>
                            <Input bsSize="sm" type={"select"} name="esActivo" onChange={handleChange} value={product.esActivo} >
                                <option value={true}>Activo</option>
                                <option value={false}>No Activo</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>


            </ModalBody>
            <ModalFooter>
                <Button size="sm" color="primary" onClick={saveChanges}>Guardar</Button>
                <Button size="sm" color="danger" onClick={closeModal}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    );

}

export default ModalProduct;