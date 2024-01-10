import { Col, FormGroup, Row } from "reactstrap";
import Autosuggest from 'react-autosuggest';
import { useContext, useEffect, useState } from "react";
import SaleContext from '../../../../context/Sale'
import ProductContext from "../../../../context/Product";
import { useLocation } from "react-router-dom";

const SearchProduct = () => {

    const { onSuggestionsFetchRequestedSale,
        onSuggestionsClearRequestedSale,
        inputPropsSale,
        sugestionSelectedSale,
        a_ProductsSale
    } = useContext(SaleContext)

    const { onSuggestionsFetchRequestedProduct,
        onSuggestionsClearRequestedProduct,
        getSuggestionValueProduct,
        renderSuggestionProduct,
        inputPropsProduct,
        a_Products,
        sugestionSelectedStock,
        cleanSearch,
        search
    } = useContext(ProductContext)

    let location = useLocation();
    const [state, setState] = useState({
        suggestions: null,
        onSuggestionsFetchRequested: null,
        onSuggestionsClearRequested: null,
        getSuggestionValue: null,
        renderSuggestion: null,
        inputProps: null,
        onSuggestionSelected: null
    });

    useEffect(() => {
        switch (location.pathname) {
            case "/cargaStock": setState({
                suggestions: a_Products,
                onSuggestionsFetchRequested: onSuggestionsFetchRequestedProduct,
                onSuggestionsClearRequested: onSuggestionsClearRequestedProduct,
                getSuggestionValue: getSuggestionValueProduct,
                renderSuggestion: renderSuggestionProduct,
                inputProps: inputPropsProduct,
                onSuggestionSelected: sugestionSelectedStock
            });
                break;
            case "/venta": setState({
                suggestions: a_ProductsSale,
                onSuggestionsFetchRequested: onSuggestionsFetchRequestedSale,
                onSuggestionsClearRequested: onSuggestionsClearRequestedSale,
                getSuggestionValue: getSuggestionValueProduct,
                renderSuggestion: renderSuggestionProduct,
                inputProps: inputPropsSale,
                onSuggestionSelected: sugestionSelectedSale
            }); break;
            default: setState({
                suggestions: null,
                onSuggestionsFetchRequested: null,
                onSuggestionsClearRequested: null,
                getSuggestionValue: null,
                renderSuggestion: null,
                inputProps: null,
                onSuggestionSelected: null
            })
        }

    }, [location.pathname, a_ProductsSale, a_Products,search])

    if (state.suggestions) {
        return (
            <Row className="mb-2">
                <Col sm={12}>
                    <FormGroup>
                        <Autosuggest
                            suggestions={state.suggestions}
                            onSuggestionsFetchRequested={state.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={state.onSuggestionsClearRequested}
                            getSuggestionValue={state.getSuggestionValue}
                            renderSuggestion={state.renderSuggestion}
                            inputProps={state.inputProps}
                            onSuggestionSelected={state.onSuggestionSelected}
                        />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}


export default SearchProduct;
