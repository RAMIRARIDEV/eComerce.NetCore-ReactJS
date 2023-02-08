import { Col, FormGroup, Row } from "reactstrap";
import Autosuggest from 'react-autosuggest';
import { useContext, useEffect } from "react";

import SaleContext from '../../../../context/Sale'

const Index = () =>
{

    const {onSuggestionsFetchRequested,
        onSuggestionsClearRequested,
        getSuggestionValue,
        renderSuggestion,
        inputProps,
        sugerenciaSeleccionada,
        getProducts
    } = useContext(SaleContext)

    return (
        <Row className="mb-2">
            <Col sm={12}>
                <FormGroup>
                    <Autosuggest
                        suggestions={getProducts()}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        onSuggestionSelected={sugerenciaSeleccionada}
                    />
                </FormGroup>
            </Col>
        </Row>
        );
}

export default Index;