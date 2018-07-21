import * as React from "react";
import * as PropTypes from "prop-types";

import TransformCard from "../uwp_items/transformcard";


import ListView, { ListViewProps } from "react-uwp/ListView";
import Separator from "react-uwp/Separator";
import CheckBox from "react-uwp/CheckBox";
import Toggle from "react-uwp/Toggle";

const listSource = [{
}, {

  disabled: true,
}, ...Array(3).fill(0).map((numb, index,dataNames) => (
  <span key={`${index}`}>
    <span  style={{color:'#D59AFD' }}>{["Speed", "Altitude", "Temperature"][index]}</span>
    <span background="none" style={{color:'#00EBFF', float: "right" }} >{Math.floor(Math.random() * Math.floor(40))} {["km/h", "feet", "°C"][index]}</span>
  </span>
)),
  
];

const baseStyle: React.CSSProperties = {
    
};




export default class StatisticBoard extends React.Component {
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const { theme } = this.context;
    return (
        <TransformCard xMaxRotate={50} yMaxRotate={50}  defaultRotateX={25} perspective={280}  style={{
          position:'fixed',
          bottom:'5vh',
          left:'40vh',
          right:'0',
          padding:'0vh 25vh',
     
        
          ...baseStyle
        }}>
        
            <ListView
              listSource={listSource}
              style={{width:'50vh',  fontSize:'22px',}}
            />
       

        
        </TransformCard>

      
    );
  }
}



