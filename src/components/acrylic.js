
import * as React from "react";
import Acrylic from 'react-acrylic'




export default class AcrylicSample extends React.Component {

    render() {

        return (<Acrylic
            colorOverlay='#D59AFD'
            opacity={0.6}
            blur={-3}
            heigth ={400}
            width={300}
        >
        </Acrylic>)

}}