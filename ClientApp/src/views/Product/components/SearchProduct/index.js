import { Col, FormGroup, Row } from "reactstrap";
import Autosuggest from 'react-autosuggest';
import { useContext, useEffect, useState } from "react";

import SaleContext from '../../../../context/Sale'
import StockContext from '../../../../context/Stock'
import ProductContext from "../../../../context/Product";

const SearchProduct = (isSale, isStock) =>
{

    const {onSuggestionsFetchRequestedSale,
            onSuggestionsClearRequestedSale,
            inputPropsSale,
            sugestionSelectedSale,
            a_ProductsSale
        } = useContext(SaleContext)

        const {onSuggestionsFetchRequestedProduct,
            onSuggestionsClearRequestedProduct,
            getSuggestionValueProduct,
            renderSuggestionProduct,
            inputPropsProduct,
            a_Products
        } = useContext(ProductContext)

        const {sugestionSelectedProduct} = useContext(StockContext)

    return (
        <Row className="mb-2">
            <Col sm={12}>
                <FormGroup>
                    <Autosuggest
                        suggestions={isSale ? a_ProductsSale : isStock ? a_Products : undefined}
                        onSuggestionsFetchRequested={isSale ? onSuggestionsFetchRequestedSale:  isStock ? onSuggestionsFetchRequestedProduct : undefined}
                        onSuggestionsClearRequested={isSale ? onSuggestionsClearRequestedSale:  isStock ? onSuggestionsClearRequestedProduct : undefined}
                        getSuggestionValue={getSuggestionValueProduct}
                        renderSuggestion={renderSuggestionProduct}
                        inputProps={isSale ? inputPropsSale :  isStock ? inputPropsProduct : undefined}
                        onSuggestionSelected={isSale ? sugestionSelectedSale :  isStock ? sugestionSelectedProduct  : undefined} 
                    />
                </FormGroup>
            </Col>
        </Row>
        );
}


export default SearchProduct;
