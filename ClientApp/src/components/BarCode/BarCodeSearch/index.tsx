    import React, { useState } from 'react'
    import { useSymbologyScanner } from '@use-symbology-scanner/react';

    const BarCodeSearch = () => {
        const [barcodeScan, setBarcodeScan] = useState()

        const handlerSymbol = (symbol,matchedSymbologies)=>{
            setBarcodeScan(symbol)
        }
        useSymbologyScanner(handlerSymbol, {target : barcodeScan})
      return (
        <div ref={barcodeScan}>index</div>
      )
    }

    export default BarCodeSearch;
    