import { Col, Row ,Table } from "reactstrap";
import ProductListItem from "../ProductListItemSale"
import React, { useContext, useEffect } from 'react'

import SaleContext from "../../../../context/Sale"

const ProductsGrid = () => {

    const {getSale} = useContext(SaleContext)
    return (
     <Row>
        <Col sm={12}>
            <Table striped size="sm">
                <thead>
                    <tr>
                        <th></th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                        {!getSale()?.length &&   <tr><td colSpan="5">Sin productos</td></tr>}
                        {getSale()?.map(item => <ProductListItem  key={item.idProducto} {...item} />)}
                </tbody>
            </Table>
        </Col>
    </Row>
    );
}

export default ProductsGrid;